# Superadmin API E2E Test Boundary

These tests are black-box API tests for the Superadmin backend. Every module owns its
own test file and keeps its request construction, assertions, and runtime assumptions
inside that module directory.

Runtime configuration:
- `SUPERADMIN_E2E_BASE_URL` — API host, default `http://localhost:3000`.
- `SUPERADMIN_E2E_ACCESS_TOKEN` — authenticated Superadmin bearer token.
- `SUPERADMIN_E2E_TENANT_ID` — tenant context header when the endpoint requires one.

Tests skip only when required runtime credentials are absent; they do not replace real
HTTP calls with mocks and do not mock the database.
