export const profile = {
  name: "Rizki Kurniawan",
  alternateNames: ["Rizki", "Rizki K", "rizkik"],
  title: "Senior Backend Engineer",
  location: "Yogyakarta, Indonesia",
  email: "rizki@ortu.dev",
  experienceYears: "7+",
  headline:
    "I design and improve production backends across APIs, third-party integrations, payment workflows, and data synchronization, usually in mature codebases. Remote for Australian, New Zealand, and UK teams since 2021.",
  summary:
    "Senior Backend Engineer with 7+ years building reliable APIs, payment workflows, third-party integrations, data synchronization, and production systems. My deepest stack is PHP and Laravel, supported by production experience in Node.js and TypeScript. Backend-first, with full-stack delivery when features require work across the API boundary. Working remotely for clients in Australia, New Zealand, and the UK since 2021.",
  positioning:
    "My work is primarily backend engineering: APIs, business workflows, integrations, background jobs, payment systems, and data synchronization between services. I am comfortable working in mature codebases where new features have to coexist with existing behavior and production constraints. I have worked this way remotely from Yogyakarta since 2021, for clients in Australia, New Zealand, and the UK.",
  availability: "Open to remote Senior Backend Engineer roles: full-time, contract, or freelance.",

  /** Practical details for /contact. Kept out of `availability`,
   * which has to stay one short line for the OG cards. */
  engagementDetails: [
    ["Engagement", "Remote from Indonesia, as a contractor or through an employer of record. Not relocating."],
    ["Location", "Yogyakarta, Indonesia \u00b7 UTC+7, 3\u20134 hours behind Sydney"],
    // ["Working hours", "I follow the client's timezone, including starting later in my day when the team needs the overlap"],
    // ["Notice period", "One month"],
  ] as Array<[label: string, value: string]>,
  /** One-line answer to the recruiter's engagement question, for the résumé header. */
  engagementSummary: "Remote from Indonesia \u00b7 Contractor or EOR \u00b7 UTC+7",
  seoDescription:
    "Rizki Kurniawan, Senior Backend Engineer. 7+ years on payments, CRM integrations, and data systems in PHP, Laravel, Node.js. Remote for AU, NZ, UK since 2021.",

  // Social links
  linkedin: "https://linkedin.com/in/imrdwi",
  github: "https://github.com/imrdwi",
  
} as const;
