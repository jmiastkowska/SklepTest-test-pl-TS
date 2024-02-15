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
      
      await myAccountPage.emailRegisterInput.fill('truskawka9@wp.pl');
      await myAccountPage.passwordRegisterInput.fill('passTestowe12345,.');
      await myAccountPage.registerButton.click();
     await expect(myAccountPage.UserNameText).toHaveText('truskawka9');
    });
   
    test('login to account', async ({ page }) => {
        await myAccountPage.passwordRegisterInput.fill('passTest123.');
        await myAccountPage.registerButton.click();
        await page.getByText('truskawka2').first().click();
      });
});