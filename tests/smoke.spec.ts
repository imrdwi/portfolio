import { expect, test } from "@playwright/test";
import { pageCopy } from "../data/page-copy";
import { projects } from "../data/projects";

const staticRoutes = [
  { path: "/", title: "Rizki Kurniawan | Senior Backend Engineer", description: pageCopy.home.meta },
  { path: "/work", title: "Backend Engineering Work | Rizki Kurniawan", description: pageCopy.work.meta },
  { path: "/experience", title: "Experience | Rizki Kurniawan", description: pageCopy.experience.meta },
  { path: "/stack", title: "Technical Stack | Rizki Kurniawan", description: pageCopy.stack.meta },
  { path: "/resume", title: "Resume | Rizki Kurniawan", description: pageCopy.resume.meta },
  { path: "/contact", title: "Contact | Rizki Kurniawan", description: pageCopy.contact.meta },
];

const routes = [
  ...staticRoutes,
  ...projects.map((project) => ({
    path: `/work/${project.slug}`,
    title: `${project.seoTitle} | Rizki Kurniawan`,
    description: project.seoDescription,
  })),
];

function canonicalUrl(path: string) {
  return path === "/" ? "https://rizkik.me" : `https://rizkik.me${path}`;
}

test.describe("public portfolio smoke checks", () => {
  test.setTimeout(120_000);

  test("every public route renders its canonical metadata without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      // Vercel serves /_vercel/* analytics scripts only on its own hosting; locally they 404.
      if (message.type() === "error" && !message.location().url.includes("/_vercel/")) {
        consoleErrors.push(`${message.text()} (${message.location().url})`);
      }
    });

    for (const route of routes) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      // Give client components time to hydrate; React warnings can otherwise
      // arrive after the metadata assertions have already passed.
      await page.waitForTimeout(200);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", route.description);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonicalUrl(route.path));
      await expect(page.locator("main")).toBeVisible();
    }

    expect(consoleErrors).toEqual([]);
  });

  test("every social image returns a 1200 by 630 PNG", async ({ request }) => {
    for (const route of routes) {
      const path = route.path === "/" ? "/og" : `${route.path}/og`;
      const response = await request.get(path);
      expect(response.ok(), path).toBeTruthy();
      expect(response.headers()["content-type"], path).toContain("image/png");
      const png = await response.body();
      expect(png.subarray(0, 8).toString("hex"), path).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16), path).toBe(1200);
      expect(png.readUInt32BE(20), path).toBe(630);
    }
  });

  test("the résumé PDF is an A4 download without Type 3 fonts", async ({ page, request }) => {
    const response = await request.get("/resume.pdf");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const pdf = (await response.body()).toString("latin1");
    expect(pdf.startsWith("%PDF-")).toBeTruthy();
    // A4 is 595 x 842 pt. Letter (612 x 792) means it was printed without the @page rule.
    for (const [, width, height] of pdf.matchAll(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/g)) {
      expect(Math.round(Number(width))).toBe(595);
      expect(Math.round(Number(height))).toBe(842);
    }
    // Chrome prints variable fonts as Type 3, which older ATS parsers misread.
    expect(pdf).not.toContain("/Type3");

    await page.goto("/resume");
    await expect(page.getByRole("link", { name: /Download PDF/ })).toHaveAttribute("download", "Rizki-Kurniawan-Resume.pdf");
  });

  test("the résumé prints as a single column with ATS section headings", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/resume");
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    for (const name of ["Experience", "Skills", "Education"]) {
      const heading = page.getByRole("heading", { name, exact: true });
      await expect(heading).toBeVisible();
      const columns = await heading.evaluate((node) => getComputedStyle(node.parentElement!).gridTemplateColumns);
      expect(columns.trim().split(/\s+/), name).toHaveLength(1);
    }
  });

  test("every public route fits a 320px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });

    for (const route of routes) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(new RegExp(`${route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
      const widths = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(widths.scrollWidth, route.path).toBeLessThanOrEqual(widths.clientWidth);
    }
  });

  test("email copy exposes one live-region confirmation", async ({ page, baseURL }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: new URL(baseURL!).origin });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[role="status"]')).toHaveCount(0);
    await page.locator("main").getByRole("button", { name: "Copy email", exact: true }).click();
    await expect(page.locator('[role="status"]')).toHaveCount(1);
    await expect(page.locator('[role="status"]')).toHaveText("Copied rizki@ortu.dev to clipboard");
  });

  test("engineering diagrams enlarge without overflowing the mobile page", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    for (const [path, labels] of [
      ["/work/funraisin", ["Matched-giving concurrency", "Raffle-sale concurrency"]],
      ["/work/leadplus", ["Direct-to-R2 attachment uploads"]],
    ] as const) {
      await page.goto(path);
      for (const label of labels) {
        const toggle = page.getByRole("button", { name: `Enlarge diagram: ${label}`, exact: true });
        await toggle.focus();
        await page.keyboard.press("Enter");
        const region = page.getByRole("region", { name: label, exact: true });
        await expect(region.locator("svg")).toHaveCSS("width", "1100px");
        const widths = await page.evaluate(() => ({
          client: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(widths.scroll).toBeLessThanOrEqual(widths.client);
        // focus() alone starts a smooth page scroll (scroll-behavior: smooth), and
        // Chrome drops an arrow key pressed mid-animation. Arrive first, as a reader would.
        await region.scrollIntoViewIfNeeded();
        await expect(region).toBeInViewport();
        await region.focus();
        await page.keyboard.press("ArrowRight");
        await expect.poll(() => region.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
        await page.getByRole("button", { name: `Fit diagram: ${label}`, exact: true }).click();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
      }
    }
  });

  test("denied clipboard access explains manual copying in one live region", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator.clipboard, "writeText", {
        configurable: true,
        value: () => Promise.reject(new DOMException("Blocked", "NotAllowedError")),
      });
    });
    await page.goto("/contact");
    await page.locator("main").getByRole("button", { name: "Copy email rizki@ortu.dev", exact: true }).click();
    const status = page.getByRole("status");
    await expect(status).toHaveCount(1);
    await expect(status).toHaveText("Could not copy. Select rizki@ortu.dev and copy it manually.");
    await expect(status.locator("span")).toHaveCSS("user-select", "text");
  });

  test("non-featured case studies lead with a summary and open the full story on demand", async ({ page }) => {
    for (const project of projects) {
      await page.goto(`/work/${project.slug}`);
      const disclosure = page.locator("details", { has: page.getByText("Read the full case study") });
      if (project.featured) {
        await expect(disclosure).toHaveCount(0);
        continue;
      }
      await expect(page.getByRole("heading", { name: "Summary", exact: true })).toBeVisible();
      await expect(disclosure).not.toHaveAttribute("open");
      const jump = page.getByRole("navigation", { name: "Engineering stories" }).getByRole("link").first();
      await jump.click();
      await expect(disclosure).toHaveAttribute("open");
      await expect(page.locator((await jump.getAttribute("href"))!)).toBeInViewport();
    }

    // A deep link straight to a collapsed story opens it on arrival.
    const deep = projects.find((project) => !project.featured)!;
    await page.goto(`/work/${deep.slug}`);
    const href = (await page.getByRole("navigation", { name: "Engineering stories" }).getByRole("link").first().getAttribute("href"))!;
    await page.goto(`/work/${deep.slug}${href}`);
    await expect(page.locator(href)).toBeInViewport();
  });

  test("case-study jump links target stories and previous/next follow the archive", async ({ page }) => {
    for (const [index, project] of projects.entries()) {
      await page.goto(`/work/${project.slug}`);
      const jumps = page.getByRole("navigation", { name: "Engineering stories" }).getByRole("link");
      expect(await jumps.count()).toBeGreaterThan(0);
      for (const jump of await jumps.all()) {
        const target = page.locator((await jump.getAttribute("href"))!);
        await expect(target).toHaveCount(1);
        await expect(target).toHaveText((await jump.textContent())!);
      }
      const navigation = page.getByRole("navigation", { name: "Other case studies" });
      if (index > 0) {
        await expect(navigation.locator('a[rel="prev"]')).toHaveAttribute("href", `/work/${projects[index - 1].slug}`);
      } else {
        await expect(navigation.locator('a[rel="prev"]')).toHaveCount(0);
      }
      if (index < projects.length - 1) {
        await expect(navigation.locator('a[rel="next"]')).toHaveAttribute("href", `/work/${projects[index + 1].slug}`);
      } else {
        await expect(navigation.locator('a[rel="next"]')).toHaveCount(0);
      }
    }
  });
});
