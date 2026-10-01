# superadmin_features — Feature Map

## Module Purpose
The Features module manages platform feature flags and release-note publication for Superadmins. Users can review flags, edit flag metadata, enable/disable global state, select canary tenants, review flag history, inspect rollout insights, and publish or remove release notes. Feature flags and rollout state are server-owned; static status labels and visual mappings remain in feature constants. Destructive operations require the existing confirmation flow and idempotency lifecycle.

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
Create: supported by createFeatureFlag and createReleaseNote. Read: supported by fetchFeatures, fetchTenants, fetchFeatureFlagHistory, and fetchFeatureRolloutInsights. Update: supported by updateFeatureFlag, toggleFeatureFlag, updateReleaseNote, and tenant rollout mutation. Delete: supported by deleteFeatureFlag and deleteReleaseNote.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_features_api/` | feature-owned API clients and server operations | SuperadminFeaturesApi.ts, SuperadminFeaturesRolloutInsightsApi.ts |
| `superadmin_features_components/` | page and interaction presentation, including modals/tables | SuperadminFeaturesFeatureHistoryModal.tsx, SuperadminFeaturesFeatureRolloutModal.tsx, SuperadminFeaturesMain.tsx, SuperadminFeaturesTierMatrix.tsx, SuperadminFeaturesV1ReleaseAndRollbackSection.tsx, SuperadminFeaturesV1RolloutControlPanel.tsx |
| `superadmin_features_constants/` | static UI/business mappings with no server state | SuperadminFeaturesConstants.ts, SuperadminFeaturesTierMatrixConstants.ts |
| `superadmin_features_locales/` | module-local `en`/`hi` translations | en.json, hi.json |
| `superadmin_features_mocks/` | MSW handlers and deterministic fixtures | directory-specific files |
| `superadmin_features_query_keys/` | TanStack Query key registry preserving resource identity | SuperadminFeaturesQueryKeys.ts |
| `superadmin_features_schemas/` | client request/form Zod contracts | SuperadminFeaturesSchema.ts |
| `superadmin_features_tests/` | co-located module tests | SuperadminFeaturesBasic.test.tsx, SuperadminFeaturesRolloutInsights.test.ts |
| `superadmin_features_types/` | domain/API/form/view contracts | SuperadminFeaturesFeatureHistoryModalTypes.ts, SuperadminFeaturesActionsTypes.ts, SuperadminFeaturesMutationTypes.ts, SuperadminFeaturesTierMatrixTypes.ts, SuperadminFeaturesTypes.ts, SuperadminFeaturesUiTypes.ts, SuperadminFeaturesV1Types.ts |
| `superadmin_features_url_config.ts` | centralized backend and route URL sources | superadmin_features_url_config.ts |
| `superadmin_features_utils/` | utilities, formatters, and feature-local helpers | SuperadminFeaturesDateUtils.test.ts, SuperadminFeaturesDateUtils.ts, SuperadminFeaturesTierMatrixConstants.test.ts, useSuperadminFeaturesFeatureFlagStatusMutation.ts, useSuperadminFeaturesFeatureFlagUpdateMutation.ts, useSuperadminFeaturesFeatureHistory.test.ts, useSuperadminFeaturesFeatureHistory.ts, useSuperadminFeaturesFeatureRolloutData.test.ts |

## Approved External Dependencies
### Application Infrastructure
- `frontend_superadmin/superadmin_layout` — API transport, global error boundary/theme/socket infrastructure already supplied by the role bundle.
- `@/components/ui/*` — zero-business-logic UI primitives.
- `@/lib/*` — formatting/logger/API primitives where imported by the module.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None outside the explicitly approved `superadmin_layout` infrastructure.

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

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `featuresApi`
- `fetchFeatureRolloutInsights`

## UI Data Requirements
- Loading: module page/loading states and component-level pending states are explicit.
- Empty: module-specific empty copy is translated and has a recovery/CTA when an action is supported.
- Error: user-facing runtime errors use safe translated messages and retry actions; raw exception text is not rendered.
- Permission/security: backend authorization remains authoritative; frontend action visibility/disabled state must follow the supplied permission contract rather than inventing new roles.
- Responsive: authenticated shell geometry and mobile table/card treatments follow the global UI/UX source.

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases / AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

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


## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.


## V5 Repair Freshness

Current repair baseline: `frontend-superadmin-v5-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.
