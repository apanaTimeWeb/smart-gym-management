# Manager Hr — Feature Map

## Module Purpose
Manager HR is the branch staff and payroll workspace. Managers can search and manage staff records, review staff profiles, generate and update payroll, inspect salary ledger entries, give advances, and pay due amounts. Staff and payroll records are server data owned by this module. Financial payroll actions require confirmation and authoritative backend reconciliation.

Module root: `frontend_manager/manager_hr/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerHrApi, query |
| Read | Exposed | ManagerHrApi: fetchStaff, fetchStaffById, fetchPayrolls, fetchHrSummary, fetchLedger, fetchStaffAttendance. |
| Update | Exposed | ManagerHrApi |
| Delete | Exposed | ManagerHrApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_hr_api/` | Owns feature API clients and request/response transport contracts. | `ManagerHrApi.ts` |
| `manager_hr_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_hr_components/manager_hr_advance_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrAdvanceTable.tsx` |
| `manager_hr_components/manager_hr_attendance_history/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrAttendanceHistory.test.tsx`, `ManagerHrAttendanceHistory.tsx` |
| `manager_hr_components/manager_hr_due_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrDueTable.tsx` |
| `manager_hr_components/manager_hr_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrKPIs.tsx` |
| `manager_hr_components/manager_hr_ledger_empty_state/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrLedgerEmptyState.tsx` |
| `manager_hr_components/manager_hr_ledger_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrLedgerTable.tsx` |
| `manager_hr_components/manager_hr_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrMain.tsx` |
| `manager_hr_components/manager_hr_main/manager_hr_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrContent.tsx` |
| `manager_hr_components/manager_hr_payment_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrPaymentModal.tsx` |
| `manager_hr_components/manager_hr_payroll_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrPayrollModal.tsx` |
| `manager_hr_components/manager_hr_payroll_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrPayrollEmptyState.tsx`, `ManagerHrPayrollTable.tsx` |
| `manager_hr_components/manager_hr_staff_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrStaffModal.tsx` |
| `manager_hr_components/manager_hr_staff_profile_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrStaffProfileModal.tsx` |
| `manager_hr_components/manager_hr_staff_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrStaffEmptyState.tsx`, `ManagerHrStaffTable.tsx` |
| `manager_hr_components/manager_hr_tabs/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrTabs.tsx` |
| `manager_hr_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerHrConstants.ts`, `ManagerHrQueryKeys.ts`, `ManagerHrSharedConstants.test.ts`, `ManagerHrSharedConstants.ts` |
| `manager_hr_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerHrAdvanceForm.test.ts`, `useManagerHrAdvanceForm.ts`, `useManagerHrDueForm.test.ts`, `useManagerHrDueForm.ts`, `useManagerHrLedgerQuery.test.ts`, `useManagerHrLedgerQuery.ts`, `useManagerHrLogic.test.ts`, `useManagerHrLogic.ts` (+16 more) |
| `manager_hr_locales/` | Owns module English and Hindi translation catalogs. | `manager_hr_en.json`, `manager_hr_hi.json` |
| `manager_hr_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_hr_mocks/manager_hr_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrMockData.ts` |
| `manager_hr_mocks/manager_hr_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerHrMockHandlers.ts` |
| `manager_hr_schemas/` | Owns feature Zod validation and response schemas. | `ManagerHrAdvanceFormSchema.ts`, `ManagerHrDueFormSchema.ts`, `ManagerHrPayrollFormSchema.ts`, `ManagerHrSchema.ts`, `ManagerHrStaffFormSchema.ts` |
| `manager_hr_store/` | Owns module-scoped Zustand UI state only. | `useManagerHrUiStore.test.ts`, `useManagerHrUiStore.ts` |
| `manager_hr_tests/` | Owns module behavior and utility tests. | `ManagerHrBehavior.test.tsx` |
| `manager_hr_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerHrFormTypes.ts`, `ManagerHrStaffAttendanceTypes.ts`, `ManagerHrTypes.ts` |
| `manager_hr_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerHrExportUtils.test.ts`, `ManagerHrExportUtils.ts`, `ManagerHrFormatters.test.ts`, `ManagerHrFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_hr_features.md`
- `manager_hr_forbidden.md`
- `manager_hr_theme_contract.md`
- `manager_hr_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_empty_state/ManagerEmptyState`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_tooltip/ManagerTooltip`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerMoney`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchStaff | `/manager/hr` | Uses the fetchStaff workflow with typed request/response handling. | `GET /manager/hr/staff` | ✅ Implemented |
| fetchStaffById | `/manager/hr` | Uses the fetchStaffById workflow with typed request/response handling. | `GET /manager/hr/staff/:id` | ✅ Implemented |
| createStaff | `/manager/hr` | Uses the createStaff workflow with typed request/response handling. | `POST /manager/hr/staff` | ✅ Implemented |
| updateStaff | `/manager/hr` | Uses the updateStaff workflow with typed request/response handling. | `PATCH /manager/hr/staff/:id` | ✅ Implemented |
| deleteStaff | `/manager/hr` | Uses the deleteStaff workflow with typed request/response handling. | `DELETE /manager/hr/staff/:id` | ✅ Implemented |
| fetchPayrolls | `/manager/hr` | Uses the fetchPayrolls workflow with typed request/response handling. | `GET /manager/hr/payrolls` | ✅ Implemented |
| generatePayrolls | `/manager/hr` | Uses the generatePayrolls workflow with typed request/response handling. | `POST /manager/hr/payrolls/generate` | ✅ Implemented |
| createPayroll | `/manager/hr` | Uses the createPayroll workflow with typed request/response handling. | `POST /manager/hr/payrolls` | ✅ Implemented |
| updatePayroll | `/manager/hr` | Uses the updatePayroll workflow with typed request/response handling. | `PATCH /manager/hr/payrolls/:id` | ✅ Implemented |
| updatePayrollStatus | `/manager/hr` | Uses the updatePayrollStatus workflow with typed request/response handling. | `PATCH /manager/hr/payrolls/:id/status` | ✅ Implemented |
| fetchHrSummary | `/manager/hr` | Uses the fetchHrSummary workflow with typed request/response handling. | `GET /manager/hr/summary` | ✅ Implemented |
| fetchLedger | `/manager/hr` | Uses the fetchLedger workflow with typed request/response handling. | `GET /manager/hr/ledger/:staffId` | ✅ Implemented |
| giveStaffAdvance | `/manager/hr` | Uses the giveStaffAdvance workflow with typed request/response handling. | `POST /manager/hr/ledger/advance` | ✅ Implemented |
| payStaffDue | `/manager/hr` | Uses the payStaffDue workflow with typed request/response handling. | `POST /manager/hr/ledger/paydue` | ✅ Implemented |
| fetchStaffAttendance | `/manager/hr` | Uses the fetchStaffAttendance workflow with typed request/response handling. | `GET /manager/hr/staff/:staffId/attendance?month=YYYY-MM` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage staff
1. Manager searches the staff list by name/role and browses server-side pages.
2. The staff response is rendered into the table; sensitive phone data is masked.
3. Create/update/delete mutations go through the HR API client and module-owned MSW handlers.
4. Successful mutations reconcile the relevant TanStack Query cache.
### Flow 2: Process payroll
1. Manager opens the payroll tab and selects the month.
2. fetchPayrolls(params) retrieves the month/page/limit dataset.
3. Generate/pay/update actions submit through the HR API client with server authority.
4. The backend response message is shown and payroll queries are refreshed/reconciled.

## Component Tree

- Route: `manager_hr/page.tsx`
  - `<ManagerHrMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_hr_store/useManagerHrUiStore.ts`, `manager_hr_store/useManagerHrUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'hr', 'staff']`; `['manager', 'hr', 'summary']`; `['manager', 'hr', 'payrolls']`; `['manager', 'hr', 'ledger', staffId]`; `['manager', 'hr', 'staff-attendance', staffId, month]`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_hr/manager_hr_mocks/manager_hr_mocks_handlers/` and `manager_hr/manager_hr_mocks/manager_hr_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchStaff` | `GET` | `/api/v1/manager/hr/staff` | `{ search?, role?, page?, limit? }` | `{ staff: Staff[]; total: number }` |
| `fetchStaffById` | `GET` | `/api/v1/manager/hr/staff/:id` | `{ id: string }` | `Staff` |
| `createStaff` | `POST` | `/api/v1/manager/hr/staff` | `Partial<Staff>` | `Staff` |
| `updateStaff` | `PATCH` | `/api/v1/manager/hr/staff/:id` | `{ id: string; body: Partial<Staff> }` | `Staff` |
| `deleteStaff` | `DELETE` | `/api/v1/manager/hr/staff/:id` | `{ id: string }` | `{ id: string }` |
| `fetchPayrolls` | `GET` | `/api/v1/manager/hr/payrolls` | `{ month?, page?, limit? }` | `{ payrolls: Payroll[]; total: number }` |
| `generatePayrolls` | `POST` | `/api/v1/manager/hr/payrolls/generate` | `{ month: string }` | `{ payrolls: Payroll[] }` |
| `createPayroll` | `POST` | `/api/v1/manager/hr/payrolls` | `Partial<Payroll>` | `Payroll` |
| `updatePayroll` | `PATCH` | `/api/v1/manager/hr/payrolls/:id` | `{ id: string; body: Partial<Payroll> }` | `Payroll` |
| `updatePayrollStatus` | `PATCH` | `/api/v1/manager/hr/payrolls/:id/status` | `{ id: string; status: string }` | `Payroll` |
| `fetchHrSummary` | `GET` | `/api/v1/manager/hr/summary` | `—` | `HrSummary` |
| `fetchLedger` | `GET` | `/api/v1/manager/hr/ledger/:staffId` | `{ staffId: string }` | `{ ledger: LedgerEntry[]; total: number }` |
| `giveStaffAdvance` | `POST` | `/api/v1/manager/hr/ledger/advance` | `Record<string, unknown>` | `{ advanceAmount: number }` |
| `payStaffDue` | `POST` | `/api/v1/manager/hr/ledger/paydue` | `Record<string, unknown>` | `{ paidAmount: number }` |
| `fetchStaffAttendance` | `GET` | `/api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `{ staffId: string; month: string }` | `{ history: { date: string; status: string }[] }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total salary this month | `totalSalaryThisMonth` | `/api/v1/manager/hr/summary` | `data.totalSalaryThisMonth` | No | Yes |
| KPI: Salary paid | `totalSalaryPaid` | `/api/v1/manager/hr/summary` | `data.totalSalaryPaid` | No | Yes |
| KPI: Salary due | `totalSalaryDue` | `/api/v1/manager/hr/summary` | `data.totalSalaryDue` | No | Yes |
| KPI: Total advance given | `totalAdvanceGiven` | `/api/v1/manager/hr/summary` | `data.totalAdvanceGiven` | No | Yes |
| KPI: Active staff | `activeStaff` | `/api/v1/manager/hr/summary` | `data.activeStaff` | No | Yes |
| Staff table: Name | `name` | `/api/v1/manager/hr/staff` | `data.staff[].name` | No | Yes |
| Staff table: Email | `email` | `/api/v1/manager/hr/staff` | `data.staff[].email` | No | Yes |
| Staff table: Role | `role` | `/api/v1/manager/hr/staff` | `data.staff[].role` | No | Yes |
| Staff table: Phone | `phone` | `/api/v1/manager/hr/staff` | `data.staff[].phone` | No | Yes |
| Staff table: Salary | `salary` | `/api/v1/manager/hr/staff` | `data.staff[].salary` | No | Yes |
| Staff table: Advance | `advanceSalary` | `/api/v1/manager/hr/staff` | `data.staff[].advanceSalary` | Yes | Yes |
| Staff table: Join date | `joinDate` | `/api/v1/manager/hr/staff` | `data.staff[].joinDate` | No | Yes |
| Payroll table: Staff | `staff.name` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].staff.name` | Yes | Yes |
| Payroll table: Month | `month` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].month` | No | Yes |
| Payroll table: Net payable | `netPayable` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].netPayable` | No | Yes |
| Payroll table: Paid amount | `paidAmount` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].paidAmount` | No | Yes |
| Payroll table: Pending amount | `pendingAmount` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].pendingAmount` | No | Yes |
| Payroll table: Status | `status` | `/api/v1/manager/hr/payrolls` | `data.payrolls[].status` | No | Yes |
| Ledger: Date | `date` | `/api/v1/manager/hr/ledger/:staffId` | `data.ledger[].date` | No | Yes |
| Ledger: Type | `type` | `/api/v1/manager/hr/ledger/:staffId` | `data.ledger[].type` | No | Yes |
| Ledger: Credit | `credit` | `/api/v1/manager/hr/ledger/:staffId` | `data.ledger[].credit` | No | Yes |
| Ledger: Debit | `debit` | `/api/v1/manager/hr/ledger/:staffId` | `data.ledger[].debit` | No | Yes |
| Ledger: Balance | `balance` | `/api/v1/manager/hr/ledger/:staffId` | `data.ledger[].balance` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_hr_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Staff phone numbers must remain masked in the list view:** Staff phone numbers must remain masked in the list view.
- **Payroll payment/generation actions are financial and must require confirmation where destructive/critical:** Payroll payment/generation actions are financial and must require confirmation where destructive/critical.
- **Staff list pagination must use server `page` and `limit`; do not re-filter the returned page in the UI:** Staff list pagination must use server `page` and `limit`; do not re-filter the returned page in the UI.
- **Ledger fields are per-staff detail data and must never be attributed to the staff list or summary endpoint:** Ledger fields are per-staff detail data and must never be attributed to the staff list or summary endpoint.
- **Do not swallow trainer/staff lookup errors and turn them into an empty list:** Do not swallow trainer/staff lookup errors and turn them into an empty list.
- **Salary and payroll numbers must use centralized formatting:** Salary and payroll numbers must use centralized formatting.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_hr/manager_hr_components/manager_hr_advance_table/ManagerHrAdvanceTable.tsx` | Presents staff advance-payment entry using RHF and the Manager HR mutation source of truth. |
| `manager_hr/manager_hr_components/manager_hr_due_table/ManagerHrDueTable.tsx` | Presents the outstanding payroll-due workflow using RHF for draft state and the HR mutation hook for server reconciliation. |
| `manager_hr/manager_hr_components/manager_hr_kpis/ManagerHrKPIs.tsx` | Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module. |
| `manager_hr/manager_hr_components/manager_hr_ledger_table/ManagerHrLedgerTable.tsx` | Renders the HR Ledger Table section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_hr/manager_hr_components/manager_hr_main/ManagerHrMain.tsx` | Framework entry component for the HR module; delegates feature behavior and UI composition to `ManagerHrContent`. |
| `manager_hr/manager_hr_components/manager_hr_payment_modal/ManagerHrPaymentModal.tsx` | Renders a modal to record a partial or full salary payment for staff. |
| `manager_hr/manager_hr_components/manager_hr_payroll_modal/ManagerHrPayrollModal.tsx` | Form modal for creating a new payroll entry for a staff member in the HR module. |
| `manager_hr/manager_hr_components/manager_hr_payroll_table/ManagerHrPayrollTable.tsx` | Renders the payroll records table with pay status badges and mark-as-paid inline action. |
| `manager_hr/manager_hr_components/manager_hr_staff_modal/ManagerHrStaffModal.tsx` | Form modal for creating or editing a staff member profile in the HR module. |
| `manager_hr/manager_hr_components/manager_hr_staff_profile_modal/ManagerHrStaffProfileModal.tsx` | Renders a read-only profile modal for a staff member. |
| `manager_hr/manager_hr_components/manager_hr_staff_table/ManagerHrStaffTable.tsx` | Renders the paginated staff members table with inline row actions. |
| `manager_hr/manager_hr_components/manager_hr_tabs/ManagerHrTabs.tsx` | Renders the tabbed view switching between the Staff and Payroll tables in the HR module. |
| `manager_hr/manager_hr_hooks/useManagerHrLogic.ts` | Provides UI orchestration state to the HR module hierarchy. Async data is managed in useManagerHrLogic. |
| `manager_hr_components/manager_hr_attendance_history/ManagerHrAttendanceHistory.tsx` | Renders the Hr Attendance History module UI responsibility while delegating business data and state ownership to adjacent module logic. |
| `manager_hr_components/manager_hr_ledger_empty_state/ManagerHrLedgerEmptyState.tsx` | Renders the Hr Ledger contextual empty state and the documented permitted recovery or create action. |
| `manager_hr_components/manager_hr_main/manager_hr_content/ManagerHrContent.tsx` | Composes the Hr Content content sections while keeping data/state orchestration outside the view layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_HR`
- Active locales: `en`, `hi`
- English catalog: `manager_hr/manager_hr_locales/manager_hr_en.json`
- Hindi catalog: `manager_hr/manager_hr_locales/manager_hr_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerHrMain.tsx`
- Primary query-key registry: `ManagerHrQueryKeys.ts`
- Primary module constants registry: `ManagerHrConstants.ts`
- Canonical schema file: `ManagerHrSchema.ts` in `manager_hr_schemas/`
- Module theme contract: `manager_hr_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_hr_components/manager_hr_main/ManagerHrMain.tsx` | YES |
| API client | `ManagerHrApi.ts` | YES |
| Schema file | `ManagerHrSchema.ts` | YES |
| Query-key registry | `ManagerHrQueryKeys.ts` | YES |
| Constants registry | `ManagerHrConstants.ts` | YES |
| URL config | `manager_hr_url_config.ts` | YES |
| Behavior test | `ManagerHrBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_hr_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_hr/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_hr/manager_hr_mocks/manager_hr_mocks_fixtures/` and `manager_hr/manager_hr_mocks/manager_hr_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
