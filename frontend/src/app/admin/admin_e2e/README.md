# Admin E2E Journeys

These are active Playwright journeys owned by the Admin module. The project-level Playwright config uses `e2e/` as its default test directory, so run these module tests explicitly when validating the Admin-only replacement:

`npx playwright test src/app/admin/admin_e2e`

The tests create the documented `ADMIN` demo session cookie and rely on the existing global MSW bootstrap to register the Admin-owned handlers.
