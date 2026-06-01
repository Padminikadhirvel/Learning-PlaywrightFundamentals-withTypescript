import { type Locator, type Page } from '@playwright/test';

export class TtacartcheckoutpageTs {
    readonly page: Page;
    readonly checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkout = page.getByText('Checkout');
    }

    async checkoutCart() {
        // Wait for checkout button to be visible
        await this.checkout.waitFor({ state: 'visible', timeout: 10000 });
        
        // Close any backdrop if present
        const backdrop = this.page.locator('#menuBackdrop.is-open');
        if (await backdrop.isVisible()) {
            await this.page.click('body');
            await this.page.waitForTimeout(500);
        }
        
        // Scroll into view and click
        await this.checkout.scrollIntoViewIfNeeded();
        await this.checkout.click({ timeout: 10000 });
        
        // Wait for checkout page to load
        await this.page.waitForURL(/.*checkout-step-one/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

}