import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { ContactPage } from "../pages/contact.page";

test.describe('tests sending messages', () => {
    let contactPage: ContactPage;
    
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      const dashboardPage = new DashboardPage(page);
      
      contactPage = new ContactPage(page);
    });
  
    test('send message with correct data', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const name = 
        await dashboardPage.sideMenu.aboutUsButton.click();
        await contactPage.nameInput.fill();
       // await cartPage.updateCartButton.click();
  
        //  await expect(cartPage.quantity).toHaveValue('2');
        await page.getByLabel('Your Name (required)').click();
        await page.getByLabel('Your Name (required)').fill('tester1');
        await page.getByLabel('Your Email (required)').click();
        await page.getByLabel('Your Email (required)').fill('testtest@wp.pl');
        await page.getByLabel('Subject').click();
        await page.getByLabel('Subject').fill('testuj');
        await page.getByLabel('Your Message').click();
        await page.getByLabel('Your Message').fill('jakas wiadomosc');
        await page.getByRole('button', { name: 'Send' }).click();
    });

});