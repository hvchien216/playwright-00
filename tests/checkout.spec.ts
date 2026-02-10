import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('should show error when checkout info is incomplete', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('First Name is required');
  });

  test('should proceed to checkout overview after filling info', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('should display correct item in order summary', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  });

  test('should complete order and show confirmation', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
