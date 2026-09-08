# Manager HR — Feature Map

## Module Purpose
The Manager HR module handles branch-level staff management and payroll processing. It covers
two tabs: Staff Directory (view/add/edit branch staff) and Payroll (process monthly salary
payments). Payroll processing is a financial mutation and requires `useConfirm()` double-
verification. Staff deactivation is a soft-delete only.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for tabs + table |
| `error.tsx` | Error boundary |
| `hr_components/ManagerHrMain.tsx` | Root Client Component, tab switcher |
| `hr_components/ManagerHrStaffTable.tsx` | Branch staff directory table |
| `hr_components/ManagerHrPayrollTable.tsx` | Monthly payroll records table |
| `hr_components/ManagerHrAddStaffModal.tsx` | Add new staff form |
| `hr_components/ManagerHrEditStaffModal.tsx` | Edit staff details form |
| `hr_components/ManagerHrProcessPayrollModal.tsx` | Process salary payment form |
| `hr_context/HrProvider.tsx` | Fetch state for staff + payroll |
| `hr_types/ManagerHrTypes.ts` | `StaffMember`, `PayrollRecord`, `ProcessPayrollDto` types |
| `hr_api/ManagerHrApi.ts` | API wrappers |
| `hr_utils/ManagerHrUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Staff Directory | `/manager/hr` | View branch staff | `GET /manager/hr/staff` | ✅ Live |
| Add Staff | `/manager/hr` | Register new staff member | `POST /manager/hr/staff` | ✅ Live |
| Edit Staff | `/manager/hr` | Update staff details | `PATCH /manager/hr/staff/:id` | ✅ Live |
| Deactivate Staff | `/manager/hr` | Soft-deactivate staff | `PATCH /manager/hr/staff/:id/deactivate` | ✅ Live |
| Payroll Records | `/manager/hr` | View salary payment history | `GET /manager/hr/payroll` | ✅ Live |
| Process Payroll | `/manager/hr` | Record salary payment | `POST /manager/hr/payroll` | ✅ Live |

## Data and State Architecture
- Server-state: `HrProvider` — staff list, payroll list, active tab
- Zustand stores: `useManagerHrStore` — modal open/close, selected staff
- Context providers: `HrProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/hr` → Staff tab loads by default
2. Manager clicks "Add Staff" → `ManagerHrAddStaffModal` → submit → `POST` → table refreshes
3. Manager switches to Payroll tab → payroll records load
4. Manager clicks "Process Payroll" → `ManagerHrProcessPayrollModal` → `useConfirm()` → `POST` → record added

## Component Responsibility Map
- `ManagerHrMain` — tab switcher + provider wrapper. MUST NOT contain table logic.
- `ManagerHrStaffTable` / `ManagerHrPayrollTable` — pure display, receive data as props.
- `ManagerHrProcessPayrollModal` — financial mutation, requires `useConfirm()` before submit.

## Permissions and Security
| Action | Required Role |
|---|---|
| View staff / payroll | `MANAGER` |
| Add / Edit staff | `MANAGER` |
| Process payroll | `MANAGER` — requires `useConfirm()` |
| Deactivate staff | `MANAGER` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — tab skeleton + 6-row table skeleton
- **Empty:** "No staff members" / "No payroll records" with CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Payroll is a financial mutation** — always requires `useConfirm()` before `POST`. Never allow single-click payroll processing.
- **Deactivation is soft-delete** — sets `is_active: false` via PATCH, never hard DELETE.
- **Phone masking** — staff phone numbers in table must use `maskSensitiveData()` from `@/lib/formatters`.
- **Salary amounts** — stored and transmitted as paise integers. Use `formatCurrency()` for display.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 43: Phone numbers masked in table view
- [x] Rule 71: Payroll processing + deactivation use `useConfirm()`
