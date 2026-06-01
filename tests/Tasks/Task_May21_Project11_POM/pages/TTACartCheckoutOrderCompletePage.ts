import { type Locator, type Page } from '@playwright/test';

export class TtacartcheckoutOrderCompletepageTs {
    readonly page: Page;
    readonly backhome: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backhome = page.getByTestId("back-to-products").or(page.getByRole("link", { name: "Back Home" })).or(page.getByText("Back Home"));
    }

    async confirmOrderandBackHome() {
        // Wait for the back home link to be visible and enabled
        await this.backhome.waitFor({ state: 'visible', timeout: 10000 });
        
        // Close any backdrop/modals if present
        const backdrop = this.page.locator('#menuBackdrop.is-open');
        if (await backdrop.isVisible()) {
            await this.page.click('body'); // Click to close backdrop
            await this.page.waitForTimeout(500);
        }
        
        // Click the back home button
        await this.backhome.click({ timeout: 10000 });
        
        // Wait for navigation to home page
        await this.page.waitForURL(/.*ttacart/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

}