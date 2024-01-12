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

  test('add 3 products from diffrent category to the cart', async ({ page }) => {
  // const expectedFirstProduct =  await page.getByRole('cell', { name: 'Black Top' });
  // const expectedSecondProduct = await page.getByRole('cell', { name: 'FITT Belts' });
  // const expectedThirdProduct = await page.getByRole('cell', { name: 'Jennifer Scarf' });

    await dashboardPage.addToCartFirstButton.click();
    await dashboardPage.addToCartFirstMostWantedBeltButton.click();
    await dashboardPage.addToCartScrafButton.click();
    await dashboardPage.addToCartOnSaleManagoShirtButton.click();
    await dashboardPage.myCartButton.click();

    const cartPage = new CartPage(page);
    await page.reload();
    //await expect([expectedFirstProduct, expectedSecondProduct, expectedThirdProduct]).toEqual(expect.arrayContaining([expectedFirstProduct, expectedSecondProduct, expectedThirdProduct]));
    await expect(page.locator('div >form')).toContainText(['Black Top', 'FITT Belts','Jennifer Scarf','Manago shirt']);

  
  });

});
