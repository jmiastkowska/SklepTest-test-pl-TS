import { Page, expect } from '@playwright/test';
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
    await this.sideMenu.categoriesButton.hover();
    switch (pageType) {
      case PageType.ALL:
        await this.sideMenu.allCategory.click();
        break;
      case PageType.SHIRTS:
        await this.sideMenu.shirtsCategory.click();
        break;
      case PageType.FEATURED:
        await this.sideMenu.featuredCategory.click();
        break;
      case PageType.TRENDS:
        await this.sideMenu.trendsCategory.click();
        break;
      case PageType.SCARFS:
        await this.sideMenu.scarfsCategory.click();
        break;
      case PageType.SHOES:
        await this.sideMenu.shoesCategory.click();
        break;
      case PageType.TOPS:
        await this.sideMenu.topsCategory.click();
        break;
      case PageType.BLOUSE:
        await this.sideMenu.blouseCategory.click();
        break;
      case PageType.JEANS:
        await this.sideMenu.jeansCategory.click();
        break;
      case PageType.DRESSES:
        await this.sideMenu.dressesCategory.click();
        break;
      default:
        throw Error(`This website doesn't exist: ${pageType}`);
    }
  }

  async checkPageContent(_sideMenu, pageType: PageType): Promise<void> {
    if (pageType === PageType.ALL) {
      expect(this.page.url()).toContain('/shop');
    } else if (pageType === PageType.SHIRTS) {
      expect(this.page.url()).toContain('/shirts/');
    } else if (pageType === PageType.FEATURED) {
      expect(this.page.url()).toContain('/featured');
    } else if (pageType === PageType.TRENDS) {
      expect(this.page.url()).toContain('/trends');
    } else if (pageType === PageType.SCARFS) {
      expect(this.page.url()).toContain('/scarfs');
    } else if (pageType === PageType.SHOES) {
      expect(this.page.url()).toContain('/shoes');
    } else if (pageType === PageType.TOPS) {
      expect(this.page.url()).toContain('/tops');
    } else if (pageType === PageType.BLOUSE) {
      expect(this.page.url()).toContain('/blouse');
    } else if (pageType === PageType.JEANS) {
      expect(this.page.url()).toContain('/jeans');
    } else if (pageType === PageType.DRESSES) {
      expect(this.page.url()).toContain('/dresses');
    } else {
      throw new Error(`Unsupported page type: ${pageType}`);
    }
  }
}
