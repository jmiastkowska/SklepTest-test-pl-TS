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
  
    test.only('add 1 product on the cart', async ({ page }) => {
     
      
      await cartPage.plusButton.click();
      await cartPage.updateCartButton.click();
      
      await expect(cartPage.quantity).toHaveValue('2');
      await expect(cartPage.updateCartMessage).toHaveText('Cart updated.');
       const unitPriceTxt = await page.locator('//td[@class="product-price"]/span').innerText();
       const unitPrice = unitPriceTxt.replace(' zł','');
      //const receviedSubtotalPrice = Number(subtotalPrice.replace(' zł', ''));
      const  expectedSubtotalPrice = Number(unitPrice);
      const subtotalPrice = await page.locator('//*[@id="post-6"]/div[2]/form/table/tbody/tr[1]/td[6]/span').innerText();
        await expect(subtotalPrice).toContainEqual(expectedSubtotalPrice);
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