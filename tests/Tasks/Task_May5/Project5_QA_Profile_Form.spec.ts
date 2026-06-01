import { test, expect } from '@playwright/test';

test.describe('QA Profile Form Practice', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the profile form page
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');
    await page.waitForLoadState('networkidle');
  });

  test('Fill out complete QA Profile Form', async ({ page }) => {
    // ===== PERSONAL INFORMATION SECTION =====
    
    // Fill First Name with test ID
    await page.getByTestId('first-name').fill('John');
    
    // Fill Last Name
    await page.getByTestId('last-name').fill('Smith');
    
    // Select Gender - Male using test ID
    await page.getByTestId('gender-male').check();
    
    // ===== PROFESSIONAL DETAILS SECTION =====
    
    // Select Years of Experience
    await page.getByLabel('Years of experience').selectOption('5');
    
    // Fill Date of Birth (use YYYY-MM-DD format for date input)
    await page.getByTestId('profile-date').fill('1995-01-01');
    
    // Select Profession - Automation Tester using test ID
    await page.getByTestId('profession-automation').check();
    
    // ===== TECHNICAL SKILLS SECTION =====
    
    // Select Technical Skills - Check Selenium Webdriver
    await page.getByLabel('Selenium Webdriver').check();
    
    // ===== REGIONS/CONTINENTS SECTION =====
    
    // Select Regions - Check Asia and North America
    await page.getByLabel('Asia').check();
    await page.getByLabel('North America').check();
    
    // ===== SUBMIT FORM =====
    
    // Click Save Profile button
    await page.getByRole('button', { name: 'Save profile' }).click();
    
    // Wait for confirmation or success message
    await page.waitForTimeout(2000);
    
    // Take a screenshot to verify form submission
    await page.screenshot({ path: 'profile-form-filled.png', fullPage: true });
  });

 
});
