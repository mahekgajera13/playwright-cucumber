import { chromium, firefox, webkit } from 'playwright';

export default {
  // Browser configurations
  browsers: {
    chromium: {
      name: 'chromium',
      use: {
        headless: true,
        slowMo: 1000,
      },
    },
    firefox: {
      name: 'firefox',
      use: {
        headless: true,
        slowMo: 1000,
      },
    },
    webkit: {
      name: 'webkit',
      use: {
        headless: true,
        slowMo: 1000,
      },
    },
  },
  
  // Test settings
  testSettings: {
    baseURL: 'https://www.google.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  // Timeout settings
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
};
