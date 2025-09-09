import { defineConfig, devices } from '@playwright/test'

// Base URL priority: E2E_BASE_URL > NEXT_PUBLIC_SITE_URL > localhost
const baseURL =
  process.env.E2E_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})

