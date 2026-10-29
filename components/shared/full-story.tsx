"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Collapses a case study's full story behind a disclosure. Story jump links
 * and deep links (#story-…) still land: any hash that targets an element
 * inside the disclosure opens it first, so the browser can scroll to it.
 */
export function FullStory({ meta, children }: { meta: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const reveal = (hash: string) => {
      if (!hash || hash === "#") return false;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target || !details.contains(target)) return false;
      details.open = true;
      return true;
    };

    if (reveal(window.location.hash)) {
      requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
    }

    // Capture phase, so the disclosure is open before the browser scrolls.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (link) reveal(link.getAttribute("href")!);
    };
    const onHashChange = () => {
      if (reveal(window.location.hash)) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <details ref={ref} className="group pb-4">
      <summary className="site-shell block cursor-pointer list-none hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal [&::-webkit-details-marker]:hidden">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border py-5">
          <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-signal transition-transform group-open:rotate-90" />
          <span className="font-heading text-2xl font-semibold">
            <span className="group-open:hidden">Read the full case study</span>
            <span className="hidden group-open:inline">Full case study</span>
          </span>
          <span className="text-sm text-muted-foreground sm:ml-auto">{meta}</span>
        </span>
      </summary>
      <div className="pt-12 sm:pt-16">{children}</div>
    </details>
  );
}
