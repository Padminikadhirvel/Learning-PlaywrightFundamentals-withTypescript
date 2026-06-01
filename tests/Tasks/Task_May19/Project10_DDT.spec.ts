import { test, expect } from '@playwright/test';
import path from 'path';
import { readCSV } from './csvReader';

test.describe('DDT CSV - Registration', () => {
    const registerData = readCSV(path.join(__dirname, 'register.csv'));

    for (const data of registerData) {

        test(`Register with : ${data.firstName} ${data.lastName}`, async ({ page }) => {
            await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');

            // Fill First Name with CSV data
            await page.getByLabel('First name').fill(data.firstName);
            
            // Fill Last Name with CSV data
            await page.getByLabel('Last name').fill(data.lastName);
            
            // Select Gender - alternating between Male and Female based on index
            const isMale = registerData.indexOf(data) % 2 === 0;
            if (isMale) {
                await page.getByTestId('gender-male').check();
            } else {
                await page.getByTestId('gender-female').check();
            }
            
            // ===== PROFESSIONAL DETAILS SECTION =====
            
            // Select Years of Experience - use simple values that work
            const experienceOptions = ['5', '5', '5', '5', '5', '5']; // Use '5' for all since form may have limited options
            const experienceIndex = registerData.indexOf(data) % experienceOptions.length;
            await page.getByLabel('Years of experience').selectOption(experienceOptions[experienceIndex]);
            
            // Fill Date of Birth (use YYYY-MM-DD format for date input)
            await page.getByTestId('profile-date').fill('1990-01-01');
            
            // Select Profession - alternating between Manual and Automation Tester
            if (isMale) {
                await page.getByTestId('profession-automation').check();
            } else {
                await page.getByTestId('profession-manual').check();
            }
            
            // ===== TECHNICAL SKILLS SECTION =====
            
            // Select Technical Skills - Check Selenium Webdriver
            await page.getByLabel('Selenium Webdriver').check();
            
            // ===== REGIONS/CONTINENTS SECTION =====
            
            // Select Regions - Check Asia and North America for even rows, Europe and Africa for odd
            if (isMale) {
                await page.getByLabel('Asia').check();
                await page.getByLabel('North America').check();
            } else {
                await page.getByLabel('Europe').check();
                await page.getByLabel('Africa').check();
            }
            
            // ===== SUBMIT FORM =====
            
            // Click Save Profile button
            await page.getByRole('button', { name: 'Save profile' }).click();
            
            // Wait for confirmation or success message
            await page.waitForTimeout(2000);
            
            // Take a screenshot to verify form submission
            await page.screenshot({ path: `profile-form-${data.firstName}-${data.lastName}.png`, fullPage: true });


        });

    }


});