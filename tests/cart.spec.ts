import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { DashboardPage } from "../pages/dashboard.page";

test.describe('tests cart page', () => {
    let cartPage: CartPage;
    
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      const dashboardPage = new DashboardPage(page);
      
      cartPage = new CartPage(page);
    });
  
    test('change number of products in the cart', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
        await dashboardPage.addFirstProductToTheCart();
  
     // const cartPage = new CartPage(page);
     // await expect(cartPage.titlePage).toHaveText('Cart');
    });

});