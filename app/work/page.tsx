import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import Link from "next/link";
import { projects } from "@/data/projects";
import { publicRepos } from "@/data/public-code";
import { pageCopy } from "@/data/page-copy";
import { createMetadata } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";

export const metadata = createMetadata({
  title: "Backend Engineering Work",
  description: pageCopy.work.meta,
  path: "/work",
  card: ogCards.work(),
});

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://rizkik.me/work#collection",
    name: "Backend engineering case studies by Rizki Kurniawan",
    description: "Case studies covering CRM integration reliability, payment concurrency, search synchronization, warehouse workflows, and an ERP migration onto Odoo.",
    url: "https://rizkik.me/work",
    isPartOf: { "@id": "https://rizkik.me/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.seoTitle,
        url: `https://rizkik.me/work/${project.slug}`,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="border-b border-border bg-card">
        <div className="site-shell py-12 sm:py-16">
          <SectionHeading
            level="h1"
            eyebrow={pageCopy.work.eyebrow}
            title={pageCopy.work.title}
            description={pageCopy.work.description}
          />
        </div>
      </section>
      <section className="site-shell py-8 sm:py-12">
        <div className="mb-8 flex flex-wrap justify-between gap-3 border-b border-border pb-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
          <span>{projects.length} projects</span>
        </div>
        <div className="border-b border-border">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel="h2"
              variant={project.featured ? "featured" : "compact"}
            />
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-card" aria-labelledby="public-code">
        <div className="site-shell py-12 sm:py-16">
          <p className="technical-label">Public code</p>
          <h2 id="public-code" className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Code you can read.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Client source stays private. The rebuilds here are written from scratch with fictional data and contain no client code.
          </p>
          <ul className="mt-8 border-b border-border">
            {publicRepos.map((repo) => (
              <li key={repo.name} className="grid gap-2 border-t border-border py-5 sm:grid-cols-[13rem_minmax(0,1fr)_11rem] sm:items-baseline sm:gap-5 sm:px-4">
                <a href={repo.href} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-semibold hover:text-signal">
                  {repo.name}
                  <span className="sr-only"> on GitHub (opens in a new tab)</span>
                </a>
                <p className="leading-7 text-muted-foreground">{repo.summary}</p>
                {repo.related ? (
                  <Link href={repo.related.href} className="whitespace-nowrap text-sm font-semibold text-signal underline sm:justify-self-end decoration-1 underline-offset-4 hover:decoration-2">
                    {repo.related.label}
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
