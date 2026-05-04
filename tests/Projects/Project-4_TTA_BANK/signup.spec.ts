import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('TTA Bank Signup Test', async ({ context, page }) => {
  // Navigate to the URL
  await page.goto('https://tta-bank-digital-973242068062.us-west1.run.app/');

  // Click signup button
  await page.click('button:has-text("Sign up")');

  // Wait for the form to load
  await page.waitForSelector('input[placeholder*="John Doe"]', { timeout: 5000 });

  // Enter Full Name
  await page.fill('input[placeholder*="John Doe"]', 'test');

  // Enter Email Address
  await page.fill('input[type="email"]', 'test@test.com');

  // Enter Password
  await page.fill('input[type="password"]', '1234');

  // Click Create Account button
  await page.click('button:has-text("Create Account")');

  // Additional verification - check for common dashboard elements
  const dashboardHeading = await page.getByRole('heading', { name: 'Dashboard' });
  await expect(dashboardHeading).toBeVisible();

  // Save cookies for reuse in other tests
  const cookies = await context.cookies();
  const cookiesPath = path.join(__dirname, '../../auth.json');
  fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));
  console.log('✓ Signup successful and dashboard verified');
  console.log('✓ Cookies saved for subsequent tests');

// Store the original balance before transfer
let originalBalance: number = 0;
const balanceLocator = page
  .getByText('Total Balance')
  .locator('xpath=following-sibling::h3');

const balanceText = await balanceLocator.textContent();
console.log(balanceText); 

// const balanceText = await page
//   .locator('div', { has: page.getByText('Total Balance') })
//   .locator('h3')
//   .textContent();

if (balanceText) {
  const amount = balanceText.replace(/[^0-9.]/g, '');
  originalBalance = parseFloat(amount);
  console.log(`Original Balance: $${originalBalance}`);
}
//----
//  // Store the original balance before transfer
//   let originalBalance: number = 0;
//   const balanceElement = await page.locator('text=/Total Balance|Balance/i').first();
//   await balanceElement.waitFor({ state: 'visible', timeout: 10000 });
//   const balanceText = await balanceElement.textContent();
  
//   if (balanceText) {
//     const balanceMatch = balanceText.match(/[\d,]+\.?\d*/);
//     if (balanceMatch && balanceMatch[0]) {
//       originalBalance = parseFloat(balanceMatch[0].replace(/,/g, ''));
//       console.log(`Original Balance: $${originalBalance}`);
//     }
//   }


  // Click 'Transfer Funds' on sidebar
  await page.click('a:has-text("Transfer Funds"), button:has-text("Transfer Funds"), [class*="sidebar"] >> text=Transfer Funds');

  // Wait for Transfer Money tab/form
  await page.waitForSelector('input[placeholder*="amount"], input[type="number"]', { timeout: 5000 });

  // Click on 'Transfer Money' tab if it exists
  const transferMoneyTab = page.locator('button, [role="tab"]', { hasText: /Transfer Money|Amount/ }).first();
  if (await transferMoneyTab.isVisible()) {
    await transferMoneyTab.click();
  }

  // Enter amount as '5000'
  const amountInput = page.locator('input[placeholder*="amount"], input[type="number"]').first();
  await amountInput.fill('5000');
  console.log('✓ Amount 5000 entered');

  // Click Create Account button
  await page.click('button:has-text("Continue")');

  // Wait for 'Review Transfer' form to appear
  await page.waitForSelector('text=/Review Transfer|Confirm|Review/i', { timeout: 5000 });
  console.log('✓ Review Transfer form appeared');

  // Click 'Confirm Transfer' button
  await page.click('button:has-text("Confirm Transfer")');
  console.log('✓ Confirm Transfer button clicked');

  // Wait for toast message and log it
  const toastMessage = await page.locator('[role="alert"], .toast, .notification, [class*="toast"], [class*="message"]').first();
  await toastMessage.waitFor({ state: 'visible', timeout: 5000 });
  const toastText = await toastMessage.textContent();
  console.log(`Toast Message: ${toastText}`);

  // Wait for toast to disappear or continue
  await page.waitForTimeout(2000);

  // Click 'Dashboard' on sidebar
  await page.click('a:has-text("Dashboard"), button:has-text("Dashboard"), [class*="sidebar"] >> text=Dashboard');

  // Additional verification - check for common dashboard elements
  await expect(dashboardHeading).toBeVisible( { timeout: 5000 });

  // Wait for balance to be displayed
  await page.waitForSelector('text=/Total Balance|Balance/i', { timeout: 5000 });

  // Get the updated balance
  // Store the original balance before transfer
const balanceLocator1 = page
  .getByText('Total Balance')
  .locator('xpath=following-sibling::h3');

const balanceText1 = await balanceLocator1.textContent();
console.log(balanceText1); // "$49,995.00"

let updatedBalance: number = 0;

// const balanceText1 = await page
//   .locator('div', { has: page.getByText('Total Balance') })
//   .locator('h3')
//   .textContent();

if (balanceText1) {
  const amount = balanceText1.replace(/[^0-9.]/g, '');
  updatedBalance = parseFloat(amount);
  console.log(`Updated Balance: $${updatedBalance}`);
}
//--
//   let updatedBalance: number = 0;
//   const updatedBalanceElement = await page.locator('text=/Total Balance|Balance/i').first();
//   const updatedBalanceText = await updatedBalanceElement.textContent();
  
//   if (updatedBalanceText) {
//     const updatedBalanceMatch = updatedBalanceText.match(/[\d,]+\.?\d*/);
//     if (updatedBalanceMatch && updatedBalanceMatch[0]) {
//       updatedBalance = parseFloat(updatedBalanceMatch[0].replace(/,/g, ''));
//       console.log(`Updated Balance: $${updatedBalance}`);
//     }
//   }

  // Verify that the balance is reduced
  expect(updatedBalance).toBeLessThan(originalBalance);
  console.log(`✓ Balance verified - Reduced by: $${originalBalance - updatedBalance}`);
});
