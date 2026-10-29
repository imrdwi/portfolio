import { pageCopy } from "@/data/page-copy";
import { capabilities } from "@/data/experience";
import { getProjectBySlug, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { stackGroups } from "@/data/stack";

export type OgCardContent = {
  eyebrow: string;
  title: string;
  chips: string[];
  note: string;
  alt: string;
};

/**
 * The exact content of every /og card.
 *
 * Both sides read this: the route handler renders it, and `ogImage()` in
 * lib/metadata.ts hashes it into the image URL's `?v=`. That is what replaces
 * the cache-busting hash the old `opengraph-image.tsx` file convention added
 * for free — change any string here and social scrapers see a new URL.
 */
export const ogCards = {
  home: (): OgCardContent => ({
    eyebrow: pageCopy.home.eyebrow,
    title: pageCopy.home.ogTitle,
    chips: ["PHP / Laravel", "Node.js / TypeScript", "Backend-first, full-stack capable"],
    note: pageCopy.home.ogNote,
    alt: pageCopy.home.ogAlt,
  }),
  work: (): OgCardContent => ({
    eyebrow: pageCopy.work.eyebrow,
    title: pageCopy.work.title,
    chips: [
      `${projects.length} case studies`,
      ...Array.from(new Set(projects.map((project) => project.relationship))),
    ],
    note: pageCopy.work.ogNote,
    alt: pageCopy.work.ogAlt,
  }),
  experience: (): OgCardContent => ({
    eyebrow: pageCopy.experience.eyebrow,
    title: pageCopy.experience.title,
    chips: capabilities.slice(0, 4).map(([label]) => label),
    note: pageCopy.experience.ogNote,
    alt: pageCopy.experience.ogAlt,
  }),
  stack: (): OgCardContent => ({
    eyebrow: pageCopy.stack.eyebrow,
    title: pageCopy.stack.title,
    chips: [
      ...stackGroups[0].items.slice(0, 2),
      ...stackGroups.slice(1).map((group) => group.items[0]),
    ].slice(0, 7),
    note: pageCopy.stack.ogNote,
    alt: pageCopy.stack.ogAlt,
  }),
  resume: (): OgCardContent => ({
    eyebrow: pageCopy.resume.eyebrow,
    title: pageCopy.resume.title,
    chips: stackGroups.map((group) => group.resumeLabel ?? group.label).slice(0, 6),
    note: pageCopy.resume.ogNote,
    alt: pageCopy.resume.ogAlt,
  }),
  contact: (): OgCardContent => ({
    eyebrow: pageCopy.contact.eyebrow,
    title: pageCopy.contact.title,
    chips: [profile.email, "linkedin.com/in/imrdwi", "github.com/imrdwi"],
    note: pageCopy.contact.ogNote,
    alt: pageCopy.contact.ogAlt,
  }),
};

export function ogCardForProject(slug: string): OgCardContent | null {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  return {
    eyebrow: `Backend case study / ${project.title}`,
    title: project.ogTitle,
    chips: project.stack.slice(0, project.ogEvidence ? 4 : 6),
    note: project.ogEvidence ?? `${project.type} / ${project.period}`,
    alt: `${project.title}: ${project.ogTitle} by Rizki Kurniawan`,
  };
}
