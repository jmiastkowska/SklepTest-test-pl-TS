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
});
