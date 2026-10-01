# superadmin_jobs — AI Repair Map

## Discovery Boundary
- Primary feature documentation: `superadmin_jobs_features.md`
- Repair boundary: `superadmin_system_ops/superadmin_system_ops_jobs/`
- Parent application area: `superadmin_system_ops`
- Primary repair context: this feature directory first; inspect approved application infrastructure only when the feature documentation requires it.

## Responsibility Ownership
- UI: module-owned components and child-component folders.
- Logic: module-owned hooks/utilities.
- Server state: TanStack Query through the module query-key registry.
- UI-only shared state: module-scoped Zustand where required.
- Validation/contracts: module-owned schemas/types.
- Static configuration: module-owned constants registry.
- Network behavior: module-owned API facade and API implementations.
- Mocks/tests/docs: module-owned fixtures, MSW handlers, tests, feature docs, forbidden rules, and theme contract.

## Canonical Discovery Files
- `SuperadminSystemOpsJobsApi.ts` or the module-owned API client.
- Module constants entrypoint: `SuperadminSystemOpsJobsConstants.ts`
- Module schema entrypoint: `SuperadminSystemOpsJobsSchema.ts`
- Query-key registry: `SuperadminSystemOpsJobsQueryKeys.ts` where server state exists.
- Main orchestrator: `ModuleNameMain.tsx`
- Feature documentation: `superadmin_jobs_features.md`
- Theme contract: `superadmin_jobs_theme_contract.md`

## Safe Repair Order
1. Read this map and the feature document.
2. Inspect the affected component/hook/API/schema/test file only.
3. Trace the dependency direction before editing.
4. Preserve compliant behavior and make the smallest responsibility-scoped change.
5. Update colocated tests and feature documentation for behavior/contract changes.
6. Run the narrowest available module verification, then re-audit the feature boundary.

## External Dependencies
Only approved global application infrastructure may be required outside this directory. Any unavoidable external dependency must be documented in the feature documentation before broadening repair context.

## Forbidden Repair Patterns
- No global business component extraction.
- No cross-feature business imports.
- No API calls or business calculations in Main components.
- No inline hardcoded theme colors or semantic background opacity modifiers.
- No direct component-level TanStack mutations when a mutation hook is required.
- No fake/no-op interaction handlers.
- No hardcoded mock business data in production UI.
