# Psynth — QA Engineer Take-Home Assessment

- Candidate: Seyla Gomez
- Framework: Playwright · JavaScript
- App: **https://www.saucedemo.com**

---

## Getting Started

1. **Clone or download** the repository.
2. Initialize the framework: **Playwright:**
  > Requirements: Node.js v24+

   ```bash
   npm init -y
   npm install -D @playwright/test
   npx playwright install
   ```
3. Run the full test suite:
   ```bash
   npx playwright test
   ```
4. Open the HTML report
   ```bash
   npx playwright show-report
   ```

---

## Project structure

```
QA-ASSESSMENT
├── .github/
│   └── workflows/
│       └── e2e-tests.yml       # CI pipeline (GA)
├── tests/
│   ├── fixtures/
│   │   └── users.js            # Centralized credentials
│   ├── pages/                  # Page Object Model
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── login.spec.js           # TC-001, TC-006
│   ├── inventory.spec.js       # TC-002
│   ├── cart.spec.js            # TC-003
│   ├── checkout.spec.js        # TC-004
│   └── logout.spec.js          # TC-005
├── TEST_PLAN.md
├── BUG_REPORT.md
└── playwright.config.js
```

---

## Test coverage

| Test Case | Summary |	Priority |	Users |
|---|---|---|---|
TC-001 |Successful login for user | P1 | U1, U3, U4, U5, U6 
TC-002 |Product sorting | P1 | U1
TC-003 |Cart: add and remove product| P1 | U1 
TC-004 |Checkout: successful purchase| P1 | U1
TC-005 |Successful logout for user| P1 | U1, U3, U4, U5, U6  
TC-006 |Login blocked for U2| P1 |U2

> 19 tests total · 1 browser (Firefox) · 19 passed (25.7s)

---

## Technical decisions

- Playwright in Cypress: Offers more natural asynchronous handling for complex flows.
- Page Object Model: Each page has its own class that centralizes selectors and actions. If SauceDemo modifies a selector, the change is applied in only one place, instead of across all specification files.
- `data-test` attributes: These are used instead of CSS classes whenever available, as they are stable under style refactoring.
- No hard-coded waits: Playwright handles all timings using built-in automatic waits (toBeVisible, toHaveURL, toHaveCount).
- users.js file: Credentials are centralized in a single file, so any changes to them are automatically propagated to all tests.
- The test suite runs on Firefox by default. It's possible to add Chromium or WebKit in `playwright.config.js` within `projects`.
- TC-001 and TC-005 iterate over multiple credentials, generating a separate test for each user, demonstrating that tests remain isolated and preventing code duplication.

---

## CI/CD

- Tests run automatically on every push to main/PR via GA.
