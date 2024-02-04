import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { TIMEOUT } from 'dns';
import { JacketSoulColorPage } from '../pages/JacketsSoulColor.page';
import { PageType } from '../helpers/pageTypes';
import { SideMenuComponent } from '../components/side-menu.component';

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

    test('add 3 products from diffrent category to the cart', async ({
      page,
    }) => {
      const expectedFirstProduct = page.getByRole('cell', {
        name: 'Black Top',
      });
    const expectedSecondProduct = page.getByRole('cell', {name: 'FITT Belts',});
      const expectedThirdProduct = page.getByRole('cell', {
        name: 'Jennifer Scarf',
      });

      await dashboardPage.addToCartFirstButton.click();
      await dashboardPage.addToCartFirstMostWantedBeltButton.click();
      await dashboardPage.addToCartScrafButton.click();
      await dashboardPage.myCartButton.click();

      const cartPage = new CartPage(page);
      await expect(expectedFirstProduct).toContainText('Black Top');
      await expect(expectedSecondProduct).toContainText('FITT Belts');
      await expect(expectedThirdProduct).toContainText('Jennifer Scarf');
    });

    test('check if the button "view cart" is displayed', async ({ page }) => {
      await dashboardPage.addToCartFirstButton.click();

      await expect(dashboardPage.viewCartButton).toHaveText('View cart');
    });

    test('go to the blog from the dashboard', async ({ page }) => {
      await dashboardPage.postTitle.click();

      const jacketSoulColorPage = new JacketSoulColorPage(page);
      await expect(jacketSoulColorPage.titlePage).toHaveText(
        'Jackets For The Soul. What Color Is Yours?',
      );
    });

    test.only('Redirect from dashboard to all categories', async ({
      page,
    }) => {
      
      await dashboardPage.sideMenu.categoriesButton.hover();
      await dashboardPage.navigateToCategory(SideMenuComponent, PageType.DRESSES);
      // await navigateToSubpage(page, PageType.SKIRT);
      //await navigateToSubpage(page, PageType.BELL);

     
      expect(await page.url()).toContain('/dresses');
    });
  });
