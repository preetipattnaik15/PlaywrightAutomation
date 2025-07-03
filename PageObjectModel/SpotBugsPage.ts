import { expect, Page, Locator } from '@playwright/test';
export class SpotBugsPage {
    page: Page;
    firstName: Locator;
    lastName: Locator;
    phoneNumber: Locator;
    country: Locator;
    email: Locator;
    password: Locator;
    register: Locator;
    successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.phoneNumber = page.getByPlaceholder('Enter phone number');
        this.country = page.locator('#countries_dropdown_menu');
        this.email = page.locator('#emailAddress');
        this.password = page.locator('#password');
        this.register = page.getByRole('button', { name: 'Register' });
        this.successMessage = page.getByText('Successfully registered the following information');
    }

    async validInputs(firstName, lastName, phoneNumber, country, email, password) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.phoneNumber.fill(phoneNumber);
        await this.country.selectOption(country);
        await this.email.fill(email);
        await this.password.fill(password);
    }
    async clickRegister() {
        await this.register.click();
    }
    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }
}