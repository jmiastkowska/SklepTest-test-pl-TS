import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  titlePage = this.page.locator('//*[@class="page-title margin-top"]');
  plusButton = this.page.locator('//*[@class="dashicons dashicons-plus"]');
  updateCartButton = this.page.getByRole('button', { name: 'Update cart' });
quantity = this.page.getByLabel('Quantity');



}
