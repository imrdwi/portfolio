import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExperienceTimeline } from "@/components/shared/experience-timeline";
import { SectionHeading } from "@/components/shared/section-heading";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { capabilities } from "@/data/experience";
import { profile } from "@/data/profile";
import { pageCopy } from "@/data/page-copy";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";

export const metadata = createMetadata({
  title: "Experience",
  description: pageCopy.experience.meta,
  path: "/experience",
  card: ogCards.experience(),
});

export default function ExperiencePage() {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="site-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionHeading
            level="h1"
            eyebrow={pageCopy.experience.eyebrow}
            title={pageCopy.experience.title}
            description={pageCopy.experience.description}
          />
          <div className="border-l-2 border-signal pl-6">
            <p className="field-label text-signal">How I work</p>
            <p className="mt-4 text-xl leading-8">
              I trace the current behavior before changing it, keep existing configuration working, and check the result in production after release.
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 sm:py-24">
        <h2 className="field-label">About</h2>
        <div className="mt-5 max-w-3xl space-y-5 text-lg leading-8 text-muted-foreground">
          <p>
            I care about clean code and good abstractions, but I would rather leave something understandable and appropriate to the codebase than add complexity to make it look clever.
          </p>
          <p>
            Backend is where I have stayed because the problems hold my attention longer: how data moves through a system, how services talk to each other, how business rules get represented, and what happens when something fails. I like taking a messy requirement and turning it into something predictable that the rest of the system can rely on.
          </p>
          <p>
            Since joining SoftwareSeni in 2021, my scope has grown. On MyChatLab in 2021 I was the junior engineer on an established team, raising issues for other people to pick up. At Leadplus I led solution planning for Realty+ and the Attachment Service, with other engineers reviewing the designs before implementation. On Funraisin I review the team&apos;s pull requests and carry release feedback back to the pod.
          </p>
          <p>
            Outside work, it is family, some gaming, and a homelab. The homelab is the least convincing example of not working, since it is still Linux servers, Docker containers, networking things together, and breaking something so I have to work out how to fix it.
          </p>
        </div>
      </section>

      <section className="site-shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="field-label">Engineering profile</h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-muted-foreground">
            <p>{profile.positioning}</p>
            <p>
              Most of my work has been client assignments, so I have joined existing codebases cold more often than I have started new ones, and taken assigned work through planning, implementation, review, and release. On each assignment the first job is working out which constraints are fixed and which are open. The revenue rules at e-PNBP and the established fundraising defaults at Funraisin had to stay as they were. The token contract and the matched-giving calculation were the parts I could change.
            </p>
            <p>
              My deepest production stack is PHP and Laravel, supported by Node.js and TypeScript for integration-heavy services. I also work across React, Vue, and server-rendered interfaces when a feature needs both backend and frontend changes.
            </p>
          </div>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {capabilities.map(([label, value]) => (
            <div key={label} className="bg-card p-6">
              <p className="field-label">{label}</p>
              <p className="mt-3 leading-7">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="section-rule scroll-mt-16 bg-card">
        <div className="site-shell py-16 sm:py-24">
          <SectionHeading
            title="Employment and client assignments."
            description="SoftwareSeni assignments are nested under one employer. Direct freelance work is listed separately."
          />
          <div className="mt-10"><ExperienceTimeline /></div>
        </div>
      </section>

      <section className="site-shell flex flex-wrap items-center justify-between gap-6 py-14">
        <h2 className="font-heading text-3xl font-semibold">Case studies for the assignments above.</h2>
        <div className="flex gap-3">
          <Button asChild><Link href="/work">View work</Link></Button>
          <Button asChild variant="outline"><CopyEmailButton>Copy email</CopyEmailButton></Button>
        </div>
      </section>
    </div>
  );
}
