import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyEmailButton } from "@/components/shared/copy-email-button";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-card">
      <div className="site-shell grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="field-label">Direct channel</p>
          <CopyEmailButton className="mt-3 inline-block text-left font-heading text-2xl font-semibold text-foreground underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
            {profile.email}
          </CopyEmailButton>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Open to remote Senior Backend Engineer roles.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/resume" className="hover:text-signal">Resume</Link>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
            LinkedIn <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" /> <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
            GitHub <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" /> <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="site-shell flex flex-wrap justify-between gap-2 py-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
          <span>Yogyakarta, Indonesia</span>
          <span>© {new Date().getFullYear()} Rizki Kurniawan</span>
        </div>
      </div>
    </footer>
  );
}
