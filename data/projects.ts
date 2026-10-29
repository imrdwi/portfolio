export type Project = {
  slug: string;
  title: string;
  organization: string;
  period: string;
  relationship: "Client assignment" | "Internal assignment" | "Employment" | "Freelance" | "Venture";
  role: string;
  type: string;
  link?: string;
  redirect?: string;
  summary: string;
  seoTitle: string;
  /** Headline for the case study's /og card. Explicit, so it never has to be parsed out of seoTitle. */
  ogTitle: string;
  /** Short, qualified proof for social previews when available. */
  ogEvidence?: string;
  seoDescription: string;
  intervention: string;
  evidence: string;
  /** Scannable "At a glance" bullets. 4-6 lines, one clause each. */
  glance: string[];
  inputs: string[];
  outputs: string[];
  stack: string[];
  status: "Production" | "Internal product" | "Pre-launch";
  featured?: boolean;
  /**
   * Prose summary for case studies that are not featured. When present, the
   * page leads with it and collapses the full story behind a disclosure.
   * Same evidence rule as the MDX: restate only what the story supports.
   */
  brief?: string;
  /**
   * When this case study's content last materially changed, as an ISO 8601
   * datetime with offset (e.g. "2026-09-04T18:20:00+07:00"). Feeds the
   * sitemap's `lastModified`; omit it to inherit the sitemap default.
   */
  contentDate?: string;
  /**
   * When this case study first went live. Feeds `article:published_time` and
   * the Article node's `datePublished`; omit it to inherit
   * {@link defaultPublishedDate}. Set it on case studies added after launch.
   */
  publishedDate?: string;
};

/** Site launch. Every case study shipped with it, so it is the default publish date. */
export const defaultPublishedDate = "2026-09-03T23:37:42+07:00";

export const projects: Project[] = [
  {
    slug: "funraisin",
    title: "Funraisin",
    organization: "SoftwareSeni / Funraisin",
    period: "Jun 2025 - Present",
    relationship: "Client assignment",
    role: "Full-stack Engineer",
    type: "Fundraising SaaS",
    link: "https://funraisin.co",
    summary:
      "A fundraising platform running campaigns, donations, regular giving, events, and ticketing for charities in Australia and the UK.",
    seoTitle: "Payment Concurrency at Funraisin",
    ogTitle: "Payment concurrency",
    ogEvidence: "21 concurrent requests → 1 sale in a manual replay test",
    seoDescription:
      "How I used MySQL locks, transactions, and idempotent claims to protect fundraising payment paths under concurrency.",
    intervention:
      "Protected donation and raffle payments against concurrent requests, fixed a bulk import that failed on its first attempt, and delivered giving features across four template generations.",
    evidence:
      "A test with 21 concurrent requests left one raffle sale record after the fix, down from 21 before it.",
    glance: [
      "Stopped concurrent donations from overrunning a sponsor's matched-giving cap across seven donation paths",
      "Cut raffle sale records from 21 to 1 in a manual test with 21 concurrent requests",
      "Traced a PURL (personal campaign link) import that failed on its first attempt to CSV parsing of quoted and empty fields",
      "Rolled Intelligent Giving across four template generations behind a per-platform switch",
      "Traced donations stuck on the wrong campaign to a timestamp the Salesforce sync never saw change",
      "Named Legend of the Month by the Funraisin AU team for November 2025, cited for upsell delivery and PR review",
    ],
    inputs: ["Donation forms", "Stripe and PayPal", "Scheduled jobs", "CSV and CRM imports"],
    outputs: ["Campaign pages", "Regular giving schedules", "Salesforce sync", "Admin reporting"],
    stack: ["PHP", "CodeIgniter", "MySQL", "Stripe", "jQuery", "Bootstrap", "AWS S3", "Salesforce"],
    status: "Production",
    featured: true,
    // No-figures and no-test-suite notes, client quotes, initiative delivery, and an accurate PURL import story.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "leadplus",
    title: "Leadplus",
    organization: "SoftwareSeni / Reapit",
    period: "Oct 2022 - May 2025",
    relationship: "Client assignment",
    role: "Backend Engineer",
    type: "CRM integration platform",
    link: "https://agentpoint.com.au",
    summary:
      "A real-estate data platform that reconciles listings, agents, and contacts from seven CRM providers across Australia and the UK into one shared record model.",
    seoTitle: "CRM Integration Reliability at Leadplus",
    ogTitle: "CRM integration reliability",
    ogEvidence: "7 CRM providers · 8 downstream products · Provider fault isolation",
    seoDescription:
      "How I improved CRM reliability with provider throttling, webhook recovery, concurrency controls, and direct Cloudflare R2 uploads.",
    intervention:
      "Improved reliability across seven CRM integrations and led solution planning for Realty+ and the Attachment Service. Added provider controls, webhook recovery, and direct-to-R2 uploads.",
    evidence:
      "Across 7 CRM providers serving 8 downstream products, a failing provider's errors stayed with that provider, empty webhook signatures recovered on the next adapter run, and attachment traffic moved off the application servers.",
    glance: [
      "Reconciled 7 competing CRM providers into one canonical model serving 8 downstream products",
      "Contained provider errors with throttling, backoff, and queued adapter processing",
      "Traced and fixed a silent webhook failure that had been dropping client data undetected",
      "Fixed a concurrency bug corrupting listing images under simultaneous job processing",
      "Moved file transfer off app servers to direct Cloudflare R2 uploads after large syncs left listings with dropped images",
      "Led solution-design planning for Realty+ and the Attachment Service, reviewed by other engineers before implementation",
    ],
    inputs: ["Agentbox", "PropertyHUB", "Reapit", "Rex", "VaultRE", "Console", "RateMyAgent"],
    outputs: ["Canonical records", "GraphQL consumers", "REAXML feeds", "Object storage"],
    stack: ["PHP", "Laravel", "GraphQL", "MongoDB", "MySQL", "Redis", "Laravel Horizon", "React", "AWS S3", "AWS Lambda", "Cloudflare R2", "Datadog"],
    status: "Production",
    featured: true,
    // No-figures note, lead quotes, testing and deferred-image contributions, and the large-sync cause of the R2 move.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "moladin-wms",
    title: "Moladin Warehouse Management",
    organization: "SoftwareSeni / Moladin",
    period: "Aug 2022 - Sep 2022",
    relationship: "Client assignment",
    role: "Backend Engineer",
    type: "Warehouse operations",
    link: "https://moladin.com",
    summary:
      "Internal software tracking custody of used vehicles and their ownership documents as they move between warehouses.",
    seoTitle: "Warehouse Transfer Deadlines at Moladin",
    ogTitle: "Warehouse transfer deadlines",
    seoDescription:
      "How I built staged transfer deadlines, automated cancellation, audit history, and warehouse-scoped authorization for Moladin.",
    intervention:
      "Extended interwarehouse check-in with separate response and arrival deadlines, scheduled cancellation, warehouse-scoped actions, and backend capability flags.",
    evidence:
      "An expired transfer records whether the manager-response window or the arrival window ran out.",
    glance: [
      "Modeled two separate stalls in one interwarehouse transfer: waiting on a manager, waiting on the car to arrive",
      "Replaced a single timeout, which could not record which stage had stalled, with a deadline for each",
      "Closed both stale states on a five-minute scheduled sweep, with a distinct cancellation reason for each",
      "Kept borrow and buyout custody deadlines off Sunday, when the warehouse is closed",
      "Limited physical check-in and check-out to warehouse-related staff, with approval delegated to mapped coordinators",
      "Extended an existing service over a two-month assignment; the platform and its schema predated the assignment",
    ],
    inputs: ["Check-in requests", "Approvals", "Scheduled expiry jobs"],
    outputs: ["Custody state", "Inventory history", "Timeout notifications"],
    stack: ["TypeScript", "Node.js", "Express", "Sequelize", "MySQL"],
    status: "Production",
    brief:
      "A two-month SoftwareSeni assignment on Moladin's warehouse service, which tracks used cars and their BPKB ownership certificates as they move between warehouses. I extended an existing TypeScript and Express service whose design predated me. The main change gave interwarehouse transfers two deadlines, one for the manager's response and one for the car's arrival, so a scheduled sweep could cancel each stall with its own reason in the inventory history. I also kept borrow and buyout deadlines off Sundays, limited physical check-in and check-out to staff tied to the warehouse, and returned capability flags so the mobile app offered only actions the backend would accept. QA and I checked the Sunday and authorization rules by hand; the Sunday rule has no regression test.",
    // Summary-first layout with the full story collapsed; phrasing pass.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "prasmuleli-cc",
    title: "Prasmul ELI Career Companion",
    organization: "Prasetiya Mulya University",
    period: "May 2022 - Jan 2024",
    relationship: "Freelance",
    role: "Full-stack Engineer",
    type: "Learning management",
    link: "https://prasmuleli-cc.id",
    redirect: "https://web.archive.org/web/20240411103635/https://prasmuleli-cc.id",
    summary:
      "A learning and career-companion platform for executive education programs.",
    seoTitle: "Verified Course Payments at Prasmul ELI",
    ogTitle: "Verified course payments",
    seoDescription:
      "How I connected verified Midtrans payments to enrollment, invoicing, SSO, and cross-application CoursePlayer provisioning at Prasmul ELI.",
    intervention:
      "Integrated the application with institutional SSO and built Midtrans, enrollment, CoursePlayer access, and program workflows across Vue V0 and Laravel-rendered V1.",
    evidence:
      "Course access followed confirmed Midtrans state, not the browser's return to a success page, checked by walking each transaction state through the sandbox.",
    glance: [
      "Carried a course purchase across six boundaries: sign-in, payment, enrollment, invoicing, provisioning, content access",
      "Granted access from a verified Midtrans callback, never from the browser returning to a success URL",
      "Moved the public experience from Vue to Laravel-rendered pages to meet an SEO indexing requirement",
      "Provisioned Career Companion accounts into CoursePlayer, a separate application with its own users",
      "Backfilled existing accounts with a command that reported each rejection and carried on",
      "Direct client engagement; other engineers worked on CoursePlayer and GoCampus",
    ],
    inputs: ["Institutional identity", "Midtrans payments", "Program content", "Career activity"],
    outputs: ["Authenticated sessions", "Enrollments and invoices", "CoursePlayer access", "Career records"],
    stack: ["PHP", "Laravel", "Vue", "Blade", "Tailwind CSS", "MySQL", "Midtrans"],
    status: "Production",
    brief:
      "A direct freelance engagement with Prasetiya Mulya University, concurrent with my SoftwareSeni role, covering executive-course enrollment and payments. Most of my backend work sat on the path from purchase to access: Midtrans checkout with callback signature and status-API checks before any enrollment, invoice PDFs and confirmation email after a verified payment, and account provisioning into CoursePlayer, a separate Laravel application, so learners could open paid content without signing in again. I also built voucher enrollment on the normal order and enrollment records, and integrated the university's private SSO package while the public pages moved from Vue to server-rendered Laravel for search indexing. I walked each payment state through the Midtrans sandbox one at a time.",
    // Summary-first layout; SSO and voucher stories condensed into contributions.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "pepy",
    title: "Pepy",
    organization: "SoftwareSeni",
    period: "Mar 2022 - Aug 2022",
    relationship: "Internal assignment",
    role: "Backend Engineer",
    type: "Project management",
    link: "https://pepy.app",
    summary:
      "SoftwareSeni's time-tracking and planner product, pulling work items from the tools teams already used.",
    seoTitle: "Search Synchronization at Pepy",
    ogTitle: "Search synchronization",
    seoDescription:
      "How I built an explicit MySQL-to-Elasticsearch synchronization contract and alias-backed reindexing for a multi-tenant planning product.",
    intervention:
      "Built the MySQL-to-Elasticsearch data contract and third-party integrations for a multi-tenant time-tracking product.",
    evidence:
      "Alias-based reindexing made a rebuild a repeatable command that did not take search offline.",
    glance: [
      "Made Elasticsearch rebuildable without ever emptying the live index, by repointing an alias to a freshly built one",
      "Neither store reported an error — the first sign of drift was a filter returning the wrong set",
      "Declared the MySQL-to-Elasticsearch field contract next to each model so reviewers could check the mapping alongside schema changes",
      "Built the Trello, GitLab, and Google OAuth flows, including a reconnect path needing no support intervention",
      "Took sub-projects end to end, from migration to a searchable endpoint",
      "A tech lead reviewed every merge request before it reached staging",
    ],
    inputs: ["Trello boards", "GitLab projects", "Google Calendar", "Internal HR system"],
    outputs: ["REST APIs", "Search index", "Timesheets", "Reports"],
    stack: ["Node.js", "Express", "MySQL", "Elasticsearch", "React", "Trello API", "GitLab API", "Sentry"],
    status: "Production",
    brief:
      "SoftwareSeni's own multi-tenant time-tracking product, used internally and by the client Agentpoint. Pepy keeps transactional data in MySQL and a search copy in Elasticsearch, and most of my six months went into keeping that copy correct. Each model declares its searchable fields and a pair of converters next to it, so a schema change has an explicit checklist in review. A rebuild indexes into a new index and repoints an alias, so search stays up during a reindex; DevOps verified the affected index in production afterwards, though that check does not show how writes during a rebuild reach the new index. I also built the Trello, GitLab, and Google OAuth integrations, including reconnection after an upstream token is revoked.",
    // Summary-first layout with the full story collapsed; phrasing pass.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "mychatlab",
    title: "MyChatLab",
    organization: "SoftwareSeni / Fun Gum",
    period: "Aug 2021 - Feb 2022",
    relationship: "Client assignment",
    role: "Full-stack Engineer",
    type: "Education platform",
    link: "https://lexolab.com",
    redirect: "https://web.archive.org/web/20231211220852/https://lexolab.com",
    summary:
      "A gamified English-learning product for children, sold to parents by subscription and to schools through teacher accounts.",
    seoTitle: "Subscription Reliability at MyChatLab",
    ogTitle: "Subscription reliability",
    seoDescription:
      "How I managed subscription state across three payment providers and traced a production slowdown to cross-region database latency.",
    intervention:
      "Owned subscription and payment workflows across three providers, along with error monitoring and supporting work on the React student app.",
    evidence:
      "Traced a two-to-four-minute operation to cross-region database latency by comparing the same script on two servers.",
    glance: [
      "Traced a two-to-four-minute lesson operation to cross-region database latency, added on every query",
      "Found it by comparison: the same script run from Indonesia, then from Australia",
      "Measured a query rewrite taking one path from ~20 seconds to ~3 seconds; the team chose indexes instead",
      "Reconciled subscription state written by Stripe, Midtrans, and WooCommerce into one record",
      "Traced two screens disagreeing on the same metric to definition drift, not a broken query",
      "Junior engineer on an established team; architecture and hosting decisions were not mine",
    ],
    inputs: ["Stripe", "Midtrans", "WooCommerce", "Learning activity"],
    outputs: ["Subscription state", "Localized email", "Admin reporting"],
    stack: ["PHP", "Laravel", "MySQL", "React", "Stripe", "Midtrans", "Sentry", "jQuery", "Bootstrap"],
    status: "Production",
    brief:
      "A six-month SoftwareSeni assignment on a children's English-learning product for Fun Gum in Auckland, where I was the junior engineer on an established team. Subscription state decided what a child, parent, or teacher could open, and three providers wrote into it: Stripe, Midtrans, and WooCommerce. I worked through that lifecycle, including a signup bug that wrote plain \"Paid\" instead of the monthly status, confirmed by reading the database row after a real checkout. The finding I would point to first is a diagnosis: lesson skips took two to four minutes, and running the same script from an Indonesian and an Australian server traced it to latency against the RDS database in Australia. I reported it so the hosting decision stayed with the team.",
    // Summary-first layout; localization story condensed into a contribution.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "e-pnbp-mobile",
    title: "e-PNBP Mobile",
    organization: "Reksa Karya",
    period: "Sep 2019 - Jul 2020",
    relationship: "Freelance",
    role: "Software Engineer",
    type: "Government revenue platform",
    link: "https://reksa.co.id",
    summary:
      "A Flutter staff application and Laravel API for Indonesian non-tax state revenue workflows.",
    seoTitle: "Mobile Revenue APIs at e-PNBP",
    ogTitle: "Mobile revenue APIs",
    seoDescription:
      "How I extended Flutter and Laravel APIs for government revenue workflows with backward-compatible, revocable device tokens.",
    intervention:
      "Implemented much of the Flutter client that replaced a React Native app, and extended its Laravel API across authentication, assessment verification (coklit), correspondence, receivables, and telecom and postal data.",
    evidence:
      "Older app builds kept signing in after the move to revocable device tokens, and postal figures in the app matched the web application.",
    glance: [
      "Replaced a React Native staff client with Flutter, shipped through initial release and v1.0.1",
      "Represented two revenue workflows — telecom BHP/USO and postal KPLPU — through one mobile API",
      "Checked the postal figures against the web application for the same operator; they matched",
      "Migrated authentication to revocable Sanctum device tokens with no client cutover",
      "Older builds still sending the legacy bearer token kept authenticating through a fallback",
      "Early-career work; the revenue rules, the original API, and the web platform belonged to the existing team",
    ],
    inputs: ["Staff identity", "Revenue records", "Correspondence"],
    outputs: ["Mobile workflows", "API representations", "Device sessions"],
    stack: ["Dart", "Flutter", "PHP", "Laravel", "MySQL", "REST APIs", "Firebase"],
    status: "Production",
    brief:
      "Freelance work for Reksa Karya, concurrent with my job at Java Multi Mandiri and early in my career, on a government system for non-tax state revenue from telecom and postal operators. I built much of a Flutter staff app that replaced an earlier React Native client, and extended the Laravel mobile API behind it. Revenue calculations stayed on the server. The API branched on billing category so postal records got their own mappings, and I compared one operator's postal figures in the mobile app against the web application to confirm they matched. I also moved sign-in to revocable Sanctum device tokens while older builds kept working through a legacy-token fallback.",
    // Summary-first layout; neutral hero caption.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "stockraken",
    title: "Stockraken",
    organization: "Java Multi Mandiri",
    period: "Jul 2019 - Jul 2021",
    relationship: "Employment",
    role: "Backend Engineer",
    type: "Omnichannel commerce",
    link: "https://clickoding.id",
    redirect: "https://web.archive.org/web/20250330063026/https://clickoding.id",
    summary:
      "Inventory, marketplace, and point-of-sale workflows sharing one internal stock record.",
    seoTitle: "Shopee Stock Reliability at Stockraken",
    ogTitle: "Shopee stock reliability",
    seoDescription:
      "How I isolated partial Shopee failures and built stock mapping, inline synchronization, and inventory reconciliation for Stockraken.",
    intervention:
      "Built application-layer Shopee workflows, variant mapping, inline stock updates, and warehouse reconciliation around a shared inventory model.",
    evidence:
      "One failing Shopee store no longer stopped the order sync for every connected store; operators saw which stores failed and why.",
    glance: [
      "A 404 from one Shopee store used to stop the order sync for every connected store",
      "Carried the run on to the stores that responded, with the failing store's error preserved",
      "Mapped each local variant to a Shopee store, item, and variation so both stock values could be compared",
      "Added manual synchronization for when an inline push left local stock updated and the listing stale",
      "Turned a physical stock count difference into a recorded warehouse movement, not an overwrite",
      "Early-career work; the inventory model and the private Shopee client package were already in place",
    ],
    inputs: ["Shopee", "Point of sale", "Central inventory"],
    outputs: ["Inventory state", "Orders", "Reconciliation"],
    stack: ["PHP", "Laravel", "PostgreSQL", "jQuery", "Bootstrap", "Electron"],
    status: "Production",
    brief:
      "Early-career work at Java Multi Mandiri on a Laravel inventory backend shared by warehouses, direct sales, Shopee stores, and an Electron point-of-sale client. I built the application layer around an existing Shopee client package: order retrieval that carried on past a failing store and told operators which one had failed, and an explicit mapping between each local variant and its Shopee listing. Stock pushes to Shopee ran inline, so the two values could still drift after a rate limit or failed request; a manual sync let operators compare both and push again. I also worked on stock-opname corrections, which record a physical-count difference as an inbound or outbound movement with warehouse context.",
    // Summary-first layout with the full story collapsed; phrasing pass.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
  {
    slug: "es3-kula",
    title: "ES3-KULA",
    organization: "Java Multi Mandiri",
    period: "Jul 2019 - Jul 2021",
    relationship: "Employment",
    role: "Full-stack Engineer",
    type: "Internal ERP and CRM",
    link: "https://clickoding.id",
    redirect: "https://web.archive.org/web/20250330063026/https://clickoding.id",
    summary:
      "An internal system turning sales, customer, reporting, and employee operations into shared workflows.",
    seoTitle: "ERP Workflows and Odoo Migration at ES3-KULA",
    ogTitle: "ERP workflows and an Odoo migration",
    seoDescription:
      "How I built invoice, receipt, and multi-assignee issue workflows in a Laravel ERP, then wrote the Python Odoo modules that carried them into production on Odoo.",
    intervention:
      "Built invoice, receipt, internal-sales-order, and IT issue workflows, then contributed to order confirmation, delivery, reporting, and permission-aware interfaces.",
    evidence:
      "Receipts above an invoice's remaining balance were rejected, an exact-balance receipt was accepted, and closed issues kept their history after moving to multiple assignees.",
    glance: [
      "Built the invoice and receipt workflow, keeping partial payments within the remaining invoice balance",
      "Moved IT issue assignment from one technician to several without losing issue history",
      "Combined selected quotations into one order confirmation, keeping customer, pricing, and validity for invoicing",
      "Contributed to delivery orders that could not be published while an item lacked a serial number",
      "Moved core ERP functionality onto Odoo through custom Python modules that staff used in production",
    ],
    inputs: ["Sales operations", "Customer records", "Staff workflows"],
    outputs: ["ERP records", "CRM workflows", "Reports"],
    stack: ["PHP", "Laravel", "MySQL", "jQuery", "Bootstrap", "Python", "Odoo"],
    status: "Production",
    brief:
      "An internal Laravel ERP and CRM at Java Multi Mandiri, early in my career, where I implemented assigned slices inside a team-built system. I owned the invoice feature: item recalculation, partial customer receipts that reject anything above the remaining balance, and paid status once receipts reach the total, which I checked against a real invoice on both sides of that limit. I also changed IT issue assignment to support several technicians, migrating the existing data and confirming that closed issues kept their history. When the business moved the ERP onto Odoo, I wrote the Python modules that carried this functionality across, and staff used them in production before I left.",
    // Summary-first layout with the full story collapsed; phrasing pass.
    contentDate: "2026-10-04T00:00:00+07:00",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
