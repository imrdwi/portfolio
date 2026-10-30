import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { profile } from "@/data/profile";
import { pageCopy } from "@/data/page-copy";
import { featuredProjects } from "@/data/projects";
import { assignmentStrip, experiences, homeAssignments } from "@/data/experience";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";

export const metadata = createMetadata({
  title: "Senior Backend Engineer",
  absoluteTitle: "Rizki Kurniawan | Senior Backend Engineer",
  description: profile.seoDescription,
  path: "/",
  card: ogCards.home(),
});

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://rizkik.me/#website",
        name: "Rizki Kurniawan",
        url: "https://rizkik.me",
        description: profile.seoDescription,
        publisher: { "@id": "https://rizkik.me/#person" },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://rizkik.me/#profile",
        name: "Rizki Kurniawan | Senior Backend Engineer",
        url: "https://rizkik.me",
        isPartOf: { "@id": "https://rizkik.me/#website" },
        mainEntity: { "@id": "https://rizkik.me/#person" },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="border-b border-border">
        <div className="site-shell grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-signal">{profile.name}</span>
              <span>{profile.location}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-heading text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
              {pageCopy.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-8 lg:text-xl lg:leading-8">
              {profile.headline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#selected-work">View case studies <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/resume">Resume <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <CopyEmailButton>Copy email <Mail /></CopyEmailButton>
              </Button>
            </div>
          </div>

          <aside className="border border-border bg-card" aria-label="Current role and technical profile">
            <div className="border-b border-border p-6 sm:p-7">
              <p className="field-label">Current employer</p>
              <p className="mt-3 font-heading text-3xl font-semibold">{experiences[0].organization}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{experiences[0].period}</p>
            </div>
            <div className="border-b border-border p-6 sm:p-7">
              <p className="field-label">Current client assignment</p>
              <p className="mt-3 font-heading text-3xl font-semibold">{homeAssignments[0].name}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{homeAssignments[0].period}</p>
            </div>
            <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                ["Experience", `${profile.experienceYears} years`],
                ["Stack", "PHP / Laravel, Node.js / TypeScript"],
                ["Focus", "Backend-first, full-stack capable"],
                ["Engagement", "Full-time / contract / freelance"],
              ].map(([label, value]) => (
                <div key={label} className="bg-card p-6 sm:p-7">
                  <dt className="field-label">{label}</dt>
                  <dd className="mt-3 text-lg font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="site-shell flex flex-col gap-3 py-4 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="shrink-0 whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.14em] text-signal">
            {experiences[0].organization} {experiences[0].period.replace(" - ", "–")}
          </p>
          <ul aria-label={`${experiences[0].organization} assignments`} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {assignmentStrip.map((assignment) => (
              <li key={assignment.name} className="whitespace-nowrap">
                <span className="font-semibold">{assignment.name}</span>{" "}
                <span className="font-mono text-xs text-muted-foreground">{assignment.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="selected-work" className="section-rule scroll-mt-16 bg-card">
        <div className="site-shell py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title="Selected production systems."
              description="Payment concurrency at Funraisin and CRM integration reliability at Leadplus: the failures, decisions, and results."
            />
            <Link href="/work" className="font-semibold text-signal underline decoration-1 underline-offset-4 hover:decoration-2">
              Complete work archive
            </Link>
          </div>
          <div className="mt-10 border-b border-border">
            {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section className="site-shell border-t border-border py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* The hero card and the assignment strip already name SoftwareSeni and Funraisin. */}
          <p className="max-w-2xl text-lg leading-7 text-muted-foreground">
            Freelance engagements, earlier employment, and how I work.
          </p>
          <Link href="/experience#experience" className="whitespace-nowrap font-semibold text-signal underline decoration-1 underline-offset-4 hover:decoration-2">
            Full experience →
          </Link>
        </div>
      </section>
    </div>
  );
}
