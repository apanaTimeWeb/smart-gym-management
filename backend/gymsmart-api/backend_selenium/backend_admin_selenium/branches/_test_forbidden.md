# Selenium forbidden patterns for this module.

## FORBIDDEN-1: Shared test helpers
Pattern: Importing fixtures, locators, helper functions, or state from another module test.
Consequence: Violates Rule 121 WET isolation and couples unrelated repair contexts.
Rule: 121

## FORBIDDEN-2: Fixed waits
Pattern: `time.sleep()` for synchronization.
Consequence: Flaky tests and hidden timing defects.
Rule: 121

## FORBIDDEN-3: Hardcoded production URL
Pattern: Embedding a production hostname in test code.
Consequence: Tests target the wrong environment and become unsafe to replay.
Rule: 121

## FORBIDDEN-4: API assertions
Pattern: Asserting raw API response bodies from Selenium.
Consequence: API contract assertions belong in backend pytest E2E, not browser UI tests.
Rule: 121

## FORBIDDEN-5: Database mutation
Pattern: Writing directly to the database from Selenium.
Consequence: Bypasses real UI/backend behavior and invalidates the browser proof.
Rule: 121
