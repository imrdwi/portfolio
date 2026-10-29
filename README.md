# rizkik.me

Evidence-first portfolio for Rizki Kurniawan, a Senior Backend Engineer with 7+ years of experience building payment workflows, third-party integrations, data synchronization, search, and operational software. The site is backend-first and makes full-stack capability visible where a feature crosses the API boundary.

The portfolio is designed as an integration control plane: structured records, explicit ownership, system inputs and outputs, and observable production results replace generic project cards and unsupported impact claims.

## Product structure

- `/` - Hiring thesis, current employment context, production evidence, selected work, resume, and direct contact actions.
- `/work` - Complete archive of client assignments, an internal product, direct freelance work, and employment projects.
- `/work/[slug]` - Case studies with relationship, functional role, ownership boundary, system topology, technical decisions, and production results.
- `/experience` - Canonical employer chronology with nested SoftwareSeni assignments and concurrent freelance work.
- `/stack` - Technologies grouped by demonstrated production evidence.
- `/resume` - Print-optimized resume sourced from the same experience data as the site.
- `/contact` - Direct email and LinkedIn channels; no contact form or public mutation endpoint.

## Visual system

- Barlow Semi Condensed carries the editorial headings, Source Sans 3 carries long-form reading, and IBM Plex Mono labels system metadata.
- Dark mode uses an operations-console palette; light mode uses layered mineral and blueprint surfaces.
- Teal marks links, active controls, owned interventions, and verified production evidence.
- Amber is reserved for constraints, tradeoffs, scope boundaries, and technology being explored without production claims.
- The routed `RK` monogram represents two connected system nodes and identifies the portfolio without a decorative logo treatment.
- Square controls, precise rules, compact field labels, and topology diagrams reinforce the systems-engineering subject.

## Content sources

- `data/profile.ts` - Identity, positioning, availability, and contact channels.
- `data/experience.ts` - Canonical employers, assignments, freelance engagements, and venture work.
- `data/projects.ts` - Work-index and system-map metadata.
- `content/work/*.mdx` - Case-study narratives.

Page views and Core Web Vitals are collected through `@vercel/analytics/next` and `@vercel/speed-insights/next`. Both are no-ops outside a Vercel deployment.

## Development

```bash
npm install
npm run dev
```

Use `http://localhost:3000` for browser testing. Next.js development assets may be rejected when the site is opened through the `127.0.0.1` origin.

## Verification

```bash
npm run lint
npm run build
npm run test:smoke
```

Install the Playwright browser once with `npx playwright install chromium`. The smoke suite checks every public route for its title, description, canonical URL, console errors, and 320px horizontal overflow. Browser verification also covers 375px and 1440px widths; dark, light, and system themes; keyboard navigation; and axe checks.

Keep employment relationships and claims aligned across `data/experience.ts`, `data/projects.ts`, case-study MDX, and the resume. Roles are stated as the work actually performed; staffing contract titles are not published.

## Resume PDF

`public/resume.pdf` is generated from the print view of `/resume`. See `RESUME_README.md` for regeneration steps.
