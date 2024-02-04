import { Page } from '@playwright/test';
import { PageType } from '../helpers/pageTypes';

export class SideMenuComponent {
  constructor(private page: Page) {}

  shopButton = this.page.getByRole('link', { name: 'Shop' });
  mostWantedButton = this.page.getByRole('link', { name: 'Most Wanted' });
  categoriesButton = this.page.getByRole('link', { name: 'Catergries ' });
  aboutUsButton = this.page.getByRole('link', { name: 'About Us' });

  allCategory = this.page.getByRole('link', { name: 'All' });
  dressesCategory = this.page.getByRole('link', { name: 'Dresses' });
  shirtsCategory = this.page.locator('//*[@id="menu-item-125"]');
  featuredCategory = this.page.getByRole('link', { name: 'Featured' });
  trendsCategory = this.page.getByRole('link', { name: 'Trends', exact: true });
  scarfsCategory = this.page.locator('//*[@id="menu-item-129"]');
  shoesCategory = this.page.getByRole('link', { name: 'Shoes' });
  topsCategory = this.page.getByRole('link', { name: 'Tops' });
  blouseCategory = this.page.getByRole('link', { name: 'Blouse', exact: true });
  jeansCategory = this.page.getByRole('link', { name: 'Jeans' });
}
