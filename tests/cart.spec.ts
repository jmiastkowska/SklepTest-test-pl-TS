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
  
    test.only('add to the cart 1 product on the cart page', async ({ page }) => {
     
      await page.reload();
      await cartPage.plusButton.click();
      await cartPage.updateCartButton.click();
      
      await expect(cartPage.quantity).toHaveValue('2');
      await expect(cartPage.updateCartMessage).toHaveText('Cart updated.');
       const unitPriceTxt = await page.locator('//td[@class="product-price"]/span').innerText();
       const unitPrice = unitPriceTxt.replace('zł','');
       const  expectedSubtotalPrice = (+unitPrice) *2;
       
       const subtotalPrice = await page.locator('//*[@id="post-6"]/div[2]/form/table/tbody/tr[1]/td[6]/span').innerText();
       const receivedSubtotalPrice = +subtotalPrice.replace('zł', '');

    await expect(receivedSubtotalPrice).toBe(expectedSubtotalPrice);
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

  test('check shipping price', async ({page}) => {
await page.getByRole('link', { name: 'Calculate shipping' }).click();

await page.getByRole('textbox', { name: 'Poland' }).click();

await page.getByRole('combobox').nth(2).fill('german');
await page.getByRole('option', { name: 'Germany' }).click();

await page.getByPlaceholder('Postcode / ZIP').fill('12345');
await page.getByRole('button', { name: 'Update totals' }).click();  });
});
