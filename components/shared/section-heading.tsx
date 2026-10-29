import * as React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, level = "h2" }: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className="max-w-4xl">
      {eyebrow ? <p className="technical-label">{eyebrow}</p> : null}
      <Heading className="mt-3 text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
