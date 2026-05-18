const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage }      = require('./pages/CartPage');
const { users }         = require('./fixtures/users');
 
const PRODUCT = 'sauce-labs-backpack'; // general name used in data-test
 
test.describe('TC-003 · Cart: add and remove product', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.U1.username, users.U1.password);
    await expect(page).toHaveURL(/inventory/);
  });
 
  test('Add the first product to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await inventoryPage.addToCart(PRODUCT);

    // This updates the cart icon
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
 
  test('Verify that it appears on the cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
 
    await inventoryPage.addToCart(PRODUCT);
    await inventoryPage.goToCart();
 
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.cartItems).toHaveCount(1);
  });
 
  test('Remove the product from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
 
    await inventoryPage.addToCart(PRODUCT);
    await inventoryPage.goToCart();
    await cartPage.removeItem(PRODUCT);
 
    // Cart is now empty
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });
});
