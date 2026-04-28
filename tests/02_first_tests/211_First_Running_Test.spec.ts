// **Creating your first Playwright test:**

// - Test structure
// - Basic assertions
// - Navigation
// - Element interaction

import {test,expect} from 'playwright/test'; 

test('Verify our first TC', async({ page })=>{

    await page.goto("https://app.vwo.com");

    await expect(page).toHaveTitle("Login - VWO"); // tohaveTile returns promise

    const img_vwo= page.locator('img'); // here no await becaue location doesnt return any promise

    await expect(img_vwo).toBeVisible();
});

// Whatever returns promise we should add await to that.
// Explicitely Brower and BrowserContext not required to be created, Playwright will do that by default.