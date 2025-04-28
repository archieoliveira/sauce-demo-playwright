import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  testDir: './tests',
  testMatch: '**/*.test.js',
  retries: 0,
  timeout: 30000,
});
