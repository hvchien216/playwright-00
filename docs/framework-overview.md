# Framework Overview

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev) | Latest | Browser automation & test runner |
| TypeScript | ~5.x | Type safety, better IDE support |
| pnpm | 9.x | Fast, disk-efficient package manager |
| GitHub Actions | — | CI/CD pipeline |

## Architecture: Page Object Model (POM)

Each page in the app under test has a corresponding **Page Object class** that encapsulates:
- Locators (selectors for UI elements)
- Actions (methods that interact with the page)

Tests import these classes instead of using raw selectors, which:
- Makes tests readable ("what", not "how")
- Centralizes selector maintenance — change once, fix everywhere
- Enables easy reuse across multiple test files

### Class Overview

```
tests/pages/
├── login-page.ts       LoginPage       login(username, password)
├── inventory-page.ts   InventoryPage   addToCart(itemName), sortBy(option), ...
├── cart-page.ts        CartPage        removeItem(), continueShopping(), checkout()
└── checkout-page.ts    CheckoutPage    fillInfo(first, last, zip), finish()
```

### Example

```typescript
// tests/login.spec.ts
import { LoginPage } from './pages/login-page';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});
```

## Why Playwright?

- **Cross-browser:** Chromium, Firefox, WebKit from one API
- **Auto-wait:** Built-in waiting for elements — no manual `waitFor` noise
- **Built-in reporter:** HTML report with screenshots, traces, and video
- **TypeScript-first:** Official types, great IDE completion
- **CI-friendly:** Headless by default, Docker images available

## Test Configuration

Key settings in `playwright.config.ts`:

| Setting | Local | CI |
|---------|-------|----|
| `workers` | CPU count (parallel) | 1 (sequential, stable) |
| `retries` | 0 | 2 |
| `video` | `on` (all tests) | `retain-on-failure` |
| `screenshot` | `only-on-failure` | `only-on-failure` |
| `trace` | `on-first-retry` | `on-first-retry` |

## CI/CD Pipeline

```
push to main
    ↓
GitHub Actions (ubuntu-latest)
    ↓
pnpm install + playwright install --with-deps
    ↓
playwright test (3 browsers × 17 tests = 51 test runs)
    ↓
Upload HTML report artifact (retained 1 day)
```

Workflow file: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
