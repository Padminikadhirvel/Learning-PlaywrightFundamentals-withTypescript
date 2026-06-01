import { test, expect } from '@playwright/test';
import { Loginpage } from '../pages/TTACartLoginPage';
import { TtacartinventorypageTs } from '../pages/TTACartInventoryPage';
import { TtacartcheckoutpageTs } from '../pages/TTACartCheckoutPage';
import { TtacartcheckoutpageOneTs } from '../pages/TTACartCheckoutPageOne';
import { TtacartcheckoutpageTwoTs } from '../pages/TTACartCheckoutPageTwo';
import { TtacartcheckoutOrderCompletepageTs } from '../pages/TTACartCheckoutOrderCompletePage';
import { faker } from '@faker-js/faker';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

const ttacartUsername = getRequiredEnv('TTACART_USERNAME');
const ttacartPassword = getRequiredEnv('TTACART_PASSWORD');

test.describe('TTA Cart E2E - Order Confirmation', () => {

    test('TTA Cart E2E', async ({ page }) => {
        const loginPage = new Loginpage(page);
        await loginPage.goto();
        await loginPage.login(ttacartUsername, ttacartPassword);
        const ttacartinventorypageTs = new TtacartinventorypageTs(page);
        await ttacartinventorypageTs.addToInventory();
        await expect(page).toHaveURL('https://app.thetestingacademy.com/playwright/ttacart/cart');
        const ttacartCheckout = new TtacartcheckoutpageTs(page);
        ttacartCheckout.checkoutCart();
        const ttacartCheckoutPageOne = new TtacartcheckoutpageOneTs(page);
        const user = generateUser();
        await ttacartCheckoutPageOne.fillCheckoutPage(user.firstname, user.lastname, user.zipcode);
        await expect(page).toHaveURL('https://app.thetestingacademy.com/playwright/ttacart/checkout-step-two');
        const ttacartCheckoutPageTwo = new TtacartcheckoutpageTwoTs(page);
        ttacartCheckoutPageTwo.finishCheckoutPage();
        const ttacartcheckoutOrderCompletepage = new TtacartcheckoutOrderCompletepageTs(page);
        ttacartcheckoutOrderCompletepage.confirmOrderandBackHome();
        ttacartinventorypageTs.logout();
        await page.waitForTimeout(2000);
    });
});

function generateUser() {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        zipcode: faker.location.zipCode(),
    };
}