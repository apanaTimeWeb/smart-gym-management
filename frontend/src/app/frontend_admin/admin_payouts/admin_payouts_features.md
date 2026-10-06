# Admin Payouts — Feature Map

## Module Purpose
The Admin Payouts module gives administrators a read-oriented view of gym payout and profit-and-loss information. Users can switch between summary and P&L views, filter by month/gym/status, inspect KPI cards, and review sortable payout and P&L tables. The supplied frontend exposes no payout mutation endpoint, so the module does not invent one. It does not own finance write workflows outside the payout reporting contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/payouts` | ``frontend_admin/admin_payouts/page.tsx`` | ``frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_main/AdminPayoutsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_payouts/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_payouts_api/` | Typed API transport boundary. | AdminPayoutsApi.ts |
| `admin_payouts_components/` | Feature component root. | (empty) |
| `admin_payouts_constants/` | Static business configuration and query-key registries. | AdminPayoutsConstants.ts, AdminPayoutsQueryKeys.ts |
| `admin_payouts_hooks/` | Feature data-flow and interaction hooks. | useAdminPayoutsLogic.test.ts, useAdminPayoutsLogic.ts |
| `admin_payouts_locales/` | Module-owned localized resources. | admin_payouts_en.json, admin_payouts_hi.json |
| `admin_payouts_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_payouts_schemas/` | Zod validation/runtime contracts. | AdminPayoutsSchemas.ts |
| `admin_payouts_store/` | Module-scoped UI state only. | useAdminPayoutsStore.test.ts, useAdminPayoutsStore.ts |
| `admin_payouts_types/` | Domain, DTO, state, and prop type contracts. | AdminPayoutsEmptyStatePropsTypes.ts, AdminPayoutsErrorPropsTypes.ts, AdminPayoutsMockHandlerTypes.ts, AdminPayoutsPnLStatementCellPropsTypes.ts, AdminPayoutsPnLStatementSortIconPropsTypes.ts, AdminPayoutsQueryTypes.ts, AdminPayoutsSortTypes.ts, AdminPayoutsStoreTypes.ts, AdminPayoutsSummaryTableSortIconPropsTypes.ts, AdminPayoutsTypes.ts |
| `admin_payouts_utils/` | Feature-local deterministic utilities and formatters. | AdminPayoutsFormatCurrency.test.ts, AdminPayoutsFormatCurrency.ts |
| `admin_payouts_components/admin_payouts_empty_state/` | Feature-owned implementation boundary. | AdminPayoutsEmptyState.tsx |
| `admin_payouts_components/admin_payouts_kpis/` | Feature-owned implementation boundary. | AdminPayoutsKPIs.tsx |
| `admin_payouts_components/admin_payouts_main/` | Feature-owned implementation boundary. | AdminPayoutsMain.tsx |
| `admin_payouts_components/admin_payouts_pnl_statement/` | Feature-owned implementation boundary. | AdminPayoutsPnLStatement.tsx, AdminPayoutsPnLStatementCell.tsx, AdminPayoutsPnLStatementSortIcon.tsx |
| `admin_payouts_components/admin_payouts_summary_table/` | Feature-owned implementation boundary. | AdminPayoutsSummaryTable.tsx, AdminPayoutsSummaryTableSortIcon.tsx |
| `admin_payouts_components/admin_payouts_tabs/` | Feature-owned implementation boundary. | AdminPayoutsTabs.tsx |
| `admin_payouts_mocks/admin_payouts_fixtures/` | Module-owned mock API datasets. | AdminPayoutsMockFixtures.ts |
| `admin_payouts_mocks/admin_payouts_handlers/` | Module-owned MSW request handlers. | AdminPayoutsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
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
| `AdminPayoutsEmptyState.tsx` | `Renders reusable empty states for Admin payouts data tables.` |
| `AdminPayoutsKPIs.tsx` | `KPI cards for the Payouts module.` |
| `AdminPayoutsMain.tsx` | `Main entry point for the Payouts module.` |
| `AdminPayoutsPnLStatement.tsx` | `Renders the tax-ready P&L statement with functional sortable headers and empty state.` |
| `AdminPayoutsPnLStatementCell.tsx` | `Renders one formatted monetary cell in the payouts P&L statement.` |
| `AdminPayoutsPnLStatementSortIcon.tsx` | `Renders the sortable-direction icon for one payouts P&L table header.` |
| `AdminPayoutsSummaryTable.tsx` | `Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.` |
| `AdminPayoutsSummaryTableSortIcon.tsx` | `Renders the sortable-direction icon for one payouts summary table header.` |
| `AdminPayoutsTabs.tsx` | `Tab switcher for Payouts module (Summary vs P&L Statement).` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminPayoutsLogic.ts`
- **Stores:** `useAdminPayoutsStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `payouts`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminPayoutsApi.ts` | `fetchPayouts` | `GET` | `params?: AdminPayoutsQueryParams` | `ApiResponse<GymPayout[]` |
| `AdminPayoutsApi.ts` | `fetchPnL` | `GET` | `params?: AdminPayoutsQueryParams` | `ApiResponse<PnLEntry[]` |
| `AdminPayoutsApi.ts` | `fetchKPIs` | `GET` | `params?: AdminPayoutsQueryParams` | `ApiResponse<PayoutsKPIData` |
| `AdminPayoutsApi.ts` | `fetchPayoutById` | `GET` | `id: string` | `ApiResponse<GymPayout` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_payouts_url_config.ts` | `detail: (id: string) => `/admin/payouts/${encodeURIComponent(id)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminPayoutsEmptyState.tsx` | Renders reusable empty states for Admin payouts data tables. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsKPIs.tsx` | KPI cards for the Payouts module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsMain.tsx` | Main entry point for the Payouts module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsPnLStatement.tsx` | Renders the tax-ready P&L statement with functional sortable headers and empty state. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsSummaryTable.tsx` | Renders the Admin payout summary with server-side filtering, pagination, and sortable headers. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsSummaryTableSortIcon.tsx` | Renders the sortable-direction icon for one payouts summary table header. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPayoutsTabs.tsx` | Tab switcher for Payouts module (Summary vs P&L Statement). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminPayoutsEmptyState.tsx` | Renders reusable empty states for Admin payouts data tables. | 1 |
| `AdminPayoutsKPIs.tsx` | KPI cards for the Payouts module. | 0 |
| `AdminPayoutsMain.tsx` | Main entry point for the Payouts module. | 0 |
| `AdminPayoutsPnLStatement.tsx` | Renders the tax-ready P&L statement with functional sortable headers and empty state. | 1 |
| `AdminPayoutsPnLStatementCell.tsx` | Renders one formatted monetary cell in the payouts P&L statement. | 0 |
| `AdminPayoutsPnLStatementSortIcon.tsx` | Renders the sortable-direction icon for one payouts P&L table header. | 0 |
| `AdminPayoutsSummaryTable.tsx` | Renders the Admin payout summary with server-side filtering, pagination, and sortable headers. | 4 |
| `AdminPayoutsSummaryTableSortIcon.tsx` | Renders the sortable-direction icon for one payouts summary table header. | 0 |
| `AdminPayoutsTabs.tsx` | Tab switcher for Payouts module (Summary vs P&L Statement). | 1 |


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

`admin_payouts_components/`
- `admin_payouts_empty_state/AdminPayoutsEmptyState.tsx`
- `admin_payouts_kpis/AdminPayoutsKPIs.tsx`
- `admin_payouts_main/AdminPayoutsMain.tsx`
- `admin_payouts_pnl_statement/AdminPayoutsPnLStatement.tsx`
- `admin_payouts_pnl_statement/AdminPayoutsPnLStatementCell.tsx`
- `admin_payouts_pnl_statement/AdminPayoutsPnLStatementSortIcon.tsx`
- `admin_payouts_summary_table/AdminPayoutsSummaryTable.tsx`
- `admin_payouts_summary_table/AdminPayoutsSummaryTableSortIcon.tsx`
- `admin_payouts_tabs/AdminPayoutsTabs.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_payouts_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
