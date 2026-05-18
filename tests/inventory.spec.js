const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { users }         = require('./fixtures/users');
 
test.describe('TC-002 · Product sorting', () => {

  // Each test logs in independently to ensure test isolation and avoid inter-test dependencies
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.U1.username, users.U1.password);
    await expect(page).toHaveURL(/inventory/);
  });
 
  test('Sorted product name A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await inventoryPage.sortBy('az');
 
    const names = await inventoryPage.getNamesAsStrings();
    const sorted = [...names].sort();
 
    expect(names).toEqual(sorted);
  });
 
  test('Sorted product name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await inventoryPage.sortBy('za');
 
    const names = await inventoryPage.getNamesAsStrings();
    const sorted = [...names].sort().reverse();
 
    expect(names).toEqual(sorted);
  });
 
  test('Sorted price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await inventoryPage.sortBy('lohi');
 
    const prices = await inventoryPage.getPricesAsNumbers();
    const sorted = [...prices].sort((a, b) => a - b);
 
    expect(prices).toEqual(sorted);
  });
 
  test('Sorted price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await inventoryPage.sortBy('hilo');
 
    const prices = await inventoryPage.getPricesAsNumbers();
    const sorted = [...prices].sort((a, b) => b - a);
 
    expect(prices).toEqual(sorted);
  });
});
