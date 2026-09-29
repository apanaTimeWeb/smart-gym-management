# Landing API E2E — Forbidden Patterns

The Landing API E2E suite is isolated under `backend_e2e/backend_landing_e2e/` and is mapped 1:1 to the Landing backend feature.

1. **Rule 43 / Rule 112 — Never reuse a development or production database.** Tests must provision a fresh real PostgreSQL tenant and destroy it after the run; otherwise test data can contaminate real tenant data and lifecycle isolation is unproven.
2. **Rule 112 — Never mock the database or ORM in API E2E.** The suite must exercise real HTTP, real controllers, real TypeORM queries, and a dedicated test database; mocking would make a passing test incapable of proving database behavior.
3. **Rule 101 / Rule 112 — Never use hardcoded business UUIDs or status-only assertions.** Tests must extract real IDs and inspect the canonical response/idempotency behavior; otherwise a broken endpoint can still appear green.
4. **Rule 103 — Never omit `Idempotency-Key` on a mutation unless the test is explicitly asserting the required-key rejection.** Missing coverage would leave duplicate-execution behavior unprotected.
5. **Rule 112 — Never import helpers, fixtures, constants, or utilities from sibling role/module test trees.** Cross-module imports defeat isolated AI repair and let one test repair change unrelated suites.
6. **Rule 33 / Rule 112 — Never commit credentials or bootstrap tokens.** Runtime credentials must come from environment variables; committed secrets would create an avoidable security exposure.
