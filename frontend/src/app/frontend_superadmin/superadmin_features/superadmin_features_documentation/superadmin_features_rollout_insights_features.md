# Superadmin Features Rollout Insights — Feature Map

## Module Purpose
The features_rollout_insights module is responsible for the Superadmin business workflow managing Features_rollout_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Features_rollout_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_features_api/` | Feature-owned responsibility for features api. | `superadmin_features_api/SuperadminFeaturesApi.ts`, `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` |
| `superadmin_features_mocks/` | Feature-owned responsibility for features mocks. | `(directory present; no direct files)` |
| `superadmin_features_tests/` | Feature-owned responsibility for features tests. | `superadmin_features_tests/SuperadminFeaturesBasic.test.tsx`, `superadmin_features_tests/SuperadminFeaturesRolloutInsights.test.ts` |
| `superadmin_features_types/` | Feature-owned responsibility for features types. | `superadmin_features_types/SuperadminFeaturesFeatureHistoryModalTypes.ts`, `superadmin_features_types/SuperadminFeaturesMutationTypes.ts`, `superadmin_features_types/SuperadminFeaturesTypes.ts`, `superadmin_features_types/SuperadminFeaturesUiTypes.ts`, `superadmin_features_types/SuperadminFeaturesV1Types.ts` |
| `superadmin_features_utils/` | Feature-owned responsibility for features utils. | `superadmin_features_utils/useSuperadminFeaturesFeatureHistory.ts`, `superadmin_features_utils/useSuperadminFeaturesFeatureRolloutData.ts`, `superadmin_features_utils/useSuperadminFeaturesData.ts`, `superadmin_features_utils/useSuperadminFeaturesV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Features Rollout Insights | `/superadmin/features` | save; save rollout; show flags tab; show notes tab; submit; toggle | `superadmin_features_api/SuperadminFeaturesApi.ts`, `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/features` route and load the rollout-insights surface through the module-owned TanStack Query path.
2. Review rollout insight data alongside the parent feature-flag/release-history surfaces.
3. Use the parent feature mutation flows where documented; the rollout-insights API itself is read-only in the supplied source.
4. Recover from query failure through the feature retry path.

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
- **Custom hooks:** `superadmin_features_utils/useSuperadminFeaturesV1.ts`, `superadmin_features_utils/useSuperadminFeaturesFeatureRolloutData.ts`, `superadmin_features_utils/useSuperadminFeaturesFeatureHistory.ts`, `superadmin_features_utils/useSuperadminFeaturesData.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'features_rollout_insights']`, `['superadmin', 'features', 'tenants']`, `['superadmin', 'features', 'history', flagId]`

## API Contract

- **API files:** `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts`, `superadmin_features_api/SuperadminFeaturesApi.ts`
- **Detected API symbols:** `fetchFeatureRolloutInsights` — `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts`; `fetchTenants` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `fetchFeatures` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `fetchFeatureFlagHistory` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `createFeatureFlag` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `updateFeatureFlag` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `activateFeatureFlag` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `suspendFeatureFlag` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `deleteFeatureFlag` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `createReleaseNote` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `updateReleaseNote` — `superadmin_features_api/SuperadminFeaturesApi.ts`; `deleteReleaseNote` — `superadmin_features_api/SuperadminFeaturesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `superadmin_features_components/SuperadminFeaturesTierMatrix.tsx`, `superadmin_features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `superadmin_features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `superadmin_features_components/SuperadminFeaturesFeatureRolloutModal.tsx`, `superadmin_features_components/SuperadminFeaturesMain.tsx`, `superadmin_features_components/SuperadminFeaturesFeatureHistoryModal.tsx`
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
| `superadmin_features_components/SuperadminFeaturesTierMatrix.tsx` | Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations. |
| `superadmin_features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx` | Renders the Superadmin features V1 Platform release log, Rollback readiness view. |
| `superadmin_features_components/SuperadminFeaturesV1RolloutControlPanel.tsx` | Renders the Superadmin features V1 Rollout control view. |
| `superadmin_features_components/SuperadminFeaturesFeatureRolloutModal.tsx` | Renders the SuperadminFeaturesFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary. |
| `superadmin_features_components/SuperadminFeaturesMain.tsx` | Renders the Product Management page — feature flag toggles and release note publishing. |
| `superadmin_features_components/SuperadminFeaturesFeatureHistoryModal.tsx` | Renders one feature flag's change history from the feature-owned API/query boundary. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into features_rollout_insights.
- **Destructive Actions**: Any deletion or modification of features_rollout_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for features_rollout_insights do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_features_api/`
- `superadmin_features_components/`
- `superadmin_features_constants/`
- `superadmin_features_locales/`
- `superadmin_features_mocks/`
- `superadmin_features_query_keys/`
- `superadmin_features_schemas/`
- `superadmin_features_tests/`
- `superadmin_features_types/`
- `superadmin_features_url_config.ts`
- `superadmin_features_utils/`

### Current root files
- `error.tsx`
- `loading.tsx`
- `page.tsx`
- `superadmin_features_features.md`
- `superadmin_features_forbidden.md`
- `superadmin_features_repair_map.md`
- `superadmin_features_rollout_insights_features.md`
- `superadmin_features_rollout_insights_forbidden.md`
- `superadmin_features_rollout_insights_repair_map.md`
- `superadmin_features_rollout_insights_theme_contract.md`
- `superadmin_features_theme_contract.md`


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.



## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
