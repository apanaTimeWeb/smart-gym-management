# Admin HR — Feature Map

## Module Purpose
The Admin HR module manages all staff across all branches — Managers, Trainers, and Admin users.
It provides full CRUD for staff records, role assignment, and branch assignment. Payroll processing
is a Manager-level concern; Admin HR focuses on staff directory and access control. Destructive
actions (deactivate staff, revoke role) require `useConfirm()` double-verification.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for staff table |
| `error.tsx` | Error boundary |
| `hr_components/AdminHrMain.tsx` | Root Client Component, wraps `AdminHrProvider` |
| `hr_components/AdminHrTable.tsx` | Paginated staff directory table, clickable rows |
| `hr_components/AdminHrAddModal.tsx` | Add new staff member form modal |
| `hr_components/AdminHrEditModal.tsx` | Edit staff details form modal |
| `hr_components/AdminHrFilters.tsx` | Filter by role, branch, status |
| `hr_types/AdminHrTypes.ts` | `StaffMember`, `CreateStaffDto`, `UpdateStaffDto` types |
| `hr_api/AdminHrApi.ts` | API wrappers |
| `hr_utils/AdminHrUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Staff Directory | `/admin/hr` | View all staff with filters | `GET /admin/hr/staff` | ✅ Live |
| Add Staff | `/admin/hr` | Create new staff member | `POST /admin/hr/staff` | ✅ Live |
| Edit Staff | `/admin/hr` | Update role/branch/details | `PATCH /admin/hr/staff/:id` | ✅ Live |
| Deactivate Staff | `/admin/hr` | Soft-deactivate a staff member | `DELETE /admin/hr/staff/:id` | ✅ Live |
| Staff Performance | `/admin/hr/performance` | View trainers and managers metrics | `GET /admin/hr/staff/performance` | ✅ Live (Mocked) |

## Data and State Architecture
- Server-state: `AdminHrContext` — staff list, pagination, filters
- Zustand stores: `useAdminHrStore` — modal open/close state
- Context providers: `AdminHrProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Admin opens `/admin/hr` → table loads with all staff
2. Admin clicks "Add Staff" → `AdminHrAddModal` opens → form submit → `POST` → table refreshes
3. Admin clicks a staff row → `AdminHrEditModal` opens with pre-filled data
4. Admin clicks deactivate → `useConfirm()` modal → on confirm → soft DELETE → row updates status

## Component Responsibility Map
- `AdminHrMain` — layout + provider wrapper. MUST NOT contain form logic.
- `AdminHrTable` — display only, receives staff array as props. Row click opens edit modal.
- `AdminHrAddModal` / `AdminHrEditModal` — own their form state via React Hook Form + Zod.
- `AdminHrFilters` — owns filter state, dispatches to context.

## Permissions and Security
| Action | Required Role |
|---|---|
| View staff | `SUPERADMIN` |
| Add / Edit staff | `SUPERADMIN` |
| Deactivate staff | `SUPERADMIN` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8-row table skeleton
- **Empty:** "No staff members found" with "Add Staff" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Deactivation is soft-delete** — never call a hard DELETE. The API sets `is_active: false`. Staff remains in DB for audit trail.
- **Role values** — must come from the centralized `UserRole` enum in `AdminHrTypes.ts`, never raw strings like `'manager'`.
- **Phone masking** — staff phone numbers in the table must use `maskSensitiveData()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — form logic in hooks, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 43: Phone numbers masked in table view
- [x] Rule 71: Deactivation uses `useConfirm()` double-verification
