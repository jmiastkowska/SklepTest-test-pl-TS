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
});
