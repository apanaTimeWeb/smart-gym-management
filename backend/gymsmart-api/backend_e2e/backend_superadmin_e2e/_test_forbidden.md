# Superadmin E2E Test Forbidden Patterns

This test root is isolated to the Superadmin backend. Tests MUST call the running API over HTTP and MUST use a dedicated test database configured by the host application.

1. Do not import fixtures/helpers/constants from another feature test directory; duplicate feature-local helpers when necessary. (Rule 121)
2. Do not mock or stub the production repository/database for API tests; E2E must exercise real persistence. (Rules 27, 43, 121)
3. Do not use `assert True`, route-only 2xx checks, or implementation-copied expected values. (Rule 101)
4. Do not bypass authentication/tenant behavior with internal service calls; prove the HTTP boundary. (Rules 39, 83, 121)
5. Do not hardcode numeric HTTP status codes in assertions; use `http.HTTPStatus`. (Rule 9)
6. Do not share generic helpers through a parent `helpers/` or `utils/` directory. (Rule 121)
7. Do not modify frontend source from these tests. Frontend remains read-only contract evidence. (Audit V6.2 scope rules)
8. Do not treat skipped tests caused by a missing runtime environment as passing evidence. Runtime availability must be reported separately. (Rule 122)
