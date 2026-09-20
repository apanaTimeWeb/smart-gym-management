# Superadmin Features Rollout Insights â€” Feature Map

## Module Purpose
The features_rollout_insights module is responsible for the Superadmin business workflow managing Features_rollout_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Features_rollout_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `features_api/` | Feature-owned responsibility for features api. | `SuperadminFeaturesApi.ts`, `SuperadminFeaturesRolloutInsightsApi.ts` |
| `features_mocks/` | Feature-owned responsibility for features mocks. | `(directory present; no direct files)` |
| `features_tests/` | Feature-owned responsibility for features tests. | `SuperadminFeaturesBasic.test.tsx`, `SuperadminFeaturesRolloutInsights.test.ts` |
| `features_types/` | Feature-owned responsibility for features types. | `SuperadminFeatureHistoryModalTypes.ts`, `SuperadminFeaturesMutationTypes.ts`, `SuperadminFeaturesTypes.ts`, `SuperadminFeaturesUiTypes.ts`, `SuperadminFeaturesV1Types.ts` |
| `features_utils/` | Feature-owned responsibility for features utils. | `useSuperadminFeatureHistory.ts`, `useSuperadminFeatureRolloutData.ts`, `useSuperadminFeaturesData.ts`, `useSuperadminFeaturesV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Features Rollout Insights | `/superadmin/features` | save; save rollout; show flags tab; show notes tab; submit; toggle | `SuperadminFeaturesApi.ts`, `SuperadminFeaturesRolloutInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/features_rollout_insights route to load the Features_rollout_insights data context securely via TanStack Query.
2. Interact with the Features_rollout_insights dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Features_rollout_insights status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `features`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `features_utils/useSuperadminFeaturesV1.ts`, `features_utils/useSuperadminFeatureRolloutData.ts`, `features_utils/useSuperadminFeatureHistory.ts`, `features_utils/useSuperadminFeaturesData.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'features_rollout_insights']`, `['superadmin', 'features', 'tenants']`, `['superadmin', 'features', 'history', flagId]`

## API Contract

- **API files:** `features_api/SuperadminFeaturesRolloutInsightsApi.ts`, `features_api/SuperadminFeaturesApi.ts`
- **Detected API symbols:** `fetchFeatureRolloutInsights` — `features_api/SuperadminFeaturesRolloutInsightsApi.ts`; `fetchTenants` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatures` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatureFlagHistory` — `features_api/SuperadminFeaturesApi.ts`; `createFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `updateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `activateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `suspendFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `deleteFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `createReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `updateReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `deleteReleaseNote` — `features_api/SuperadminFeaturesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `features_components/SuperadminFeaturesTierMatrix.tsx`, `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `features_components/SuperadminFeatureRolloutModal.tsx`, `features_components/SuperadminFeaturesClient.tsx`, `features_components/SuperadminFeatureHistoryModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the features page. Renders the interactive client component. |
| `features_components/SuperadminFeaturesTierMatrix.tsx` | Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations. |
| `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx` | Renders the Superadmin features V1 Platform release log, Rollback readiness view. |
| `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx` | Renders the Superadmin features V1 Rollout control view. |
| `features_components/SuperadminFeatureRolloutModal.tsx` | Renders the SuperadminFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary. |
| `features_components/SuperadminFeaturesClient.tsx` | Renders the Product Management page — feature flag toggles and release note publishing. |
| `features_components/SuperadminFeatureHistoryModal.tsx` | Renders one feature flag's change history from the feature-owned API/query boundary. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into features_rollout_insights.
- **Destructive Actions**: Any deletion or modification of features_rollout_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for features_rollout_insights do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

