import { Page, expect } from '@playwright/test';


export class MyAccountPage {
  constructor(private page: Page) {}

  emailRegisterInput = this.page.locator('//*[@id="reg_email"]');
  passwordRegisterInput = this.page.locator('#reg_password');
  registerButton = this.page.locator('//*[@class="woocommerce-Button button"][@name="register"]');
  userNameText = this.page.locator('//*[@class="woocommerce-MyAccount-content"]/p/strong[1]');
    confirmationStronhPasswordText = this.page.locator('//*[@class="woocommerce-password-strength strong"]');

  usernameInput = this.page.getByLabel('Username or email address *');
  passwordInput = this.page.locator('#password');
  
  loginButton = this.page.getByRole('button', { name: 'Login' });
    
  firstNameInput = this.page.getByLabel('First name *');
  lastNameInput = this.page.getByLabel('Last name *');

}