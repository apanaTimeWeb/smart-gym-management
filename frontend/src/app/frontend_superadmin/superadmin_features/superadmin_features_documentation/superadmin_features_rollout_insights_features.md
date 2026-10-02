# Superadmin Features Rollout Insights — Feature Map

## Module Purpose
superadmin_features_rollout_insights_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/features``. Authenticated Superadmin users can save; save rollout; show flags tab; show notes tab; submit; toggle. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``../superadmin_features_api/SuperadminFeaturesApi.ts`, `../superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchFeatureRolloutInsights`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_features`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_features_features.md, superadmin_features_forbidden.md, superadmin_features_theme_contract.md, superadmin_features_url_config.ts` |
| `superadmin_features_api/` | Owns module-scoped api artifacts. | `SuperadminFeaturesApi.ts, SuperadminFeaturesRolloutInsightsApi.ts` |
| `superadmin_features_components/` | Owns module-scoped components artifacts. | `SuperadminFeaturesFeatureHistoryModal.tsx, SuperadminFeaturesFeatureRolloutModal.tsx, SuperadminFeaturesMain.tsx, SuperadminFeaturesTierMatrix.tsx, SuperadminFeaturesV1ReleaseAndRollbackSection.tsx` (+1 more) |
| `superadmin_features_constants/` | Owns module-scoped constants artifacts. | `SuperadminFeaturesQueryKeys.ts, SuperadminFeaturesTierMatrixConstants.test.ts, SuperadminFeaturesTierMatrixConstants.ts, SuperadminFeaturesUiConstants.ts` |
| `superadmin_features_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_features_repair_map.md, superadmin_features_rollout_insights_features.md, superadmin_features_rollout_insights_forbidden.md, superadmin_features_rollout_insights_repair_map.md, superadmin_features_rollout_insights_theme_contract.md` |
| `superadmin_features_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminFeaturesActions.test.ts, useSuperadminFeaturesActions.ts, useSuperadminFeaturesData.test.tsx, useSuperadminFeaturesData.ts, useSuperadminFeaturesFeatureFlagStatusMutation.test.tsx` (+17 more) |
| `superadmin_features_locales/` | Owns module-scoped locales artifacts. | `superadmin_features_en.json, superadmin_features_hi.json` |
| `superadmin_features_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_features_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminFeaturesApiSchema.ts, SuperadminFeaturesTypesSchemas.ts, SuperadminFeaturesUiSchema.ts, SuperadminFeaturesV1ResponseSchema.ts, SuperadminFeaturesV1Schema.ts` |
| `superadmin_features_tests/` | Owns module-scoped tests artifacts. | `SuperadminFeaturesBasic.test.tsx, SuperadminFeaturesRolloutInsights.test.ts` |
| `superadmin_features_types/` | Owns module-scoped types artifacts. | `SuperadminFeaturesActionsTypes.ts, SuperadminFeaturesFeatureHistoryModalTypes.ts, SuperadminFeaturesFlagsPanelTypes.ts, SuperadminFeaturesHeaderTypes.ts, SuperadminFeaturesMutationTypes.ts` (+5 more) |
| `superadmin_features_utils/` | Owns module-scoped utils artifacts. | `SuperadminFeaturesDateUtils.test.ts, SuperadminFeaturesDateUtils.ts, SuperadminFeaturesFormatters.test.ts, SuperadminFeaturesFormatters.ts` |

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
| Superadmin Features Rollout Insights | `/superadmin/features` | save; save rollout; show flags tab; show notes tab; submit; toggle | `../superadmin_features_api/SuperadminFeaturesApi.ts`, `../superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/features` route and load the rollout-insights surface through the module-owned TanStack Query path.
2. Review rollout insight data alongside the parent feature-flag/release-history surfaces.
3. Use the parent feature mutation flows where documented; the rollout-insights API itself is read-only in the supplied source.
4. Recover from query failure through the feature retry path.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `../page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_features`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `../superadmin_features_hooks/useSuperadminFeaturesV1.ts`, `../superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutData.ts`, `../superadmin_features_hooks/useSuperadminFeaturesFeatureHistory.ts`, `../superadmin_features_hooks/useSuperadminFeaturesData.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `superadmin_features_constants/SuperadminFeaturesQueryKeys.ts`

## API Contract

- **API files:** `../superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts`, `../superadmin_features_api/SuperadminFeaturesApi.ts`
- **Detected API symbols:** `fetchFeatureRolloutInsights` — `../superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts`; `fetchTenants` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `fetchFeatures` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `fetchFeatureFlagHistory` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `createFeatureFlag` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `updateFeatureFlag` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `activateFeatureFlag` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `suspendFeatureFlag` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `deleteFeatureFlag` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `createReleaseNote` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `updateReleaseNote` — `../superadmin_features_api/SuperadminFeaturesApi.ts`; `deleteReleaseNote` — `../superadmin_features_api/SuperadminFeaturesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_features_components/SuperadminFeaturesFeatureRolloutModal.tsx` | `name`, `id` | `superadmin_features_api/SuperadminFeaturesApi.ts`, `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx` | `releases`, `rollback` | `superadmin_features_api/SuperadminFeaturesApi.ts`, `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_features_components/SuperadminFeaturesV1RolloutControlPanel.tsx` | `rollouts` | `superadmin_features_api/SuperadminFeaturesApi.ts`, `superadmin_features_api/SuperadminFeaturesRolloutInsightsApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`../loading.tsx`:** `../loading.tsx`
- **`../error.tsx`:** `../error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `../page.tsx` | Pure Server Component for the features page. Renders the interactive client component. |
| `../superadmin_features_components/SuperadminFeaturesTierMatrix.tsx` | Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations. |
| `../superadmin_features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx` | Renders the Superadmin features V1 Platform release log, Rollback readiness view. |
| `../superadmin_features_components/SuperadminFeaturesV1RolloutControlPanel.tsx` | Renders the Superadmin features V1 Rollout control view. |
| `../superadmin_features_components/SuperadminFeaturesFeatureRolloutModal.tsx` | Renders the SuperadminFeaturesFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary. |
| `../superadmin_features_components/SuperadminFeaturesMain.tsx` | Renders the Product Management page — feature flag toggles and release note publishing. |
| `../superadmin_features_components/SuperadminFeaturesFeatureHistoryModal.tsx` | Renders one feature flag's change history from the feature-owned API/query boundary. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into features_rollout_insights.
- **Destructive Actions**: Any deletion or modification of features_rollout_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for features_rollout_insights do not expose cross-tenant sensitive data.

- **Module API boundary:** All `features` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `features` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `features` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `features` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `features` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Canonical Current Source Structure (v13-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_features_api/`
- `superadmin_features_components/`
- `superadmin_features_constants/`
- `superadmin_features_locales/`
- `superadmin_features_mocks/`
- `superadmin_features_constants/`
- `superadmin_features_schemas/`
- `superadmin_features_tests/`
- `superadmin_features_types/`
- `../superadmin_features_url_config.ts`
- `superadmin_features_utils/`

### Current root files
- `../error.tsx`
- `../loading.tsx`
- `../page.tsx`
- `../superadmin_features_features.md`
- `../superadmin_features_forbidden.md`
- `superadmin_features_repair_map.md`
- `superadmin_features_rollout_insights_features.md`
- `superadmin_features_rollout_insights_forbidden.md`
- `superadmin_features_rollout_insights_repair_map.md`
- `superadmin_features_rollout_insights_theme_contract.md`
- `../superadmin_features_theme_contract.md`

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
