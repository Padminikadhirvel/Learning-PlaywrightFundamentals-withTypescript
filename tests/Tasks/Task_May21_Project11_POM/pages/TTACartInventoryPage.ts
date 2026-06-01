import { type Locator, type Page } from '@playwright/test';

export class TtacartinventorypageTs {
    readonly page: Page;
    readonly addToCartTestAllthethings: Locator;
    readonly addToCartTTABikeLight: Locator;
    readonly addToCartTTABoltTShirt: Locator;
    readonly addToCartTtaFleece: Locator;
    readonly linkShoppingCart: Locator;
    readonly menubutton: Locator;
    readonly logoutlink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartTestAllthethings = page.locator('[data-test="add-to-cart-test-allthethings-tshirt-red"]');
        this.addToCartTTABikeLight = page.locator('[data-test="add-to-cart-tta-bike-light"]');
        this.addToCartTTABoltTShirt = page.locator('[data-test="add-to-cart-tta-bolt-tshirt"]');
        this.addToCartTtaFleece = page.locator('[data-test="add-to-cart-tta-fleece-jacket"]');
        this.linkShoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.menubutton = page.getByTestId("open-menu").or(page.getByRole("button", { name: "Open menu" })).or(page.locator("#react-burger-menu-btn"));
        this.logoutlink = page.getByTestId("logout-sidebar-link").or(page.getByRole("link", { name: "Logout" })).or(page.locator("#logout_sidebar_link"));
    }

    // async goto() {
    //     await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    // }

    async addToInventory() {
        // Add items to cart with waits
        const items = [
            this.addToCartTestAllthethings,
            this.addToCartTTABikeLight,
            this.addToCartTTABoltTShirt,
            this.addToCartTtaFleece
        ];
        
        for (const item of items) {
            await item.waitFor({ state: 'visible', timeout: 10000 });
            await item.click({ timeout: 10000 });
            await this.page.waitForTimeout(300); // Small delay between clicks
        }
        
        // Navigate to shopping cart
        await this.linkShoppingCart.waitFor({ state: 'visible', timeout: 10000 });
        await this.linkShoppingCart.click({ timeout: 10000 });
        
        // Wait for cart page to load
        await this.page.waitForURL(/.*cart/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

    async logout() {
        // Open menu
        await this.menubutton.waitFor({ state: 'visible', timeout: 10000 });
        await this.menubutton.click({ timeout: 10000 });
        await this.page.waitForTimeout(500); // Wait for menu to appear
        
        // Click logout
        await this.logoutlink.waitFor({ state: 'visible', timeout: 10000 });
        await this.logoutlink.click({ timeout: 10000 });
        
        // Wait for redirect to login/home page
        await this.page.waitForURL(/.*ttacart/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }

}