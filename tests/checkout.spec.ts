import { test, expect } from './fixtures/checkout-fixtures';

test.describe('Checkout', () => {
  test('should show error when checkout info is incomplete', async ({ checkoutPage }) => {
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('should proceed to checkout overview after filling info', async ({ checkoutPage, page }) => {
    await checkoutPage.fillInfo('John', 'Doe', '12345');

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('should display correct item in order summary', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo('John', 'Doe', '12345');

    await expect(checkoutPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.itemPrice).toHaveText('$29.99');
  });

  test('should complete order and show confirmation', async ({ checkoutPage, page }) => {
    await checkoutPage.fillInfo('John', 'Doe', '12345');
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
