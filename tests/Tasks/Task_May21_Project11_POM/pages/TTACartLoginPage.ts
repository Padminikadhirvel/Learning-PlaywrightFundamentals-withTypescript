import { type Locator, type Page } from '@playwright/test';

export class Loginpage {
    readonly page: Page;
    readonly textboxUsername: Locator;
    readonly textboxPassword: Locator;
    readonly buttonLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textboxUsername = page.getByRole("textbox", { name: "Username" }).or(page.getByTestId("username")).or(page.locator("#user-name"));
        this.textboxPassword = page.getByRole("textbox", { name: "Password" }).or(page.getByTestId("password")).or(page.locator("#password"));
        this.buttonLogin = page.getByRole("button", { name: "Login" }).or(page.getByTestId("login-button")).or(page.locator("#login-button"));
    }

    async goto() {
        await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    }

    async login(username: string, password: string) {
        // Wait for and fill username
        await this.textboxUsername.waitFor({ state: 'visible', timeout: 10000 });
        await this.textboxUsername.fill(username);
        
        // Fill password
        await this.textboxPassword.fill(password);
        
        // Wait for login button and click
        await this.buttonLogin.waitFor({ state: 'visible', timeout: 10000 });
        await this.buttonLogin.click({ timeout: 10000 });
        
        // Wait for successful login - flexible URL pattern
        await this.page.waitForURL(/.*ttacart.*/, { timeout: 15000 });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    }
}