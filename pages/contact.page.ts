import { Page } from "@playwright/test";

export class ContactPage {
    constructor(private page: Page) {}
  
    nameInput = this.page.getByLabel('Your Name (required)');
    emailInput = this.page.getByLabel('Your Email (required)');
    subjectInput = this.page.getByLabel('Subject');
    messageInput = this.page.getByLabel('Your Message');
  
    sendButton = this.page.getByRole('button', { name: 'Send' });
  
  
  }