import { Page, expect } from '@playwright/test';
import { ShippingCountry } from '../helpers/shippingCountry';

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

  calculateShipingButton = this.page.locator(
    '//*[@class="shipping-calculator-button"]',
  );
  defaultShippingCountry = this.page.locator(
    '//*[@id="select2-calc_shipping_country-container"]',
  );
  searchShippingCountryInput = this.page.locator(
    '//*[@class="select2-search__field"]',
  );

  shippingList = this.page.locator(
    '//*[@id="select2-calc_shipping_country-results"]',
  );

  postcodeInput = this.page.locator('//*[@id="calc_shipping_postcode"]');
  updateShipingPriceButton = this.page.locator(
    '//button[@name="calc_shipping"]',
  );
  flatRateText = this.page.locator('//*[@data-title = "Shipping"]/span');
  statesDropdown = this.page.locator(
    '//*[@id="select2-calc_shipping_state-container"]',
  );
  stateNameList = this.page.locator(
    '//*[@id="select2-calc_shipping_state-results"]',
  );
  proceedToCheckoutButton = this.page.locator(
    '//*[@class="checkout-button button alt wc-forward"]',
  );

  async changeShippingCountry(
    countryInput: string,
    postcodeText: string,
    countryShipping: string,
  ): Promise<void> {
    await this.calculateShipingButton.click();
    await this.defaultShippingCountry.click();
    await this.searchShippingCountryInput.fill(countryInput);
    await this.shippingList.getByText(countryShipping).first().click();
    await this.postcodeInput.fill(postcodeText);
    await this.updateShipingPriceButton.click();
    await this.calculateShipingButton.click();
  }

  async addProductWithButtonPlus(): Promise<void> {
    await this.plusButton.click();
    await this.updateCartButton.click();
  }

  async navigateToShippingCountry(
    shippingCountry: ShippingCountry,
  ): Promise<void> {
    await this.calculateShipingButton.click();
    await this.defaultShippingCountry.click();
    switch (shippingCountry) {
      case ShippingCountry.AUSTRALIA:
        await this.shippingList.getByText('Australia').first().click();
        break;
      case ShippingCountry.ÅLAND:
        await this.shippingList.getByText('Åland Islands').first().click();
        break;
      case ShippingCountry.AUSTRIA:
        await this.shippingList.getByText('Austria').first().click();
        break;
      case ShippingCountry.AZERBAIJAN:
        await this.shippingList.getByText('Azerbaijan').first().click();
        break;
      default:
        throw Error(`This country doesn't exist: ${shippingCountry}`);
    }
  }
  async checkSelectedShippingCountry(
    shippingCountry: ShippingCountry,
    page,
  ): Promise<void> {
    if (shippingCountry === ShippingCountry.AUSTRALIA) {
      expect(page.defaultShippingCountry).toContainText('Australia');
    } else if (shippingCountry === ShippingCountry.AUSTRIA) {
      expect(page.defaultShippingCountry).toContainText('Austria');
    } else if (shippingCountry === ShippingCountry.ÅLAND) {
      expect(page.defaultShippingCountry).toContainText('Åland Islands');
    } else if (shippingCountry === ShippingCountry.AZERBAIJAN) {
      expect(page.defaultShippingCountry).toContainText('Azerbaijan');
    } else {
      throw new Error(`This country doesn't exist: ${shippingCountry}`);
    }
  }
}
