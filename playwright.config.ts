import { defineConfig, devices } from "@playwright/test";

const production = process.env.PLAYWRIGHT_PRODUCTION === "1";
const port = production ? 3101 : 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // Cold parallel requests occasionally race Next's dev compilation manifests.
  // Production routes are prebuilt and can be checked in parallel.
  workers: production ? undefined : 1,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Fresh dedicated server every run. Set PLAYWRIGHT_PRODUCTION=1 after a build
  // to exercise the same checks against next start. Stop any local next dev
  // before the default run: Next permits only one dev server per project.
  webServer: {
    command: production ? `npm run start -- --port ${port}` : `npm run dev -- --webpack --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
