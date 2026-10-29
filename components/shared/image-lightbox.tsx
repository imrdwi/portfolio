"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: React.ReactNode;
};

type View = { s: number; x: number; y: number };
type Point = { x: number; y: number };

// Click steps through these; a click at the last one zooms back out.
const ZOOM_STEPS = [1, 2, 4];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];
const DOUBLE_TAP_ZOOM = 2;
const DOUBLE_TAP_MS = 300;
// Movement under this is still a click or tap, not a drag.
const TAP_SLOP = 6;
// A downward swipe past this, at fit size, closes the lightbox on touch.
const SWIPE_CLOSE_PX = 110;
const FIT: View = { s: 1, x: 0, y: 0 };
// Matches the backdrop fade in globals.css.
const FLIGHT_MS = 320;
const FLIGHT_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// The transform that lays a box with rect `to` exactly over rect `from`.
// Both images share an aspect ratio, so one scale factor is enough.
function flightTransform(from: DOMRect, to: DOMRect) {
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${from.width / to.width})`;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Gesture =
  | {
      kind: "pan";
      start: Point;
      startView: View;
      moved: boolean;
      onImage: boolean;
      pointerType: string;
    }
  | { kind: "pinch"; startDist: number; startMid: Point; startView: View };

/**
 * Wraps an inline figure image in a button that opens it in a native
 * `<dialog>`, scaled to fit the viewport. The image flies from its place on
 * the page into the lightbox and back again on close, while only the
 * backdrop fades. `showModal()` provides the focus
 * trap, Escape to close, and focus return without a dialog library.
 *
 * Inside, the image zooms the way photo viewers do: click steps through
 * ZOOM_STEPS toward the pointer, drag pans, ctrl+wheel or trackpad pinch
 * zooms. On touch: pinch, double-tap to toggle, and swipe down to close.
 * `+`, `-` and `0` zoom from the keyboard. The full-size image mounts on
 * first open, and a sharper copy loads only once the image is zoomed.
 */
export function ImageLightbox({ src, alt, width, height, children }: ImageLightboxProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const flightRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [fit, setFit] = React.useState<{ w: number; h: number } | null>(null);
  const [view, setViewState] = React.useState<View>(FIT);
  const [animate, setAnimate] = React.useState(true);
  const [hiRes, setHiRes] = React.useState(false);
  const [hiResLoaded, setHiResLoaded] = React.useState(false);
  // The inline image's already-loaded URL, shown under the lightbox image so
  // the flight never shows an empty box while the larger file loads.
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);
  const [mainReady, setMainReady] = React.useState(false);
  // While the image is flying, only the small, already-decoded preview is
  // drawn. On a large or high-density screen the full-size image is a
  // texture many times the size of a phone's, and scaling it every frame is
  // what makes the flight stutter on a busy GPU. It swaps in on landing.
  const [flying, setFlying] = React.useState(false);
  const [openCount, setOpenCount] = React.useState(0);
  const [closing, setClosing] = React.useState(false);

  const viewRef = React.useRef(view);
  const fitRef = React.useRef(fit);
  const pointers = React.useRef(new Map<number, Point>());
  const gesture = React.useRef<Gesture | null>(null);
  const lastTap = React.useRef<{ t: number; p: Point } | null>(null);
  const closeOnClick = React.useRef(false);
  const flyInPending = React.useRef(false);

  const setView = React.useCallback((next: View) => {
    viewRef.current = next;
    setViewState(next);
    if (next.s > 1) setHiRes(true);
  }, []);

  const measure = React.useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const pad = stage.clientWidth >= 640 ? 32 : 16;
    const ratio = Math.min(
      (stage.clientWidth - pad * 2) / width,
      (stage.clientHeight - pad * 2) / height,
    );
    const next = { w: width * ratio, h: height * ratio };
    fitRef.current = next;
    setFit(next);
  }, [width, height]);

  // Keep a zoomed image from being panned past its own edges.
  const clamp = React.useCallback((v: View): View => {
    const stage = stageRef.current;
    const f = fitRef.current;
    if (!stage || !f) return v;
    const maxX = Math.max(0, (f.w * v.s - stage.clientWidth) / 2);
    const maxY = Math.max(0, (f.h * v.s - stage.clientHeight) / 2);
    return {
      s: v.s,
      x: Math.min(maxX, Math.max(-maxX, v.x)),
      y: Math.min(maxY, Math.max(-maxY, v.y)),
    };
  }, []);

  // Zoom to `s` while keeping the image point under `p` where it is.
  // `p` is relative to the stage centre.
  const zoomAt = React.useCallback(
    (s: number, p: Point, from: View = viewRef.current) => {
      const next = Math.min(MAX_ZOOM, Math.max(1, s));
      if (next === 1) return setView(FIT);
      const k = next / from.s;
      setView(clamp({ s: next, x: p.x - (p.x - from.x) * k, y: p.y - (p.y - from.y) * k }));
    },
    [clamp, setView],
  );

  const fromCenter = (clientX: number, clientY: number): Point => {
    const rect = stageRef.current!.getBoundingClientRect();
    return { x: clientX - (rect.left + rect.width / 2), y: clientY - (rect.top + rect.height / 2) };
  };

  const inlineImage = () => triggerRef.current?.querySelector("img") ?? null;

  const finishClose = React.useCallback(() => {
    const flight = flightRef.current;
    if (dialogRef.current?.open) dialogRef.current.close();
    flight?.getAnimations().forEach((animation) => animation.cancel());
    const img = triggerRef.current?.querySelector("img");
    if (img) img.style.visibility = "";
    setClosing(false);
    setFlying(false);
  }, []);

  const close = () => {
    const flight = flightRef.current;
    const img = inlineImage();
    if (closing) return;
    if (!flight || !img || prefersReducedMotion()) return finishClose();

    setClosing(true);
    setFlying(true);
    // Settle any zoom or swipe offset back to fit while the image flies home,
    // and drop the 4x copy so it is not dragged along as a huge texture.
    setAnimate(true);
    setView(FIT);
    setHiRes(false);
    setHiResLoaded(false);
    flight.getAnimations().forEach((animation) => animation.cancel());
    const to = flightTransform(img.getBoundingClientRect(), flight.getBoundingClientRect());
    flight
      .animate([{ transform: "none" }, { transform: to }], {
        duration: FLIGHT_MS,
        easing: FLIGHT_EASING,
        fill: "forwards",
      })
      .finished.then(finishClose, () => {});
  };

  const open = () => {
    const img = inlineImage();
    setPreviewSrc(img?.currentSrc || null);
    setMounted(true);
    setAnimate(true);
    setView(FIT);
    setClosing(false);
    setFlying(!prefersReducedMotion());
    dialogRef.current?.showModal();
    measure();
    flyInPending.current = true;
    setOpenCount((count) => count + 1);
  };

  // Once the lightbox image has laid out at fit size, start it over the
  // inline image and let it fly to where it belongs. The inline image hides
  // for the duration, so it reads as one image moving, not a copy appearing.
  React.useLayoutEffect(() => {
    if (!flyInPending.current || !fit) return;
    flyInPending.current = false;
    const flight = flightRef.current;
    const img = inlineImage();
    if (!flight || !img) return;
    img.style.visibility = "hidden";
    if (prefersReducedMotion()) return;
    const from = flightTransform(img.getBoundingClientRect(), flight.getBoundingClientRect());
    flight
      .animate([{ transform: from }, { transform: "none" }], {
        duration: FLIGHT_MS,
        easing: FLIGHT_EASING,
      })
      .finished.then(() => setFlying(false), () => {});
  }, [fit, openCount]);

  React.useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      measure();
      setView(FIT);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted, measure, setView]);

  // React registers wheel listeners as passive, so preventDefault needs a
  // native listener. Trackpad pinch arrives as a wheel event with ctrlKey.
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!mounted || !dialog) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setAnimate(false);
      const v = viewRef.current;
      if (event.ctrlKey) {
        zoomAt(v.s * Math.exp(-event.deltaY * 0.01), fromCenter(event.clientX, event.clientY));
      } else if (v.s > 1) {
        setView(clamp({ s: v.s, x: v.x - event.deltaX, y: v.y - event.deltaY }));
      }
    };
    dialog.addEventListener("wheel", onWheel, { passive: false });
    return () => dialog.removeEventListener("wheel", onWheel);
  }, [mounted, zoomAt, clamp, setView]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    closeOnClick.current = false;
    if (event.button !== 0 || (event.target as Element).closest("[data-lightbox-close]")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    setAnimate(false);

    const [a, b] = [...pointers.current.values()];
    if (b) {
      gesture.current = {
        kind: "pinch",
        startDist: Math.hypot(a.x - b.x, a.y - b.y),
        startMid: fromCenter((a.x + b.x) / 2, (a.y + b.y) / 2),
        startView: viewRef.current,
      };
    } else {
      gesture.current = {
        kind: "pan",
        start: { x: event.clientX, y: event.clientY },
        startView: viewRef.current,
        moved: false,
        onImage: !!(event.target as Element).closest("[data-lightbox-image]"),
        pointerType: event.pointerType,
      };
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.kind === "pinch") {
      const [a, b] = [...pointers.current.values()];
      if (!b) return;
      const mid = fromCenter((a.x + b.x) / 2, (a.y + b.y) / 2);
      const s = Math.min(
        MAX_ZOOM,
        Math.max(1, (g.startView.s * Math.hypot(a.x - b.x, a.y - b.y)) / g.startDist),
      );
      // The image point that started under the fingers follows their midpoint.
      const k = s / g.startView.s;
      setView(
        clamp({
          s,
          x: mid.x - (g.startMid.x - g.startView.x) * k,
          y: mid.y - (g.startMid.y - g.startView.y) * k,
        }),
      );
      return;
    }

    const dx = event.clientX - g.start.x;
    const dy = event.clientY - g.start.y;
    if (!g.moved && Math.hypot(dx, dy) < TAP_SLOP) return;
    g.moved = true;
    if (g.startView.s > 1) {
      setView(clamp({ s: g.startView.s, x: g.startView.x + dx, y: g.startView.y + dy }));
    } else if (g.pointerType === "touch") {
      setView({ s: 1, x: 0, y: Math.max(0, dy) });
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.delete(event.pointerId)) return;
    const g = gesture.current;
    setAnimate(true);

    if (g?.kind === "pinch") {
      const [rest] = [...pointers.current.values()];
      if (rest) {
        // Lifting one finger of a pinch carries on as a pan, never a tap.
        gesture.current = {
          kind: "pan",
          start: rest,
          startView: viewRef.current,
          moved: true,
          onImage: true,
          pointerType: "touch",
        };
        setAnimate(false);
      } else {
        gesture.current = null;
        if (viewRef.current.s < 1.05) setView(FIT);
      }
      return;
    }
    if (!g || pointers.current.size > 0) return;
    gesture.current = null;

    if (g.moved) {
      const v = viewRef.current;
      if (v.s === 1 && v.y > SWIPE_CLOSE_PX) close();
      else if (v.s === 1) setView(FIT);
      return;
    }
    if (event.type === "pointercancel") return;
    if (!g.onImage) {
      // Close on the click that follows, not here. Closing on pointerup lets
      // that click fall through to the page, and if it lands on the inline
      // image's trigger it reopens the lightbox straight away.
      closeOnClick.current = true;
      return;
    }

    const p = fromCenter(event.clientX, event.clientY);
    const v = viewRef.current;
    if (g.pointerType === "touch") {
      const prev = lastTap.current;
      const now = event.timeStamp;
      if (prev && now - prev.t < DOUBLE_TAP_MS && Math.hypot(p.x - prev.p.x, p.y - prev.p.y) < 30) {
        lastTap.current = null;
        if (v.s > 1) setView(FIT);
        else zoomAt(DOUBLE_TAP_ZOOM, p);
      } else {
        lastTap.current = { t: now, p };
      }
      return;
    }
    const next = ZOOM_STEPS.find((step) => step > v.s + 0.01);
    if (next) zoomAt(next, p);
    else setView(FIT);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    const v = viewRef.current;
    const center = { x: 0, y: 0 };
    setAnimate(true);
    if (event.key === "+" || event.key === "=") zoomAt(v.s * 2, center);
    else if (event.key === "-") zoomAt(v.s / 2, center);
    else if (event.key === "0") setView(FIT);
  };

  const atMax = view.s >= MAX_ZOOM - 0.01;
  const imageCursor = atMax ? "cursor-zoom-out" : "cursor-zoom-in";

  return (
    <>
      {/* The image sits inside the button, out of reach of the prose
          `figure > *` margin reset, so it is zeroed here. Otherwise its
          default image margin makes the space around it clickable and
          pushes the caption away. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        className="block w-full cursor-zoom-in [&>img]:m-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {children}
        <span className="sr-only">(open full size)</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onKeyDown={onKeyDown}
        // Escape runs the same flight home as every other way of closing.
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={finishClose}
        data-closing={closing ? "" : undefined}
        className="lightbox not-prose m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/85"
      >
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={() => {
            if (!closeOnClick.current) return;
            closeOnClick.current = false;
            close();
          }}
          className="absolute inset-0 flex touch-none items-center justify-center select-none"
        >
          {mounted && fit ? (
            <div ref={flightRef} style={{ width: fit.w, height: fit.h }}>
              <div
                data-lightbox-image
                className={`relative size-full ${imageCursor}`}
                style={{
                  transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})`,
                  // Promote a layer only while zoomed or mid-gesture. A
                  // permanent one adds a full-size texture to every flight.
                  willChange: view.s > 1 || !animate ? "transform" : undefined,
                  transition: animate ? "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
                }}
              >
                {previewSrc && (flying || !mainReady) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 size-full"
                  />
                ) : null}
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  sizes="100vw"
                  loading="eager"
                  draggable={false}
                  onLoad={(event) => {
                    event.currentTarget
                      .decode()
                      .then(() => setMainReady(true))
                      .catch(() => {});
                  }}
                  className={`relative size-full ${flying ? "invisible" : ""}`}
                />
                {hiRes && !flying ? (
                  <Image
                    src={src}
                    alt=""
                    aria-hidden="true"
                    width={width}
                    height={height}
                    sizes={`${MAX_ZOOM * 100}vw`}
                    draggable={false}
                    onLoad={() => setHiResLoaded(true)}
                    className={`absolute inset-0 size-full transition-opacity duration-200 ${
                      hiResLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          data-lightbox-close
          onClick={close}
          className="absolute top-3 right-3 z-10 inline-flex size-11 touch-manipulation items-center justify-center border border-border bg-card text-foreground transition-[color,opacity] duration-300 hover:text-signal starting:opacity-0 in-data-closing:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">Close image</span>
        </button>
      </dialog>
    </>
  );
}
