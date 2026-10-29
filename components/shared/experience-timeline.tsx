import Link from "next/link";
import { experiences } from "@/data/experience";

interface ExperienceTimelineProps {
  limit?: number;
}

export function ExperienceTimeline({ limit }: ExperienceTimelineProps) {
  const entries = limit ? experiences.slice(0, limit) : experiences;

  return (
    <div className="border-b border-border">
      {entries.map((experience) => (
        <article key={experience.organization} className="grid border-t border-border py-7 md:grid-cols-[13rem_1fr] md:gap-8">
          <div>
            <p className="field-label">{experience.relationship}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{experience.period}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="font-heading text-2xl font-semibold">{experience.organization}</h3>
            <p className="mt-1 text-sm font-semibold text-signal">{experience.functionalScope}</p>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{experience.summary}</p>

            {experience.assignments ? (
              <div className="mt-6 border-l border-border">
                {experience.assignments.map((assignment) => (
                  <div key={`${experience.organization}-${assignment.name}`} className="border-t border-border px-4 py-4 first:border-t-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      {assignment.slug ? (
                        <Link href={`/work/${assignment.slug}`} className="font-heading text-lg font-semibold hover:text-signal">
                          {assignment.name}
                        </Link>
                      ) : (
                        <h4 className="font-heading text-lg font-semibold">{assignment.name}</h4>
                      )}
                      <span className="font-mono text-[0.68rem] text-muted-foreground">{assignment.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-foreground">{assignment.functionalScope}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{assignment.summary}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
