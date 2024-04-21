import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { DressesCategoryPage } from '../pages/dressesCategory.page';

test.describe('tests dresses category', () => {
  let dressesCategoryPage: DressesCategoryPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const dashboardPage = new DashboardPage(page);
    dashboardPage.sideMenu.categoriesButton.hover();
    await dashboardPage.sideMenu.dressesCategory.click();
  });

  test('open the categories dresses from the dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/.dresses/);
  });

  test('check if user is redirect to product details page is open', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Magnolia Dress 25 zł' }).click();

    await expect(page).toHaveURL(/.magnolia-dress/);
  });

  test('check if only dresses are on the dresses category', async ({
    page,
  }) => {
    const allLocatorsWithNameDress = await page
      .locator('//*[@class="woocommerce-loop-product__title"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.textContent?.toLowerCase()),
      );

    for (const locatorText of allLocatorsWithNameDress) {
      expect(locatorText).toContain('dress');
    }
    expect(
      (await allLocatorsWithNameDress).every((locatorText) =>
        locatorText.includes('dress'),
      ),
    ).toBeTruthy();
  });
});
