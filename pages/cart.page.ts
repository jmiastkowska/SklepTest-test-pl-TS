import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  titlePage = this.page.locator('//*[@class="page-title margin-top"]');
  plusButton = this.page.locator('//*[@class="dashicons dashicons-plus"]');
  minusButton = this.page.locator('//*[@class="dashicons dashicons-minus"]');
  updateCartButton = this.page.getByRole('button', { name: 'Update cart' });
  returnToShopButton = this.page.locator('//*[@class="button wc-backward"]');
  quantity = this.page.getByLabel('Quantity');
  updateCartMessage = this.page.locator('.woocommerce-message');
  emptyCartMessage = this.page.locator('//*[@class="cart-empty"]');
  unitPrice = this.page.locator('//td[@class="product-price"]/span');
  subtotalPrice = this.page.getByText('70 zł').first();

  calculateShipingButton = this.page.getByRole('link', {
    name: 'Calculate shipping',
  });
  defaultShippingCountry = this.page.getByRole('textbox', { name: 'Poland' });
  searchDropdownInput = this.page.getByRole('combobox').nth(1);

  shippingToGermany = this.page.getByRole('option', {
    name: 'Germany',
  });

  postcodeInput = this.page.getByPlaceholder('Postcode / ZIP');
  updateShipingPriceButton = this.page.getByRole('button', {
    name: 'Update totals',
  });
}
