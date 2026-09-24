# Superadmin saas-billing/invoices — Selenium Test Forbidden Patterns

## FORBIDDEN-1: Shared Cross-Module Helpers
Pattern: Import a fixture, locator helper, constant, or session helper from another Selenium module.
Consequence: A fix in one module can silently break another module and defeats the feature-isolated AI test boundary.
Rule: Rule 121.

## FORBIDDEN-2: API Body Assertions
Pattern: Assert JSON response bodies, repository rows, or ORM state directly from Selenium.
Consequence: UI tests become coupled to transport implementation and duplicate the pytest API E2E layer.
Rule: Rule 121.

## FORBIDDEN-3: Database Mutation From Browser Tests
Pattern: Connect to or directly mutate the database from this Selenium module.
Consequence: The browser test bypasses the real user workflow and can contaminate the test database.
Rule: Rule 121.

## FORBIDDEN-4: Fixed Sleeps
Pattern: Use `time.sleep()` as the primary synchronization mechanism.
Consequence: Timing-dependent tests become flaky and can pass or fail nondeterministically under load.
Rule: Rule 121.

## FORBIDDEN-5: Hardcoded Production URLs
Pattern: Embed a production hostname or environment-specific secret in the test source.
Consequence: Tests can accidentally mutate production or leak deployment details; CI portability is lost.
Rule: Rule 121.

## FORBIDDEN-6: Single Brittle Locator
Pattern: Depend on one auto-generated DOM id/class without a backup locator.
Consequence: A harmless UI refactor breaks the test even when user behavior is unchanged.
Rule: Rule 121.
