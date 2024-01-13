import { Page } from "@playwright/test";

export class JacketSoulColorPage{
    constructor(private page: Page) {}
    
    
    titlePage = this.page.locator('//*[@class="entry-title"]');
    


}