# Superadmin V1 Repair Completion

This package contains the follow-up repairs identified by the cross-module audit.

## Completed in this revision

- Replaced all inline `'—'` nullable display fallbacks in production TSX with `displayValue()`.
- Added `useSuperadminDebouncedValue` with a 300ms default and a co-located Vitest/RTL test.
- Wired debounce into every identified Superadmin search path that feeds a server query or server-backed filter flow: affiliates, backups, branches, broadcasts, coupons, franchises, global audit, gyms, invoices, onboarding, reports, system SLA, tickets, and the Messaging client filter.
- Added the missing stable toast ID to the System SLA credit error path.
- Re-checked module mock handlers for numeric HTTP status literals; none remain.
- Re-checked generic `Props` declarations; none remain in production module source.
- Reclassified the previously flagged hook files as page/data orchestration hooks; they are within the 150-line hook ceiling.
- Preserved existing isolation, route scaffolding, Zod/API boundaries, module-owned MSW fixtures, and dirty-form guard wiring.

## Permission boundary

Permission behavior is not invented inside this archive. The module itself does not ship a permission model, and the host project's permission/session infrastructure was not packaged. The integration point remains the host application's approved permission/session infrastructure. This is intentionally documented rather than guessed.

## Verification completed in this archive

- No production inline en-dash fallback literals remain.
- No numeric HTTP status literals remain in module TypeScript mock handlers.
- No generic `Props` declarations remain.
- Every identified server-backed search path now uses a debounced value before query parameters/query keys are built.
- TypeScript syntax transpilation succeeds for all module `.ts`/`.tsx` files.

## Still host-project dependent

`NOT VERIFIED` from this module-only archive:

- Full `tsc --noEmit` against the host application
- Full ESLint/Tailwind/Prettier gates
- Project-wide Vitest execution
- Playwright E2E execution
- Next.js production build
- SCA/dependency audit
- gitleaks secret scan
- Host permission/RBAC runtime behavior

Run those after replacing the Superadmin module in the host repository.
