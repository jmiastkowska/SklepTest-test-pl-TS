import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { DashboardPage } from "../pages/dashboard.page";

test.describe('tests cart page', () => {
    let cartPage: CartPage;
    
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.addFirstProductToTheCart();
      
      cartPage = new CartPage(page);
    });
  
    test('add 1 product on the cart', async ({ page }) => {
   //   const unitPrice = page.locator('//td[@class="product-price"]/span');
  //    const  expectedSubtotalPrice = Number(unitPrice) * 2;
        
        await cartPage.plusButton.click();
        await cartPage.updateCartButton.click();
  
          await expect(cartPage.quantity).toHaveValue('2');
          await expect(cartPage.updateCartMessage).toHaveText('Cart updated.');
     //   await expect(cartPage.subtotalPrice).toHaveText(`${expectedSubtotalPrice} zł`);
    });
    
    test('remove the one product from the cart', async ({ page }) => {
     
     
        await cartPage.minusButton.click();
        await cartPage.updateCartButton.click();
  
          await expect(cartPage.emptyCartMessage).toHaveText('Your cart is currently empty.');
        
    });

    test('check if the button "Return to shop" redirect the user to the shop', async ({ page }) => {
     
      await cartPage.minusButton.click();
      await cartPage.updateCartButton.click();
      await cartPage.returnToShopButton.click();
      
      await expect(page).toHaveURL(/.shop/);
      
  });
});