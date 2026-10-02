# superadmin_analytics — Feature Map

## Module Purpose
The Analytics module gives Superadmins a read-only financial and retention view of the platform. It loads validated revenue metrics and retention-insight data, derives KPI/card view models, and renders chart-ready series for the selected date range. The module is intentionally read-only: it does not create or mutate financial records. It must never fabricate currency, revenue, tenant counts, or retention values when the API omits them.


## Routes

- Primary feature route: `/superadmin/analytics`
- Route ownership remains inside `superadmin_analytics`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminAnalyticsDateFilterDropdown.tsx`, `SuperadminAnalyticsKpiGrid.tsx`, `SuperadminAnalyticsMain.tsx`, `SuperadminAnalyticsMainErrorState.tsx`, `SuperadminAnalyticsMainLoadingState.tsx`, `SuperadminAnalyticsPageHeader.tsx`, `SuperadminAnalyticsPrimaryCharts.tsx`, `SuperadminAnalyticsSecondaryMetrics.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `fetchRevenueMetrics`.
- URL paths remain centralized in `superadmin_analytics_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_analytics_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_analytics_forbidden.md`.
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
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchAnalyticsRetentionInsights`, `fetchRevenueMetrics`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_analytics`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_analytics_features.md, superadmin_analytics_forbidden.md, superadmin_analytics_theme_contract.md, superadmin_analytics_url_config.ts` |
| `superadmin_analytics_api/` | Owns module-scoped api artifacts. | `SuperadminAnalyticsApi.ts, SuperadminAnalyticsRetentionInsightsApi.ts` |
| `superadmin_analytics_components/` | Owns module-scoped components artifacts. | `SuperadminAnalyticsDateFilterDropdown.tsx, SuperadminAnalyticsKpiGrid.tsx, SuperadminAnalyticsMain.tsx, SuperadminAnalyticsMainErrorState.tsx, SuperadminAnalyticsMainLoadingState.tsx` (+7 more) |
| `superadmin_analytics_constants/` | Owns module-scoped constants artifacts. | `SuperadminAnalyticsDateFilterConstants.test.ts, SuperadminAnalyticsDateFilterConstants.ts, SuperadminAnalyticsDateRangeConstants.ts, SuperadminAnalyticsKpiConstants.ts, SuperadminAnalyticsQueryKeys.ts` |
| `superadmin_analytics_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_analytics_repair_map.md, superadmin_analytics_retention_insights_features.md, superadmin_analytics_retention_insights_forbidden.md, superadmin_analytics_retention_insights_repair_map.md, superadmin_analytics_retention_insights_theme_contract.md` |
| `superadmin_analytics_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminAnalyticsChartViewModel.test.ts, useSuperadminAnalyticsChartViewModel.ts, useSuperadminAnalyticsDashboardViewModel.test.ts, useSuperadminAnalyticsDashboardViewModel.ts, useSuperadminAnalyticsDateRangeSuffix.test.ts` (+7 more) |
| `superadmin_analytics_locales/` | Owns module-scoped locales artifacts. | `superadmin_analytics_en.json, superadmin_analytics_hi.json` |
| `superadmin_analytics_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_analytics_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminAnalyticsTypesSchemas.ts, SuperadminAnalyticsV1ResponseSchema.ts, SuperadminAnalyticsV1Schema.ts` |
| `superadmin_analytics_tests/` | Owns module-scoped tests artifacts. | `SuperadminAnalyticsBasic.test.tsx, SuperadminAnalyticsRetentionInsights.test.ts` |
| `superadmin_analytics_types/` | Owns module-scoped types artifacts. | `SuperadminAnalyticsDashboardViewModelTypes.ts, SuperadminAnalyticsDateFilterTypes.ts, SuperadminAnalyticsKpiGridTypes.ts, SuperadminAnalyticsKpiViewModelTypes.ts, SuperadminAnalyticsMainErrorStateTypes.ts` (+5 more) |
| `superadmin_analytics_utils/` | Owns module-scoped utils artifacts. | `SuperadminAnalyticsDateRangeUtils.test.ts, SuperadminAnalyticsDateRangeUtils.ts, SuperadminAnalyticsFormatCurrency.test.ts, SuperadminAnalyticsFormatCurrency.ts, SuperadminAnalyticsFormatters.test.ts` (+1 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/ApexBarChart`
- `@/components/ui/ChartConstants`
- `@/components/ui/MetricCard`
- `@/components/ui/Panel`
- `@/components/ui/SearchableDropdown`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutThemeProvider`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes`

## Feature Inventory
| Feature | Route Ownership | What the User Can Do | Main API/Query Surface | Status |
|---|---|---|---|---|
| Root page | `frontend_superadmin/superadmin_analytics` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1 — Load the primary analytics view
1. Enter `/superadmin/analytics`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminAnalyticsMain.tsx`.
2. `useSuperadminAnalyticsPage.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported module action
1. Invoke the module-owned API action(s) such as `analyticsApi`, `fetchAnalyticsRetentionInsights` through the owning hook/action boundary.
2. The action validates the backend envelope before presentation code consumes the result and does not bypass the centralized URL configuration or transport layer.
3. Read-only/export/navigation actions remain explicitly separate from server-state mutations so they do not invent cache invalidations that affect no query data.

### Flow 4 — Recover from a failed request
1. A rejected request enters the feature's error boundary/state instead of rendering stale success data.
2. The visible Retry/reload affordance reuses the owning query hook or refetch callback, preserving the module's current UI state where documented.
3. The success path is reached only after a new authoritative response arrives; stale cached data is reconciled through the module query-key contract.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## Data and State Architecture

- **Server state:** TanStack Query is used for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** No `useUrlState` usage detected in module-owned source; routes without shareable list state are not required to add it.
- **Query-key registries:** `superadmin_analytics_constants/SuperadminAnalyticsQueryKeys.ts`
- **Module MSW handlers:** `superadmin_analytics_mocks/superadmin_analytics_mocks_handlers/SuperadminAnalyticsMockHandlers.ts`, `superadmin_analytics_mocks/superadmin_analytics_mocks_handlers/SuperadminAnalyticsV1MockHandlers.ts`
- **Module MSW fixtures:** `superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsMockFixtures.ts`, `superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsV1MockFixtures.ts`

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `analyticsApi`
- `fetchAnalyticsRetentionInsights`

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx` | `adoption`, `sources`, `metrics` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx` | `cohort` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx` | `movement`, `metrics`, `concentration` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx` | `metrics` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |

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

- **Module API boundary:** All `analytics` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `analytics` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `analytics` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `analytics` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `analytics` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
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
