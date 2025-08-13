import { Given, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

Given("I open the Google homepage", async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.google.com");
});

Then("I search for {string}", async function (searchTerm: string) {
  const searchBox = page.locator("textarea[name='q']");
  await searchBox.fill(searchTerm);
  await searchBox.press("Enter");
  await browser.close();
});