import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { MyAccountPage } from '../pages/myAccount.page';
import { loginData } from '../test-data/login.data';

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
    await myAccountPage.passwordRegisterInput.pressSequentially(password, { delay: 100 });
    await myAccountPage.passwordRegisterInput.blur();
   await expect(myAccountPage.confirmationStronhPasswordText).toBeVisible();
   await expect(myAccountPage.registerButton).not.toBeDisabled();
    await myAccountPage.registerButton.click();
    await expect(myAccountPage.userNameText).toContainText('truskawka5');
  });

  test('login to account', async ({ page }) => {
    const username = loginData.username;
    const password = loginData.password;
    await myAccountPage.usernameInput.fill(username);
    await myAccountPage.passwordInput.fill(password);
    await myAccountPage.loginButton.click();
    await expect(myAccountPage.userNameText).toContainText(loginData.username);
  });


  test('adding an billing address to account', async ({ page }) => {
    const username = loginData.username;
    const password = loginData.password;
    await myAccountPage.usernameInput.fill(username);
    await myAccountPage.passwordInput.fill(password);
    await myAccountPage.loginButton.click();
    await page.getByRole('link', { name: 'Addresses' }).click();
    await page.locator('header').filter({ hasText: 'Billing address Edit' }).getByRole('link').click();
   
    await page.getByLabel('First name *').fill('Ewa');
    await page.getByLabel('Last name *').fill('Truskawka');
    await page.getByRole('textbox', { name: 'Poland' }).click();
    await page.getByRole('option', { name: 'Austria' }).click();
    await page.getByPlaceholder('House number and street name').fill('SommerStrasse');
    await page.getByLabel('Postcode / ZIP *').fill('12345');
    await page.getByLabel('Town / City *').fill('Vien');
    await page.getByText('Dashboard Orders Downloads Addresses Account details Logout Billing address').click();
    await page.getByLabel('Phone *').fill('564321789');
    await page.getByRole('button', { name: 'Save address' }).click();

   // await expect(myAccountPage.userNameText).toContainText(loginData.username);
  });
});
