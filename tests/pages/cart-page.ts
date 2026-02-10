import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
