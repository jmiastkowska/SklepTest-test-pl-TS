import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  addToCartFirstButton = this.page.locator(
    '//*[@class="ajax_add_to_cart add_to_cart_button button primary"][@href="/?add-to-cart=19"]',
  );
  myCartButton = this.page.locator('.top-cart');

  async addFirstProductToTheCart(): Promise<void> {
    await this.addToCartFirstButton.click();
    await this.myCartButton.click();
  }
}
