import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://skleptest.pl/');
  await page
    .locator('#tyche_products-1')
    .getByRole('link', { name: ' Add to cart' })
    .first()
    .click();
  await page
    .locator('#tyche_products-1')
    .getByRole('link', { name: ' Add to cart' })
    .nth(1)
    .click();
  await page.getByRole('link', { name: ' My Cart - zł' }).click();
  await page.getByRole('heading', { name: 'Cart', exact: true }).click();
});
