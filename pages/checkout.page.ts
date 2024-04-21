import { Page, expect } from '@playwright/test';
import { ShippingCountry } from '../helpers/shippingCountry';

export class CheckoutPage {
  constructor(private page: Page) {}

  showLoginButton = this.page.locator('.showlogin');
  placeOrderButton = this.page.locator('//*[@id="place_order"]');
  pageTitle = this.page.locator('//*[@class="page-title margin-top"]');
  firstNameCheckoutInput = this.page.locator('#billing_first_name');
  lastNameCheckoutInput = this.page.locator('#billing_last_name');
  streetCheckoutInput = this.page.getByRole('textbox', {
    name: 'Street address *',
  });
  postcodeCheckoutInput = this.page.getByRole('textbox', {
    name: 'Postcode / ZIP *',
  });
  cityCheckoutInput = this.page.getByRole('textbox', { name: 'Town / City *' });
  phoneCheckoutInput = this.page.getByLabel('Phone *');
  emailCheckoutInput = this.page.getByLabel('Email address *');
}
