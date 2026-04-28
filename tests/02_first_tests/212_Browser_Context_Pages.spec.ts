import{chromium, Browser, BrowserContext, Page} from '@playwright/test';

async function run() {
    // LEVEL 1: Launch browser - heaviest operation , do it once for all tests
    let browser:Browser= await chromium.launch({headless: false});
    console.log("Browser launched");

    // LEVEL 2: Create browser context - incognito window, fresh session, isolated cookies, do it for each test}
    let context: BrowserContext= await browser.newContext();
    console.log("Browser context created", context);

    // LEVEL 3: Open Page- a tab inside the context, do it for each test
    let page: Page= await context.newPage();
    console.log("Page opened");

    await page.goto("https://example.com");
    console.log("Title :", await page.title());

    // Cleanup - reverse order of creation
    await page.close();
    await context.close();
    await browser.close();  
}

run();
