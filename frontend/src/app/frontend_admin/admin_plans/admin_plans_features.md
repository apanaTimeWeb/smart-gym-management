# Admin Plans — Feature Map

## Module Purpose
The Admin Plans module lets administrators maintain the plan catalog and inspect plan-level revenue attribution. Users can search and review plans, create new plans, edit or delete plans, and navigate into the nested revenue reporting route to review plan performance. The module owns plan validation, CRUD mutations with idempotency keys, revenue presentation, and currency formatting. It does not own subscription billing state or the global payment gateway configuration.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/plans` | ``frontend_admin/admin_plans/page.tsx`` | ``frontend_admin/admin_plans/admin_plans_components/admin_plans_main/AdminPlansMain.tsx`` |
| `/admin/plans/revenue` | ``frontend_admin/admin_plans/admin_plans_revenue/page.tsx`` | `owning nested component inside `admin_plans`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- React Hook Form 7.x
- Zod 3.x
- @hookform/resolvers 3.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_plans/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_plans_api/` | Typed API transport boundary. | AdminPlansApi.ts |
| `admin_plans_components/` | Feature component root. | (empty) |
| `admin_plans_constants/` | Static business configuration and query-key registries. | AdminPlansConstants.ts, AdminPlansQueryKeys.ts |
| `admin_plans_hooks/` | Feature data-flow and interaction hooks. | useAdminPlansDebounce.test.ts, useAdminPlansDebounce.ts, useAdminPlansLogic.test.ts, useAdminPlansLogic.ts, useAdminPlansMutations.test.tsx, useAdminPlansMutations.ts, useAdminPlansRevenueLogic.test.ts, useAdminPlansRevenueLogic.ts, useAdminPlansUnsavedChangesGuard.test.ts, useAdminPlansUnsavedChangesGuard.ts |
| `admin_plans_locales/` | Module-owned localized resources. | admin_plans_en.json, admin_plans_hi.json |
| `admin_plans_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_plans_revenue/` | Feature-owned implementation boundary. | error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_plans_schemas/` | Zod validation/runtime contracts. | AdminPlansRevenueSchemas.ts, AdminPlansSchemas.ts |
| `admin_plans_store/` | Module-scoped UI state only. | useAdminPlansStore.test.ts, useAdminPlansStore.ts |
| `admin_plans_types/` | Domain, DTO, state, and prop type contracts. | AdminPlansEmptyStatePropsTypes.ts, AdminPlansErrorPropsTypes.ts, AdminPlansGridPropsTypes.ts, AdminPlansMockHandlerTypes.ts, AdminPlansRevenueChartsPropsTypes.ts, AdminPlansRevenueKPIsPropsTypes.ts, AdminPlansRevenuePeriodSelectorPropsTypes.ts, AdminPlansRevenueTablePropsTypes.ts, AdminPlansRevenueTableSortIconPropsTypes.ts, AdminPlansRevenueTypes.ts, … (+3 more) |
| `admin_plans_utils/` | Feature-local deterministic utilities and formatters. | AdminPlansFormatCurrency.test.ts, AdminPlansFormatCurrency.ts, AdminPlansFormatters.test.ts, AdminPlansFormatters.ts, AdminPlansUrlState.test.ts, AdminPlansUrlState.ts |
| `admin_plans_components/admin_plans_empty_state/` | Feature-owned implementation boundary. | AdminPlansEmptyState.tsx |
| `admin_plans_components/admin_plans_grid/` | Feature-owned implementation boundary. | AdminPlansGrid.tsx |
| `admin_plans_components/admin_plans_main/` | Feature-owned implementation boundary. | AdminPlansMain.tsx |
| `admin_plans_components/admin_plans_modal/` | Feature-owned implementation boundary. | AdminPlansModal.tsx, useAdminPlansModalForm.test.ts, useAdminPlansModalForm.ts |
| `admin_plans_components/admin_plans_revenue/` | Feature-owned implementation boundary. | AdminPlansRevenue.tsx, AdminPlansRevenueCharts.tsx, AdminPlansRevenueKPIs.tsx, AdminPlansRevenuePeriodSelector.tsx, AdminPlansRevenueTable.tsx, AdminPlansRevenueTableSortIcon.tsx |
| `admin_plans_components/admin_plans_toolbar/` | Feature-owned implementation boundary. | AdminPlansToolbar.tsx, useAdminPlansToolbarSearch.test.ts, useAdminPlansToolbarSearch.ts |
| `admin_plans_mocks/admin_plans_fixtures/` | Module-owned mock API datasets. | AdminPlansMockFixtures.ts |
| `admin_plans_mocks/admin_plans_handlers/` | Module-owned MSW request handlers. | AdminPlansMockHandlers.ts |
| `admin_plans_revenue/admin_plans_revenue_types/` | Domain, DTO, state, and prop type contracts. | AdminPlansRevenueErrorPropsTypes.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Present in supplied API client.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore`
- `@/app/frontend_admin/admin_layout/admin_layout_url_config`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `admin_plans_revenue/page.tsx` | Canonical Next.js route entry. |
| `AdminPlansEmptyState.tsx` | `Renders reusable empty states for Admin plans data sections.` |
| `AdminPlansGrid.tsx` | `Renders the grid of membership plan cards with edit/delete actions and pagination.` |
| `AdminPlansMain.tsx` | `Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.` |
| `AdminPlansModal.tsx` | `Renders the modal form for creating or editing a membership plan. Uses React Hook Form + Zod validation.` |
| `AdminPlansRevenue.tsx` | `Root client orchestrator for Plan Revenue Dashboard.` |
| `AdminPlansRevenueCharts.tsx` | `Renders the revenue distribution donut chart for Plans.` |
| `AdminPlansRevenueKPIs.tsx` | `Renders KPI cards for the Plan Revenue dashboard.` |
| `AdminPlansRevenuePeriodSelector.tsx` | `Renders the period selection segment controls.` |
| `AdminPlansRevenueTable.tsx` | `Renders the paginated, searchable, sortable Admin plan revenue table.` |
| `AdminPlansRevenueTableSortIcon.tsx` | `Renders the sortable-direction icon for one plan revenue table header.` |
| `AdminPlansToolbar.tsx` | `Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: createPlan
createPlan: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: updatePlan
updatePlan: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: deletePlan
deletePlan: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminPlansLogic.ts`, `useAdminPlansMutations.ts`, `useAdminPlansRevenueLogic.ts`
- **Stores:** `useAdminPlansStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `plans`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminPlansApi.ts` | `fetchAllPlans` | `GET` | `params?: { search?: string; tier?: string; page?: number; limit?: number }` | `ApiResponse<Plan[]` |
| `AdminPlansApi.ts` | `fetchPlanById` | `GET` | `id: string` | `ApiResponse<Plan` |
| `AdminPlansApi.ts` | `createPlan` | `POST` | `body: Partial<Plan>, idempotencyKey: string` | `ApiResponse<Plan` |
| `AdminPlansApi.ts` | `updatePlan` | `POST` | `id: string, body: Partial<Plan>, idempotencyKey: string` | `ApiResponse<Plan` |
| `AdminPlansApi.ts` | `deletePlan` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminPlansApi.ts` | `fetchPlanRevenue` | `GET` | `period: RevenuePeriod, params?: { search?: string; sortKey?: RevenueSortKey; sortDir?: RevenueSortDirection; page?: number; limit?: number }` | `ApiResponse<PlanRevenueRecord[]` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_plans_url_config.ts` | `GET_ONE: (id: string) => `/admin/plans/${encodeURIComponent(id)}`` |
| `admin_plans_url_config.ts` | `UPDATE: (id: string) => `/admin/plans/${encodeURIComponent(id)}`` |
| `admin_plans_url_config.ts` | `DELETE: (id: string) => `/admin/plans/${encodeURIComponent(id)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminPlansEmptyState.tsx` | Renders reusable empty states for Admin plans data sections. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansGrid.tsx` | Renders the grid of membership plan cards with edit/delete actions and pagination. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansMain.tsx` | Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansModal.tsx` | Renders the modal form for creating or editing a membership plan. Uses React Hook Form + Zod validation. | 9 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenue.tsx` | Root client orchestrator for Plan Revenue Dashboard. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenueCharts.tsx` | Renders the revenue distribution donut chart for Plans. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenueKPIs.tsx` | Renders KPI cards for the Plan Revenue dashboard. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenuePeriodSelector.tsx` | Renders the period selection segment controls. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenueTable.tsx` | Renders the paginated, searchable, sortable Admin plan revenue table. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansRevenueTableSortIcon.tsx` | Renders the sortable-direction icon for one plan revenue table header. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPlansToolbar.tsx` | Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point. | 6 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminPlansEmptyState.tsx` | Renders reusable empty states for Admin plans data sections. | 1 |
| `AdminPlansGrid.tsx` | Renders the grid of membership plan cards with edit/delete actions and pagination. | 3 |
| `AdminPlansMain.tsx` | Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children. | 0 |
| `AdminPlansModal.tsx` | Renders the modal form for creating or editing a membership plan. Uses React Hook Form + Zod validation. | 9 |
| `AdminPlansRevenue.tsx` | Root client orchestrator for Plan Revenue Dashboard. | 1 |
| `AdminPlansRevenueCharts.tsx` | Renders the revenue distribution donut chart for Plans. | 0 |
| `AdminPlansRevenueKPIs.tsx` | Renders KPI cards for the Plan Revenue dashboard. | 0 |
| `AdminPlansRevenuePeriodSelector.tsx` | Renders the period selection segment controls. | 1 |
| `AdminPlansRevenueTable.tsx` | Renders the paginated, searchable, sortable Admin plan revenue table. | 1 |
| `AdminPlansRevenueTableSortIcon.tsx` | Renders the sortable-direction icon for one plan revenue table header. | 0 |
| `AdminPlansToolbar.tsx` | Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point. | 6 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.


## Component Tree

`admin_plans_components/`
- `admin_plans_empty_state/AdminPlansEmptyState.tsx`
- `admin_plans_grid/AdminPlansGrid.tsx`
- `admin_plans_main/AdminPlansMain.tsx`
- `admin_plans_modal/AdminPlansModal.tsx`
- `admin_plans_modal/useAdminPlansModalForm.test.ts`
- `admin_plans_modal/useAdminPlansModalForm.ts`
- `admin_plans_revenue/AdminPlansRevenue.tsx`
- `admin_plans_revenue/AdminPlansRevenueCharts.tsx`
- `admin_plans_revenue/AdminPlansRevenueKPIs.tsx`
- `admin_plans_revenue/AdminPlansRevenuePeriodSelector.tsx`
- `admin_plans_revenue/AdminPlansRevenueTable.tsx`
- `admin_plans_revenue/AdminPlansRevenueTableSortIcon.tsx`
- `admin_plans_toolbar/AdminPlansToolbar.tsx`
- `admin_plans_toolbar/useAdminPlansToolbarSearch.test.ts`
- `admin_plans_toolbar/useAdminPlansToolbarSearch.ts`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_plans_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
