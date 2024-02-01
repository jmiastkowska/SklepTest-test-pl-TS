import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}
  
  shopButton = this.page.getByRole('link', { name: 'Shop' });
  mostWantedButton = this.page.getByRole('link', { name: 'Most Wanted' });
  categoriesButton = this.page.getByRole('link', { name: 'Catergries ' });
  aboutUsButton = this.page.getByRole('link', { name: 'About Us' });

  dressesCategoryFromList = this.page.getByRole('link', { name: 'Dresses' });
  shirtsCategoryFromList = this.page.getByRole('link', { name: 'Shirts' });

}