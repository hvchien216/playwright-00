import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should display products on inventory page', async ({ page }) => {
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(6);
  });

  test('should sort products by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
    }
  });

  test('should sort products by name A to Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sorted);
  });

  test('should navigate to product detail page', async ({ page }) => {
    const firstProductName = await page.locator('[data-test="inventory-item-name"]').first().textContent();
    await page.locator('[data-test="inventory-item-name"]').first().click();

    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(firstProductName!);
  });
});
