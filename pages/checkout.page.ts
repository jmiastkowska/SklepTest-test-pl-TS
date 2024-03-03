
import { Page, expect } from '@playwright/test';
import { ShippingCountry } from '../helpers/shippingCountry';

export class CheckoutPage {
  constructor(private page: Page) {}

showLoginButton =  this.page.locator('.showlogin');
placeOrderButton = this.page.locator('//*[@id="place_order"]');
}
