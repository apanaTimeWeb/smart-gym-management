# Superadmin Selenium UI Test Boundary

Each feature is isolated under the exact mirrored module path. Every test file creates
its own fresh WebDriver session and contains its own authentication and locator logic.

Runtime configuration:
- `SUPERADMIN_SELENIUM_BASE_URL` — frontend host, default `http://localhost:3000`.
- `SUPERADMIN_SELENIUM_COOKIE_NAME` / `SUPERADMIN_SELENIUM_COOKIE_VALUE` — a test-only authenticated session cookie.
- `SUPERADMIN_SELENIUM_HEADLESS=1` — run Chrome headlessly (default).

The suite requires a live frontend/backend environment for execution. Missing runtime
credentials cause an explicit pytest skip rather than a false pass.
