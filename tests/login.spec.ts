import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should login successfully with standard_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked_out_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('this user has been locked out');
  });

  test('should show error when fields are empty', async ({ page }) => {
    await page.locator('[data-test="login-button"]').click();

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username is required');
  });
});
