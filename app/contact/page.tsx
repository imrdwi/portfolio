import { ExternalLink, Mail } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { profile } from "@/data/profile";
import { pageCopy } from "@/data/page-copy";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";

export const metadata = createMetadata({
  title: "Contact",
  description: pageCopy.contact.meta,
  path: "/contact",
  card: ogCards.contact(),
});

export default function ContactPage() {
  return (
    <div className="site-shell grid min-h-[calc(100svh-4rem)] gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
      <SectionHeading
        level="h1"
        eyebrow={pageCopy.contact.eyebrow}
        title={pageCopy.contact.title}
        description={pageCopy.contact.description}
      />
      <div className="border-b border-border">
        <CopyEmailButton className="group flex w-full items-center justify-between gap-4 border-t border-border py-7 text-left hover:text-signal">
          <span>
            <span className="field-label">Copy email</span>
            <span className="mt-2 block font-heading text-2xl font-semibold">{profile.email}</span>
          </span>
          <Mail className="size-6" aria-hidden="true" />
        </CopyEmailButton>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-t border-border py-7 hover:text-signal">
          <span>
            <span className="field-label">LinkedIn</span>
            <span className="mt-2 block font-heading text-2xl font-semibold">in/imrdwi</span>
            <span className="sr-only">opens in a new tab</span>
          </span>
          <ExternalLink className="size-6" aria-hidden="true" />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-t border-border py-7 hover:text-signal">
          <span>
            <span className="field-label">GitHub</span>
            <span className="mt-2 block font-heading text-2xl font-semibold">imrdwi</span>
            <span className="sr-only">opens in a new tab</span>
          </span>
          <ExternalLink className="size-6" aria-hidden="true" />
        </a>
        <div className="border-t border-border py-7">
          <p className="field-label">Availability</p>
          <p className="mt-2 leading-7 text-muted-foreground">{profile.availability}</p>
        </div>
        {profile.engagementDetails.map(([label, value]) => (
          <div key={label} className="border-t border-border py-7">
            <p className="field-label">{label}</p>
            <p className="mt-2 leading-7 text-muted-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
