const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { users }         = require('./fixtures/users');
 
// U2 is excluded — blocked user who cannot log in, so logout is not applicable
const usersValids = [
  ['U1', users.U1],
  ['U3', users.U3],
  ['U4', users.U4],
  ['U5', users.U5],
  ['U6', users.U6],
];
 
for (const [label, user] of usersValids) {
  test(`TC-005 · Successful logout for user ${label}`, async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
 
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL(/inventory/);
 
    // Act
    await inventoryPage.logout();
 
    // Assert — Session is cleared
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
}
