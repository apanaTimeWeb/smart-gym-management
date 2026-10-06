# superadmin_features — Feature Map

## Module Purpose
The Features module manages platform feature flags and release-note publication for Superadmins. Users can review flags, edit flag metadata, enable/disable global state, select canary tenants, review flag history, inspect rollout insights, and publish or remove release notes. Feature flags and rollout state are server-owned; static status labels and visual mappings remain in feature constants. Destructive operations require the existing confirmation flow and idempotency lifecycle.


## Routes

- Primary feature route: `/superadmin/features`
- Route ownership remains inside `superadmin_features`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `createFeatureFlag`, `createReleaseNote`, `deleteFeatureFlag`, `deleteReleaseNote`, `fetchFeatureFlagHistory`, `fetchFeatures`, `fetchTenants`, `toggleFeatureFlag`, `updateFeatureFlag`, `updateReleaseNote`.
- URL paths remain centralized in `superadmin_features_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_features_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_features_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest
- Next.js App Router route/page boundary as supplied.
- React + TypeScript.
- TanStack Query for server state and module query-key registries.
- Zod at form/API boundaries where the module contract defines schemas.
- next-intl with active `en` and `hi` module-local catalogs.
- React Hook Form for form workflows present in this module.
- MSW fixtures/handlers for frontend contract testing.
- Approved application infrastructure imported from `frontend_superadmin/superadmin_layout` and dumb UI primitives only.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** `createFeatureFlag`, `createReleaseNote`
- **Read:** `fetchFeatureFlagHistory`, `fetchFeatureRolloutInsights`, `fetchFeatures`, `fetchTenants`
- **Update / Action:** `toggleFeatureFlag`, `updateFeatureFlag`, `updateReleaseNote`
- **Delete:** `deleteFeatureFlag`, `deleteReleaseNote`

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_features`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_features_features.md, superadmin_features_forbidden.md, superadmin_features_theme_contract.md, superadmin_features_url_config.ts` |
| `superadmin_features_constants/` | Owns module-scoped constants artifacts. | `SuperadminFeaturesQueryKeys.ts, SuperadminFeaturesTierMatrixConstants.test.ts, SuperadminFeaturesTierMatrixConstants.ts, SuperadminFeaturesUiConstants.ts` |
| `superadmin_features_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_features_repair_map.md, superadmin_features_rollout_insights_features.md, superadmin_features_rollout_insights_forbidden.md, superadmin_features_rollout_insights_repair_map.md, superadmin_features_rollout_insights_theme_contract.md` |
| `superadmin_features_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminFeaturesActions.test.ts, useSuperadminFeaturesActions.ts, useSuperadminFeaturesData.test.tsx, useSuperadminFeaturesData.ts, useSuperadminFeaturesFeatureFlagStatusMutation.test.tsx` (+17 more) |
| `superadmin_features_locales/` | Owns module-scoped locales artifacts. | `superadmin_features_en.json, superadmin_features_hi.json` |
| `superadmin_features_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_features_types/` | Owns module-scoped types artifacts. | `SuperadminFeaturesActionsTypes.ts, SuperadminFeaturesFeatureHistoryModalTypes.ts, SuperadminFeaturesFlagsPanelTypes.ts, SuperadminFeaturesHeaderTypes.ts, SuperadminFeaturesMutationTypes.ts` (+5 more) |
| `superadmin_features_utils/` | Owns module-scoped utils artifacts. | `SuperadminFeaturesDateUtils.test.ts, SuperadminFeaturesDateUtils.ts, SuperadminFeaturesFormatters.test.ts, SuperadminFeaturesFormatters.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Panel`
- `@/components/ui/Tooltip`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes`

## Feature Inventory
| Feature | Route Ownership | What the User Can Do | Main API/Query Surface | Status |
|---|---|---|---|---|
| Root page | `frontend_superadmin/superadmin_features` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Create a release note → validate form → confirm publication → submit with a stable idempotency key → reconcile feature queries from the authoritative response.
### Flow 2
Open a feature flag → edit flag fields or toggle status → confirm destructive/activation intent → mutate → invalidate the affected list/detail caches.
### Flow 3
Open Canary Rollout → load tenants → search/select tenant IDs → submit the rollout → preserve draft state and retryability until authoritative success.
### Flow 4
Open flag History/Insights → load feature-scoped data → render loading/empty/error states with resource identity preserved in query keys.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## Data and State Architecture

- **Server state:** TanStack Query for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** No `useUrlState` usage detected; no module-owned list/filter URL state was evidenced.
- **Query-key registries:** `superadmin_features_constants/SuperadminFeaturesQueryKeys.ts`

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `featuresApi`
- `fetchFeatureRolloutInsights`

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases and AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

- **Module API boundary:** All `features` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `features` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `features` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `features` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `features` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Component Responsibility Map
- Main/page composition components: render the page and assemble child views.
- Feature hooks/view-models: perform query/mutation orchestration and derived-state calculations.
- API files: define transport calls and response schemas.
- Types/schemas/constants: define contracts, validation, and static configuration only.
- Mocks/tests: encode the same frontend contract and recoverable interaction flows.

## Rule Compliance Checklist
- [x] Feature-prefixed folder hierarchy retained.
- [x] Query-key registry present.
- [x] URL configuration present.
- [x] API response schemas supplied at transport boundary where contracts exist.
- [x] No relative imports in production feature code.
- [x] No raw runtime exception text rendered to end users.
- [x] All intrinsic interactive controls carry `data-testid`, explicit button type, visible focus, and minimum touch sizing in AST audit.
- [x] Custom hook JSDoc coverage completed.
- [x] Active `en` and `hi` locales are module-local.
- [x] MSW handlers/fixtures remain module-owned.
- [ ] Host-wide CI/build/ESLint/Prettier/CODEOWNERS enforcement: `BLOCKED BY SUPPLIED SCOPE` because repository host configuration is not present in the supplied ZIP.
- [ ] Global token definition/Tailwind mapping verification: `BLOCKED BY SUPPLIED SCOPE` because the global theme/CSS host files are not present in the supplied ZIP.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

## V13 Repair Freshness

Current repair baseline: `frontend-superadmin-v13-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.


## V15 Repair Supersession

Removed the orphan rollout-insights V1 stack and its contract test. Active feature flags/history/rollout controls remain canonical.

Historical V1 references retained above are archival documentation only and do not describe an active mounted route or live dependency.
