import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";
import { stackGroups } from "@/data/stack";
import { pageCopy } from "@/data/page-copy";

export const metadata = createMetadata({
  title: "Technical Stack",
  description: pageCopy.stack.meta,
  path: "/stack",
  card: ogCards.stack(),
});

export default function StackPage() {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="site-shell py-16 sm:py-24">
          <SectionHeading
            level="h1"
            eyebrow={pageCopy.stack.eyebrow}
            title={pageCopy.stack.title}
            description={pageCopy.stack.description}
          />
        </div>
      </section>
      <section className="site-shell py-12 sm:py-20">
        <div className="border-b border-border">
          {stackGroups.map((group) => (
            <article key={group.label} className="grid border-t border-border py-8 lg:grid-cols-[15rem_1fr_15rem] lg:gap-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold">{group.label}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p>
              </div>
              <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:mt-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    // An odd-length list would leave the container's bg-border showing
                    // through the empty half-row, which reads as a filled cell rather
                    // than whitespace. Let the last item close the row instead.
                    className="bg-card px-4 py-3 font-mono text-xs sm:[&:nth-child(odd):last-child]:col-span-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 lg:mt-0">
                <p className="field-label">Evidence</p>
                <ul className="mt-3 space-y-2">
                  {group.evidence.map((item) => (
                    <li key={item.href}><Link href={item.href} className="text-sm font-semibold text-signal hover:underline">{item.label} →</Link></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-constraint pl-6">
          <p className="technical-label text-constraint">Exploration, not production depth</p>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">I&apos;m currently exploring Go and Rust, but they&apos;re not included above because I haven&apos;t used them in production yet.</p>
        </div>
      </section>
    </div>
  );
}
