import { test, expect, Locator } from '@playwright/test';

const URL = 'https://selectorshub.com/xpath-practice-page/';

test.describe('Shadow DOM handling Practice Page', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to URL
        await page.goto(URL);
    });

    test('locate Shadow DOM and enter value', async ({ page }) => {

        // Fill the Username textbox
        await page.getByTitle('user name field').fill('Sathish Kumar');
        // Fill the Pizza Name textbox
        await page.getByPlaceholder('Enter pizza name').fill('Dominos Pizza');
        // Fill the Password textbox
        await page.getByPlaceholder('enter password').fill('password@123');

        await page.waitForTimeout(3000);

    });

});