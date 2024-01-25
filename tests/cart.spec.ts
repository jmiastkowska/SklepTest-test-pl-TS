import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('tests cart page', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addFirstProductToTheCart();

    cartPage = new CartPage(page);
  });

  test('add to the cart 1 product on the cart page', async ({ page }) => {
    await cartPage.plusButton.click();
    await cartPage.updateCartButton.click();
    await page.reload();

    const unitPriceTxt = await page
      .locator('//td[@class="product-price"]/span')
      .innerText();
    const unitPrice = unitPriceTxt.replace('zł', '');
    const expectedSubtotalPrice = +unitPrice * 2;
    const subtotalPrice = await page
      .locator('//*[@id="post-6"]/div[2]/form/table/tbody/tr[1]/td[6]/span')
      .innerText();
    const receivedSubtotalPrice = +subtotalPrice.replace('zł', '');

    expect(receivedSubtotalPrice).toBe(expectedSubtotalPrice);
  });

  test('check message after updating the cart', async ({ page }) => {
    await cartPage.plusButton.click();
    await cartPage.updateCartButton.click();

    await expect(cartPage.quantity).toHaveValue('2');
    await expect(cartPage.updateCartMessage).toHaveText('Cart updated.');
  });

  test('remove the one product from the cart', async ({ page }) => {
    await cartPage.minusButton.click();
    await cartPage.updateCartButton.click();

    await expect(cartPage.emptyCartMessage).toHaveText(
      'Your cart is currently empty.',
    );
  });

  test('check if the button "Return to shop" redirect the user to the shop', async ({
    page,
  }) => {
    await cartPage.minusButton.click();
    await cartPage.updateCartButton.click();
    await cartPage.returnToShopButton.click();

    await expect(page).toHaveURL(/.shop/);
  });

  test('change shipping price', async ({ page }) => {
    const countryInput = 'ger';
    const postcodeText = '12345';
    const countryShipping = 'German';
    await cartPage.changeShippingCountry(
      countryInput,
      postcodeText,
      countryShipping,
    );

    await expect(cartPage.flatRateText).toHaveText('20 zł');
    await expect(cartPage.defaultShippingCountry).toHaveText('Germany');
  });

  test('select a Greek state from the shipping list', async ({ page }) => {
    const countryInput = 'gre';
    const postcodeText = '12345';
    const countryShipping = 'Greece';
    const stateName = 'Θεσσαλία';
    await cartPage.changeShippingCountry(
      countryInput,
      postcodeText,
      countryShipping,
    );
    await cartPage.statesDropdown.click();
    await cartPage.stateNameList.getByText(stateName).click();

    await expect(cartPage.flatRateText).toHaveText('20 zł');
    await expect(cartPage.defaultShippingCountry).toHaveText('Greece');
    await expect(cartPage.statesDropdown).toHaveText(stateName);
  });

  test('check total price of the cart', async ({ page }) => {
    await cartPage.proceedToCheckoutButton.click();

    // await expect(page).toHaveURL(/.checkout/);
  });

  test('check if button proceed to checkout redirect to the checkout page', async ({
    page,
  }) => {
    await cartPage.proceedToCheckoutButton.click();

    await expect(page).toHaveURL(/.checkout/);
  });
});
