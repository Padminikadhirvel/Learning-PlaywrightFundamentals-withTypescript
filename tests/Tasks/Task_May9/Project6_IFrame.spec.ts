import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('IFrame ', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/frames/');

    let vechileFrame: FrameLocator = await page.frameLocator('#frame-one');
    await vechileFrame.locator('#RESULT_TextField-1').fill('Hyundai i10');
    await vechileFrame.locator('#RESULT_TextField-2').fill('Pramod Dutta');
    await vechileFrame.locator('#RESULT_TextField-3').fill('2012');
    await vechileFrame.locator('#RESULT_RadioButton-1').selectOption('Hatchback');

    await vechileFrame.locator('#RESULT_TextField-4').fill('2015');

    await vechileFrame.locator('#RESULT_TextArea-1').fill('Amazing car with amazing family car in a budget');

    await vechileFrame.getByText('Submit registration', { exact: true }).click();

    let output = await vechileFrame.locator("#vehicle-output").innerText();
    console.log(output);

    await page.waitForTimeout(5000);



});
test('Multi-Frame Test', async ({ page }) => {

      await page.goto('https://app.thetestingacademy.com/playwright/frames/multi-frames');

    let mainFrame: FrameLocator = await page.frameLocator('[name="main"]');
    const headerText = await mainFrame.locator('h2').innerText();
    console.log(headerText);

      // total number of <frame> elements on the page
    const allFrames: Locator[] = await page.locator('//frame').all();
    console.log('total number of frames: ' + allFrames.length);

    for (const frame of allFrames) {
        console.log(await frame.getAttribute('name'), ': ', await frame.getAttribute('src'));

    }

    let sideFrame: FrameLocator = await page.frameLocator('[name="side"]');
    await sideFrame.getByTestId('side-link-registration').click();


    await page.waitForTimeout(5000);

});