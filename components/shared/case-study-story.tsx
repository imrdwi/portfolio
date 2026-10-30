/**
 * Shared case-study content primitives, used by the case-study route so every
 * project presents its engineering stories with the same three beats and its
 * secondary work in the same compact form.
 *
 * IMPORTANT - why these take children and string props only:
 * next-mdx-remote v6 defaults to `blockJS: true`, whose remark plugin strips all
 * JavaScript expressions from MDX, explicitly including JSX attribute expressions
 * (`<Component prop={value} />`). Array or JSX-valued props are silently dropped
 * and arrive as undefined. Rather than disable that hardening for content this app
 * renders, every prop here is a plain string and all content comes through
 * children. Do not reintroduce `prop={...}` in the MDX.
 */
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Story ---- */

export function storyAnchor(title: string) {
  return `story-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function Story({
  title,
  capability,
  children,
}: {
  title: string;
  capability?: string;
  children?: ReactNode;
}) {
  return (
    <section className="not-prose mt-10 border-t border-border pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={storyAnchor(title)} tabIndex={-1} className="scroll-mt-24 font-heading text-xl font-semibold tracking-[-0.015em] text-foreground">{title}</h3>
        {capability ? <p className="field-label">{capability}</p> : null}
      </div>
      {/* Figures sit under not-prose, so the typography caption treatment
          does not reach them. Mirror prose-lg figcaption exactly (16px/1.5,
          captions token) so story captions read the same as the overview. */}
      <div className="mt-4 grid gap-px bg-border [&_figure]:bg-background [&_figure]:py-5 [&_figcaption]:mt-4 [&_figcaption]:text-base [&_figcaption]:leading-6 [&_figcaption]:text-(--tw-prose-captions)">{children}</div>
    </section>
  );
}

function Beat({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="grid gap-1 bg-background py-3 sm:grid-cols-[5.5rem_1fr] sm:gap-5">
      <p className="field-label pt-1">{label}</p>
      <div className="leading-7 text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:text-foreground [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a:hover]:text-signal [&_code]:text-foreground [&_p]:my-0 [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}

/** What was going wrong, or the constraint that existed. */
export function Problem({ children }: { children?: ReactNode }) {
  return <Beat label="Problem">{children}</Beat>;
}

/** What was investigated, designed, or changed. */
export function Action({ children }: { children?: ReactNode }) {
  return <Beat label="Action">{children}</Beat>;
}

/** What behaviour changed. No invented metrics. */
export function Result({ children }: { children?: ReactNode }) {
  return <Beat label="Result">{children}</Beat>;
}

/* -------------------------------------------------------- Contributions ---- */

export function Contributions({ children }: { children?: ReactNode }) {
  return (
    <ul className="not-prose mt-6 grid list-none gap-px border border-border bg-border p-0 sm:grid-cols-2">
      {children}
    </ul>
  );
}

export function Contribution({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <li className="m-0 bg-background p-4">
      <p className="field-label">{label}</p>
      <div className="mt-2 text-sm leading-6 text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-0">
        {children}
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- Scope ---- */

export function Scope({ children }: { children?: ReactNode }) {
  return <div className="not-prose mt-6 grid gap-px bg-border">{children}</div>;
}

function ScopeBlock({
  label,
  tone = "default",
  children,
}: {
  label: string;
  tone?: "default" | "muted" | "constraint";
  children?: ReactNode;
}) {
  const marker =
    tone === "default" ? "before:bg-signal" : tone === "muted" ? "before:bg-border" : "before:bg-constraint";

  return (
    <div className="bg-background py-4">
      <p className={`field-label ${tone === "constraint" ? "text-constraint" : ""}`}>{label}</p>
      <div
        className={`mt-2 leading-7 ${tone === "default" ? "" : "text-muted-foreground"} [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:h-px [&_li]:before:w-3 [&_p]:m-0 [&_ul]:m-0 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-1.5 [&_ul]:p-0 ${marker}`}
      >
        {children}
      </div>
    </div>
  );
}

export function Owned({ children }: { children?: ReactNode }) {
  return <ScopeBlock label="I owned">{children}</ScopeBlock>;
}

export function Contributed({ children }: { children?: ReactNode }) {
  return (
    <ScopeBlock label="I contributed to" tone="muted">
      {children}
    </ScopeBlock>
  );
}

export function TeamOwned({ children }: { children?: ReactNode }) {
  return (
    <ScopeBlock label="Team-owned" tone="constraint">
      {children}
    </ScopeBlock>
  );
}
