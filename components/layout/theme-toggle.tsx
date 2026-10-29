"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

const options = [
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <div
      className="flex h-11 items-center border border-border bg-background p-0.5"
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ value, label, icon: Icon }) => {
        // resolvedTheme, not theme: until someone picks a side the stored value is
        // "system", and reading that directly would leave neither button pressed
        // even though the page is visibly one or the other.
        const selected = mounted && resolvedTheme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={selected}
            title={label}
            disabled={!mounted}
            onClick={() => setTheme(value)}
            className="inline-flex size-10 touch-manipulation items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-inset disabled:cursor-wait aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
