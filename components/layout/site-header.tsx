"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import * as React from "react";
import { profile } from "@/data/profile";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { RkMonogram } from "./rk-monogram";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Experience", href: "/experience" },
  { name: "Stack", href: "/stack" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="site-shell flex h-16 items-center justify-between" aria-label="Primary navigation">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Rizki Kurniawan, home"
          className="group flex items-center text-foreground transition-colors hover:text-signal"
        >
          <RkMonogram />
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="block border-l border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-signal"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <CopyEmailButton className="hidden h-9 items-center border border-signal px-3 text-sm font-semibold text-signal transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex">
            {profile.email}
            <span className="sr-only"> (click to copy)</span>
          </CopyEmailButton>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 touch-manipulation items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden">
          <ul className="site-shell divide-y divide-border py-2">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-12 items-center justify-between py-3 font-heading text-lg font-semibold aria-[current=page]:text-signal"
                  >
                    {item.name}
                    <span aria-hidden="true">/</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <CopyEmailButton className="flex min-h-12 w-full items-center py-3 text-left font-semibold text-signal">
                {profile.email}
              </CopyEmailButton>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
