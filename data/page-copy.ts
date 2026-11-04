import { profile } from "./profile";

/**
 * Headline copy for each page, shared by the page and its /og card.
 * `meta` is the SEO description, `description` the on-page standfirst, and
 * `ogTitle` a shorter card headline when needed.
 */
export type PageCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  meta: string;
  ogTitle?: string;
  ogNote: string;
  ogAlt: string;
  /** Last material content change (ISO 8601 with offset), for the sitemap. */
  contentDate?: string;
};

export const pageCopy = {
  home: {
    contentDate: "2026-10-31T00:00:00+07:00",
    eyebrow: `${profile.experienceYears} years / ${profile.location}`,
    title: "Senior Backend Engineer building reliable payment, integration, and data systems",
    ogTitle: "Building reliable payment, integration, and data systems",
    meta: profile.seoDescription,
    ogNote: profile.availability,
    ogAlt: "Rizki Kurniawan - Senior Backend Engineer",
  },
  work: {
    contentDate: "2026-10-31T00:00:00+07:00",
    eyebrow: "Work archive",
    title: "Backend systems I've shipped across payments, integrations, data, and operations",
    description:
      "Each entry names the employer or direct client, my role, the work I owned, led, or contributed to, and the result.",
    meta: "Ten production systems in payments, CRM integration, search, and warehouse operations, each naming the employer, my role, the work I owned, and the result.",
    ogNote: "Each entry names the client, my role, and the result.",
    ogAlt: "Backend engineering case studies by Rizki Kurniawan",
  },
  experience: {
    contentDate: "2026-10-04T00:00:00+07:00",
    eyebrow: "Experience",
    title: "7+ years building production backend systems",
    description:
      "Backend-first engineering across APIs, integrations, payments, search, data synchronization, and operational software, with full-stack delivery when features cross the API boundary.",
    meta: "Rizki Kurniawan's backend engineering experience: 7+ years in APIs, payments, and integrations, with remote client work at SoftwareSeni since 2021.",
    ogNote: "I trace the current behavior before changing it, and check the result after release.",
    ogAlt: "Rizki Kurniawan - 7+ years of production backend experience",
  },
  stack: {
    contentDate: "2026-11-03T00:00:00+07:00",
    eyebrow: "Technical capability",
    title: "Backend technologies I use in production",
    description:
      "My deepest production stack is PHP and Laravel, with additional production experience in Node.js and TypeScript. I also work on the frontend when a feature crosses the API boundary.",
    meta: "Rizki Kurniawan's backend, data, integration, payment, cloud, and frontend experience, with case studies showing the work behind each capability group.",
    ogNote: "Deepest production stack: PHP and Laravel.",
    ogAlt: "The technical stack Rizki Kurniawan uses in production",
  },
  resume: {
    contentDate: "2026-11-02T00:00:00+07:00",
    eyebrow: "Resume",
    title: `Senior Backend Engineer, ${profile.experienceYears} years in production.`,
    meta: "Senior Backend Engineer resume: 7+ years of APIs, payment workflows, integrations, and data synchronization, delivered remotely since 2021.",
    ogNote: profile.availability,
    ogAlt: "Rizki Kurniawan - Senior Backend Engineer resume",
  },
  contact: {
    contentDate: "2026-11-02T00:00:00+07:00",
    eyebrow: "Direct contact",
    title: "Email is the fastest way to reach me",
    description:
      "For a role or project, send the scope, stack, and expected working hours. You can also reach me on LinkedIn.",
    meta: "Contact Rizki Kurniawan for remote Senior Backend Engineer roles, contracts, or freelance projects. Based in Yogyakarta, Indonesia (UTC+7).",
    ogNote: profile.availability,
    ogAlt: "Contact Rizki Kurniawan",
  },
} as const satisfies Record<string, PageCopy>;

export type PageKey = keyof typeof pageCopy;
