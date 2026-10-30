export type Assignment = {
  name: string;
  /** Short label for the homepage strip, where the full name is too long. */
  shortName?: string;
  period: string;
  functionalScope: string;
  summary: string;
  slug?: string;
};

export type Experience = {
  organization: string;
  period: string;
  relationship: "Employment" | "Freelance" | "Venture";
  functionalScope: string;
  summary: string;
  /** A public from-scratch rebuild of this work. Not the client's code. */
  rebuild?: { label: string; href: string };
  assignments?: Assignment[];
};

export const experiences: Experience[] = [
  {
    organization: "SoftwareSeni",
    period: "Aug 2021 - Present",
    relationship: "Employment",
    functionalScope: "Software Engineer",
    summary:
      "Five assignments in one continuing SoftwareSeni role — Funraisin, Leadplus, and more.",
    assignments: [
      {
        name: "Funraisin",
        period: "Jun 2025 - Present",
        functionalScope: "Full-stack Engineer",
        summary:
          "Protected the matched-giving and raffle payment paths with MySQL named locks, transactions, and row-level locking. Worked most of the tickets on two initiatives, Third Party Event Management and Designated Giving, and was named Legend of the Month by the Funraisin AU team for November 2025.",
        slug: "funraisin",
      },
      {
        name: "Leadplus",
        period: "Oct 2022 - May 2025",
        functionalScope: "Backend Engineer",
        summary:
          "Improved CRM integration reliability through provider-specific throttling, webhook recovery, identity resolution, direct-to-R2 uploads, and Laravel and PHP upgrades.",
        slug: "leadplus",
      },
      {
        name: "Moladin Warehouse Management",
        shortName: "Moladin",
        period: "Aug 2022 - Sep 2022",
        functionalScope: "Backend Engineer",
        summary:
          "Added separate response and arrival deadlines to the interwarehouse flow, with scheduled cancellation, audit history, warehouse-scoped authorization, and mobile capability flags.",
        slug: "moladin-wms",
      },
      {
        name: "Pepy",
        period: "Mar 2022 - Aug 2022",
        functionalScope: "Backend Engineer",
        summary:
          "Built an explicit MySQL-to-Elasticsearch synchronization contract and repeatable alias-backed reindexing, plus Trello, GitLab, and Google OAuth integrations.",
        slug: "pepy",
      },
      {
        name: "MyChatLab",
        period: "Aug 2021 - Feb 2022",
        functionalScope: "Full-stack Engineer",
        summary:
          "Owned subscription state across Stripe, Midtrans, and WooCommerce. Traced a two-to-four-minute production operation to cross-region database latency amplified by query count.",
        slug: "mychatlab",
      },
    ],
  },
  {
    organization: "Prasetiya Mulya University",
    period: "May 2022 - Jan 2024",
    relationship: "Freelance",
    functionalScope: "Full-stack Engineer",
    summary:
      "Concurrent freelance work alongside SoftwareSeni employment. Connected verified Midtrans payments to enrollment and invoicing, and integrated application-side SSO and CoursePlayer provisioning across the Vue V0 and Laravel-rendered V1 applications.",
  },
  {
    organization: "UPS maintenance reporting (private client)",
    period: "Aug 2021 - Sep 2021",
    relationship: "Freelance",
    functionalScope: "Full-stack Engineer",
    summary:
      "Short freelance build at the start of my SoftwareSeni role. Rewrote a UPS maintenance reporting system in Laravel, with quarterly reports per branch, editable reports, an LDAP name lookup, and live status read from each UPS's web interface over the client's network.",
    rebuild: { label: "github.com/imrdwi/ups-monitor", href: "https://github.com/imrdwi/ups-monitor" },
  },
  {
    organization: "Java Multi Mandiri",
    period: "Jul 2019 - Jul 2021",
    relationship: "Employment",
    functionalScope: "Software Engineer",
    summary:
      "Built Shopee marketplace workflows alongside invoice and payment features, and contributed across the ERP, CRM, reporting, order, and permission workflows.",
    assignments: [
      {
        name: "Stockraken",
        period: "Jul 2019 - Jul 2021",
        functionalScope: "Backend Engineer",
        summary: "Isolated partial Shopee provider failures and built marketplace stock mapping, inline synchronization, and inventory reconciliation around one stock model.",
        slug: "stockraken",
      },
      {
        name: "ES3-KULA",
        period: "Jul 2019 - Jul 2021",
        functionalScope: "Full-stack Engineer",
        summary: "Built invoice and partial-payment handling, internal sales orders, and multi-assignee IT issue workflows. Also contributed to delivery, reporting, and permission-aware interfaces.",
        slug: "es3-kula",
      },
    ],
  },
  {
    organization: "PT Ciberindo Makmur Sejahtera",
    period: "Dec 2019 - Jan 2020",
    relationship: "Freelance",
    functionalScope: "Backend Engineer",
    summary:
      "Concurrent freelance work alongside Java Multi Mandiri employment. Connected the Epayindo payment wallet to the Winpay gateway with logged, forward-to-merchant notifications, and built the RumahPro marketplace checkout on the Epayindo API with WhatsApp payment links.",
  },
  {
    organization: "Reksa Karya",
    period: "Sep 2019 - Jul 2020",
    relationship: "Freelance",
    functionalScope: "Software Engineer",
    summary:
      "Concurrent freelance work alongside Java Multi Mandiri employment. Extended the Flutter client and its Laravel API across authentication, assessment verification (coklit), correspondence, and receivables. The device-token migration stayed backward compatible with older clients.",
  },
];

/** The two most recent assignments, shaped for the homepage.
 * `label` has no data-layer source, so it is derived by position:
 * `assignments` is ordered most-recent-first. */
export const homeAssignments = (experiences[0].assignments ?? [])
  .slice(0, 2)
  .map((assignment, index) => ({
    label: index === 0 ? "Current assignment" : "Previous assignment",
    name: assignment.name,
    period: assignment.period,
    description: assignment.summary,
    href: `/work/${assignment.slug}`,
  }));

/** Compact period for the homepage strip: "Aug–Sep 2022", "Oct 2022–May 2025", "Jun 2025–". */
function compactPeriod(period: string) {
  const [start, end] = period.split(" - ");
  if (!end || end === "Present") return `${start}–now`;
  const [startMonth, startYear] = start.split(" ");
  const [endMonth, endYear] = end.split(" ");
  return startYear === endYear ? `${startMonth}–${endMonth} ${endYear}` : `${start}–${end}`;
}

/** The employer strip on the homepage: every assignment, most recent first.
 * Derived so an assignment's dates are edited in one place, not three. */
export const assignmentStrip = (experiences[0].assignments ?? []).map((assignment, index) => ({
  name: assignment.shortName ?? assignment.name,
  period: compactPeriod(assignment.period),
  current: index === 0,
}));

/** The capability tiles on /experience. Also supplies the chips on its /og card. */
export const capabilities: Array<[label: string, detail: string]> = [
  ["Backend systems", "APIs, business workflows, background jobs, payments"],
  ["Integrations and data", "Webhooks, external APIs, synchronization, data normalization"],
  ["Production engineering", "Reliability, observability, migrations, legacy compatibility"],
  ["Remote delivery", "Australian, New Zealand, and UK clients since 2021, mostly async through tickets and pull requests, with daily standups where the team ran them"],
  ["Full-stack delivery", "Backend APIs, admin tools, and the user-facing interfaces that depend on them"],
  ["Joining a codebase", "Six of the ten systems in the work archive were already in production when I joined"],
];
