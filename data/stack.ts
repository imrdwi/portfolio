export type StackGroup = {
  label: string;
  /** Shorter label for the résumé's narrow left column. Falls back to `label`. */
  resumeLabel?: string;
  description: string;
  items: string[];
  evidence: { label: string; href: string }[];
};

/**
 * Single source of truth for technical capability.
 *
 * Rendered on /stack, on /resume (via `resumeLabel`), and flattened into the
 * Person node's `knowsAbout` in app/layout.tsx. Add a technology here only —
 * the other two surfaces derive from it.
 */
export const stackGroups: StackGroup[] = [
  {
    label: "Core backend",
    resumeLabel: "Backend",
    description: "Primary production stack: PHP / Laravel. Additional production depth: Node.js / TypeScript, and Python on Odoo.",
    items: ["PHP", "Laravel", "CodeIgniter", "Node.js", "Express", "JavaScript", "TypeScript", "Python", "REST APIs", "GraphQL", "Laravel Horizon"],
    evidence: [
      { label: "Laravel and GraphQL services", href: "/work/leadplus" },
      { label: "Node and Express APIs", href: "/work/pepy" },
      { label: "CodeIgniter payment paths", href: "/work/funraisin" },
      { label: "Python modules on Odoo", href: "/work/es3-kula" },
    ],
  },
  {
    label: "Data stores",
    resumeLabel: "Data",
    description: "Databases and search used behind production services.",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Sequelize"],
    evidence: [
      { label: "MySQL to Elasticsearch sync", href: "/work/pepy" },
      { label: "MongoDB canonical records", href: "/work/leadplus" },
      { label: "PostgreSQL inventory", href: "/work/stockraken" },
    ],
  },
  {
    label: "Integration and architecture",
    resumeLabel: "Integration",
    description: "How services exchange data, and what keeps that correct when a provider does not cooperate.",
    items: ["Webhooks", "Data synchronization", "Data normalization", "Retries", "Idempotency", "Reconciliation", "System Integration", "CRM Systems", "Microservices"],
    evidence: [
      { label: "Seven CRM providers", href: "/work/leadplus" },
      { label: "Marketplace stock reconciliation", href: "/work/stockraken" },
      { label: "Interwarehouse workflows", href: "/work/moladin-wms" },
    ],
  },
  {
    label: "Payments and third-party platforms",
    resumeLabel: "Platforms",
    description: "Payment providers and external systems integrated in production.",
    items: ["Stripe", "Midtrans", "Salesforce", "Odoo", "Firebase", "Trello API", "GitLab API"],
    evidence: [
      { label: "Matched-giving concurrency", href: "/work/funraisin" },
      { label: "Verified Midtrans payments", href: "/work/prasmuleli-cc" },
      { label: "Trello, GitLab, and Google OAuth", href: "/work/pepy" },
    ],
  },
  {
    label: "Cloud and deployment",
    resumeLabel: "Infrastructure",
    description: "I've provisioned AWS and Google Cloud compute, configured Debian/Ubuntu, and deployed applications with Docker or a native PHP runtime. I've also set up GitLab Runner to build and deploy applications automatically after merges.",
    items: ["Docker", "AWS", "AWS Lambda", "AWS S3", "Cloudflare", "Cloudflare R2", "Google Cloud Platform", "Linux", "Debian", "Ubuntu", "GitLab CI/CD", "GitLab Runner"],
    evidence: [{ label: "Direct-to-R2 uploads", href: "/work/leadplus" }],
  },
  {
    label: "Monitoring",
    resumeLabel: "Monitoring",
    description: "Tools used to investigate errors, releases, and production behavior.",
    items: ["Datadog", "Sentry", "New Relic"],
    evidence: [
      { label: "Datadog after release", href: "/work/leadplus" },
      { label: "Sentry and New Relic", href: "/work/pepy" },
      { label: "Production investigations", href: "/work/mychatlab" },
    ],
  },
  {
    label: "Testing and code quality",
    resumeLabel: "Testing",
    description: "Testing depends on what the codebase has. On Leadplus, PHPUnit tests were routine ticket work across adapters, GraphQL mutations, and sync and dedupe commands, with provider APIs mocked and the pipeline requiring tests and PHPStan to pass before merge. Funraisin runs on CodeIgniter 3 with no automated test suite, so there I verify changes by reproducing the issue on demo and bugfix branches and attaching before-and-after evidence to the ticket.",
    items: ["PHPUnit", "PHPStan"],
    evidence: [
      { label: "PHPUnit suites and pipeline checks", href: "/work/leadplus" },
      { label: "Verification without a test suite", href: "/work/funraisin" },
    ],
  },
  {
    label: "Mobile and desktop",
    resumeLabel: "Mobile and desktop",
    description: "Client applications built against APIs I also worked on.",
    items: ["Dart", "Flutter", "Electron"],
    evidence: [
      { label: "Flutter staff client", href: "/work/e-pnbp-mobile" },
      { label: "Electron point of sale", href: "/work/stockraken" },
    ],
  },
  {
    label: "Full-stack capability",
    resumeLabel: "Full stack",
    description: "Frontend work used to complete features that cross the API boundary.",
    items: ["React", "Vue", "Next.js", "Blade", "jQuery", "Bootstrap", "Tailwind CSS"],
    evidence: [
      { label: "Four template generations", href: "/work/funraisin" },
      { label: "React student app", href: "/work/mychatlab" },
      { label: "Vue and Blade interfaces", href: "/work/prasmuleli-cc" },
    ],
  },
];

/** Every technology above, de-duplicated. Feeds `knowsAbout` in the Person JSON-LD. */
export const allTechnologies: string[] = Array.from(
  new Set(stackGroups.flatMap((group) => group.items)),
);
