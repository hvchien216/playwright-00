import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show cart badge after adding a product', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const badge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(badge).toHaveText('1');
  });

  test('should update badge count for multiple products', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    const badge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(badge).toHaveText('2');
  });

  test('should display correct items in cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);

    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);

    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bike Light');
  });

  test('should update badge when removing an item', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('should return to inventory when clicking continue shopping', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory/);
  });
});
