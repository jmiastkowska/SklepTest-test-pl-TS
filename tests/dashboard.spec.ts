import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';

test.describe('test main function of the dashboard', () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    dashboardPage = new DashboardPage(page);
  });

  test('add 1 product to the cart', async ({ page }) => {
   
    await dashboardPage.addFirstProductToTheCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.titlePage).toHaveText('Cart');
  });
});
