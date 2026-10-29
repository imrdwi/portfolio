"use client";

import * as React from "react";
import { profile } from "@/data/profile";

/** One app-level live region for every email-copy action. */
export function CopyEmailToast() {
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let timeout: number | undefined;

    function showToast(event: Event) {
      const failed = event.type === "portfolio:email-copy-failed";
      window.clearTimeout(timeout);
      setMessage(failed
        ? `Could not copy. Select ${profile.email} and copy it manually.`
        : `Copied ${profile.email} to clipboard`);
      timeout = window.setTimeout(() => setMessage(null), failed ? 8000 : 2000);
    }

    window.addEventListener("portfolio:email-copied", showToast);
    window.addEventListener("portfolio:email-copy-failed", showToast);
    return () => {
      window.removeEventListener("portfolio:email-copied", showToast);
      window.removeEventListener("portfolio:email-copy-failed", showToast);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!message) return null;

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4">
      <span className="pointer-events-auto select-text border border-signal bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-lg">
        {message}
      </span>
    </div>
  );
}
