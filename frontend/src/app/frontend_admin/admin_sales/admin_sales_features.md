# Admin Sales — Feature Map

## Module Purpose
The Admin Sales module gives administrators a consolidated reporting view of sales activity across membership, pending payments, referrals, and store orders. Users can switch sales views, filter the reporting period, inspect overview/referral/membership/pending-payment/store-sales datasets, and review the associated KPIs and tables. The supplied frontend is read-oriented and owns its reporting query/state flow and currency formatting. It does not own payment mutation or member lifecycle workflows.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/sales` | ``frontend_admin/admin_sales/page.tsx`` | ``frontend_admin/admin_sales/admin_sales_components/admin_sales_main/AdminSalesMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_sales/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_sales_api/` | Typed API transport boundary. | AdminSalesApi.ts |
| `admin_sales_components/` | Feature component root. | (empty) |
| `admin_sales_constants/` | Static business configuration and query-key registries. | AdminSalesConstants.ts, AdminSalesExternalUrlConstants.ts, AdminSalesQueryKeys.ts |
| `admin_sales_hooks/` | Feature data-flow and interaction hooks. | useAdminSalesDebounce.test.ts, useAdminSalesDebounce.ts, useAdminSalesLogic.test.ts, useAdminSalesLogic.ts |
| `admin_sales_locales/` | Module-owned localized resources. | admin_sales_en.json, admin_sales_hi.json |
| `admin_sales_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_sales_schemas/` | Zod validation/runtime contracts. | AdminSalesSchemas.ts |
| `admin_sales_types/` | Domain, DTO, state, and prop type contracts. | AdminSalesAllMembershipsTypes.ts, AdminSalesDateFilterTypes.ts, AdminSalesEmptyStatePropsTypes.ts, AdminSalesErrorPropsTypes.ts, AdminSalesSortTypes.ts, AdminSalesTypes.ts, AdminSalesUiTypes.ts, AdminSalesWhatsAppTypes.ts |
| `admin_sales_utils/` | Feature-local deterministic utilities and formatters. | AdminSalesFilterMembershipReportRows.test.ts, AdminSalesFilterMembershipReportRows.ts, AdminSalesFormatCurrency.test.ts, AdminSalesFormatCurrency.ts, AdminSalesFormatters.test.ts, AdminSalesFormatters.ts, AdminSalesWhatsAppFormatter.test.ts, AdminSalesWhatsAppFormatter.ts |
| `admin_sales_components/admin_sales_all_memberships/` | Feature-owned implementation boundary. | AdminSalesAllMemberships.tsx |
| `admin_sales_components/admin_sales_date_filter/` | Feature-owned implementation boundary. | AdminSalesDateFilterDropdown.tsx |
| `admin_sales_components/admin_sales_empty_state/` | Feature-owned implementation boundary. | AdminSalesEmptyState.tsx |
| `admin_sales_components/admin_sales_main/` | Feature-owned implementation boundary. | AdminSalesMain.tsx |
| `admin_sales_components/admin_sales_membership_report/` | Feature-owned implementation boundary. | AdminSalesMembershipReport.tsx |
| `admin_sales_components/admin_sales_overview/` | Feature-owned implementation boundary. | AdminSalesOverview.tsx |
| `admin_sales_components/admin_sales_pending_payments/` | Feature-owned implementation boundary. | AdminSalesPendingPayments.tsx |
| `admin_sales_components/admin_sales_store_sales/` | Feature-owned implementation boundary. | AdminSalesStoreSales.tsx |
| `admin_sales_components/admin_sales_tabs/` | Feature-owned implementation boundary. | AdminSalesTabs.tsx |
| `admin_sales_components/admin_sales_toolbar/` | Feature-owned implementation boundary. | AdminSalesToolbar.tsx, useAdminSalesToolbarSearch.test.ts, useAdminSalesToolbarSearch.ts |
| `admin_sales_mocks/admin_sales_fixtures/` | Module-owned mock API datasets. | AdminSalesMockConstants.ts, AdminSalesMockFixtures.ts |
| `admin_sales_mocks/admin_sales_handlers/` | Module-owned MSW request handlers. | AdminSalesMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_config/AdminLayoutGymConfiguration`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminSalesAllMemberships.tsx` | `Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls.` |
| `AdminSalesDateFilterDropdown.tsx` | `A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).` |
| `AdminSalesEmptyState.tsx` | `Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls.` |
| `AdminSalesMain.tsx` | `Provides the implementation for AdminSalesMain.tsx functionality within its module.` |
| `AdminSalesMembershipReport.tsx` | `Renders the sortable membership receivable report and its server-backed empty/error states.` |
| `AdminSalesOverview.tsx` | `Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts.` |
| `AdminSalesPendingPayments.tsx` | `Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state.` |
| `AdminSalesStoreSales.tsx` | `Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state.` |
| `AdminSalesTabs.tsx` | `Provides the implementation for AdminSalesTabs.tsx functionality within its module.` |
| `AdminSalesToolbar.tsx` | `Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminSalesLogic.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `list`, `sales`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminSalesApi.ts` | `fetchOverview` | `GET` | `branchId?: string, range?: string` | `ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }` |
| `AdminSalesApi.ts` | `fetchReferralSources` | `GET` | `branchId?: string, range?: string` | `ApiResponse<ReferralDataPoint[]` |
| `AdminSalesApi.ts` | `fetchMembershipReport` | `GET` | `branchId?: string, range?: string, search?: string` | `ApiResponse<{ report: MembershipReportItem[], totals: MembershipTotals }` |
| `AdminSalesApi.ts` | `fetchPendingPayments` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ members: PendingPaymentMember[], total: number }` |
| `AdminSalesApi.ts` | `fetchAllMemberships` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ members: Member[], total: number }` |
| `AdminSalesApi.ts` | `fetchStoreOrders` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ orders: StoreOrder[], total: number }` |
| `AdminSalesApi.ts` | `fetchStoreSummary` | `GET` | `params?: Record<string, string>` | `ApiResponse<{ summary: StoreSummary }` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminSalesAllMemberships.tsx` | Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesEmptyState.tsx` | Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesMain.tsx` | Provides the implementation for AdminSalesMain.tsx functionality within its module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesMembershipReport.tsx` | Renders the sortable membership receivable report and its server-backed empty/error states. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesOverview.tsx` | Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesPendingPayments.tsx` | Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesStoreSales.tsx` | Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state. | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesTabs.tsx` | Provides the implementation for AdminSalesTabs.tsx functionality within its module. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSalesToolbar.tsx` | Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminSalesAllMemberships.tsx` | Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls. | 2 |
| `AdminSalesDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 |
| `AdminSalesEmptyState.tsx` | Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls. | 1 |
| `AdminSalesMain.tsx` | Provides the implementation for AdminSalesMain.tsx functionality within its module. | 0 |
| `AdminSalesMembershipReport.tsx` | Renders the sortable membership receivable report and its server-backed empty/error states. | 1 |
| `AdminSalesOverview.tsx` | Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts. | 1 |
| `AdminSalesPendingPayments.tsx` | Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state. | 2 |
| `AdminSalesStoreSales.tsx` | Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state. | 5 |
| `AdminSalesTabs.tsx` | Provides the implementation for AdminSalesTabs.tsx functionality within its module. | 1 |
| `AdminSalesToolbar.tsx` | Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state. | 2 |


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

`admin_sales_components/`
- `admin_sales_all_memberships/AdminSalesAllMemberships.tsx`
- `admin_sales_date_filter/AdminSalesDateFilterDropdown.tsx`
- `admin_sales_empty_state/AdminSalesEmptyState.tsx`
- `admin_sales_main/AdminSalesMain.tsx`
- `admin_sales_membership_report/AdminSalesMembershipReport.tsx`
- `admin_sales_overview/AdminSalesOverview.tsx`
- `admin_sales_pending_payments/AdminSalesPendingPayments.tsx`
- `admin_sales_store_sales/AdminSalesStoreSales.tsx`
- `admin_sales_tabs/AdminSalesTabs.tsx`
- `admin_sales_toolbar/AdminSalesToolbar.tsx`
- `admin_sales_toolbar/useAdminSalesToolbarSearch.test.ts`
- `admin_sales_toolbar/useAdminSalesToolbarSearch.ts`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_sales_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
