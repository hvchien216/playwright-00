# Framework Architecture

## Design Pattern: Page Object Model (POM)

### Layer 1: Tests
- Located in `tests/` directory
- Organized by feature modules
- Uses page objects for interactions
- Contains only test logic, no locators

### Layer 2: Page Objects
- Located in `pages/` directory
- One class per page/component
- Encapsulates locators and actions
- Returns page objects for method chaining

### Layer 3: Fixtures
- Located in `fixtures/` directory
- Reusable test data
- Pre/post test hooks
- Authentication helpers

### Layer 4: Utilities
- Located in `utils/` directory
- Helper functions
- Custom assertions
- Data generators

## Folder Structure
```
tests/
  ├── auth/login.spec.ts
  ├── products/browsing.spec.ts
  ├── cart/operations.spec.ts
  ├── checkout/checkout.spec.ts
  └── e2e/complete-flow.spec.ts

pages/
  ├── LoginPage.ts
  ├── ProductsPage.ts
  ├── CartPage.ts
  ├── CheckoutPage.ts
  └── CheckoutOverviewPage.ts
```

## Configuration
- `playwright.config.ts` - Main configuration
- Browser settings, timeout, retries
- Reporter configuration
- CI/CD specific settings