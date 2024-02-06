import { Page } from '@playwright/test';

export class DressesCategoryPage{
  constructor(private page: Page) {}

firstProductInDressesCategory = this.page.locator('//*[@class="products"]/li[1]/a[1]');
  
};