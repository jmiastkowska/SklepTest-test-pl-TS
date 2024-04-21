import { Page, expect } from '@playwright/test';


export class MyAccountPage {
  constructor(private page: Page) {}

  emailRegisterInput = this.page.locator('//*[@id="reg_email"]');
  passwordRegisterInput = this.page.locator('#reg_password');
  registerButton = this.page.locator('//*[@class="woocommerce-Button button"][@name="register"]');
  userNameText = this.page.locator('//*[@class="woocommerce-MyAccount-content"]/p/strong[1]');
    confirmationStrongPasswordText = this.page.locator('//*[@class="woocommerce-password-strength strong"]');

  usernameInput = this.page.getByLabel('Username or email address *');
  passwordInput = this.page.locator('#password');
  
  loginButton = this.page.getByRole('button', { name: 'Login' });
    
  firstNameInput = this.page.getByLabel('First name *');
  lastNameInput = this.page.getByLabel('Last name *');
  streetInput = this.page.getByPlaceholder('House number and street name');
  billingCountryContainer = this.page.locator('#select2-billing_country-container');
  listbillingCountry = this.page.locator('//*[@id="select2-billing_country-results"]')
  postcodeInput = this.page.getByLabel('Postcode / ZIP *');
  cityInput =  this.page.getByLabel('Town / City *');
  phoneNumberInput = this.page.locator('#billing_phone');
  saveAddressButton = this.page.getByRole('button', { name: 'Save address' });
  confirmationAddressChangeText =this.page.locator('//*[@class="woocommerce-message"]');
  errorMessage = this.page.locator('//*[@class="woocommerce-error"]');
  menuAccountOrders = this.page.getByRole('link', { name: 'Orders', exact: true });
  firstCellonOrderPage = this.page.locator('#woocommerce-orders-table__row woocommerce-orders-table__row--status-processing order');
tableOnTheOrderPage = this.page.getByText('Order Date Status Total Actions #7383 February 29, 2024 Processing 212.00 zł');
  async loginToAccount (username, password): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    await this.loginButton.click();
  }
}