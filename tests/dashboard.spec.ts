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
    const expectedSecondProduct = page.getByRole('cell', {
      name: 'FITT Belts',
    });
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

  test('Redirect from dashboard to all categories', async ({ page }) => {
    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.ALL);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.ALL);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.SHIRTS);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.SHIRTS);

    await dashboardPage.navigateToCategory(
      SideMenuComponent,
      PageType.FEATURED,
    );
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.FEATURED);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.TRENDS);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.TRENDS);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.SCARFS);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.SCARFS);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.SHOES);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.SHOES);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.TOPS);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.TOPS);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.BLOUSE);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.BLOUSE);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.JEANS);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.JEANS);

    await dashboardPage.navigateToCategory(SideMenuComponent, PageType.DRESSES);
    await dashboardPage.checkPageContent(SideMenuComponent, PageType.DRESSES);
  });

  test('check search bar', async ({ page }) => {
    await dashboardPage.searchBarInput.fill('jeans');
    await dashboardPage.searchBarInput.press('Enter');

    await expect(
      page.getByRole('heading', { name: 'Search Results for: jeans' }),
    ).toHaveText('Search Results for: jeans');
  });
});
