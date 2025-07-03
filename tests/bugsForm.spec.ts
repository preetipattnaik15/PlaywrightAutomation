import { expect, test, Page } from '@playwright/test';
import { SpotBugsPage } from '../PageObjectModel/SpotBugsPage';

let currentURL = 'https://qa-practice.netlify.app/bugs-form';
let firstName = 'Test';
let lastName = 'Automation';
let phoneNumber = '2786565430';
let country = 'New Zealand';
let email = 'test@abc.com';
let password = 'abc1234';

let spotBugsPage: SpotBugsPage;

test.beforeEach(async ({ page }) => {
    spotBugsPage = new SpotBugsPage(page);
    await page.goto(currentURL);
});
//Verify Successull registration
test('Validation successfull registration', async ({ page }) => {
    await spotBugsPage.validInputs(firstName, lastName, phoneNumber, country, email, password);
    await expect(page.getByText('I agree with the terms and conditions')).toBeVisible();
    await spotBugsPage.clickRegister();
    await spotBugsPage.verifySuccessMessage();
});

//Verify Terms and Conditions text and checkbox
test('Checkbox for T&C', async ({ page }) => {
    await expect(page.getByText('I agree with the terms and conditions')).toBeVisible();
    await expect(page.locator('#exampleCheck1')).toBeChecked();
});

//Verify input values for First and Last displayes on result
test('First and Last name result validation', async ({ page }) => {
    await spotBugsPage.validInputs(firstName, lastName, phoneNumber, country, email, password);
    await spotBugsPage.clickRegister();
    await expect(page.locator('#resultFn')).toHaveText(`First Name: ${firstName}`);
    await expect(page.locator('#resultLn')).toHaveText(`Last Name: ${lastName}`);
});

//Checks validation message when last name is empty
test('Last name validation on - empty field', async ({ page }) => {
    await expect(page.locator('#lastName')).toBeEmpty();
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Last name is mandatory')).toBeVisible();
});

//Checks input value for phone number in result
test('Phone number result validation', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#resultPhone')).toHaveText(`Phone Number: ${phoneNumber}`);
});

//Checks validation message when phone number is less than 10 digit
test('Phone number validation - less than 10 digit', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill('2786565');
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The phone number should contain at least 10 characters!');
});

//Checks Validation message when phone number is non-numeric
test('Phone number validation - on non-numeric input', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill('qwertyabcd');
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The Phone number must contain only digits');
});

//Checks validation message when phone number is empty
test('Phone number validation on - empty field', async ({ page }) => {
    await expect(page.getByPlaceholder('Enter phone number')).toBeEmpty();
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The phone number should contain at least 10 characters!');
});

//Checks result for Country when default value is selected
test('Country validation on default selection', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Successfully registered the following information')).toBeVisible();
    await expect(page.locator('#country')).toHaveText('Country: ');
});

//Checks validation message when password is less than 6 chars
test('Password validation - on less than 6 characters', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill('pass');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The password should contain between [6,20] characters!');
});

//Checks validation message when password is more than 20 chars
test('Password validation - on more than 20 characters', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill('qwe123uioplk(*gfdsazx');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The password should contain between [6,20] characters!');
});

//Checks validation message when password is empty
test('Password validation on - empty field', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await expect(page.locator('#password')).toBeEmpty();
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#message')).toHaveText('The password should contain between [6,20] characters!');
});

//Checks validation message when password is equal to 20 chars
test('Password validation - on equal to 20 charaters', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#password').fill('qwe123uioplk(*gfdsaz');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Successfully registered the following information')).toBeVisible();
});

//Checks validation message for invalid email format
test('Email validation on - invalid format', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await page.locator('#emailAddress').fill('testabc.com');
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Invalid email')).toBeVisible();
});

//Checks validation message when email is empty
test('Email validation on - empty field', async ({ page }) => {
    await page.getByPlaceholder('Enter phone number').fill(phoneNumber);
    await expect(page.locator('#emailAddress')).toBeEmpty();
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Email is mandatory')).toBeVisible();
});

//Checks success message for double click on register button
test('Validation successfull registration on double click', async ({ page }) => {
    await spotBugsPage.validInputs(firstName, lastName, phoneNumber, country, email, password);
    await expect(page.getByText('I agree with the terms and conditions')).toBeVisible();
    await page.getByRole('button', { name: 'Register' }).dblclick();
    await spotBugsPage.verifySuccessMessage();
});

//Checks validation message when all mandatory fields and empty
test('Submit forms with all empty mandatory fields', async ({ page }) => {
    await page.locator('#firstName').fill(firstName);
    await page.locator('#countries_dropdown_menu').selectOption(country);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Fill all the mandatory fields')).toBeVisible();
});