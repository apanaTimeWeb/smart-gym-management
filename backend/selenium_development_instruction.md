# Enterprise-Grade, AI-Friendly Selenium E2E Architecture Guidelines

## The Core Philosophy
This document outlines the strict architectural rules for building the Selenium E2E (End-to-End) test suite for the Smart Gym Management application. Just like the Frontend and Backend, the primary goal is **Extreme Isolation** and **AI-Friendliness**. 

When an AI is asked to write or fix a failing UI test, it must be provided with highly localized context. A test failure in "Billing" should never be caused by a side-effect from "User Registration". E2E tests are notoriously flaky and slow; these rules are designed to make them robust, fast, and deterministic.

---

## 1. Micro-Modularization & Page Object Model (POM)
Never mix WebDriver interactions (clicks, inputs) with test assertions. The project strictly adheres to the **Page Object Model (POM)**.
- Every page (or complex UI component like a Modal) must have its own dedicated class file (e.g., `pages/member_registration_page.py`).
- The test file (e.g., `tests/test_member_registration.py`) should read like plain English, calling methods from the POM.
- **Why for AI?** If a test fails because a button's CSS class changed, you only feed the AI the `member_registration_page.py` file. The test logic remains untouched.

## 2. Descriptive, AI-Contextual Naming
Files and test functions must be extremely descriptive. 
- ❌ **BAD:** `test_billing.py` -> `def test_1():`
- ✅ **GOOD:** `test_member_subscription_renewal.py` -> `def test_member_can_renew_expired_subscription_via_credit_card():`
- **Why?** The AI can instantly deduce the intent and the expected business flow just from the function name.

## 3. True Test Data Isolation (The Golden Rule of E2E)
UI tests MUST NEVER rely on existing or pre-seeded database state. They must never run against the production database or a shared staging database.
- **Dynamic Provisioning:** Consistent with Backend Rule 43, every E2E test suite or specific test must dynamically provision a new Tenant/Database or explicitly create its own isolated data before execution.
- **No Shared State:** If Test A creates a user, Test B must not assume that user exists. Test B must create its own user.

## 4. Complete UI Flow Testing (No API Shortcuts)
To ensure the application is truly tested end-to-end exactly as a user experiences it, do NOT use the backend API to set up test prerequisites or bypass the UI.
- **The Rule:** If you are testing the "Delete Member" UI feature, your test MUST first use Selenium to navigate to the "Create Member" form, fill out the form, submit it, verify the creation, and *then* proceed to find and click "Delete". Every single button, input, and user flow must be interacted with strictly via the UI.
- **Why?** This guarantees that the entire interconnected user journey works flawlessly in the real browser. While it increases execution time, it provides 100% confidence that the frontend flows are fully functional and interconnected.

## 5. Absolute Prohibition of `time.sleep()`
Never use static, hardcoded waits (e.g., `time.sleep(5)`). This is strictly forbidden.
- **The Rule:** You must exclusively use **Explicit Waits** (e.g., `WebDriverWait(driver, 10).until(EC.element_to_be_clickable(...))`).
- **Why?** Network conditions and rendering speeds vary. Static waits either waste time (if the element loads instantly) or fail randomly (if it takes 5.1 seconds). Explicit waits make tests deterministic.

## 6. Centralized Locators & No Magic Strings
Never hardcode CSS selectors, XPaths, or IDs directly inside POM methods.
- **The Rule:** All locators must be defined as variables/tuples at the top of the POM class.
- ❌ **BAD:** `driver.find_element(By.CSS_SELECTOR, ".btn-primary").click()`
- ✅ **GOOD:** `self.SUBMIT_BUTTON = (By.CSS_SELECTOR, "button[data-testid='submit-registration']")`
- **Why?** If the frontend team changes a class name, you only update the locator in one place. Using `data-testid` attributes is strictly preferred over CSS classes or brittle XPaths.

## 7. Strict Typing & JSDoc/Docstrings
Since AI will be maintaining these tests, provide explicit type hints and docstrings for all POM methods.
- **The Rule:** A POM method should look like this:
  ```python
  def fill_registration_form(self, email: str, phone: str) -> None:
      """Fills the member registration form with provided details."""
      self._wait_and_type(self.EMAIL_INPUT, email)
  ```
- **Why?** When an AI generates a test script, it reads the POM signature and knows exactly what arguments to pass, preventing hallucinated method signatures.

## 8. Automatic Diagnostic Capture on Failure
When an E2E test fails in CI/CD, developers usually have no idea why.
- **The Rule:** The testing framework (e.g., `pytest` fixtures) must be configured to automatically capture and save the following artifacts whenever an assertion fails:
  1. A full-page screenshot (`.png`).
  2. The browser console logs (to catch JS errors).
  3. The current DOM/HTML snapshot.
- **Why?** You can feed these exact artifacts (screenshot + DOM snapshot) to a multimodal AI agent, and it will instantly tell you why the test failed (e.g., "The button was obscured by a loading overlay").

## 9. Environment & Config Abstraction
Never hardcode URLs, admin credentials, or tenant IDs in the tests.
- **The Rule:** Use a centralized configuration file (e.g., `config.py` using `.env` variables) to manage `BASE_URL`, `API_URL`, `ADMIN_EMAIL`, etc. 

## 10. Test Categories & Parallel Execution
As the application grows, E2E tests will become a bottleneck.
- **The Rule:** Tag tests by feature and execution speed (e.g., `@pytest.mark.smoke`, `@pytest.mark.billing`, `@pytest.mark.slow`). Ensure the test suite is designed to be completely thread-safe so it can be executed in parallel (e.g., using `pytest-xdist`). 
- Parallel execution is only possible if you strictly adhere to **Rule 3** (True Test Data Isolation).

---

## 11. Comprehensive UI Interaction & Assertions (Complete Testing)
Every interactive element on the screen must be explicitly verified. Do not write tests that only verify the "happy path". 

### 11.1 Full CRUD Lifecycle Testing
Every major entity (Members, Plans, Inquiries) MUST have a comprehensive E2E test suite that executes the entire CRUD lifecycle from the UI perspective:
- **Create:** Fill the form, submit, verify success toast, verify the entity appears in the table.
- **Read (View):** Click the table row (Frontend Rule 19), verify the detail modal/page opens, and verify the data matches the creation payload.
- **Update (Edit):** Click the edit button, change fields, submit, and verify the table or profile reflects the updated data.
- **Delete/Deactivate:** Create the entity via the UI (Rule 4), find it in the UI list, click Delete/Deactivate, accept the confirmation modal, verify the success toast, and assert the entity is no longer visible in the table.

### 11.2 Form Validation & Error State Testing
Never assume forms just work. Explicitly test the frontend validation (Zod/React Hook Form):
- **Empty Submissions:** Click submit on an empty form and assert that all required field error messages appear exactly as expected.
- **Invalid Inputs:** Enter invalid emails, short passwords, or future dates for DOB, and assert the specific inline validation errors appear.
- **Backend Error Handling:** Trigger a known backend error (e.g., duplicate email) and explicitly assert that the API error is intercepted and displayed in the UI correctly (Toast or inline alert).

### 11.3 Interactive Elements & State Verification
Every interactive element must be tested for its visual state during and after an action:
- **Pessimistic UI/Loading States (Frontend Rule 15/41):** When a submit button is clicked, assert that the button transitions to a disabled state (e.g., `element.is_enabled() == False` or `aria-disabled="true"`) and that a loading spinner is visible until the API resolves.
- **Dropdowns & Popovers:** Test custom searchable dropdowns (Frontend Rule 20). Click the dropdown, type in the search input, assert the filtered results are correct, and select an option.
- **Radio Buttons & Toggles:** Explicitly click radio buttons (e.g., Email vs WhatsApp selection) and assert that only one can be active at a time.

### 11.4 Table Controls & Row Interactions
Tabular data must be tested thoroughly:
- **Pagination:** Assert that clicking "Next Page" correctly changes the URL parameters and updates the list of items.
- **Sorting:** Click a column header and assert that the first row of data updates to reflect the correct ascending/descending order.
- **Filtering & Search:** Type in the table search box, assert that the API call is debounced (wait 500ms), and assert the table only shows rows matching the search term.
- **Row Clicks:** Because entire rows are clickable (Frontend Rule 19), assert that clicking anywhere on the `<tr>` navigates correctly, and assert that clicking action buttons *inside* the row (with `stopPropagation()`) does NOT trigger the row click navigation.

### 11.5 Role-Based Access Control (RBAC) Verification
Testing what a user *cannot* do is as important as testing what they *can* do.
- **The Rule:** Log in as a `STAFF` user and navigate to a restricted area. Explicitly assert that destructive UI elements (e.g., "Delete Gym" button) are completely absent from the DOM (not just disabled, but hidden as per Frontend Rule 25).

### 11.6 Toast & Notification Assertions
Since all success/error messages are driven by the backend (Frontend Rule 14), UI tests must intercept and assert these toasts.
- **The Rule:** After any mutation, explicitly wait for the Toast container to appear and assert its text content matches the expected success/error message.

---

## Summary Checklist for AI Generation:
1. Is the test logic isolated from the page interactions (POM)?
2. Are all locators centralized and using `data-testid` where possible?
3. Is `time.sleep()` completely absent in favor of Explicit Waits?
4. Does the test perform all prerequisite setup entirely through the UI (No API shortcuts)?
5. Are types and docstrings present on all methods?
6. Does the test cover full CRUD cycles, verifying both UI tables and detailed views?
7. Are form validations (empty, invalid, duplicate) explicitly tested?
8. Are loading states and disabled buttons asserted during async operations?
9. Are table interactions (pagination, sorting, filtering, row clicks) verified?
10. Is the absence of restricted UI elements verified for lower-tier roles?
