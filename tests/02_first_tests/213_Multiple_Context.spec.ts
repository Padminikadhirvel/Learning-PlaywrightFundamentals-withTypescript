import {chromium} from "Playwright";

async function multiUsertest() {
    let browser = await chromium.launch({headless: false});

    // Admin
    let adminContext = await browser.newContext();
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin: on login page");


    // Viewer
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: on login page");

    // Cleanup
  
    await adminContext.close();
    await viewerContext.close();
    await browser.close();

}

multiUsertest();