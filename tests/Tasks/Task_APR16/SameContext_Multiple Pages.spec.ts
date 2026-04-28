// Same Context Multiple Pages using test.describe

import {chromium, Browser, BrowserContext, Page, test} from "@playwright/test";

test.describe("Same Context Multiple Pages", () => {

    let browser:Browser;
    let context: BrowserContext;
    let page1: Page;
    let page2: Page;

    test.beforeAll( async () => {
        // Launch browser 
        browser = await chromium.launch({headless: false});
        console.log("Browser launched");

        // Create a single context for all tests in this describe block
        context = await browser.newContext();
        console.log("Browser context created", context);

        // Open first page
        page1 = await context.newPage();
        console.log("Page 1 opened");

        // Open second page
        page2 = await context.newPage();
        console.log("Page 2 opened");
    });

    test("Test on Page 1", async () => {
        await page1.goto("https://app.vwo.com/#login");
        console.log("Page 1 URL:", page1.url());
    });

    test("Test on Page 2", async () => {
        await page2.goto("https://app.vwo.com/#dashboard/home");
        console.log("Page 2 URL:", page2.url());
    });

    test.afterAll( async () => {
        // Cleanup - reverse order of creation
        await context.close();
        await browser.close();
    });

});