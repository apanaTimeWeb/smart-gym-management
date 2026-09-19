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
| `hr_components/AdminHrStaffTable.tsx` | Paginated staff directory table, clickable rows |
| `hr_components/AdminHrStaffModal.tsx` | Add new staff member form modal |
| `hr_components/AdminHrStaffModal.tsx` | Edit staff details form modal |
| `hr_components/AdminHrTabs.tsx` | Filter by role, branch, status |
| `hr_types/AdminHrTypes.ts` | `StaffMember`, `CreateStaffDto`, `UpdateStaffDto` types |
| `hr_api/AdminHrApi.ts` | API wrappers |
| `hr_url_config.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Staff Directory | `/admin/hr` | View all staff with filters | `GET /admin/hr/staff` | ✅ Live |
| Add Staff | `/admin/hr` | Create new staff member | `POST /admin/hr/staff` | ✅ Live |
| Edit Staff | `/admin/hr` | Update role/branch/details | `PATCH /admin/hr/staff/:id` | ✅ Live |
| Deactivate Staff | `/admin/hr` | Soft-deactivate a staff member | `DELETE /admin/hr/staff/:id` | ✅ Live |
| Staff Performance | `/admin/hr/performance` | View trainers and managers metrics | `GET /admin/hr/staff/performance` | ✅ Live (Mocked) |

## Data and State Architecture
- Server-state: TanStack Query in `useAdminHrLogic`; UI-only state remains in the module store
- Zustand stores: `useAdminHrStore` — modal open/close state
- Context providers: `hr_context/AdminHrContext.tsx` is retained only where the UI tree requires cross-tree wiring; it does not own server state
- Local-storage keys: None
- MSW handler: `admin/hr/hr_mocks/handlers/AdminHrMockHandlers.ts` (module-owned MSW transport)

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
| View staff | `ADMIN` |
| Add / Edit staff | `ADMIN` |
| Deactivate staff | `ADMIN` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8-row table skeleton
- **Empty:** "No staff members found" with "Add Staff" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Deactivation is represented by the module's existing delete/deactivate contract. Do not reinterpret the action as a hard-database-delete requirement in frontend code.
- **Critical payroll mutations require an idempotency key:** create payroll, update payroll, payment/status changes, salary advance and due-payment actions must reuse the same key on retry for the same confirmed intent.
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


## User Flows & Interactions
1. Enter the `/admin/hr` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `hr_api/AdminHrApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/hr_mocks/fixtures/AdminHrMockFixtures.ts` and `admin/hr/hr_mocks/handlers/AdminHrMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.


## Critical Mutation Contract
- `createPayroll`, `updatePayroll`, `updatePayrollStatus`, `giveAdvance`, and `payDue` receive an intent-scoped `Idempotency-Key`.
- Keys are created only after the confirmation step, reused for retries, and cleared after confirmed success or abandonment.
- Frontend permission checks do not replace backend authorization.
