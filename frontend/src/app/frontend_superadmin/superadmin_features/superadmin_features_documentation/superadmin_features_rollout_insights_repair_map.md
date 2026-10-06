# superadmin_features_rollout_insights — AI Repair Map

## Discovery Boundary
- Primary feature documentation: `superadmin_features_rollout_insights_features.md`
- Repair boundary: `superadmin_features/`
- Parent application area: `superadmin_features`
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
- `../superadmin_features_api/SuperadminFeaturesApi.ts` or the module-owned API client.
- Module constants entrypoint: `SuperadminFeaturesConstants.ts`
- Module schema entrypoint: `SuperadminFeaturesSchema.ts`
- Query-key registry: `../superadmin_features_constants/SuperadminFeaturesQueryKeys.ts` where server state exists.
- Main orchestrator: `../superadmin_features_components/SuperadminFeaturesMain.tsx`
- Feature documentation: `superadmin_features_rollout_insights_features.md`
- Theme contract: `superadmin_features_rollout_insights_theme_contract.md`

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
