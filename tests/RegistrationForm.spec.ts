import { expect, test } from '@playwright/test';
let currentURL = 'https://qa-practice.netlify.app/bugs-form';
let firstName = 'Test';
let lastName = 'Automation';
let phoneNumber = '2786565430';
let country = 'New Zealand';
let email = 'test@abc.com';
let password = 'abc123';

test('Validation successfull registration' , async ({page}) => {
    await page.goto(currentURL);
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#countries_dropdown_menu').selectOption(country);
    await page.locator('#emailAddress').fill(email);
    await page.locator('#password').fill(password);
    await expect(page.getByText('I agree with the terms and conditions')).toBeVisible();
    await page.getByRole('button' , { name : 'Register'}).click();
    await expect(page.getByText('Successfully registered the following information')).toBeVisible();
    await expect(page.locator('#resultFn')).toHaveText(`First Name: ${firstName}`);
    await expect(page.locator('#resultLn')).toHaveText(`Last Name: ${lastName}`);
    await expect(page.locator('#resultPhone')).toHaveText(`Phone Number: ${phoneNumber}`);
    await expect(page.locator('#country')).toHaveText(`Country: ${country}`);
    await expect(page.locator('#resultEmail')).toHaveText(`Email: ${email}`);
});
test('Submit forms with all empty mandatory fields' , async ({ page }) => {
    await page.goto(currentURL);
    await page.locator('#firstName').fill(firstName);
    await page.locator('#countries_dropdown_menu').selectOption(country);
    await page.getByRole('button' , { name : 'Register'}).click();
    await expect(page.getByText('Fill all the mandatory fields')).toBeVisible();
});