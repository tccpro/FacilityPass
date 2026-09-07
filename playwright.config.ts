import { defineConfig, devices } from '@playwright/test';

// 127.0.0.1 rather than localhost: on Windows, localhost can resolve to ::1
// first and stall the readiness probe while the server listens on IPv4.
const baseURL = 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    // Tests the production artifact - the thing a deployment actually serves.
    // `next dev` compiles routes lazily, which makes the first navigation flaky,
    // and it holds a lock on .next/dev.
    // Playwright spawns this through a shell, so && is fine even on Windows.
    command: 'pnpm run build && pnpm run start',

    // READINESS, not health - they are different questions.
    //
    // Readiness asks "is the server serving HTTP?". Health asks "is the service
    // fully functional?". This probed /api/health until Phase 1, which worked
    // only while health could never be degraded. Now that a missing database
    // correctly returns 503 - and this webServer deliberately runs without one -
    // probing health would wait forever for a 2xx that must never come.
    //
    // `/` is statically rendered and needs no database, so a 200 here proves
    // Next is up and rendering. The health contract is asserted by a test, which
    // is where an assertion belongs.
    url: baseURL,

    // HERMETIC. Playwright spawns the server with { ...process.env, ...env }, so
    // this MERGES over the parent environment rather than replacing it. Without
    // the explicit override, a developer with a real DATABASE_URL in their shell
    // would fail a test that asserts the no-database contract - a failure about
    // their machine, not about the code.
    //
    // '' rather than undefined: an undefined value does not mask the inherited
    // one, whereas parseServerEnv() treats an empty string as absent.
    env: { DATABASE_URL: '' },

    // Always boot a fresh server. Reuse could silently attach to a stale process
    // left over from a manual `pnpm start` and pass against code no longer on
    // disk. A leftover server should be a loud error, not a false pass.
    reuseExistingServer: false,

    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
