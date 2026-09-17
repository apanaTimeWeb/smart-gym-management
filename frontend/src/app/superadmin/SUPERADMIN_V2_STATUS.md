# Superadmin V2 — Repair Status

## Completed in the module archive

- Custom Superadmin dialogs now have explicit accessible names and named close actions.
- Single-dialog components use `useSuperadminDialogAccessibility` for focus entry, Tab trapping, and focus restoration.
- Added an accessibility source-contract test and a real RTL keyboard-focus test.
- Removed shallow `*_basic.test.tsx` existence tests.
- Added Playwright backendless route smoke coverage for all discovered Superadmin routes plus representative onboarding, destructive confirmation, and messaging dialog flows.
- Preserved the previously fixed displayValue, debounce, toast-ID, naming, isolation, TypeScript-hygiene, and module-owned MSW work.

## Host-project verification still required

The module archive does not include the host project's package.json, installed dependencies, global MSW bootstrap, authentication test fixture, or CI configuration. Therefore full tsc, ESLint, Vitest execution, Playwright execution, next build, dependency/SCA checks, secret scanning, and host permission behavior remain NOT VERIFIED until the module is merged into the actual application.

## Backendless requirement

Register `superadminMockHandlers` from `superadmin_mocks/SuperadminMockHandlers.ts` in the host application's existing MSW bootstrap for development/test. Production must keep MSW disabled.
