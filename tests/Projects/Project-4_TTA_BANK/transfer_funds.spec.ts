import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('TTA Bank Transfer Funds Test', async ({ context, page }) => {
  // Load cookies from signup session - wait for file to exist
  const cookiesPath = path.join(__dirname, '../../auth.json');
  let maxAttempts = 30;
  
  while (!fs.existsSync(cookiesPath) && maxAttempts > 0) {
    console.log('⏳ Waiting for cookies file from signup test...');
    await page.waitForTimeout(1000);
    maxAttempts--;
  }
  
  if (fs.existsSync(cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    await context.addCookies(cookies);
    console.log('✓ Cookies loaded from signup session');
  } else {
    throw new Error('Cookies file not found. Please run signup test first.');
  }

  // Navigate to the app with stored cookies
  await page.goto('https://tta-bank-digital-973242068062.us-west1.run.app/');

  // Wait for dashboard to fully load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Additional wait for elements to render

  // Store the original balance before transfer
  let originalBalance: number = 0;
  const originalBalanceText = await page
    .locator('div', { has: page.getByText('Total Balance') })
    .locator('h3')
    .textContent();

  if (originalBalanceText) {
    const balanceValue = originalBalanceText.replace(/[^0-9.]/g, '');
    if (balanceValue) {
      originalBalance = parseFloat(balanceValue);
      console.log(`Original Balance: $${originalBalance}`);
    }
  }

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
  console.log(`Toast Message: ${toastText || 'No message'}`);

  // Wait for toast to disappear or continue
  await page.waitForTimeout(2000);

  // Click 'Dashboard' on sidebar
  await page.click('a:has-text("Dashboard"), button:has-text("Dashboard"), [class*="sidebar"] >> text=Dashboard');

  

  // Wait for balance to be displayed
  await page.waitForSelector('text=/Total Balance|Balance/i', { timeout: 5000 });

  // Get the updated balance
  let updatedBalance: number = 0;
  const updatedBalanceText = await page
    .locator('div', { has: page.getByText('Total Balance') })
    .locator('h3')
    .textContent();

  if (updatedBalanceText) {
    const updatedBalanceValue = updatedBalanceText.replace(/[^0-9.]/g, '');
    if (updatedBalanceValue) {
      updatedBalance = parseFloat(updatedBalanceValue);
      console.log(`Updated Balance: $${updatedBalance}`);
    }
  }

  // Verify that the balance is reduced
  expect(updatedBalance).toBeLessThan(originalBalance);
  console.log(`✓ Balance verified - Reduced by: $${originalBalance - updatedBalance}`);
});
