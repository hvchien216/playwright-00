import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

// Shape of our custom fixtures
type CheckoutFixtures = {
  checkoutPage: CheckoutPage;
};

/**
 * Extended test with a pre-built checkout fixture.
 * Handles the full login → add item → cart → checkout navigation,
 * so specs start directly on the checkout step-one form.
 */
export const test = base.extend<CheckoutFixtures>({
  checkoutPage: async ({ page }, use) => {
    // Step 1: Login via LoginPage POM
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Add a backpack to cart via InventoryPage POM
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');

    // Step 3: Navigate to cart and proceed to checkout via CartPage POM
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();

    // Hand off to the test — page is now on checkout-step-one
    await use(new CheckoutPage(page));

    // No teardown needed; Playwright resets the page after each test
  },
});

export { expect } from '@playwright/test';
