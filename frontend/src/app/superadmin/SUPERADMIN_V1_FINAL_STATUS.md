# Superadmin V1 — Final Repair Status

This package is the repaired Superadmin frontend module prepared against `web_frontend_development_instruction.md` and `web_global_design.md`.

## Repaired in V1
- Removed the Superadmin shell dependency on Messaging business API/types by introducing a shell-owned notification contract.
- Renamed and hardened the Superadmin unsaved-changes guard and updated all module consumers to the module-owned guard.
- Added an aggregate `superadminMockHandlers` registry for all module-owned MSW handlers plus shell notifications.
- Moved feature-specific inline mock tenant datasets into module-owned fixture files.
- Added complete feature-flag history API/schema/fixture/handler/query flow.
- Added working backup schedule API/schema/fixture/handler and converted the schedule UI to React Hook Form + Zod + dirty-state protection.
- Added a working ticket-reply API + MSW handler and converted the reply modal from timeout simulation to the real feature API path.
- Added working background-job retry/cancel/delete/clear/bulk API operations + MSW handlers and connected the mutation hook to TanStack Query invalidation.
- Converted Messaging page server data to TanStack Query and URL-synced tab/search/channel/date state.
- Split the Messaging notification type icon into its own component and normalized icon sizing.
- Added working System SLA downtime-credit API + MSW handler and centralized SLA status styling.
- Fixed cancellation filename casing and generic props issues.
- Added missing hook data-flow comments.
- Removed numeric HTTP status literals from module mock handlers.
- Added/updated module forbidden/theme/repair documentation.

## Verification performed
- All `.ts/.tsx` files pass TypeScript syntax transpilation with zero syntax diagnostics.
- No production `console.log`, `@ts-ignore`, `@ts-nocheck`, generic `Props`/`Data` interfaces, numeric mock status literals, or old unsaved-guard imports remain.
- All React components and audited hooks/API files are within documented size ceilings.
- Superadmin mock registry contains 26 handler groups (25 feature groups + shell notification group).

## Host-project verification
A complete `tsc`, ESLint, Vitest/RTL, Playwright, Next production build, dependency vulnerability scan, and secret scan cannot be truthfully executed from this module-only archive because the host project's dependency/configuration files are not included. Those checks remain `NOT VERIFIED` until the archive is placed back into the host application and its normal CI/local toolchain is run.

## Backendless mode
The module is designed to work without the real backend through MSW. The host application's global MSW browser/test bootstrap must register `superadminMockHandlers`. See `SUPERADMIN_V1_MSW_INTEGRATION.md`.
