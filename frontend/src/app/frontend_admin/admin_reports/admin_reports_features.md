# Admin Reports — Feature Map

## Module Purpose
The Admin Reports module provides administrators with period-based reporting across revenue, membership, attendance, payroll, and P&L views. Users can switch report tabs, select date ranges and branch scope, inspect report KPIs/tables/charts, and request the supported report export flow. The module owns report-query state, schemas, formatting, and report-specific presentation. Binary export transport remains constrained by the supplied frontend-only scope where the shared API transport contract is not available for non-JSON responses.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/reports` | ``frontend_admin/admin_reports/page.tsx`` | ``frontend_admin/admin_reports/admin_reports_components/admin_reports_main/AdminReportsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_reports/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_reports_api/` | Typed API transport boundary. | AdminReportsApi.ts, AdminReportsBranchReferenceApi.ts |
| `admin_reports_components/` | Feature component root. | (empty) |
| `admin_reports_constants/` | Static business configuration and query-key registries. | AdminReportsConstants.ts, AdminReportsQueryKeys.ts |
| `admin_reports_hooks/` | Feature data-flow and interaction hooks. | useAdminReportsBranchReference.test.ts, useAdminReportsBranchReference.ts, useAdminReportsDateRangeSuffix.test.ts, useAdminReportsDateRangeSuffix.ts, useAdminReportsLogic.test.ts, useAdminReportsLogic.ts, useAdminReportsMutations.test.tsx, useAdminReportsMutations.ts |
| `admin_reports_locales/` | Module-owned localized resources. | admin_reports_en.json, admin_reports_hi.json |
| `admin_reports_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_reports_schemas/` | Zod validation/runtime contracts. | AdminReportsSchemas.ts |
| `admin_reports_store/` | Module-scoped UI state only. | useAdminReportsStore.test.ts, useAdminReportsStore.ts |
| `admin_reports_types/` | Domain, DTO, state, and prop type contracts. | AdminReportsAttendanceSortIconPropsTypes.ts, AdminReportsAttendanceTypes.ts, AdminReportsBranchReferenceTypes.ts, AdminReportsDateFilterTypes.ts, AdminReportsEmptyStatePropsTypes.ts, AdminReportsErrorPropsTypes.ts, AdminReportsSortTypes.ts, AdminReportsStoreTypes.ts, AdminReportsTypes.ts, AdminReportsUiTypes.ts |
| `admin_reports_utils/` | Feature-local deterministic utilities and formatters. | AdminReportsFormatCurrency.test.ts, AdminReportsFormatCurrency.ts, AdminReportsFormatters.test.ts, AdminReportsFormatters.ts, AdminReportsSortAttendanceRows.test.ts, AdminReportsSortAttendanceRows.ts |
| `admin_reports_components/admin_reports_attendance/` | Feature-owned implementation boundary. | AdminReportsAttendance.tsx, AdminReportsAttendanceSortIcon.tsx, useAdminReportsAttendanceTable.test.ts, useAdminReportsAttendanceTable.ts |
| `admin_reports_components/admin_reports_date_filter/` | Feature-owned implementation boundary. | AdminReportsDateFilterDropdown.tsx |
| `admin_reports_components/admin_reports_empty_state/` | Feature-owned implementation boundary. | AdminReportsEmptyState.tsx |
| `admin_reports_components/admin_reports_kpis/` | Feature-owned implementation boundary. | AdminReportsKPIs.tsx |
| `admin_reports_components/admin_reports_main/` | Feature-owned implementation boundary. | AdminReportsMain.tsx, AdminReportsSkeleton.tsx |
| `admin_reports_components/admin_reports_membership/` | Feature-owned implementation boundary. | AdminReportsMembership.tsx |
| `admin_reports_components/admin_reports_payroll/` | Feature-owned implementation boundary. | AdminReportsPayroll.tsx |
| `admin_reports_components/admin_reports_pnl/` | Feature-owned implementation boundary. | AdminReportsPnL.tsx |
| `admin_reports_components/admin_reports_revenue/` | Feature-owned implementation boundary. | AdminReportsRevenue.tsx |
| `admin_reports_components/admin_reports_tabs/` | Feature-owned implementation boundary. | AdminReportsTabs.tsx |
| `admin_reports_mocks/admin_reports_fixtures/` | Module-owned mock API datasets. | AdminReportsBranchReferenceMockFixtures.ts, AdminReportsMockFixtures.ts |
| `admin_reports_mocks/admin_reports_handlers/` | Module-owned MSW request handlers. | AdminReportsBranchReferenceMockHandlers.ts, AdminReportsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminReportsAttendance.tsx` | `Renders the Admin attendance report summary with functional sorting and the API-backed heatmap dataset.` |
| `AdminReportsAttendanceSortIcon.tsx` | `Renders the sortable-direction icon for an Admin Reports attendance header.` |
| `AdminReportsDateFilterDropdown.tsx` | `A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).` |
| `AdminReportsEmptyState.tsx` | `Renders a consistent empty state for an Admin reports data section.` |
| `AdminReportsKPIs.tsx` | `Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate.` |
| `AdminReportsMain.tsx` | `Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels.` |
| `AdminReportsSkeleton.tsx` | `Renders the structural loading skeleton for the Admin Reports route.` |
| `AdminReportsMembership.tsx` | `Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.` |
| `AdminReportsPayroll.tsx` | `Renders the Payroll summary report tab — staff count, total payroll, paid, pending, advances per gym.` |
| `AdminReportsPnL.tsx` | `Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.` |
| `AdminReportsRevenue.tsx` | `Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.` |
| `AdminReportsTabs.tsx` | `Renders the tab navigation bar for the Reports module.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminReportsBranchReference.ts`, `useAdminReportsDateRangeSuffix.ts`, `useAdminReportsLogic.ts`, `useAdminReportsMutations.ts`
- **Stores:** `useAdminReportsStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `reports`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.



**Binary export transport exception:** The supplied role-only archive does not include the host `apiFetch` implementation or a documented Blob response mode. The existing binary export behavior is therefore preserved rather than replaced with an invented transport contract; host integration must keep this exception documented until the global transport exposes an approved Blob-capable API.

## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminReportsApi.ts` | `fetchRevenueReport` | `GET` | `params: { from: string; to: string; branchId?: string }` | `ApiResponse<RevenueReportData` |
| `AdminReportsApi.ts` | `fetchAttendanceReport` | `GET` | `params: { from: string; to: string; branchId?: string }` | `ApiResponse<AttendanceReportData` |
| `AdminReportsApi.ts` | `fetchMembershipReport` | `GET` | `params: { from: string; to: string; branchId?: string }` | `ApiResponse<MembershipReportData` |
| `AdminReportsApi.ts` | `fetchPayrollReport` | `GET` | `params: { from: string; to: string; branchId?: string }` | `ApiResponse<PayrollReportData` |
| `AdminReportsApi.ts` | `fetchPnLReport` | `GET` | `params: { from: string; to: string; branchId?: string }` | `ApiResponse<PnLReportData` |
| `AdminReportsApi.ts` | `fetchReportData` | `GET/implicit` | `params: { from: string; to: string; branchId?: string }` | `not directly visible` |
| `AdminReportsApi.ts` | `exportReport` | `GET` | `params: AdminReportsExportParams, locale = 'en'` | `not directly visible` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminReportsAttendance.tsx` | Renders the Admin attendance report summary with functional sorting and the API-backed heatmap dataset. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsEmptyState.tsx` | Renders a consistent empty state for an Admin reports data section. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsKPIs.tsx` | Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsMain.tsx` | Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsMembership.tsx` | Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsPayroll.tsx` | Renders the Payroll summary report tab — staff count, total payroll, paid, pending, advances per gym. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsRevenue.tsx` | Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminReportsTabs.tsx` | Renders the tab navigation bar for the Reports module. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminReportsAttendance.tsx` | Renders the Admin attendance report summary with functional sorting and the API-backed heatmap dataset. | 1 |
| `AdminReportsAttendanceSortIcon.tsx` | Renders the sortable-direction icon for an Admin Reports attendance header. | 0 |
| `AdminReportsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 |
| `AdminReportsEmptyState.tsx` | Renders a consistent empty state for an Admin reports data section. | 1 |
| `AdminReportsKPIs.tsx` | Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate. | 0 |
| `AdminReportsMain.tsx` | Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels. | 2 |
| `AdminReportsSkeleton.tsx` | Renders the structural loading skeleton for the Admin Reports route. | 0 |
| `AdminReportsMembership.tsx` | Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym. | 4 |
| `AdminReportsPayroll.tsx` | Renders the Payroll summary report tab — staff count, total payroll, paid, pending, advances per gym. | 2 |
| `AdminReportsPnL.tsx` | Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators. | 0 |
| `AdminReportsRevenue.tsx` | Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart. | 2 |
| `AdminReportsTabs.tsx` | Renders the tab navigation bar for the Reports module. | 1 |


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

`admin_reports_components/`
- `admin_reports_attendance/AdminReportsAttendance.tsx`
- `admin_reports_attendance/AdminReportsAttendanceSortIcon.tsx`
- `admin_reports_attendance/useAdminReportsAttendanceTable.test.ts`
- `admin_reports_attendance/useAdminReportsAttendanceTable.ts`
- `admin_reports_date_filter/AdminReportsDateFilterDropdown.tsx`
- `admin_reports_empty_state/AdminReportsEmptyState.tsx`
- `admin_reports_kpis/AdminReportsKPIs.tsx`
- `admin_reports_main/AdminReportsMain.tsx`
- `admin_reports_main/AdminReportsSkeleton.tsx`
- `admin_reports_membership/AdminReportsMembership.tsx`
- `admin_reports_payroll/AdminReportsPayroll.tsx`
- `admin_reports_pnl/AdminReportsPnL.tsx`
- `admin_reports_revenue/AdminReportsRevenue.tsx`
- `admin_reports_tabs/AdminReportsTabs.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_reports_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
