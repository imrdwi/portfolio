import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { monogramDots, monogramPath, monogramViewBox } from "@/components/layout/rk-monogram";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Bump when the card's LAYOUT changes rather than its text.
 *
 * `ogImage()` hashes card content into the image URL, but content-only hashing
 * cannot see a template edit: dropping the wordmark or resizing the monogram
 * leaves every string identical, so scrapers would keep serving the old PNG.
 * This constant is mixed into that hash.
 */
export const ogTemplateVersion = 3;

const FONT_DIR = join(process.cwd(), "assets", "fonts");

// Satori has no system fonts and cannot read the site's next/font output, so the
// card's typefaces are loaded from committed TTFs. Without this the card falls
// back to whatever the build image provides, which is not the site's Barlow.
let fontCache: Promise<Array<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }>> | null = null;

export function ogFonts() {
  fontCache ??= Promise.all([
    readFile(join(FONT_DIR, "BarlowSemiCondensed-600.ttf")),
    readFile(join(FONT_DIR, "BarlowSemiCondensed-700.ttf")),
    readFile(join(FONT_DIR, "SourceSans3-400.ttf")),
  ]).then(([barlow600, barlow700, source400]) => [
    { name: "Barlow Semi Condensed", data: barlow600, weight: 600 as const, style: "normal" as const },
    { name: "Barlow Semi Condensed", data: barlow700, weight: 700 as const, style: "normal" as const },
    { name: "Source Sans 3", data: source400, weight: 400 as const, style: "normal" as const },
  ]);
  return fontCache;
}

/** Renders an OgCard as a PNG response. Every /og route handler goes through this. */
export async function ogResponse(card: React.ReactElement) {
  return new ImageResponse(card, { ...ogSize, fonts: await ogFonts() });
}

const color = {
  background: "#081016",
  foreground: "#edf5f3",
  signal: "#65dccb",
  border: "#2b4450",
  muted: "#a8b7ba",
  onSignal: "#071411",
};

// Satori has no text measurement, so the headline scale is picked from length.
// Thresholds are tuned for Barlow Semi Condensed 700 at letterSpacing -2 across
// the card's 1000px text column; re-check them if the display face changes.
function titleSize(title: string) {
  if (title.length <= 30) return 86;
  if (title.length <= 52) return 70;
  if (title.length <= 78) return 58;
  if (title.length <= 104) return 48;
  return 40;
}

type OgCardProps = {
  /** Mirrors the page's eyebrow / section label. */
  eyebrow: string;
  /** Mirrors the page's own h1. */
  title: string;
  /** Short factual labels taken from the page body. */
  chips?: string[];
  /** Footer line, specific to the page. */
  note: string;
};

export function OgCard({ eyebrow, title, chips = [], note }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: color.background,
        color: color.foreground,
        padding: "64px 72px",
        fontFamily: "Source Sans 3",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg
            viewBox={monogramViewBox}
            width={59}
            height={36}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={monogramPath}
              stroke={color.foreground}
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {monogramDots.map((dot) => (
              <rect key={`${dot.x}-${dot.y}`} x={dot.x} y={dot.y} width="3" height="3" fill={color.signal} />
            ))}
          </svg>
          <span style={{ fontFamily: "Barlow Semi Condensed", fontWeight: 600, fontSize: 32 }}>{profile.name}</span>
        </div>
        <div style={{ display: "flex", color: color.signal, fontSize: 22 }}>
          {profile.title.toUpperCase()}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
        <div
          style={{
            display: "flex",
            color: color.signal,
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Barlow Semi Condensed",
            fontSize: titleSize(title),
            lineHeight: 1.0,
            fontWeight: 700,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        {chips.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
            {chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  border: `1px solid ${color.border}`,
                  padding: "10px 16px",
                  color: color.muted,
                  fontSize: 20,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${color.border}`,
          paddingTop: 26,
          color: color.muted,
          fontSize: 22,
        }}
      >
        <span style={{ maxWidth: 870 }}>{note}</span>
        <span style={{ flexShrink: 0, marginLeft: 24 }}>rizkik.me</span>
      </div>
    </div>
  );
}
