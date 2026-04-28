import { test, expect } from "@playwright/test";

test("Invalid Login validation", async ({ page }) => {
    await page.goto("https://vwo.com/free-trial/?utm_medium=website&utm_source=login-page&utm_campaign=mof_eg_loginpage");
    await page.locator('[data-qa="page-su-step1-v1-email"]').fill("hi@gmail.com");
    await page.getByRole('checkbox', { name: 'I agree to VWO\'s Privacy' }).check();
    await page.getByRole('button', { name: 'Create a Free Trial Account' }).click();
    const invalidEmail = page.locator('[data-qa="page-su-step1-v1-email"].invalid-input');
    await expect(invalidEmail).toBeVisible();

});