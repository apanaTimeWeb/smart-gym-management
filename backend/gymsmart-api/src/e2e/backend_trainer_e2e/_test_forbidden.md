# backend_trainer_e2e — Forbidden Test Patterns

1. **Do not use a shared/global fixture outside `backend_trainer_e2e`.** Rule 121. Consequence: Trainer tests become coupled to another role/domain and an AI repair can break unrelated tests.
2. **Do not mock the tenant database, ORM repository, or SQL path.** Rule 121. Consequence: tests can pass while the real tenant isolation or persistence contract is broken.
3. **Do not import helpers/fixtures from another backend role test domain.** Rule 121. Consequence: cross-role test changes violate the isolation boundary.
4. **Do not assert only HTTP 200/201 or `status_code != 404`.** Rule 121. Consequence: false-positive tests can survive broken payloads and database side effects.
5. **Do not reuse a production tenant or production credential.** Rule 121. Consequence: test data can leak across tenants and mutate real business data.
6. **Do not turn missing E2E environment variables into skips that are reported as success.** Rules 76/77/121. Consequence: contract regressions become invisible.
7. **Do not add a frontend-unrequired endpoint merely to satisfy an E2E test.** Rule 101. Consequence: backend contract surface drifts from the frozen frontend baseline.
