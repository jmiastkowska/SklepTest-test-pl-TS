import { Page } from '@playwright/test';

export class ContactPage {
  constructor(private page: Page) {}

  nameInput = this.page.getByLabel('Your Name (required)');
  emailInput = this.page.getByLabel('Your Email (required)');
  subjectInput = this.page.getByLabel('Subject');
  messageInput = this.page.getByLabel('Your Message');

  sendButton = this.page.getByRole('button', { name: 'Send' });
  requiredNameText = this.page.locator(
    '//*[@class="wpcf7-form-control-wrap your-name"]/span',
  );
  requiredEmailText = this.page.locator(
    '//*[@class="wpcf7-form-control-wrap your-email"]/span',
  );
  errorMessageAfterClickingSend = this.page.locator(
    '//*[@class="wpcf7-response-output wpcf7-display-none wpcf7-mail-sent-ng"]',
  );
}
