# Admin Finance — Feature Map

## Module Purpose
The Admin Finance module provides administrators with financial reporting views for payments, expenses, summary KPIs, revenue by payment method, and branch profit-and-loss analysis. Users can switch finance views, filter the reporting period, inspect tabular payment/expense data, and drill into the P&L reporting surface. The module is read-only in the supplied frontend contract and keeps monetary formatting within feature-local utilities. It does not expose a refund mutation because no supported refund workflow is present in the supplied frontend/API contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/finance` | ``frontend_admin/admin_finance/page.tsx`` | ``frontend_admin/admin_finance/admin_finance_components/admin_finance_main/AdminFinanceMain.tsx`` |
| `/admin/finance/pnl` | ``frontend_admin/admin_finance/admin_finance_pnl/page.tsx`` | `owning nested component inside `admin_finance`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zod 3.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_finance/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_finance_api/` | Typed API transport boundary. | AdminFinanceApi.ts |
| `admin_finance_components/` | Feature component root. | (empty) |
| `admin_finance_constants/` | Static business configuration and query-key registries. | AdminFinanceConstants.ts, AdminFinanceQueryKeys.ts |
| `admin_finance_hooks/` | Feature data-flow and interaction hooks. | useAdminFinanceDebounce.test.ts, useAdminFinanceDebounce.ts, useAdminFinanceLogic.test.ts, useAdminFinanceLogic.ts, useAdminFinancePnlLogic.test.ts, useAdminFinancePnlLogic.ts |
| `admin_finance_locales/` | Module-owned localized resources. | admin_finance_en.json, admin_finance_hi.json |
| `admin_finance_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_finance_pnl/` | Feature-owned implementation boundary. | error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_finance_schemas/` | Zod validation/runtime contracts. | AdminFinanceSchemas.ts |
| `admin_finance_types/` | Domain, DTO, state, and prop type contracts. | AdminFinanceDateFilterTypes.ts, AdminFinanceEmptyStatePropsTypes.ts, AdminFinanceErrorPropsTypes.ts, AdminFinancePnlBreakdownBarPropsTypes.ts, AdminFinancePnlChartsPropsTypes.ts, AdminFinancePnlEmptyStatePropsTypes.ts, AdminFinancePnlErrorPropsTypes.ts, AdminFinancePnlKPIsPropsTypes.ts, AdminFinancePnlPeriodSelectorPropsTypes.ts, AdminFinancePnlRowBreakdownPropsTypes.ts, … (+5 more) |
| `admin_finance_utils/` | Feature-local deterministic utilities and formatters. | AdminFinanceFormatCurrency.test.ts, AdminFinanceFormatCurrency.ts, AdminFinanceFormatters.test.ts, AdminFinanceFormatters.ts |
| `admin_finance_components/admin_finance_date_filter/` | Feature-owned implementation boundary. | AdminFinanceDateFilterDropdown.tsx |
| `admin_finance_components/admin_finance_empty_state/` | Feature-owned implementation boundary. | AdminFinanceEmptyState.tsx |
| `admin_finance_components/admin_finance_expenses_table/` | Feature-owned implementation boundary. | AdminFinanceExpensesTable.tsx |
| `admin_finance_components/admin_finance_kpis/` | Feature-owned implementation boundary. | AdminFinanceKPIs.tsx |
| `admin_finance_components/admin_finance_main/` | Feature-owned implementation boundary. | AdminFinanceMain.tsx |
| `admin_finance_components/admin_finance_payments_table/` | Feature-owned implementation boundary. | AdminFinancePaymentsTable.tsx |
| `admin_finance_components/admin_finance_pnl/` | Feature-owned implementation boundary. | AdminFinancePnl.tsx, AdminFinancePnlBreakdownBar.tsx, AdminFinancePnlCharts.tsx, AdminFinancePnlEmptyState.tsx, AdminFinancePnlKPIs.tsx, AdminFinancePnlPeriodSelector.tsx, AdminFinancePnlRowBreakdown.tsx, AdminFinancePnlTable.tsx, AdminFinancePnlTableSortIcon.tsx |
| `admin_finance_components/admin_finance_revenue_by_method/` | Feature-owned implementation boundary. | AdminFinanceRevenueByMethod.tsx |
| `admin_finance_components/admin_finance_revenue_summary/` | Feature-owned implementation boundary. | AdminFinanceRevenueSummary.tsx |
| `admin_finance_components/admin_finance_tabs/` | Feature-owned implementation boundary. | AdminFinanceTabs.tsx, useAdminFinanceTabsViewModel.test.ts, useAdminFinanceTabsViewModel.ts |
| `admin_finance_mocks/admin_finance_fixtures/` | Module-owned mock API datasets. | AdminFinanceMockFixtures.ts, AdminFinancePnlFixtureByPeriod.test.ts, AdminFinancePnlFixtureByPeriod.ts |
| `admin_finance_mocks/admin_finance_handlers/` | Module-owned MSW request handlers. | AdminFinanceMockHandlers.ts |
| `admin_finance_pnl/admin_finance_pnl_types/` | Domain, DTO, state, and prop type contracts. | AdminFinancePnlErrorPropsTypes.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/admin_layout_progress_bar_types/AdminLayoutProgressBarTypes`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_url_config`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
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
| `admin_finance_pnl/page.tsx` | Canonical Next.js route entry. |
| `AdminFinanceDateFilterDropdown.tsx` | `A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).` |
| `AdminFinanceEmptyState.tsx` | `Renders a reusable empty state for Admin finance data tables.` |
| `AdminFinanceExpensesTable.tsx` | `Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.` |
| `AdminFinanceKPIs.tsx` | `Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter.` |
| `AdminFinanceMain.tsx` | `Provides the implementation for AdminFinanceMain.tsx functionality within its module.` |
| `AdminFinancePaymentsTable.tsx` | `Renders the read-only paginated Finance payment history returned by TanStack Query.` |
| `AdminFinancePnl.tsx` | `Root client orchestrator for the Branch P&L Comparison page.` |
| `AdminFinancePnlBreakdownBar.tsx` | `Renders one proportional bar for a P&L breakdown metric.` |
| `AdminFinancePnlCharts.tsx` | `Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)` |
| `AdminFinancePnlEmptyState.tsx` | `Empty state shown when the status filter returns zero branches.` |
| `AdminFinancePnlKPIs.tsx` | `Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses,` |
| `AdminFinancePnlPeriodSelector.tsx` | `Period selector segmented control + Export CSV button for the P&L page.` |
| `AdminFinancePnlRowBreakdown.tsx` | `Renders the inline branch breakdown panel that expands inside the P&L table row.` |
| `AdminFinancePnlTable.tsx` | `Renders the sortable branch-wise P&L comparison table with` |
| `AdminFinancePnlTableSortIcon.tsx` | `Renders the sortable-direction icon for one Finance P&L table header.` |
| `AdminFinanceRevenueByMethod.tsx` | `Provides the implementation for AdminFinanceRevenueByMethod.tsx functionality within its module.` |
| `AdminFinanceRevenueSummary.tsx` | `Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.` |
| `AdminFinanceTabs.tsx` | `Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary).` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminFinanceLogic.ts`, `useAdminFinancePnlLogic.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `finance`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminFinanceApi.ts` | `fetchPayments` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ payments: Payment[]; total: number }` |
| `AdminFinanceApi.ts` | `fetchSummary` | `GET` | `branchId?: string, range?: string` | `ApiResponse<FinanceSummary` |
| `AdminFinanceApi.ts` | `fetchBranchPnl` | `GET` | `period: string, params?: { status?: string; sortKey?: string; sortDir?: string }` | `ApiResponse<BranchPnlRecord[]` |
| `AdminFinanceApi.ts` | `fetchExpenses` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ expenses: Expense[]; total: number; totalAmount: number }` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_finance_url_config.ts` | `PAYMENTS_BY_MEMBER: (memberId: string) => `/admin/finance/payments/member/${memberId}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminFinanceDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinanceEmptyState.tsx` | Renders a reusable empty state for Admin finance data tables. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinanceExpensesTable.tsx` | Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinanceKPIs.tsx` | Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinanceMain.tsx` | Provides the implementation for AdminFinanceMain.tsx functionality within its module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePaymentsTable.tsx` | Renders the read-only paginated Finance payment history returned by TanStack Query. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnl.tsx` | Root client orchestrator for the Branch P&L Comparison page. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlCharts.tsx` | Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch) | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlEmptyState.tsx` | Empty state shown when the status filter returns zero branches. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlKPIs.tsx` | Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses, | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlPeriodSelector.tsx` | Period selector segmented control + Export CSV button for the P&L page. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlTable.tsx` | Renders the sortable branch-wise P&L comparison table with | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinancePnlTableSortIcon.tsx` | Renders the sortable-direction icon for one Finance P&L table header. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminFinanceTabs.tsx` | Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary). | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminFinanceDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 |
| `AdminFinanceEmptyState.tsx` | Renders a reusable empty state for Admin finance data tables. | 1 |
| `AdminFinanceExpensesTable.tsx` | Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination. | 3 |
| `AdminFinanceKPIs.tsx` | Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter. | 1 |
| `AdminFinanceMain.tsx` | Provides the implementation for AdminFinanceMain.tsx functionality within its module. | 0 |
| `AdminFinancePaymentsTable.tsx` | Renders the read-only paginated Finance payment history returned by TanStack Query. | 2 |
| `AdminFinancePnl.tsx` | Root client orchestrator for the Branch P&L Comparison page. | 1 |
| `AdminFinancePnlBreakdownBar.tsx` | Renders one proportional bar for a P&L breakdown metric. | 0 |
| `AdminFinancePnlCharts.tsx` | Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch) | 0 |
| `AdminFinancePnlEmptyState.tsx` | Empty state shown when the status filter returns zero branches. | 1 |
| `AdminFinancePnlKPIs.tsx` | Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses, | 1 |
| `AdminFinancePnlPeriodSelector.tsx` | Period selector segmented control + Export CSV button for the P&L page. | 1 |
| `AdminFinancePnlRowBreakdown.tsx` | Renders the inline branch breakdown panel that expands inside the P&L table row. | 0 |
| `AdminFinancePnlTable.tsx` | Renders the sortable branch-wise P&L comparison table with | 2 |
| `AdminFinancePnlTableSortIcon.tsx` | Renders the sortable-direction icon for one Finance P&L table header. | 0 |
| `AdminFinanceRevenueByMethod.tsx` | Provides the implementation for AdminFinanceRevenueByMethod.tsx functionality within its module. | 0 |
| `AdminFinanceRevenueSummary.tsx` | Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module. | 0 |
| `AdminFinanceTabs.tsx` | Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary). | 5 |


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

`admin_finance_components/`
- `admin_finance_date_filter/AdminFinanceDateFilterDropdown.tsx`
- `admin_finance_empty_state/AdminFinanceEmptyState.tsx`
- `admin_finance_expenses_table/AdminFinanceExpensesTable.tsx`
- `admin_finance_kpis/AdminFinanceKPIs.tsx`
- `admin_finance_main/AdminFinanceMain.tsx`
- `admin_finance_payments_table/AdminFinancePaymentsTable.tsx`
- `admin_finance_pnl/AdminFinancePnl.tsx`
- `admin_finance_pnl/AdminFinancePnlBreakdownBar.tsx`
- `admin_finance_pnl/AdminFinancePnlCharts.tsx`
- `admin_finance_pnl/AdminFinancePnlEmptyState.tsx`
- `admin_finance_pnl/AdminFinancePnlKPIs.tsx`
- `admin_finance_pnl/AdminFinancePnlPeriodSelector.tsx`
- `admin_finance_pnl/AdminFinancePnlRowBreakdown.tsx`
- `admin_finance_pnl/AdminFinancePnlTable.tsx`
- `admin_finance_pnl/AdminFinancePnlTableSortIcon.tsx`
- `admin_finance_revenue_by_method/AdminFinanceRevenueByMethod.tsx`
- `admin_finance_revenue_summary/AdminFinanceRevenueSummary.tsx`
- `admin_finance_tabs/AdminFinanceTabs.tsx`
- `admin_finance_tabs/useAdminFinanceTabsViewModel.test.ts`
- `admin_finance_tabs/useAdminFinanceTabsViewModel.ts`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_finance_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
