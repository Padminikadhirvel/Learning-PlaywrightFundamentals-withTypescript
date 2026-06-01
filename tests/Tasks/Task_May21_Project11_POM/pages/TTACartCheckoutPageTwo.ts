import { type Locator, type Page } from '@playwright/test';

export class TtacartcheckoutpageTwoTs {
    readonly page: Page;
    readonly buttonFinish: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonFinish = page.locator('#finish-btn');
    }

    async finishCheckoutPage() {
        // Wait for the finish button to be visible
        await this.buttonFinish.waitFor({ state: 'visible', timeout: 10000 });
        
        // Close any backdrop/modals that might be intercepting clicks
        const backdrop = this.page.locator('#menuBackdrop.is-open');
        if (await backdrop.isVisible()) {
            await this.page.click('body'); // Click to close backdrop
            await this.page.waitForTimeout(500);
        }
        
        // Ensure element is ready to click
        await this.buttonFinish.scrollIntoViewIfNeeded();
        
        // Click the finish button with retry logic
        await this.buttonFinish.click({ timeout: 10000, force: false });
        
        // Wait for navigation to confirmation page
        await this.page.waitForURL(/.*checkout-complete/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

}