import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { DashboardPage } from '../pages/dashboard.page';
import { ShippingCountry } from '../helpers/shippingCountry';

test.describe('tests cart page', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addFirstProductToTheCart();

    cartPage = new CartPage(page);
  });

  test('add to the cart 1 product on the cart page', async ({ page }) => {
    await cartPage.addProductWithButtonPlus();
    await page.reload();

    const unitPriceTxt = await page
      .locator('//td[@class="product-price"]/span')
      .innerText();
    const unitPrice = unitPriceTxt.replace('zł', '');
    const expectedSubtotalPrice = +unitPrice * 2;
    const subtotalPrice = await page
      .locator('//*[@class="product-subtotal"]/span')
      .innerText();
    const receivedSubtotalPrice = +subtotalPrice.replace('zł', '');

    expect(receivedSubtotalPrice).toBe(expectedSubtotalPrice);
  });

  test('check message after updating the cart', async ({ page }) => {
    await cartPage.addProductWithButtonPlus();

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
    const flatRateWithText = await page
      .locator('//*[@data-title = "Shipping"]/span')
      .innerText();
    const flatPriceNumber = +flatRateWithText.replace('zł', '');
    const subtotalPriceText = await page
      .locator('//*[@class="cart-subtotal"]/td/span')
      .innerText();
    const subtotalPrice = +subtotalPriceText.replace('zł', '');

    const expectedTotalPrice = flatPriceNumber + subtotalPrice;
    const receivedTotalPriceText = await page
      .locator('//*[@class="order-total"]/td/strong')
      .innerText();
    const receivedTotalPrice = +receivedTotalPriceText.replace('zł', '');

    await cartPage.addProductWithButtonPlus();

    expect(receivedTotalPrice).toBe(expectedTotalPrice);
  });

  test('check if button proceed to checkout redirect to the checkout page', async ({
    page,
  }) => {
    await cartPage.proceedToCheckoutButton.click();

    await expect(page).toHaveURL(/.checkout/);
  });

  test('check if user can choose each country shipping', async ({ page }) => {
    await cartPage.navigateToShippingCountry(ShippingCountry.AUSTRALIA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.AUSTRALIA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ÅLAND);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ÅLAND,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.AUSTRIA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.AUSTRIA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.AZERBAIJAN);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.AZERBAIJAN,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.AFGHANISTAN);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.AFGHANISTAN,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ALBANIA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ALBANIA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ALGERIA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ALGERIA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.AMERICAN_SAMOA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.AMERICAN_SAMOA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ANDORRA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ANDORRA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ANGOLA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ANGOLA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ANGUILLA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ANGUILLA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ANTARCTICA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ANTARCTICA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(
      ShippingCountry.ANTIGUA_AND_BARBUDA,
    );
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ANTIGUA_AND_BARBUDA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ARGENTINA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ARGENTINA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ARMENIA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ARMENIA,
      cartPage,
    );

    await cartPage.navigateToShippingCountry(ShippingCountry.ARUBA);
    await cartPage.checkSelectedShippingCountry(
      ShippingCountry.ARUBA,
      cartPage,
    );
  });

  test('check if states list is displayed', async ({ page }) => {
    
    await cartPage.navigateToShippingCountry(ShippingCountry.ANGOLA);
await cartPage.chooseStateFromList(ShippingCountry.ANGOLA, cartPage);
   // await expect(cartPage.stateNameList).toHaveText('Moxico');
  });

});
