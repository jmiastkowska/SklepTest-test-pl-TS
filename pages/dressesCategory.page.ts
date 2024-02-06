import { Page } from '@playwright/test';

export class DressesCategoryPage {
  constructor(private page: Page) {}

firstProductInDressesCategory = this.page.getByRole('link', { name: 'Magnolia Dress 25 zł' });
  
}