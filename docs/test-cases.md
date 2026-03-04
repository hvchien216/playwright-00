# Test Cases

All 17 test cases across 5 spec files.

## login.spec.ts (3 tests)

| # | Test | Description |
|---|------|-------------|
| 1 | should login successfully with standard_user | Navigates to login, enters valid credentials, asserts redirect to `/inventory` |
| 2 | should show error for locked_out_user | Logs in with locked account, asserts error message is visible |
| 3 | should show error when fields are empty | Submits empty form, asserts validation error is shown |

## inventory.spec.ts (4 tests)

| # | Test | Description |
|---|------|-------------|
| 4 | should display products on inventory page | Asserts product list is visible after login |
| 5 | should sort products by price low to high | Selects "Price (low to high)" sort, asserts prices are in ascending order |
| 6 | should sort products by name A to Z | Selects "Name (A to Z)" sort, asserts product names are in alphabetical order |
| 7 | should navigate to product detail page | Clicks a product name, asserts detail page loads |

## cart.spec.ts (5 tests)

| # | Test | Description |
|---|------|-------------|
| 8 | should show cart badge after adding a product | Adds one item, asserts cart badge shows `1` |
| 9 | should update badge count for multiple products | Adds multiple items, asserts badge reflects correct count |
| 10 | should display correct items in cart | Adds item, opens cart, asserts item name and price are correct |
| 11 | should update badge when removing an item | Adds item, removes from cart page, asserts badge clears |
| 12 | should return to inventory when clicking continue shopping | Clicks "Continue Shopping" in cart, asserts redirect to inventory |

## checkout.spec.ts (4 tests)

| # | Test | Description |
|---|------|-------------|
| 13 | should show error when checkout info is incomplete | Proceeds to checkout with empty form, asserts error message |
| 14 | should proceed to checkout overview after filling info | Fills first name, last name, zip; asserts overview page loads |
| 15 | should display correct item in order summary | Asserts item in checkout overview matches item added to cart |
| 16 | should complete order and show confirmation | Clicks Finish, asserts order confirmation message is displayed |

## shopping-flow.spec.ts (1 test)

| # | Test | Description |
|---|------|-------------|
| 17 | should complete full purchase flow | Full E2E: login → browse inventory → add item to cart → checkout → fill info → confirm order |
