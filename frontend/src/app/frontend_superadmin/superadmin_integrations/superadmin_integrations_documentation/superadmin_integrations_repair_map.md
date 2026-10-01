# superadmin_integrations — AI Repair Map

## Start here
1. Read `superadmin_integrations_features.md`.
2. Open `superadmin_integrations_components/SuperadminIntegrationsMain.tsx`.
3. Read this repair map before changing code.

## Allowed change scope
- Normal feature repair: `superadmin_integrations/**` only.
- Do not change sibling business modules.
- Global infrastructure changes require an explicit, documented dependency and separate review.

## Ownership map
- UI/rendering: component files under the module components directories.
- Server state/workflows: module utils/hooks.
- API contract: `*Api.ts`, schema and types.
- UI strings: module `_locales/`.
- Mock behavior: module mocks.
- Tests: module test directories and colocated tests.

## Repair order
1. Reproduce/locate the exact feature surface.
2. Read the owning Main and repair map.
3. Trace Main → hook → API → schema → MSW fixture.
4. Make the smallest bounded change.
5. Add/repair the regression test at the user-visible boundary.
6. Re-run architecture, accessibility, responsive and security checks.
7. Update feature documentation in the same change.

## High-risk areas
- Authentication/authorization/permission changes.
- Destructive or financial actions.
- Tenant data export/offboarding.
- Ghost-login/impersonation.
- Payment/invoice/refund workflows.
- Bulk mutations and irreversible operations.
