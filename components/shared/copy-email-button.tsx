"use client";

import * as React from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type CopyEmailButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const emptySubscribe = () => () => {};

/**
 * Copies `profile.email` instead of using a `mailto:` href scrapers can harvest.
 * Confirmation comes from the single `CopyEmailToast` live region in the layout.
 *
 * Before hydration it is `aria-disabled`, not `disabled`, so the header's only
 * contact control stays in the tab order.
 */
export const CopyEmailButton = React.forwardRef<HTMLButtonElement, CopyEmailButtonProps>(
  ({ onClick, children, className, disabled, ...props }, ref) => {
    const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);
    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      try {
        await navigator.clipboard.writeText(profile.email);
      } catch {
        window.dispatchEvent(new CustomEvent("portfolio:email-copy-failed"));
        return;
      }
      window.dispatchEvent(new CustomEvent("portfolio:email-copied"));
    }

    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={!mounted || undefined}
        className={cn("cursor-pointer aria-disabled:cursor-wait", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
CopyEmailButton.displayName = "CopyEmailButton";
