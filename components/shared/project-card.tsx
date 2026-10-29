import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StackBadge } from "@/components/shared/stack-badge";

interface ProjectCardProps {
  project: Project;
  headingLevel?: "h2" | "h3";
  variant?: "default" | "featured" | "compact";
}

export function ProjectCard({ project, headingLevel = "h3", variant = "default" }: ProjectCardProps) {
  const Heading = headingLevel;
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  const padding = isFeatured
    ? "py-10 pl-4 pr-0 sm:pl-10 sm:pr-4"
    : isCompact
      ? "py-5 px-0 sm:px-4"
      : "py-7 px-0 sm:px-4";

  return (
    <article
      className={`group border-t border-border transition-colors focus-within:bg-card hover:bg-card${
        isFeatured ? " border-l-2 border-l-signal" : ""
      }`}
    >
      <Link
        href={`/work/${project.slug}`}
        className={`grid gap-5 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)_auto] sm:items-start ${padding}`}
      >
        <div>
          <p className="field-label">{project.status} / {project.period}</p>
          <Heading
            className={`mt-2 font-heading font-semibold leading-tight group-hover:text-signal ${
              isFeatured ? "text-3xl" : "text-2xl"
            }`}
          >
            {project.title}
          </Heading>
          <p className="mt-1 text-sm text-muted-foreground">{project.organization} · {project.role}</p>
        </div>
        <div>
          {!isCompact && <p className="leading-7 text-muted-foreground">{project.intervention}</p>}
          <p className={`text-base leading-7 text-foreground${isCompact ? "" : " mt-3"}`}>
            <span className="field-label">Evidence: </span>{project.evidence}
          </p>
          {isFeatured && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((item) => (
                <StackBadge key={item}>{item}</StackBadge>
              ))}
            </div>
          )}
        </div>
        <span
          className={`flex items-center gap-1.5 whitespace-nowrap font-semibold ${
            isFeatured ? "text-signal" : "text-muted-foreground group-hover:text-signal"
          }`}
        >
          Read the case study
          <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
