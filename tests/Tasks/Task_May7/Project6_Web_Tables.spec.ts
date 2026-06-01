import { test, expect } from '@playwright/test';

test.describe('Web Table - Employee Directory', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the web table page
    await page.goto('https://app.thetestingacademy.com/playwright/webtable');
    await page.waitForLoadState('networkidle');
  });

  test('Search for Kabir, verify visibility and check checkbox', async ({ page }) => {
    // Get the search box
    const searchBox = page.getByPlaceholder('Search username, role, city, project...');
    await expect(searchBox).toBeVisible();
    
    // Search for Kabir
    await searchBox.fill('Kabir');
    await page.waitForTimeout(500);
    
    // Get Kabir's row - look for "Kabir Khan" in the table
    const kabirRow = page.locator('table tbody tr').filter({ hasText: 'Kabir Khan' });
    
    // Verify Kabir is visible
    await expect(kabirRow).toBeVisible();
    console.log('✓ Kabir Khan is visible in the table');
    
    // Get Kabir's checkbox using the label "Select Kabir.Khan"
    const kabirCheckbox = page.getByLabel('Select Kabir.Khan');
    
    // Verify checkbox is visible
    await expect(kabirCheckbox).toBeVisible();
    console.log('✓ Kabir\'s checkbox is visible');
    
    // Check the checkbox
    await kabirCheckbox.check();
    await page.waitForTimeout(500);
    
    // Verify checkbox is checked
    await expect(kabirCheckbox).toBeChecked();
    console.log('✓ Kabir\'s checkbox is checked');
    
    // Take a screenshot to confirm
    await page.screenshot({ path: 'kabir-checked.png', fullPage: false });
  });

});
