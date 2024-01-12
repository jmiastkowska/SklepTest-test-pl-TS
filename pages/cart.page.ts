import { Page } from "@playwright/test";

export class CartPage{
    constructor(private page: Page) {}
    
    
    titlePage = this.page.locator('//*[@class="page-title margin-top"]');
    cart


}