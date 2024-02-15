import { Page, expect } from '@playwright/test';


export class MyAccountPage {
  constructor(private page: Page) {}

  emailRegisterInput = this.page.locator('//*[@id="reg_email"]');
  passwordRegisterInput = this.page.locator('#reg_password');
  registerButton = this.page.getByRole('button', { name: 'Register' });
  UserNameText = this.page.locator('//*[@class="woocommerce-MyAccount-content"]');


  usernameInput = this.page.getByLabel('Username or email address *');
  passwortInput = this.page.locator('#password');
  
  loginButton = this.page.getByRole('button', { name: 'Login' });
    


}