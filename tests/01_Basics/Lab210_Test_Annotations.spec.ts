import {test,expect} from 'playwright/test'; 

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

// Skip test
test.skip('skipped test', async ({ page }) => {
    // This test is skipped
});
// Only run this test
test.only('focused test', async ({ page }) => {
    // Only this test runs
});

// Mark as failing
test.fail('expected to fail', async ({ page }) => {
    // Test is expected to fail
});

// Slow test (3x timeout)
// Below gives error becuase of the way test.slow() is used. 
// It should be called inside the test function, not as a parameter to the test function. 
//     // Has extended timeout
// });

test('slow test', async ({ page }) => {
    test.slow();
    // Has extended timeout
});

// Conditional skip
test('conditional', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Not supported in Firefox');
});