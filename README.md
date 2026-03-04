# Practice Playwright

> UI Automation demo using Playwright + TypeScript + Page Object Model

![CI](https://github.com/hvchien216/playwright-00/actions/workflows/ci.yml/badge.svg)

## What's Inside

- **App under test:** [saucedemo.com](https://www.saucedemo.com) — a demo e-commerce site
- **Framework:** Playwright with TypeScript
- **Pattern:** Page Object Model (POM)
- **CI/CD:** GitHub Actions — runs tests on every push/PR, uploads HTML report as artifact
- **Coverage:** 17 test cases across 5 spec files

## Project Structure

```
tests/
├── pages/                    # Page Object Model classes
│   ├── login-page.ts         # Login page interactions
│   ├── inventory-page.ts     # Product listing page
│   ├── cart-page.ts          # Shopping cart page
│   └── checkout-page.ts      # Checkout flow pages
├── login.spec.ts             # 3 tests — authentication
├── inventory.spec.ts         # 4 tests — product listing & sorting
├── cart.spec.ts              # 5 tests — cart management
├── checkout.spec.ts          # 4 tests — checkout flow
└── shopping-flow.spec.ts     # 1 test  — full E2E purchase
```

## Test Coverage

| Spec | Tests | Covers |
|------|-------|--------|
| `login.spec.ts` | 3 | Successful login, locked user error, empty fields error |
| `inventory.spec.ts` | 4 | Product display, sort by price, sort by name, product detail nav |
| `cart.spec.ts` | 5 | Badge count, multiple items, cart contents, item removal, continue shopping |
| `checkout.spec.ts` | 4 | Incomplete form error, fill info, order summary, order confirmation |
| `shopping-flow.spec.ts` | 1 | Full purchase flow (login → add to cart → checkout → confirm) |
| **Total** | **17** | |

## Setup & Run

**Prerequisites:** Node.js 18+, pnpm

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Run all tests (headless)
pnpm test

# Run tests with browser visible
pnpm exec playwright test --headed

# Open HTML report (with embedded video player)
pnpm exec playwright show-report
```

## Videos

Tests are recorded automatically:

- **Local:** All tests recorded to `test-results/<test-name>/video.webm`
- **CI:** Videos retained for failed tests only (to save space)
- **HTML report:** Embeds video player per test — great for reviewing runs

## CI/CD

- **Pipeline:** [GitHub Actions](https://github.com/hvchien216/playwright-00/actions)
- **Trigger:** Every push/PR to `main`
- **Report:** HTML report uploaded as artifact on each run (retained 1 day)
- **Download report:** Go to the [Actions tab](https://github.com/hvchien216/playwright-00/actions) → select a run → download `playwright-report-<run_id>`

## Page Objects

The Page Object Model encapsulates page-specific selectors and actions into reusable classes. Each test file imports the relevant page objects, keeping test logic clean and maintainable:

```typescript
// Example usage in a test
const loginPage = new LoginPage(page);
await loginPage.login('standard_user', 'secret_sauce');
```

See [`docs/framework-overview.md`](./docs/framework-overview.md) for full POM details.

## Docs

- [`docs/framework-overview.md`](./docs/framework-overview.md) — architecture & design decisions
- [`docs/test-cases.md`](./docs/test-cases.md) — all 17 test cases documented
