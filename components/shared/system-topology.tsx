interface SystemTopologyProps {
  inputs: readonly string[];
  outputs: readonly string[];
  centerLabel?: string;
  caption?: string;
}

export function SystemTopology({
  inputs,
  outputs,
  centerLabel = "Normalize / validate",
  caption = "What this system reads in, and what reads from it.",
}: SystemTopologyProps) {
  return (
    <figure className="control-surface blueprint-grid relative overflow-hidden p-4 sm:p-6">
      <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2" role="group" aria-label="Inputs">
          <p className="field-label inline-block bg-card pr-2">Inputs</p>
          {inputs.map((input) => (
            <div key={input} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
              {input}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 md:flex-col">
          <div className="max-w-44 border-2 border-signal bg-background px-4 py-3 text-center font-heading text-base font-semibold text-signal">
            {centerLabel}
          </div>
        </div>

        <div className="space-y-2" role="group" aria-label="Outputs">
          <p className="field-label inline-block bg-card pr-2">Outputs</p>
          {outputs.map((output) => (
            <div key={output} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
              {output}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="relative z-10 mt-5 border-t border-border bg-card pt-3 text-xs leading-5 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
