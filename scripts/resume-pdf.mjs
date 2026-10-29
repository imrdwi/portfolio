// Prints /resume to public/resume.pdf. Honors the print stylesheet's
// `@page { size: A4 }` and forces light mode, neither of which
// `agent-browser pdf` does. Serve the production build first.
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3000/resume";
const browser = await chromium.launch();
const page = await browser.newPage({ colorScheme: "light" });
await page.goto(url, { waitUntil: "networkidle" });
await page.pdf({ path: "public/resume.pdf", preferCSSPageSize: true, printBackground: true, tagged: true });
await browser.close();
console.log(`Saved public/resume.pdf from ${url}`);
