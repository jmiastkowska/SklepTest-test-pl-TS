import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { DressesCategoryPage } from '../pages/dressesCategory.page';

test.describe('tests dresses category', () => {
  let dressesCategoryPage: DressesCategoryPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const dashboardPage = new DashboardPage(page);
    dashboardPage.sideMenu.categoriesButton.hover();
    await dashboardPage.sideMenu.dressesCategoryFromList.click();
    
  });

  test('open the categories dresses from the dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/.dresses/);
  });

  test('check if only dresses are on the dresses category', async ({ page }) => {
   
    const allLocatorsWithNameDress = page.locator('//*[@class="woocommerce-loop-product__title"]').evaluateAll((elements) =>
    elements.map((element) => element.textContent?.toLowerCase()));

  // Sprawdź, czy żaden z lokatorów nie zawiera słowa "dress"
  for (const locatorText of await allLocatorsWithNameDress) {
    expect(locatorText).toContain('dress');
  }
  expect((await allLocatorsWithNameDress).every((locatorText) => (locatorText).includes('dress'))).toBeTruthy();
   // getByRole('link', { name: 'Marcara Sleeveless Dress 55 zł' })
    //await expect(page).toHaveURL(/.dresses/);
  });
});
