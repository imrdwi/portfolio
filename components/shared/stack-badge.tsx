import * as React from "react";

interface StackBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export function StackBadge({ children, variant = "default" }: StackBadgeProps) {
  return (
    <span
      className={`inline-flex border px-2 py-1 font-mono text-[0.68rem] font-medium leading-none ${
        variant === "accent"
          ? "border-signal text-signal"
          : "border-border text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}
