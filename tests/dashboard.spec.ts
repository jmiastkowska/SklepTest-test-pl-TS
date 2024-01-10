import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('test main function of the dashboard', () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    dashboardPage = new DashboardPage(page);
  });

  test('add 1 product to the cart', async ({ page }) => {
  
  await page.locator('#tyche_products-1').getByRole('link', { name: ' Add to cart' }).first().click();
  await page.getByRole('link', { name: ' My Cart - zł' }).click();
  
  await expect(page.getByRole('heading', { name: 'Cart', exact: true })).toHaveText('Cart');
});

    
  });

