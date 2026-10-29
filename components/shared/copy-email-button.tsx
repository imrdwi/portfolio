"use client";

import * as React from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type CopyEmailButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const emptySubscribe = () => () => {};

/**
 * Renders as a plain button and copies `profile.email` to the clipboard
 * instead of opening a `mailto:` link, so the address isn't sitting in a
 * `mailto:` href for scrapers to harvest. Confirms with a toast rather than
 * `window.alert`, which would block the page.
 *
 * Confirmation is rendered once by `CopyEmailToast` in the root layout. A
 * page can contain several email buttons, but it must never expose several
 * live regions announcing the same successful copy action.
 *
 * Before hydration there is no click handler, so the button is marked
 * `aria-disabled` rather than `disabled`: a real `disabled` attribute in the
 * server HTML drops the header's only contact control out of the tab order,
 * which is the one control that always has to be reachable.
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
