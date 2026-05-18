const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage }      = require('./pages/CartPage');
const { CheckoutPage }  = require('./pages/CheckoutPage');
const { users }         = require('./fixtures/users');
 
const PRODUCT = 'sauce-labs-backpack';
 
test.describe('TC-004 · Checkout: successful purchase', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
 
    // Login and add product to reach checkout
    await loginPage.goto();
    await loginPage.login(users.U1.username, users.U1.password);
    await expect(page).toHaveURL(/inventory/);
 
    await inventoryPage.addToCart(PRODUCT);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
 
    await expect(page).toHaveURL(/checkout-step-one/);
  });
 
  test('Completing checkout with valid data', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
 
    // Fill shipping info and confirm
    await checkoutPage.fillShippingInfo('Seyla', 'Gomez', '5000');
    await checkoutPage.continue();
 
    await expect(page).toHaveURL(/checkout-step-two/);
 
    await checkoutPage.finish();
 
    // Confirmation page
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.successHeader).toBeVisible();
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });
});
