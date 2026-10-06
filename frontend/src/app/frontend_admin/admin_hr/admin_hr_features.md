# Admin Hr — Feature Map

## Module Purpose
The Admin HR module supports gym administration of staff, payroll, advances, dues, ledger views, and staff-performance reporting. Users can review and manage staff records, create and update payroll entries, change payroll status, record advances and due payments, inspect ledger details, and review performance metrics in the nested performance route. The module owns these workflows, their idempotent mutations, validation, and mock contracts. It does not own authentication, cross-role permission infrastructure, or unrelated business modules.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/hr` | ``frontend_admin/admin_hr/page.tsx`` | ``frontend_admin/admin_hr/admin_hr_components/admin_hr_main/AdminHrMain.tsx`` |
| `/admin/hr/performance` | ``frontend_admin/admin_hr/admin_hr_performance/page.tsx`` | `owning nested component inside `admin_hr`` |

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

Canonical module root: `admin_hr/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_hr_api/` | Typed API transport boundary. | AdminHrApi.ts, AdminHrBranchReferenceApi.ts |
| `admin_hr_components/` | Feature component root. | (empty) |
| `admin_hr_constants/` | Static business configuration and query-key registries. | AdminHrConstants.ts, AdminHrQueryKeys.ts |
| `admin_hr_hooks/` | Feature data-flow and interaction hooks. | useAdminHrBranchReference.test.ts, useAdminHrBranchReference.ts, useAdminHrDebounce.test.ts, useAdminHrDebounce.ts, useAdminHrLedgerLogic.test.ts, useAdminHrLedgerLogic.ts, useAdminHrLogic.test.ts, useAdminHrLogic.ts, useAdminHrPayrollMutations.test.ts, useAdminHrPayrollMutations.ts, … (+12 more) |
| `admin_hr_locales/` | Module-owned localized resources. | admin_hr_en.json, admin_hr_hi.json |
| `admin_hr_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_hr_performance/` | Feature-owned implementation boundary. | error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_hr_schemas/` | Zod validation/runtime contracts. | AdminHrAdvanceFormSchema.test.ts, AdminHrAdvanceFormSchema.ts, AdminHrDueFormSchema.test.ts, AdminHrDueFormSchema.ts, AdminHrPaymentFormSchema.test.ts, AdminHrPaymentFormSchema.ts, AdminHrPerformanceSchemas.ts, AdminHrSchemas.ts |
| `admin_hr_store/` | Module-scoped UI state only. | useAdminHrStore.test.ts, useAdminHrStore.ts |
| `admin_hr_types/` | Domain, DTO, state, and prop type contracts. | AdminHrAdvanceFormTypes.ts, AdminHrBranchReferenceTypes.ts, AdminHrDueFormTypes.ts, AdminHrEmptyStatePropsTypes.ts, AdminHrErrorPropsTypes.ts, AdminHrLogicUiInputsTypes.ts, AdminHrMockHandlerTypes.ts, AdminHrPaymentFormTypes.ts, AdminHrPayrollSortIndicatorPropsTypes.ts, AdminHrPerformanceChartsPropsTypes.ts, … (+11 more) |
| `admin_hr_utils/` | Feature-local deterministic utilities and formatters. | AdminHrFormatCurrency.test.ts, AdminHrFormatCurrency.ts, AdminHrFormatters.test.ts, AdminHrFormatters.ts, AdminHrPerformanceSortUtils.test.ts, AdminHrPerformanceSortUtils.ts |
| `admin_hr_components/admin_hr_advance_table/` | Feature-owned implementation boundary. | AdminHrAdvanceTable.tsx, useAdminHrAdvanceForm.test.ts, useAdminHrAdvanceForm.ts |
| `admin_hr_components/admin_hr_due_table/` | Feature-owned implementation boundary. | AdminHrDueTable.tsx, useAdminHrDueAmountSync.test.ts, useAdminHrDueAmountSync.ts, useAdminHrDueForm.test.ts, useAdminHrDueForm.ts |
| `admin_hr_components/admin_hr_empty_state/` | Feature-owned implementation boundary. | AdminHrEmptyState.tsx |
| `admin_hr_components/admin_hr_kpis/` | Feature-owned implementation boundary. | AdminHrKPIs.tsx |
| `admin_hr_components/admin_hr_ledger_table/` | Feature-owned implementation boundary. | AdminHrLedgerTable.tsx |
| `admin_hr_components/admin_hr_main/` | Feature-owned implementation boundary. | AdminHrContent.tsx, AdminHrMain.tsx |
| `admin_hr_components/admin_hr_payment_modal/` | Feature-owned implementation boundary. | AdminHrPaymentModal.tsx, useAdminHrPaymentModalForm.test.ts, useAdminHrPaymentModalForm.ts |
| `admin_hr_components/admin_hr_payroll_modal/` | Feature-owned implementation boundary. | AdminHrPayrollModal.tsx, useAdminHrPayrollModalForm.test.ts, useAdminHrPayrollModalForm.ts |
| `admin_hr_components/admin_hr_payroll_table/` | Feature-owned implementation boundary. | AdminHrPayrollSortIndicator.tsx, AdminHrPayrollTable.tsx |
| `admin_hr_components/admin_hr_performance/` | Feature-owned implementation boundary. | AdminHrPerformance.tsx, AdminHrPerformanceCharts.tsx, AdminHrPerformanceKPIs.tsx, AdminHrPerformancePeriodSelector.tsx, AdminHrPerformanceTable.tsx, AdminHrPerformanceTableSortIcon.tsx |
| `admin_hr_components/admin_hr_staff_modal/` | Feature-owned implementation boundary. | AdminHrStaffModal.tsx, useAdminHrStaffModalForm.test.ts, useAdminHrStaffModalForm.ts |
| `admin_hr_components/admin_hr_staff_profile_modal/` | Feature-owned implementation boundary. | AdminHrStaffProfileModal.tsx |
| `admin_hr_components/admin_hr_staff_table/` | Feature-owned implementation boundary. | AdminHrStaffSortIndicator.tsx, AdminHrStaffTable.tsx |
| `admin_hr_components/admin_hr_tabs/` | Feature-owned implementation boundary. | AdminHrTabs.tsx |
| `admin_hr_mocks/admin_hr_fixtures/` | Module-owned mock API datasets. | AdminHrBranchReferenceMockFixtures.ts, AdminHrMockFixtures.ts |
| `admin_hr_mocks/admin_hr_handlers/` | Module-owned MSW request handlers. | AdminHrBranchReferenceMockHandlers.ts, AdminHrMockHandlers.ts |
| `admin_hr_performance/admin_hr_performance_types/` | Domain, DTO, state, and prop type contracts. | AdminHrPerformanceErrorPropsTypes.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Present in supplied API client.
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
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMaskSensitiveData`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync`
- `@/components/ui/SearchableDropdown`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `admin_hr_performance/page.tsx` | Canonical Next.js route entry. |
| `AdminHrAdvanceTable.tsx` | `Renders the Admin HR salary-advance form; all validation and mutation orchestration stays in useAdminHrAdvanceForm.` |
| `AdminHrDueTable.tsx` | `Renders the Admin HR due-payment workflow; validation and mutation orchestration stay in useAdminHrDueForm.` |
| `AdminHrEmptyState.tsx` | `Renders reusable empty states for Admin HR data sections.` |
| `AdminHrKPIs.tsx` | `Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.` |
| `AdminHrLedgerTable.tsx` | `Renders the Admin HR staff ledger using typed query state and accessible table sorting from the ledger hook.` |
| `AdminHrContent.tsx` | `Renders the HR module's main content surface inside HrProvider.` |
| `AdminHrMain.tsx` | `Entry component for the HR module. Delegates UI composition to the module content view while business state stays in Zustand and TanStack Query hooks.` |
| `AdminHrPaymentModal.tsx` | `Renders the Admin HR payroll payment form using module-owned form orchestration.` |
| `AdminHrPayrollModal.tsx` | `Form modal for creating a new payroll entry for a staff member in the HR module.` |
| `AdminHrPayrollSortIndicator.tsx` | `Renders the visual sort-direction indicator for the Admin HR payroll table.` |
| `AdminHrPayrollTable.tsx` | `Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.` |
| `AdminHrPerformance.tsx` | `Root client orchestrator for Staff Performance Dashboard.` |
| `AdminHrPerformanceCharts.tsx` | `Renders dynamic charts visualizing staff performance metrics (sessions, additions).` |
| `AdminHrPerformanceKPIs.tsx` | `Renders the top-level KPI cards for the Performance Dashboard.` |
| `AdminHrPerformancePeriodSelector.tsx` | `Renders the period selection buttons and export action for the dashboard.` |
| `AdminHrPerformanceTable.tsx` | `Renders sortable table displaying detailed staff performance metrics.` |
| `AdminHrPerformanceTableSortIcon.tsx` | `Renders the sortable-direction icon for one HR performance table header.` |
| `AdminHrStaffModal.tsx` | `Renders the staff create/edit form and delegates state and mutation orchestration to the adjacent hook.` |
| `AdminHrStaffProfileModal.tsx` | `Read-only profile view for Staff/Managers, showing details and assigned branches.` |
| `AdminHrStaffSortIndicator.tsx` | `Renders the visual sort-direction indicator for the Admin HR staff table.` |
| `AdminHrStaffTable.tsx` | `Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation.` |
| `AdminHrTabs.tsx` | `Renders the tabbed view switching between the Staff and Payroll tables in the HR module.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: fetchStaff
fetchStaff: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: fetchStaffById
fetchStaffById: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: createStaff
createStaff: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 5: updateStaff
updateStaff: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminHrBranchReference.ts`, `useAdminHrLedgerLogic.ts`, `useAdminHrLogic.ts`, `useAdminHrPayrollMutations.ts`, `useAdminHrPerformanceLogic.ts`, `useAdminHrStaffMutations.ts`, `useAdminHrStaffProfileBranches.ts`, `useAdminHrUrlState.ts`, `useAdminHrViewModel.ts`
- **Stores:** `useAdminHrStore.ts`
- **Query-key registry:** `admin`, `detail`, `hr`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminHrApi.ts` | `fetchStaff` | `POST` | `params?: Record<string, string>` | `ApiResponse<{ staff: Staff[]; total: number }` |
| `AdminHrApi.ts` | `fetchStaffById` | `POST` | `id: string` | `ApiResponse<Staff` |
| `AdminHrApi.ts` | `createStaff` | `POST` | `body: Partial<Staff>, idempotencyKey: string` | `ApiResponse<Staff` |
| `AdminHrApi.ts` | `updateStaff` | `PATCH` | `id: string, body: Partial<Staff>, idempotencyKey: string` | `ApiResponse<Staff` |
| `AdminHrApi.ts` | `deleteStaff` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminHrApi.ts` | `bulkDeactivateStaff` | `POST` | `ids: string[], idempotencyKey: string` | `ApiResponse<null` |
| `AdminHrApi.ts` | `fetchPayrolls` | `POST` | `params?: Record<string, string>` | `ApiResponse<{ payrolls: Payroll[]; total: number }` |
| `AdminHrApi.ts` | `createPayroll` | `POST` | `body: Partial<Payroll>, idempotencyKey: string` | `ApiResponse<Payroll` |
| `AdminHrApi.ts` | `updatePayroll` | `PATCH` | `id: string, body: Partial<Payroll>, idempotencyKey: string` | `ApiResponse<Payroll` |
| `AdminHrApi.ts` | `updatePayrollStatus` | `PATCH` | `id: string, status: string, idempotencyKey: string` | `ApiResponse<Payroll` |
| `AdminHrApi.ts` | `fetchSummary` | `POST` | `branchId?: string` | `ApiResponse<HrSummary` |
| `AdminHrApi.ts` | `fetchLedger` | `POST` | `staffId: string` | `ApiResponse<LedgerEntry[]` |
| `AdminHrApi.ts` | `giveAdvance` | `POST` | `data: Record<string, unknown>, idempotencyKey: string` | `ApiResponse<null` |
| `AdminHrApi.ts` | `payDue` | `POST` | `data: Record<string, unknown>, idempotencyKey: string` | `ApiResponse<null` |
| `AdminHrApi.ts` | `fetchStaffPerformance` | `GET/implicit` | `period: PerformancePeriod, params?: { search?: string; sortKey?: PerformanceSortKey; sortDir?: PerformanceSortDirection }` | `ApiResponse<StaffPerformanceRecord[]` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_hr_url_config.ts` | `STAFF_GET_ONE: (id: string) => `/admin/hr/staff/${id}`` |
| `admin_hr_url_config.ts` | `STAFF_UPDATE: (id: string) => `/admin/hr/staff/${id}`` |
| `admin_hr_url_config.ts` | `STAFF_DELETE: (id: string) => `/admin/hr/staff/${id}`` |
| `admin_hr_url_config.ts` | `PAYROLL_UPDATE: (id: string) => `/admin/hr/payrolls/${id}`` |
| `admin_hr_url_config.ts` | `PAYROLL_STATUS_UPDATE: (id: string) => `/admin/hr/payrolls/${encodeURIComponent(id)}/status`` |
| `admin_hr_url_config.ts` | `LEDGER: (id: string) => `/admin/hr/staff/${encodeURIComponent(id)}/ledger`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminHrAdvanceTable.tsx` | Renders the Admin HR salary-advance form; all validation and mutation orchestration stays in useAdminHrAdvanceForm. | 9 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrDueTable.tsx` | Renders the Admin HR due-payment workflow; validation and mutation orchestration stay in useAdminHrDueForm. | 9 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrEmptyState.tsx` | Renders reusable empty states for Admin HR data sections. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrKPIs.tsx` | Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrLedgerTable.tsx` | Renders the Admin HR staff ledger using typed query state and accessible table sorting from the ledger hook. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrMain.tsx` | Entry component for the HR module. Delegates UI composition to the module content view while business state stays in Zustand and TanStack Query hooks. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPaymentModal.tsx` | Renders the Admin HR payroll payment form using module-owned form orchestration. | 7 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPayrollModal.tsx` | Form modal for creating a new payroll entry for a staff member in the HR module. | 9 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPayrollTable.tsx` | Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformance.tsx` | Root client orchestrator for Staff Performance Dashboard. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformanceCharts.tsx` | Renders dynamic charts visualizing staff performance metrics (sessions, additions). | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformanceKPIs.tsx` | Renders the top-level KPI cards for the Performance Dashboard. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformancePeriodSelector.tsx` | Renders the period selection buttons and export action for the dashboard. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformanceTable.tsx` | Renders sortable table displaying detailed staff performance metrics. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrPerformanceTableSortIcon.tsx` | Renders the sortable-direction icon for one HR performance table header. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrStaffModal.tsx` | Renders the staff create/edit form and delegates state and mutation orchestration to the adjacent hook. | 16 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrStaffProfileModal.tsx` | Read-only profile view for Staff/Managers, showing details and assigned branches. | 7 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrStaffTable.tsx` | Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation. | 7 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminHrTabs.tsx` | Renders the tabbed view switching between the Staff and Payroll tables in the HR module. | 13 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminHrAdvanceTable.tsx` | Renders the Admin HR salary-advance form; all validation and mutation orchestration stays in useAdminHrAdvanceForm. | 9 |
| `AdminHrDueTable.tsx` | Renders the Admin HR due-payment workflow; validation and mutation orchestration stay in useAdminHrDueForm. | 9 |
| `AdminHrEmptyState.tsx` | Renders reusable empty states for Admin HR data sections. | 1 |
| `AdminHrKPIs.tsx` | Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module. | 0 |
| `AdminHrLedgerTable.tsx` | Renders the Admin HR staff ledger using typed query state and accessible table sorting from the ledger hook. | 3 |
| `AdminHrContent.tsx` | Renders the HR module's main content surface inside HrProvider. | 0 |
| `AdminHrMain.tsx` | Entry component for the HR module. Delegates UI composition to the module content view while business state stays in Zustand and TanStack Query hooks. | 0 |
| `AdminHrPaymentModal.tsx` | Renders the Admin HR payroll payment form using module-owned form orchestration. | 7 |
| `AdminHrPayrollModal.tsx` | Form modal for creating a new payroll entry for a staff member in the HR module. | 9 |
| `AdminHrPayrollSortIndicator.tsx` | Renders the visual sort-direction indicator for the Admin HR payroll table. | 0 |
| `AdminHrPayrollTable.tsx` | Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL. | 4 |
| `AdminHrPerformance.tsx` | Root client orchestrator for Staff Performance Dashboard. | 1 |
| `AdminHrPerformanceCharts.tsx` | Renders dynamic charts visualizing staff performance metrics (sessions, additions). | 0 |
| `AdminHrPerformanceKPIs.tsx` | Renders the top-level KPI cards for the Performance Dashboard. | 0 |
| `AdminHrPerformancePeriodSelector.tsx` | Renders the period selection buttons and export action for the dashboard. | 1 |
| `AdminHrPerformanceTable.tsx` | Renders sortable table displaying detailed staff performance metrics. | 1 |
| `AdminHrPerformanceTableSortIcon.tsx` | Renders the sortable-direction icon for one HR performance table header. | 0 |
| `AdminHrStaffModal.tsx` | Renders the staff create/edit form and delegates state and mutation orchestration to the adjacent hook. | 16 |
| `AdminHrStaffProfileModal.tsx` | Read-only profile view for Staff/Managers, showing details and assigned branches. | 7 |
| `AdminHrStaffSortIndicator.tsx` | Renders the visual sort-direction indicator for the Admin HR staff table. | 0 |
| `AdminHrStaffTable.tsx` | Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation. | 7 |
| `AdminHrTabs.tsx` | Renders the tabbed view switching between the Staff and Payroll tables in the HR module. | 13 |


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

`admin_hr_components/`
- `admin_hr_advance_table/AdminHrAdvanceTable.tsx`
- `admin_hr_advance_table/useAdminHrAdvanceForm.test.ts`
- `admin_hr_advance_table/useAdminHrAdvanceForm.ts`
- `admin_hr_due_table/AdminHrDueTable.tsx`
- `admin_hr_due_table/useAdminHrDueAmountSync.test.ts`
- `admin_hr_due_table/useAdminHrDueAmountSync.ts`
- `admin_hr_due_table/useAdminHrDueForm.test.ts`
- `admin_hr_due_table/useAdminHrDueForm.ts`
- `admin_hr_empty_state/AdminHrEmptyState.tsx`
- `admin_hr_kpis/AdminHrKPIs.tsx`
- `admin_hr_ledger_table/AdminHrLedgerTable.tsx`
- `admin_hr_main/AdminHrContent.tsx`
- `admin_hr_main/AdminHrMain.tsx`
- `admin_hr_payment_modal/AdminHrPaymentModal.tsx`
- `admin_hr_payment_modal/useAdminHrPaymentModalForm.test.ts`
- `admin_hr_payment_modal/useAdminHrPaymentModalForm.ts`
- `admin_hr_payroll_modal/AdminHrPayrollModal.tsx`
- `admin_hr_payroll_modal/useAdminHrPayrollModalForm.test.ts`
- `admin_hr_payroll_modal/useAdminHrPayrollModalForm.ts`
- `admin_hr_payroll_table/AdminHrPayrollSortIndicator.tsx`
- `admin_hr_payroll_table/AdminHrPayrollTable.tsx`
- `admin_hr_performance/AdminHrPerformance.tsx`
- `admin_hr_performance/AdminHrPerformanceCharts.tsx`
- `admin_hr_performance/AdminHrPerformanceKPIs.tsx`
- `admin_hr_performance/AdminHrPerformancePeriodSelector.tsx`
- `admin_hr_performance/AdminHrPerformanceTable.tsx`
- `admin_hr_performance/AdminHrPerformanceTableSortIcon.tsx`
- `admin_hr_staff_modal/AdminHrStaffModal.tsx`
- `admin_hr_staff_modal/useAdminHrStaffModalForm.test.ts`
- `admin_hr_staff_modal/useAdminHrStaffModalForm.ts`
- `admin_hr_staff_profile_modal/AdminHrStaffProfileModal.tsx`
- `admin_hr_staff_table/AdminHrStaffSortIndicator.tsx`
- `admin_hr_staff_table/AdminHrStaffTable.tsx`
- `admin_hr_tabs/AdminHrTabs.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_hr_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
