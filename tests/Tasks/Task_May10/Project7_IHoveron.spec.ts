import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('Hover on ', async ({ page }) => {

  await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');

  // 1) hover Add-ons → click Taxi
  await page.getByTestId('nav-add-ons').hover();
  await page.getByTestId('test-id-Wifi').click();
  await page.keyboard.press('Escape'); // close the menu
  //wait to visible the output locator
  await page.waitForSelector('[data-testid="hover-output"]');
  await expect(page.getByTestId('hover-output')).toContainText('Wifi');

  


});
