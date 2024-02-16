import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { MyAccountPage } from '../pages/myAccount.page';
import { TIMEOUT } from 'dns';

test.describe('tests login and register', () => {
  let myAccountPage: MyAccountPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.myAccountButton.click();
    myAccountPage = new MyAccountPage(page);
  });

  test('register new account', async ({ page }) => {
    await myAccountPage.emailRegisterInput.fill('truskawka5@wp.pl');
    await myAccountPage.passwordRegisterInput.pressSequentially('passTestowe12345,.', { delay: 100 });
    await myAccountPage.passwordRegisterInput.blur();
   await expect(myAccountPage.confirmationStronhPasswordText).toBeVisible();
   await expect(myAccountPage.registerButton).not.toBeDisabled();
    await myAccountPage.registerButton.click();
    await expect(myAccountPage.userNameText).toContainText('truskawka5');
  });

  test('login to account', async ({ page }) => {
    await myAccountPage.usernameInput.fill('truskawka2');
    await myAccountPage.passwordInput.fill('passTest123.');
    await myAccountPage.loginButton.click();
    await page.getByText('truskawka2').first().click();
  });
});
