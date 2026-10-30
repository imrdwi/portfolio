import { profile } from "./profile";

/**
 * Single source for each page's headline copy.
 *
 * Both the page body and that page's /og card read from here, so a card can no
 * longer keep serving a line the page has stopped saying. `meta` is the SEO
 * description; `description` is the on-page standfirst; `ogTitle` overrides
 * `title` when the card needs a shorter headline than the h1.
 */
export type PageCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  meta: string;
  ogTitle?: string;
  ogNote: string;
  ogAlt: string;
  /**
   * When this page's content last materially changed, as an ISO 8601 datetime
   * with offset (e.g. "2026-09-04T18:20:00+07:00"). Feeds the sitemap's
   * `lastModified`; omit it to inherit the sitemap default.
   */
  contentDate?: string;
};

export const pageCopy = {
  home: {
    // Closing line points to the experience page instead of repeating the SoftwareSeni summary.
    contentDate: "2026-10-31T00:00:00+07:00",
    eyebrow: `${profile.experienceYears} years / ${profile.location}`,
    title: "Senior Backend Engineer building reliable payment, integration, and data systems.",
    ogTitle: "Building reliable payment, integration, and data systems.",
    meta: profile.seoDescription,
    ogNote: profile.availability,
    ogAlt: "Rizki Kurniawan - Senior Backend Engineer",
  },
  work: {
    // Public code section added under the archive.
    contentDate: "2026-10-31T00:00:00+07:00",
    eyebrow: "Work archive",
    title: "Backend systems I've shipped across payments, integrations, data, and operations.",
    description:
      "Each entry names the employer or direct client, my role, the work I owned, led, or contributed to, and the result.",
    meta: "Ten production systems in payments, CRM integration, search, and warehouse operations, each naming the employer, my role, the work I owned, and the result.",
    ogNote: "Each entry names the client, my role, and the result.",
    ogAlt: "Backend engineering case studies by Rizki Kurniawan",
  },
  experience: {
    // SoftwareSeni line titled Software Engineer; Funraisin summary adds initiatives and Legend of the Month.
    contentDate: "2026-10-04T00:00:00+07:00",
    eyebrow: "Experience",
    title: "7+ years building production backend systems.",
    description:
      "Backend-first engineering across APIs, integrations, payments, search, data synchronization, and operational software, with full-stack delivery when features cross the API boundary.",
    meta: "Rizki Kurniawan's backend engineering experience: 7+ years in APIs, payments, and integrations, with remote client work at SoftwareSeni since 2021.",
    ogNote: "I trace the current behavior before changing it, and check the result after release.",
    ogAlt: "Rizki Kurniawan - 7+ years of production backend experience",
  },
  stack: {
    // Testing group rewritten: Leadplus PHPUnit practice and Funraisin's verification without a suite.
    contentDate: "2026-10-04T00:00:00+07:00",
    eyebrow: "Technical capability",
    title: "Backend technologies I use in production.",
    description:
      "My deepest production stack is PHP and Laravel, with additional production experience in Node.js and TypeScript. I also work on the frontend when a feature crosses the API boundary.",
    meta: "Rizki Kurniawan's backend, data, integration, payment, cloud, and frontend experience, with case studies showing the work behind each capability group.",
    ogNote: "Deepest production stack: PHP and Laravel.",
    ogAlt: "The technical stack Rizki Kurniawan uses in production",
  },
  resume: {
    // Engagement line (remote from Indonesia, contractor/EOR, UTC+7) in the header.
    contentDate: "2026-10-27T00:00:00+07:00",
    eyebrow: "Resume",
    title: `Senior Backend Engineer, ${profile.experienceYears} years in production.`,
    meta: "Senior Backend Engineer resume: 7+ years of APIs, payment workflows, integrations, and data synchronization, delivered remotely since 2021.",
    ogNote: profile.availability,
    ogAlt: "Rizki Kurniawan - Senior Backend Engineer resume",
  },
  contact: {
    // Engagement model and Sydney overlap published.
    contentDate: "2026-10-27T00:00:00+07:00",
    eyebrow: "Direct contact",
    title: "Email is the fastest way to reach me.",
    description:
      "For a role or project, send the scope, stack, and expected working hours. You can also reach me on LinkedIn.",
    meta: "Contact Rizki Kurniawan for remote Senior Backend Engineer roles, contracts, or freelance projects. Based in Yogyakarta, Indonesia (UTC+7).",
    ogNote: profile.availability,
    ogAlt: "Contact Rizki Kurniawan",
  },
} as const satisfies Record<string, PageCopy>;

export type PageKey = keyof typeof pageCopy;
