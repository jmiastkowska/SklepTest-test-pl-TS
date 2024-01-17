import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { ContactPage } from '../pages/contact.page';

test.describe('tests sending messages', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.sideMenu.aboutUsButton.click();

    contactPage = new ContactPage(page);
  });

  test('send message with correct data', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const name = 'Joanna';
    const email = 'test12345@wp.pl';
    const subject = 'hello';
    const message = 'Please give me an answer';

    await contactPage.nameInput.fill(name);
    await contactPage.emailInput.fill(email);
    await contactPage.subjectInput.fill(subject);
    await contactPage.messageInput.fill(message);
    await contactPage.sendButton.click();

    await expect(contactPage.errorMessageAfterClickingSend).toHaveText(
      'There was an error trying to send your message. Please try again later.',
    );
  });

  test('send message with empty email', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const name = 'Joanna';
    const subject = 'hello';
    const message = 'Please give me an answer';
    const expectedMessage = 'The field is required.';

    await dashboardPage.sideMenu.aboutUsButton.click();
    await contactPage.nameInput.fill(name);
    await contactPage.subjectInput.fill(subject);
    await contactPage.messageInput.fill(message);
    await contactPage.sendButton.click();

    await expect(contactPage.requiredEmailText).toHaveText(expectedMessage);
  });

  test('send message with empty name', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const email = 'test12345@wp.pl';
    const subject = 'hello';
    const message = 'Please give me an answer';
    const expectedMessage = 'The field is required.';

    await dashboardPage.sideMenu.aboutUsButton.click();
    await contactPage.emailInput.fill(email);
    await contactPage.subjectInput.fill(subject);
    await contactPage.messageInput.fill(message);
    await contactPage.sendButton.click();

    await expect(contactPage.requiredNameText).toHaveText(expectedMessage);
  });
});
