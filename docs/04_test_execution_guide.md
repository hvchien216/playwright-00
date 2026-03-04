# Test Execution Guide

## Run All Tests
```bash
npx playwright test
```

## Run Specific Module
```bash
npx playwright test tests/auth/
npx playwright test tests/cart/
```

## Run Single Test File
```bash
npx playwright test tests/auth/login.spec.ts
```

## Debug Mode
```bash
npx playwright test --debug
npx playwright test --headed
```

## Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Generate Report
```bash
npx playwright show-report
```

## UI Mode (Interactive)
```bash
npx playwright test --ui
```

## Run with Trace
```bash
npx playwright test --trace on
```

## Parallel Execution
```bash
npx playwright test --workers=4
```

## Run Tagged Tests
```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```