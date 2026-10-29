import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxImage } from "@/mdx-components";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SystemTopology } from "@/components/shared/system-topology";
import { EngineeringDiagram } from "@/components/shared/engineering-diagram";
import { FullStory } from "@/components/shared/full-story";
import {
  Action,
  Contributed,
  Contribution,
  Contributions,
  Owned,
  Problem,
  Result,
  Scope,
  Story,
  storyAnchor,
  TeamOwned,
} from "@/components/shared/case-study-story";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { ogImage } from "@/lib/metadata";
import { ogCardForProject } from "@/lib/og-content";
import { defaultPublishedDate } from "@/data/projects";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  const { project } = study;
  const path = `/work/${slug}`;
  const card = ogCardForProject(slug);
  const images = card ? [ogImage(path, card)] : undefined;
  // og:type is "article" here, so LinkedIn and other scrapers look for
  // article:published_time. The website-typed pages have no equivalent.
  const publishedTime = project.publishedDate ?? defaultPublishedDate;
  const modifiedTime = project.contentDate ?? publishedTime;
  // No `absolute`, so the root layout's "%s | Rizki Kurniawan" template applies:
  // these are the most-shared pages, and they used to carry no name at all.
  const socialTitle = `${project.seoTitle} | Rizki Kurniawan`;
  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: project.seoDescription,
      type: "article",
      url: path,
      siteName: "Rizki Kurniawan",
      publishedTime,
      modifiedTime,
      authors: ["Rizki Kurniawan"],
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(images ? { images } : {}),
      title: socialTitle,
      description: project.seoDescription,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { project, content } = study;
  const studies = getAllCaseStudies();
  const index = studies.findIndex((entry) => entry.slug === slug);
  const previous = studies[index - 1]?.project;
  const next = studies[index + 1]?.project;
  // Authored Story props are literal strings; keep jump links in step with their titles.
  const storyTitles = Array.from(content.matchAll(/<Story\b[^>]*\btitle="([^"]+)"/g), (match) => match[1]);
  // Rough reading time for the collapsed story: prose words only, tags stripped.
  const storyWords = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const storyMeta = `${storyTitles.length} stories · ~${Math.max(1, Math.round(storyWords / 230))} min read`;
  const url = `https://rizkik.me/work/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: project.seoTitle,
        description: project.seoDescription,
        url,
        mainEntityOfPage: url,
        author: { "@id": "https://rizkik.me/#person" },
        isPartOf: { "@id": "https://rizkik.me/#website" },
        datePublished: project.publishedDate ?? defaultPublishedDate,
        dateModified: project.contentDate ?? project.publishedDate ?? defaultPublishedDate,
        keywords: project.stack,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Work",
            item: "https://rizkik.me/work",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.title,
            item: url,
          },
        ],
      },
    ],
  };

  const story = (
    <>
      <section className="site-shell grid gap-8 pb-12 sm:pb-16 lg:grid-cols-[1fr_1fr]">
        <SystemTopology
          inputs={project.inputs}
          outputs={project.outputs}
          centerLabel={project.type}
          caption="What this system takes in, and what reads from it."
        />
        <div className="bg-card">
          <div className="bg-card p-6">
            <p className="field-label">What I built</p>
            <p className="mt-3 text-lg leading-7">{project.intervention}</p>
          </div>
        </div>
      </section>

      <section className="site-shell pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl border-t border-border">
          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={content}
              components={{
                Story,
                Diagram: EngineeringDiagram,
                Problem,
                Action,
                Result,
                Contributions,
                Contribution,
                Scope,
                Owned,
                Contributed,
                TeamOwned,
                Img: MdxImage,
                img: MdxImage,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="border-b border-border bg-card">
        <div className="site-shell py-12 sm:py-20">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-signal">
            <ArrowLeft className="size-4" /> Complete work archive
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <p className="technical-label">{project.status} / {project.type}</p>
              <h1 className="mt-4 max-w-5xl font-heading text-5xl font-semibold leading-[0.9] tracking-[-0.045em] sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">{project.summary}</p>
            </div>
            <dl className="border-t border-border text-sm">
              <div className="border-b border-border py-3">
                <dt className="field-label">Relationship</dt>
                <dd className="mt-1">{project.relationship} · {project.organization}</dd>
              </div>
              <div className="border-b border-border py-3">
                <dt className="field-label">Role</dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
              <div className="border-b border-border py-3">
                <dt className="field-label">Period</dt>
                <dd className="mt-1">{project.period}</dd>
              </div>
              {project.link ? (
                <div className="border-b border-border py-3">
                  <dt className="field-label">Website</dt>
                  <dd className="mt-1">
                    <a
                      href={project.redirect ? project.redirect : project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {project.link}
                      <ExternalLink className="ml-1.5 inline size-3.5" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    {project.redirect ? <span className="text-muted-foreground"> (archived copy)</span> : null}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </header>

      {project.brief ? (
        <section className="site-shell pt-12 sm:pt-16" aria-labelledby="summary">
          <h2 id="summary" className="font-heading text-3xl font-semibold">Summary</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8">{project.brief}</p>
        </section>
      ) : null}

      <section className="site-shell py-12 sm:py-16" aria-labelledby="at-a-glance">
        <h2 id="at-a-glance" className="font-heading text-3xl font-semibold">At a glance</h2>
        <div className="mt-6 bg-card p-6">
          <ul className="space-y-3">
            {project.glance.map((point) => (
              <li key={point} className="flex gap-3 leading-7">
                <span aria-hidden="true" className="text-signal">&mdash;</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border pt-4 leading-7">
            <span className="field-label">Stack:</span> {project.stack.join(", ")}
          </p>
          {storyTitles.length > 0 ? (
            <nav aria-label="Engineering stories" className="mt-6 border-t border-border pt-4">
              <p className="field-label">Jump to a story</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {storyTitles.map((title) => (
                  <li key={title}><a href={`#${storyAnchor(title)}`} className="text-sm font-semibold text-signal underline underline-offset-4">{title}</a></li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

      {project.brief ? (
        <FullStory meta={storyMeta}>{story}</FullStory>
      ) : story}

      <footer className="border-t border-border bg-card">
        <div className="site-shell flex flex-wrap items-center justify-between gap-6 py-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Other systems I have worked on.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/work">All work <ArrowRight /></Link></Button>
        </div>
        <nav aria-label="Other case studies" className="site-shell grid gap-6 pb-10 sm:grid-cols-2">
          {previous ? (
            <Link href={`/work/${previous.slug}`} rel="prev" aria-label={`Previous case study: ${previous.title}`} className="border-t border-border pt-5 hover:text-signal">
              <span className="field-label">Previous case study</span>
              <span className="mt-2 block font-heading text-2xl font-semibold">{previous.title}</span>
            </Link>
          ) : null}
          {next ? (
            <Link href={`/work/${next.slug}`} rel="next" aria-label={`Next case study: ${next.title}`} className="border-t border-border pt-5 hover:text-signal sm:col-start-2 sm:text-right">
              <span className="field-label">Next case study</span>
              <span className="mt-2 block font-heading text-2xl font-semibold">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </footer>
    </article>
  );
}
