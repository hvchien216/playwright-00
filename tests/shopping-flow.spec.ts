import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { InventoryPage } from './pages/inventory-page';
import { CartPage } from './pages/cart-page';
import { CheckoutPage } from './pages/checkout-page';

test.describe('Full Shopping Flow E2E', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test('should complete full purchase flow', async ({ page }) => {
    // 1. Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // 2. Browse and sort
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.items).toHaveCount(6);
    await inventoryPage.sortBy('lohi');

    // 3. Add 2 items
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 4. Go to cart and verify
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(2);

    const cartNames = await cartPage.itemNames.allTextContents();
    expect(cartNames).toContain('Sauce Labs Backpack');
    expect(cartNames).toContain('Sauce Labs Bike Light');

    // 5. Checkout
    await cartPage.checkout();
    const checkoutPage = new CheckoutPage(page);

    // 6. Fill form
    await checkoutPage.fillInfo('John', 'Doe', '12345');
    await expect(page).toHaveURL(/checkout-step-two/);

    // 7. Review order
    const summaryNames = await checkoutPage.itemName.allTextContents();
    expect(summaryNames).toContain('Sauce Labs Backpack');
    expect(summaryNames).toContain('Sauce Labs Bike Light');

    // 8. Complete
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
