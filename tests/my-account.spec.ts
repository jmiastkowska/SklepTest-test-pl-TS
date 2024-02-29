import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { MyAccountPage } from '../pages/myAccount.page';
import { loginData } from '../test-data/login.data';
import { checkServerIdentity } from 'tls';

test.describe('tests login and register', () => {
  let myAccountPage: MyAccountPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.myAccountButton.click();
    myAccountPage = new MyAccountPage(page);
  });

  test('register new account', async ({ page }) => {
    const email = 'truskawka5@wp.pl';
    const password = 'passTestowe12345,.';
    await myAccountPage.emailRegisterInput.fill(email);
    await myAccountPage.passwordRegisterInput.pressSequentially(password, {
      delay: 100,
    });
    await myAccountPage.passwordRegisterInput.blur();
    await expect(myAccountPage.confirmationStrongPasswordText).toBeVisible();
    await expect(myAccountPage.registerButton).not.toBeDisabled();
    await myAccountPage.registerButton.click();
    await expect(myAccountPage.userNameText).toContainText('truskawka5');
  });

  test('login to account', async ({ page }) => {
    const username = loginData.username;
    const password = loginData.password;
    await myAccountPage.loginToAccount(username, password);
    await expect(myAccountPage.userNameText).toContainText(loginData.username);
  });

  test('adding an billing address to account', async ({ page }) => {
    const username = loginData.username;
    const password = loginData.password;
    const name = 'Ewa';
    const surname = 'Truskawka';
    const street = 'SommerStrasse';
    const postcode = '1110';
    const city = 'Vienna';
    await myAccountPage.loginToAccount(username, password);
    await page.getByRole('link', { name: 'Addresses' }).first().click();
    await page
      .locator('header')
      .filter({ hasText: 'Billing address Edit' })
      .getByRole('link')
      .click();

    await myAccountPage.firstNameInput.fill(name);
    await myAccountPage.lastNameInput.fill(surname);
    await myAccountPage.billingCountryContainer.click();
    await page.getByRole('option', { name: 'Austria' }).click();
    await myAccountPage.streetInput.fill(street);
    await myAccountPage.postcodeInput.fill(postcode);
    await myAccountPage.cityInput.fill(city);
    await myAccountPage.phoneNumberInput.fill('564321789');
    await myAccountPage.saveAddressButton.click();

    await expect(myAccountPage.confirmationAddressChangeText).toContainText(
      'Address changed successfully.',
    );
  });

  test('check warning message by wrong postcode on billing address', async ({
    page,
  }) => {
    const username = loginData.username;
    const password = loginData.password;
    const name = 'John';
    const surname = 'Trust';
    const street = 'Dluga';
    const postcode = '99';
    const city = 'Wroclaw';
    const phone = '987654321'
    await myAccountPage.loginToAccount(username, password);
    await page.getByRole('link', { name: 'Addresses' }).first().click();
    await page
      .locator('header')
      .filter({ hasText: 'Billing address Edit' })
      .getByRole('link')
      .click();

    await myAccountPage.firstNameInput.fill(name);
    await myAccountPage.lastNameInput.fill(surname);
  
    await myAccountPage.streetInput.fill(street);
    await myAccountPage.postcodeInput.fill(postcode);
    await myAccountPage.cityInput.fill(city);
    await myAccountPage.phoneNumberInput.fill(phone);
    await myAccountPage.saveAddressButton.click();

    await expect(myAccountPage.errorMessage).toContainText(
      'Please enter a valid postcode / ZIP.',
    );
  });
});
