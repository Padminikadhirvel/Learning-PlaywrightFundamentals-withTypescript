// One Browser Multiple Contexts Multiple Pages

import {chromium, Browser, BrowserContext, Page, test} from "@playwright/test";

test("One Browser with Multiple Contexts with Multiple Pages", async () => {

// Launch browser 
let browser:Browser= await chromium.launch({headless: false});
console.log("Browser launched");

// Context 1- Admin
let adminContext: BrowserContext= await browser.newContext();
console.log("Admin Context created", adminContext);

let adminPage: Page= await adminContext.newPage();
console.log("Admin Page opened");

// Context 1 - Page 1 - Admin Login
await adminPage.goto("https://app.vwo.com/#login");
console.log("Admin URL:", adminPage.url());

// Context 1 - Page 2 - Admin Dashboard
let adminDashboardPage: Page= await adminContext.newPage();
console.log("Admin Dashboard Page opened");

await adminDashboardPage.goto("https://app.vwo.com/#dashboard/home");
console.log("Admin Dashboard URL:", adminDashboardPage.url());

//console.log("Admin Context has pages:", await adminContext.pages());


// Context 2- Guest
let guestContext: BrowserContext= await browser.newContext();
console.log("Guest Context created", guestContext);

let guestPage: Page= await guestContext.newPage();
console.log("Guest Page opened");

// Conetxt 2- Page 1- Guest Dashboard
await guestPage.goto("https://app.vwo.com/#dashboard/home");
console.log("Guest URL:", guestPage.url());

// Context 2- Page 2- Guest Login
let guestLoginPage: Page= await guestContext.newPage();
console.log("Guest Login Page opened");

await guestLoginPage.goto("https://app.vwo.com/#login");
console.log("Guest Login URL:", guestLoginPage.url());

//console.log("Guest Context has pages:", await guestContext.pages());

// Cleanup - reverse order of creation
await adminContext.close();
await guestContext.close();
await browser.close();
});