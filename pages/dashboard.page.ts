import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';
import { PageType } from '../helpers/pageTypes';

export class DashboardPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page);

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
    await this.page.reload();
  }

  async navigateToCategory(_sideMenu, pageType: PageType): Promise<void> {
    switch (pageType) {
 /*     case PageType.ALL:
        await page.click('selector_for_dress_menu_item');
        break;
      case PageType.SHIRTS:
        await page.click('selector_for_skirt_menu_item');
        break;
      case PageType.FEATURED:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.TRENDS:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.SCRAFTS:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.FEATURED:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.SHOES:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.TOPS:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.BLOUSE:
        await page.click('selector_for_bell_menu_item');
        break;
        case PageType.JEANS:
//await page.click('selector_for_bell_menu_item');
        break;*/
        case PageType.DRESSES:
        await this.sideMenu.dressesCategoryFromList.click();
        break;
      default:
        throw new Error(`Nieobsługiwany PageType: ${pageType}`);
    }
}
}