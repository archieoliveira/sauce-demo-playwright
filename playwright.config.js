import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    trace: 'on',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  },
  testDir: './tests',
  testMatch: '**/*.test.js',
  retries: 0,
  timeout: 30000,
});
