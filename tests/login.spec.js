const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { users } = require('./fixtures/users');

const credentials = [
  ['U1', users.U1],
  ['U3', users.U3],
  ['U4', users.U4],
  ['U5', users.U5],
  ['U6', users.U6],
];

for (const [label, user] of credentials) {
  test(`TC-001 · Successful login for user ${label}`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    // Meaningful, not just "page loaded"
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
}

test('TC-006 · Login with U2 locked', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.U2.username, users.U2.password);

  await expect(page).toHaveURL('/');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
});
