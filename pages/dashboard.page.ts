import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  addToCartFirstButton = this.page.locator(
    '//*[@class="ajax_add_to_cart add_to_cart_button button primary"][@href="/?add-to-cart=19"]',
  );
  addToCartFirstMostWantedBeltButton = this.page.locator(
    '//*[@href="/?add-to-cart=31"]',
  );
  addToCartScrafButton = this.page.locator('//*[@href="/?add-to-cart=35"]');
  myCartButton = this.page.locator('.top-cart');
  viewCartButton = this.page.locator('//*[@class="added_to_cart wc-forward"]');
  postTitle = this.page.locator('//*[@id="tyche_recent-2"]/div[2]/div[2]/p');

  async addFirstProductToTheCart(): Promise<void> {
    await this.addToCartFirstButton.click();
    await this.myCartButton.click();
  }
}
