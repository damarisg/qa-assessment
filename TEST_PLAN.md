# Test Plan — [SauceDemo E-Commerce]

```
Test Plan
├─ 0. Context
├─ 1. Scope
├─ 2. Out of scope
├─ 3. Test cases (Happy-path, Negative/edge, Cross-user scenarios)
├─ 4. Risk assessment
└─ 5. Exit criteria
```

---

## 0. Context

**Version:** 1.0  
**Date:** 2026-05-15  
**Author:** Seyla Gomez 
**Test Environment:** Staging — `https://www.saucedemo.com`  

---

### Available Credentials

Each credential simulates a different application state, allowing us to cover scenarios that would be accidental or difficult to reproduce in production.

| # | Username | Password  | Description|
|---|---------|------------|------------------------|
| U1 | `standard_user` | `secret_sauce!` | Normal user — all features work|
| U2 | `locked_out_user` | `secret_sauce!` | Locked out — login should fail|
| U3 | `problem_user` | `secret_sauce!` | Broken images and form behavior|
| U4 | `performance_glitch_user` | `secret_sauce!` | Simulated slow responses|
| U5 | `error_user` | `secret_sauce!` | Triggers various application errors|
| U6 | `visual_user` | `secret_sauce!` | Visual/layout inconsistencies|

---

## 1. Scope

The following elements were intentionally included in this iteration of the plan.
- `Authentication`: Gateway to the entire system.
    - Page: `/` 
    - (login, logout)
- `Catalog and search`: Is the primary discovery flow.
    - Page: `/inventory.html` 
    - (product listing, filters, details page) 
- `Shopping cart`: A critical state that relates to the purchase.
    - Page: `/cart.html` 
    - (add, remove, persistence) 
- `Checkout`: The flow with the highest financial and technical risk.
    - Page: `/checkout-step-one.html, /checkout-step-two.html, /checkout-complete.html ` 
    - (data entry, confirmation)

---

## 2. Out of scope

The following elements were intentionally excluded from this iteration of the plan.

| Area | Reason  |
|----|----|
| Admin Panel (`/admin`) | Requires a separate plan with its own credentials and workflows. It is not part of the end-user experience.
| Integration with real payment gateways| The testing environment uses simulations. 
| Performance/Load Testing | Requires specific tools and a dedicated environment. I have no experience developing these tests, but I do have experience analyzing the results.
| Compatibility | The product no defines minimum compatibility with Chrome, Firefox, Safari, and Edge.

---

## 3. Test cases

### Priority Reference
- **P1 — Critical:** Blocks the business if it fails. Runs on every release.
- **P2 — High:** Affects important workflows but has a solution. Runs on major releases.
- **P3 — Medium:** Improves the experience but does not block. Runs on full regression cycles.

| Test Case | Summary |	Priority |	Type |
|---|---|---|---|
TC-001 |Successful login for user | P1 | Happy path 
TC-002 |Product sorting | P1 | Happy path 
TC-003 |Cart: add and remove product| P1 | Happy path 
TC-004 |Checkout: successful purchase| P1 | Happy path 
TC-005 |Successful logout for user| P1 | Happy path 
TC-006 |Login blocked for U2| P1 | Negative/Edge
TC-007 |Form with broken images and faulty behavior  | P1 | Negative/Edge
TC-008 |Experience with slow responses  | P1 | Negative/Edge
TC-009 |Application error handling  | P1 | Negative/Edge
TC-010 |Checkout: Purchase failed with invalid data | P1 | Negative/Edge
TC-011 |Attempting to access checkout with no items in the cart | P2 | Negative/Edge
TC-012 |Visual and design inconsistencies | P2 | Negative/Edge
TC-013 |Simultaneous sessions of two users (slow response vs normal response) who purchase the same product with limited stock | P1 | Cross-user

---

## 4. Risk assessment

The matrix combines **probability of failure** × **impact if it fails** to prioritize testing effort.

| Level | Description |
|---|---|
🔴 Critical | High probability + High impact. Test thoroughly, include in smoke testing. |
🟠 High | Medium probability or very high impact. Test on every release. |
🟡 Medium | Moderate risk. Test in regression cycles. |
🟢 Low | Low risk or minimal impact. Test sporadically. |


| # | Area | Risk | Why failure is likely | Impact | Level | Mitigation |
|---|---|---|---|----|----|---|
R1 | Place order | Race condition in inventory | Multiple users can simultaneously purchase the last item | Sale of out-of-stock products, financial and reputational losses | 🔴 Critical | TC-013, validate stock reservation in the backend before processing the charge |
R2 | Place order | Double submission on the "Checking" button | With high latency in credentials (U4), the user can click twice | Double charge to the customer | 🔴 Critical | TC-008, verify that the button is disabled after the first click |
R3 | Sessions | Cart persistence across sessions | Cart may be emptied if the token expires during checkout | User frustration | 🟡 Medium | TC-008, check behavior with an expired session |
R4 | Application Errors | Stack Trace Exposed in Production | Triggers errors that may reveal internal paths | Exposure of sensitive technical information | 🟠 High | TC-009, verify that 500 errors display a generic screen |

---

## 5. Exit criteria

The test plan is considered complete when: 
- All P1 test cases have a status of Passed or have a documented bug with severity assigned.
- No Critical bugs are open (purchase blockers, double charges, data exposure).
- All Critical risk scenarios from Section 4 have verified mitigation or a reported bug.
- All multi-user scenarios have been executed and documented.

Medium and Low bugs may remain open provided an issue has been created and prioritized for the next sprint.

If an unexpected Critical bug is discovered during execution, testing is paused until QA and the development team agree on whether it blocks the release. This agreement must be documented before resuming.
