import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { MyAccountPage } from '../pages/myAccount.page';


test.describe('tests login and register', () => {
    let myAccountPage: MyAccountPage;
  
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
     
      const dashboardPage = new DashboardPage(page);
    await dashboardPage.myAccountButton.click();
      myAccountPage = new MyAccountPage(page);
    });
  
    test('register newaccount', async ({ page }) => {
      await page.getByLabel('Email address *', { exact: true }).click();
      await page.getByLabel('Email address *', { exact: true }).fill('truskawka2@wp.pl');
      await page.getByLabel('Email address *', { exact: true }).press('Tab');
      await page.locator('#reg_password').fill('passTest123.');
      await page.getByRole('button', { name: 'Register' }).click();
      await page.getByText('truskawka2').first().click();
    });

});