# Superadmin v1 Repair Manifest

## Completed in v1
- Removed Superadmin shell → Messaging business API/type coupling.
- Added shell-owned notification contract, hook, fixture, handler and aggregate MSW registration export.
- Renamed and hardened the Superadmin unsaved-changes guard.
- Renamed cancellation component files/exports to exact SuperadminCancellations casing.
- Replaced feature-history component-generated mock data with an API-backed module-owned contract/fixture/handler/hook.
- Moved feature/invoice tenant mock constants toward module-owned fixture files.
- Replaced numeric mock HTTP statuses with `http-status-codes` constants where applicable.
- Extracted migration status presentation into its own component/constants.
- Cleaned and strengthened `superadmin_forbidden.md` and theme documentation.
- Added missing hook data-flow comments.
- Added an aggregate `SuperadminMockHandlers.ts` registry.

## Runtime limitation
This archive is the Superadmin module only. Full runtime validation still depends on the consuming project's existing global infrastructure (`@/lib/api`, Tailwind tokens, ThemeProvider, MSW bootstrap/service worker, auth/session, UI primitives, TanStack Query, and package dependencies).
