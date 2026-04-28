import {test} from "@playwright/test";

test.describe("Shared Context", () => {
    test.use(
        {viewport: {width: 1280, height: 720},
        locale: 'en-US',}

    )});
    
    test("test1", async ({ page }) => {
        await page.goto("https://app.vwo.com/#login");
        console.log("Test 1 URL:", page.url());
    }); 

    test("test2", async ({ page }) => {
        await page.goto("https://app.vwo.com/#dashboard");
        console.log("Test 2 URL:", page.url());
    });

    // test in test.describe run in squentially or parallelly?
    // By default, tests in a test.describe block run in parallel. To run them sequentially, you can use the test.describe.serial method instead of test.describe.
    // test.describe.serial("Shared Context", () => {
    //     // tests here will run sequentially
    // });