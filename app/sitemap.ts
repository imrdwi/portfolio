import type { MetadataRoute } from "next";
import { pageCopy, type PageCopy, type PageKey } from "@/data/page-copy";
import { projects } from "@/data/projects";

/**
 * Fallback `lastModified` for anything without its own `contentDate`.
 *
 * ISO 8601 with an offset rather than a bare date, so the timestamp is
 * unambiguous to crawlers instead of being read as midnight UTC.
 */
const defaultContentDate = "2026-09-04T23:25:21+07:00";

// pageCopy is `as const satisfies`, which keeps literal types for the OG cards
// but hides absent optional fields; read it through the wider type here.
const copy: Record<PageKey, PageCopy> = pageCopy;

function lastModified(contentDate?: string) {
  return new Date(contentDate ?? defaultContentDate);
}

const staticPages: Array<{ path: string; key: PageKey; priority: number }> = [
  { path: "", key: "home", priority: 1 },
  { path: "/work", key: "work", priority: 0.9 },
  { path: "/experience", key: "experience", priority: 0.8 },
  { path: "/resume", key: "resume", priority: 0.8 },
  { path: "/stack", key: "stack", priority: 0.7 },
  { path: "/contact", key: "contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rizkik.me";

  return [
    ...staticPages.map(({ path, key, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: lastModified(copy[key].contentDate),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: lastModified(project.contentDate),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.85 : 0.7,
    })),
  ];
}
