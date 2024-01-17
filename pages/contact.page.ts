import { Page } from "@playwright/test";

export class ContactPage {
    constructor(private page: Page) {}
  
    nameInput = this.page.getByLabel('Your Name (required)');
    emailInput = this.page.getByLabel('Your Email (required)');
    subjectInput = this.page.getByLabel('Subject');
    messageInput = this.page.getByLabel('Your Message');
  
    sendButton = this.page.getByRole('button', { name: 'Send' });
    
    requiredEmailText = this.page.locator('//*[@class="wpcf7-not-valid-tip"]');
    errorMessageAfterClickingSend = this.page.locator('//*[@id="wpcf7-f4-p10-o1"]/form/div[2]');
  }