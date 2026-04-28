import { test, expect } from "@playwright/test";

test("Invalid Login validation", async ({ page }) => {
    await page.goto("https://app.vwo.com/#login");

    // <li>
    // <label> Email address</label>
    // <div>
    // <input type="email" class="text-input W(100%)" name="username" vwo-html-translate-attr="placeholder" vwo-html-translate-placeholder="login:enterEmailID" id="login-username" data-qa="hocewoqisi" placeholder="Enter email ID">
    // </div>
    // </li>

    // 'Email address' is coming from label, which is associated as sibling of div of input field.
    await page.getByRole("textbox", { name: "Email address" }).fill("admin");
    await page.getByRole("textbox", { name: "Password" }).fill("pass123");

    // With only {name: 'Sign in'} 4 elements are getting matched, so we need to use exact: true to match the exact element with name: Sign in
    // Can see all 4 element description in report generated after test execution
    
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();


    // VALIDATION
    let error_message = page.locator('#js-notification-box-msg');
    await expect(error_message).toContainText("Your email, password, IP address or location did not match");

    // another way to validate the error message is by using getByText() method 
    await expect(page.getByText("Your email, password, IP address or location did not match")).toBeVisible();
});