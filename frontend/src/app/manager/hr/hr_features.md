# Manager Hr — Feature Map

## Module Purpose
Manager HR is the branch staff and payroll workspace. Managers can search and manage staff records, review staff profiles, generate and update payroll, inspect salary ledger entries, give advances, and pay due amounts. Staff and payroll records are server data owned by this module. Financial payroll actions require confirmation and authoritative backend reconciliation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `hr_api/` | Feature-owned responsibility for the hr module. | `ManagerHrApi.ts; ManagerHrServerApi.ts; ManagerUseManagerHrLedgerQuery.ts; ManagerUseManagerHrQueries.ts; ManagerUseManagerHrStaffAttendanceQuery.ts` |
| `hr_components/` | Feature-owned responsibility for the hr module. | `—` |
| `hr_hooks/` | Feature-owned responsibility for the hr module. | `ManagerUseManagerHrLogic.ts; ManagerUseManagerHrLogic.ts; ManagerUseManagerHrMutations.ts; ManagerUseManagerHrPayrollMutations.ts; ManagerUseManagerHrStaffMutations.ts; ManagerUseManagerHrUIState.ts` |
| `hr_fixtures/` | Feature-owned responsibility for the hr module. | `ManagerHrMockData.ts` |
| `hr_mocks/` | Feature-owned responsibility for the hr module. | `—` |
| `hr_types/` | Feature-owned responsibility for the hr module. | `ManagerHrSchema.ts; ManagerHrTypes.ts` |
| `hr_utils/` | Feature-owned responsibility for the hr module. | `ManagerHrAdvanceFormSchema.ts; ManagerHrDueFormSchema.ts; ManagerHrExportUtils.ts; ManagerHrSharedConstants.ts` |

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

## Data and State Architecture
TanStack Query owns hr server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Staff phone numbers must remain masked in the list view:** Staff phone numbers must remain masked in the list view.
- **Payroll payment/generation actions are financial and must require confirmation where destructive/critical:** Payroll payment/generation actions are financial and must require confirmation where destructive/critical.
- **Staff list pagination must use server `page` and `limit`; do not re-filter the returned page in the UI:** Staff list pagination must use server `page` and `limit`; do not re-filter the returned page in the UI.
- **Ledger fields are per-staff detail data and must never be attributed to the staff list or summary endpoint:** Ledger fields are per-staff detail data and must never be attributed to the staff list or summary endpoint.
- **Do not swallow trainer/staff lookup errors and turn them into an empty list:** Do not swallow trainer/staff lookup errors and turn them into an empty list.
- **Salary and payroll numbers must use centralized formatting:** Salary and payroll numbers must use centralized formatting.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `hr/hr_components/ManagerHrAdvanceTable/ManagerHrAdvanceTable.tsx` | Presents staff advance-payment entry using RHF and the Manager HR mutation source of truth. |
| `hr/hr_components/ManagerHrDueTable/ManagerHrDueTable.tsx` | Presents the outstanding payroll-due workflow using RHF for draft state and the HR mutation hook for server reconciliation. |
| `hr/hr_components/ManagerHrKPIs/ManagerHrKPIs.tsx` | Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module. |
| `hr/hr_components/ManagerHrLedgerTable/ManagerHrLedgerTable.tsx` | Renders the Manager HrLedgerTable presentation layer for the Manager module. |
| `hr/hr_components/ManagerHrMain/ManagerHrMain.tsx` | Framework entry component for the HR module; delegates feature behavior and UI composition to `ManagerHrContent`. |
| `hr/hr_components/ManagerHrPaymentModal/ManagerHrPaymentModal.tsx` | Renders a modal to record a partial or full salary payment for staff. |
| `hr/hr_components/ManagerHrPayrollModal/ManagerHrPayrollModal.tsx` | Form modal for creating a new payroll entry for a staff member in the HR module. |
| `hr/hr_components/ManagerHrPayrollTable/ManagerHrPayrollTable.tsx` | Renders the payroll records table with pay status badges and mark-as-paid inline action. |
| `hr/hr_components/ManagerHrStaffModal/ManagerHrStaffModal.tsx` | Form modal for creating or editing a staff member profile in the HR module. |
| `hr/hr_components/ManagerHrStaffProfileModal/ManagerHrStaffProfileModal.tsx` | Renders a read-only profile modal for a staff member. |
| `hr/hr_components/ManagerHrStaffTable/ManagerHrStaffTable.tsx` | Renders the paginated staff members table with inline row actions. |
| `hr/hr_components/ManagerHrTabs/ManagerHrTabs.tsx` | Renders the tabbed view switching between the Staff and Payroll tables in the HR module. |
| `hr/hr_hooks/ManagerUseManagerHrLogic.ts` | Provides UI orchestration state to the HR module hierarchy. Async data is managed in useManagerHrLogic. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
