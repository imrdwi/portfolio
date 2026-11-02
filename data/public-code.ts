export type PublicRepo = {
  name: string;
  href: string;
  summary: string;
  /** The case study or page whose claim this repo backs, when there is one. */
  related?: { label: string; href: string };
  /** One-line note; only repos with one appear on the resume. */
  resumeNote?: string;
};

/**
 * Public repositories, listed under the work archive. Rebuilds are written from
 * scratch with fictional data and contain no client code. Link a case study only
 * when the repo rebuilds a pattern it claims.
 */
export const publicRepos: PublicRepo[] = [
  {
    name: "matched-giving-lock",
    href: "https://github.com/imrdwi/matched-giving-lock",
    summary: "A sponsor's match cap held under concurrent donations with a MySQL named lock, proven by a test that fires real concurrent requests.",
    related: { label: "Funraisin case study", href: "/work/funraisin" },
    resumeNote: "Donation match cap held by a MySQL named lock, with a concurrency test.",
  },
  {
    name: "ups-monitor",
    href: "https://github.com/imrdwi/ups-monitor",
    summary: "UPS fleet monitoring: a queued poll per unit reads its network-card status page, flags units that stop reporting, and rates battery health from maintenance checks.",
    related: { label: "2021 freelance entry", href: "/experience#experience" },
    resumeNote: "Laravel rebuild of the 2021 UPS freelance work, with queued polling.",
  },
  {
    name: "permitdesk",
    href: "https://github.com/imrdwi/permitdesk",
    summary: "Practice-permit applications through a row-locked state machine with an append-only history, and printed permits anyone can verify by QR code.",
  },
  {
    name: "share-card-renderer",
    href: "https://github.com/imrdwi/share-card-renderer",
    summary: "Fundraising share cards for link previews and Instagram, rendered in plain PHP and GD, that stay legible whatever titles, names, and amounts they are given.",
  },
  {
    name: "smart-hajj",
    href: "https://github.com/imrdwi/smart-hajj",
    summary: "Admin panel and pilgrim-app API for travel agencies: itineraries that inherit from trip to group to pilgrim, revocable device tokens, and a geofenced location map.",
  },
  {
    name: "portfolio",
    href: "https://github.com/imrdwi/portfolio",
    summary: "Source for this site: Next.js, MDX case studies, generated Open Graph cards, and the resume PDF.",
  },
];
