# CI/CD Pipeline Guide

## GitHub Actions Workflow

### Trigger Events
- Push to `main` branch
- Pull request to `main`
- Manual trigger (workflow_dispatch)

### Pipeline Steps

1. **Checkout Code**
   - Uses: actions/checkout@v4

2. **Setup Node.js**
   - Version: 18.x
   - Cache: npm dependencies

3. **Install Dependencies**
   - `npm ci` (clean install)

4. **Install Playwright Browsers**
   - `npx playwright install --with-deps`

5. **Run Tests**
   - Execute full test suite
   - Parallel execution enabled

6. **Upload Artifacts**
   - HTML Report
   - Test videos
   - Traces
   - Screenshots

### Viewing Reports in CI

1. Go to Actions tab
2. Select latest workflow run
3. Download artifacts
4. Extract and open `index.html`

### Status Badge
Add to README.md:
```markdown
![Tests](https://github.com/<user>/<repo>/actions/workflows/playwright.yml/badge.svg)
```