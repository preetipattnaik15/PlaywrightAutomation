import { expect, test } from '@playwright/test';

let currentURL = 'https://qa-practice.netlify.app/bugs-form';

//Verifies 200 response for the page
test('Validate successful page load', async ({ page }) => {
    const response = await page.goto(currentURL);
    await expect(response?.status()).toBe(200);
});

//Validaties the url
test('Validate page URL', async ({ page }) => {
    await page.goto(currentURL);
    await expect(page.url()).toBe(currentURL);
});

//Validates the page header
test('Validate the page title', async ({ page }) => {
    await page.goto(currentURL);
    await expect(page.getByText("CHALLENGE - Spot the BUGS!")).toBeVisible({ timeout: 10000 });
});

//Validates all form fields is visible
test('Validate all required form fields', async ({ page }) => {
    await page.goto(currentURL);
    await expect(page.getByLabel('First Name')).toBeVisible();
    await expect(page.getByLabel('Last Name*')).toBeVisible();
    await expect(page.getByLabel('Phone nunber*')).toBeVisible();
    await expect(page.getByLabel('Country')).toBeVisible();
    await expect(page.getByText('Email address*')).toBeVisible();
    await expect(page.getByText('Password*')).toBeVisible();
});

//Validates register button is visible
test('Validate register button', async ({ page }) => {
    const response = await page.goto('https://qa-practice.netlify.app/bugs-form');
    await expect(page.locator('#registerBtn').isVisible).toBeTruthy();
});



