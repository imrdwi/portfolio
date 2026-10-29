import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { pageCopy } from "@/data/page-copy";
import { stackGroups } from "@/data/stack";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";

export const metadata = createMetadata({
  title: "Resume",
  description: pageCopy.resume.meta,
  path: "/resume",
  card: ogCards.resume(),
});

export default function ResumePage() {
  return (
    <div className="bg-card py-10 sm:py-16 print:bg-white print:py-0">
      <div className="no-print site-shell mb-6 flex flex-wrap justify-end gap-3">
        <Button asChild><a href="/resume.pdf" download="Rizki-Kurniawan-Resume.pdf">Download PDF <Download /></a></Button>
        <Button asChild variant="outline"><CopyEmailButton>Copy email <Mail /></CopyEmailButton></Button>
      </div>

      <article className="print-resume mx-auto max-w-5xl border border-border bg-background p-6 sm:p-10 lg:p-14 print:max-w-none print:border-0 print:p-0">
        <header className="grid gap-7 border-b-2 border-foreground pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="technical-label">Senior Backend Engineer</p>
            <h1 className="mt-3 font-heading text-5xl font-semibold leading-none sm:text-6xl">{profile.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-muted-foreground">{profile.summary}</p>
          </div>
          <address className="space-y-1 text-sm not-italic md:text-right">
            <p>{profile.location}</p>
            <p>{profile.engagementSummary}</p>
            <p><CopyEmailButton className="text-left text-signal">{profile.email}</CopyEmailButton></p>
            <p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/imrdwi<span className="sr-only"> (opens in a new tab)</span></a></p>
            <p><a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/imrdwi<span className="sr-only"> (opens in a new tab)</span></a></p>
          </address>
        </header>

        <section className="border-t border-border py-8">
          <div className="grid gap-8 md:grid-cols-[12rem_1fr] print:grid-cols-1! print:gap-3">
            <h2 className="technical-label">Experience</h2>
            <div className="space-y-9">
              {experiences.filter((entry) => entry.relationship !== "Venture").map((entry) => (
                <article
                  key={entry.organization}
                  className={entry.organization === "Java Multi Mandiri" ? "resume-page-break-before" : undefined}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold">{entry.organization}</h3>
                    <p className="font-mono text-[0.68rem] text-muted-foreground">{entry.period}</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-signal">{entry.functionalScope} · {entry.relationship}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.summary}</p>
                  {entry.assignments ? (
                    <ul className="mt-3 space-y-2 border-l border-border pl-4">
                      {entry.assignments.map((assignment) => (
                        <li key={assignment.name} className="text-sm leading-6">
                          <span className="font-semibold">{assignment.name}</span>
                          <span className="text-muted-foreground"> · {assignment.functionalScope} · {assignment.period}</span>
                          <span className="block text-muted-foreground">{assignment.summary}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-8">
          <div className="grid gap-8 md:grid-cols-[12rem_1fr] print:grid-cols-1! print:gap-3">
            <h2 className="technical-label">Skills</h2>
            <dl className="space-y-3">
              {stackGroups.map((group) => (
                <div key={group.label} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-semibold">{group.resumeLabel ?? group.label}</dt>
                  <dd className="text-muted-foreground">{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <div className="grid gap-8 md:grid-cols-[12rem_1fr] print:grid-cols-1! print:gap-3">
            <h2 className="technical-label">Education</h2>
            <div>
              <h3 className="font-heading text-xl font-semibold">Computer Science &mdash; Software Engineering</h3>
              <p className="text-muted-foreground">Jenderal Soedirman University &middot; Left before completing to work full-time</p>
            </div>
          </div>
        </section>
      </article>


    </div>
  );
}
