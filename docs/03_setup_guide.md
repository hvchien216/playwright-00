# Setup Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- VS Code (recommended)

## Installation Steps

1. **Clone Repository**
```bash
   git clone <repo-url>
   cd playwright-ecommerce-demo
```

2. **Install Dependencies**
```bash
   npm install
```

3. **Install Playwright Browsers**
```bash
   npx playwright install
```

4. **Verify Installation**
```bash
   npx playwright test --list
```
   Should show 15 tests

## IDE Setup (VS Code)

1. Install Playwright extension
2. Enable TypeScript support
3. Configure test runner

## Environment Variables (Optional)
Create `.env` file:
```
BASE_URL=https://www.saucedemo.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```