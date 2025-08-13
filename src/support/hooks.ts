import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import fs from 'fs';

let browser: Browser;

BeforeAll(async function () {
  const isHeaded = process.env.HEADED === 'true';
  browser = await chromium.launch({ headless: !isHeaded });
  if (!fs.existsSync('test-videos')) fs.mkdirSync('test-videos');
});

Before(async function (this: any, scenario) {
  this.context = await browser.newContext({
    recordVideo: { dir: 'test-videos/' }
  });
  this.page = await this.context.newPage();
  
  // Set page timeout
  this.page.setDefaultTimeout(30000);
  this.page.setDefaultNavigationTimeout(30000);
});

After(async function (this: any, { result }: any) {
  try {
    if (result?.status === Status.FAILED && this.page) {
      const buffer = await this.page.screenshot();
      (this as any).attach(buffer, 'image/png');
    }
    
    // Attach page title and URL for Allure report
    if (this.page) {
      const title = await this.page.title();
      const url = this.page.url();
      (this as any).attach(`Page Title: ${title}\nPage URL: ${url}`, 'text/plain');
    }
  } catch (err) {
    console.error('Error taking screenshot in After hook:', err);
  }
  await this.context?.close();
});

AfterAll(async function () {
  if (fs.existsSync('test-videos')) {
    const files = fs.readdirSync('test-videos');
    for (const file of files) {
      const stats = fs.statSync(`test-videos/${file}`);
      if (stats.isDirectory()) {
        // Remove old video directories before next run
        fs.rmSync(`test-videos/${file}`, { recursive: true, force: true });
      }
    }
  }
  await browser?.close();
});