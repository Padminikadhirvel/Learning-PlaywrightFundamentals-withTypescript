import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class TtacartcheckoutpageOneTs {
    readonly page: Page;
    readonly textboxFirstName: Locator;
    readonly textboxLastName: Locator;
    readonly textboxZipPostalCode: Locator;
    readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textboxFirstName = page.getByRole("textbox", { name: "First Name" }).or(page.getByTestId("firstName")).or(page.locator("#first-name"));
        this.textboxLastName = page.getByRole("textbox", { name: "Last Name" }).or(page.getByTestId("lastName")).or(page.locator("#last-name"));
        this.textboxZipPostalCode = page.getByRole("textbox", { name: "Zip/Postal Code" }).or(page.getByTestId("postalCode")).or(page.locator("#postal-code"));
        this.buttonContinue = page.getByRole("button", { name: "Continue" }).or(page.getByTestId("continue")).or(page.locator("#continue-btn"));
    }

    async fillCheckoutPage(fname: string, lname: string, postalcode: string) {
        // Wait for and fill the first name field
        await this.textboxFirstName.waitFor({ state: 'visible', timeout: 10000 });
        await this.textboxFirstName.fill(fname);
        
        // Fill last name
        await this.textboxLastName.fill(lname);
        
        // Fill postal code
        await this.textboxZipPostalCode.fill(postalcode);
        
        // Wait for continue button to be visible and click
        await this.buttonContinue.waitFor({ state: 'visible', timeout: 10000 });
        
        // Close any backdrop that might interfere
        const backdrop = this.page.locator('#menuBackdrop.is-open');
        if (await backdrop.isVisible()) {
            await this.page.click('body');
            await this.page.waitForTimeout(500);
        }
        
        // Scroll into view and click
        await this.buttonContinue.scrollIntoViewIfNeeded();
        await this.buttonContinue.click({ timeout: 10000 });
        
        // Wait for navigation to next step
        await this.page.waitForURL(/.*checkout-step-two/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

}