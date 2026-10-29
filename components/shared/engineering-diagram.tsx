"use client";

import { useId, useState, type ReactNode } from "react";

/** Keep one SVG instance so its accessible title and marker IDs stay unique. */
export function EngineeringDiagram({ label, children }: { label: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className="not-prose min-w-0">
      <button
        type="button"
        aria-label={`${expanded ? "Fit diagram" : "Enlarge diagram"}: ${label}`}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((value) => !value)}
        className="mb-3 min-h-11 text-sm font-semibold text-signal underline underline-offset-4"
      >
        {expanded ? "Fit diagram" : "Enlarge diagram"}
      </button>
      {expanded ? <p className="mb-3 text-sm text-muted-foreground">Scroll horizontally to read the diagram. Use the arrow keys when the diagram is focused.</p> : null}
      <div id={id} role="region" aria-label={label} tabIndex={0} className="max-w-full overflow-x-auto">
        <div className={expanded ? "w-[1100px] [&>svg]:h-auto [&>svg]:w-full" : "[&>svg]:h-auto [&>svg]:w-full"}>
          {children}
        </div>
      </div>
    </div>
  );
}
