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
    await this.page.reload();
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
      case ShippingCountry.AFGHANISTAN:
        await this.shippingList.getByText('Afghanistan').first().click();
        break;
      case ShippingCountry.ALBANIA:
        await this.shippingList.getByText('Albania').first().click();
        break;
      case ShippingCountry.ALGERIA:
        await this.shippingList.getByText('Algeria').first().click();
        break;
      case ShippingCountry.AMERICAN_SAMOA:
        await this.shippingList.getByText('American Samoa').first().click();
        break;
      case ShippingCountry.ANDORRA:
        await this.shippingList.getByText('Andorra').first().click();
        break;
      case ShippingCountry.ANGOLA:
        await this.shippingList.getByText('Angola').first().click();
        break;
      case ShippingCountry.ANGUILLA:
        await this.shippingList.getByText('Anguilla').first().click();
        break;
      case ShippingCountry.ANTARCTICA:
        await this.shippingList.getByText('Antarctica').first().click();
        break;
      case ShippingCountry.ANTIGUA_AND_BARBUDA:
        await this.shippingList
          .getByText('Antigua and Barbuda')
          .first()
          .click();
        break;
      case ShippingCountry.ARGENTINA:
        await this.shippingList.getByText('Argentina').first().click();
        break;
      case ShippingCountry.ARMENIA:
        await this.shippingList.getByText('Armenia').first().click();
        break;
      case ShippingCountry.ARUBA:
        await this.shippingList.getByText('Aruba').first().click();
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
    } else if (shippingCountry === ShippingCountry.ALBANIA) {
      expect(page.defaultShippingCountry).toContainText('Albania');
    } else if (shippingCountry === ShippingCountry.ALGERIA) {
      expect(page.defaultShippingCountry).toContainText('Algeria');
    } else if (shippingCountry === ShippingCountry.AMERICAN_SAMOA) {
      expect(page.defaultShippingCountry).toContainText('American Samoa');
    } else if (shippingCountry === ShippingCountry.ANDORRA) {
      expect(page.defaultShippingCountry).toContainText('Andorra');
    } else if (shippingCountry === ShippingCountry.ANGOLA) {
      expect(page.defaultShippingCountry).toContainText('Angola');
    } else if (shippingCountry === ShippingCountry.ANTARCTICA) {
      expect(page.defaultShippingCountry).toContainText('Antarctica');
    } else if (shippingCountry === ShippingCountry.ARMENIA) {
      expect(page.defaultShippingCountry).toContainText('Armenia');
    } else if (shippingCountry === ShippingCountry.ANGUILLA) {
      expect(page.defaultShippingCountry).toContainText('Anguilla');
    } else if (shippingCountry === ShippingCountry.ANTIGUA_AND_BARBUDA) {
      expect(page.defaultShippingCountry).toContainText('Antigua and Barbuda');
    } else if (shippingCountry === ShippingCountry.ARGENTINA) {
      expect(page.defaultShippingCountry).toContainText('Argentina');
    } else if (shippingCountry === ShippingCountry.ARUBA) {
      expect(page.defaultShippingCountry).toContainText('Aruba');
    } else if (shippingCountry === ShippingCountry.AFGHANISTAN) {
      expect(page.defaultShippingCountry).toContainText('Afghanistan');
    } else {
      throw new Error(`This country doesn't exist: ${shippingCountry}`);
    }
  }
  async chooseStateFromList(
    shippingCountry: ShippingCountry,
    page,
  ): Promise<void> {
    await this.calculateShipingButton.click();
    await this.statesDropdown.click();
    switch (shippingCountry) {
      case ShippingCountry.ANGOLA:
        await page.stateNameList.getByText('Moxico').click();
        break;
      case ShippingCountry.ARGENTINA:
        await page.stateNameList.getByText('Chaco').click();
        break;
        case ShippingCountry.AUSTRALIA:
        await page.stateNameList.getByText('Victoria').click();
        break;
      default:
        throw Error(`${shippingCountry} doesn't have a state.`);
    }
  }
}
