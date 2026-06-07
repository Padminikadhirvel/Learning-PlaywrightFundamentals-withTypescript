import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";

test('Verify that the login works', async ({ page }) => {

    await allure.epic("VWO Login Tests");
    await allure.description("Verify that the login is page works")
    await allure.feature("Essential features");
    await allure.story("Authentication");


    await page.goto("https://app.vwo.com/#login");
    await page.waitForTimeout(2000);

    await page.fill("#login-username", "opg73@singleuseemail.site");
    await page.fill("#login-password", "Wingify@4321");
    await page.waitForTimeout(1500);

    await page.click("#js-login-btn");

    // Wait for login to actually complete before snapshotting storage —
    // otherwise the auth cookie isn't set yet and the saved state is empty.
    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle("Dashboard");


});