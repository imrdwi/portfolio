import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/data/projects";
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
    </div>
  );
}
