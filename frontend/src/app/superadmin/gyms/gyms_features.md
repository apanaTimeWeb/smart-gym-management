# Superadmin Gyms — Feature Map

## Module Purpose
The Superadmin Gyms module is the master registry of all gym tenants on the platform.
Superadmins can view, create, suspend, reactivate, and permanently delete gym accounts.
Each gym record links to its owner, active plan, branch count, and subscription status.
This module is the entry point for all tenant lifecycle management — onboarding starts
here and suspension/deletion is gated behind `useConfirm()` double confirmation.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 10 row placeholders |
| `error.tsx` | Error boundary with retry |
| `gyms_components/SuperadminGymsClient.tsx` | Root Client Component — table + filter bar |
| `gyms_components/SuperadminGymsTable.tsx` | Paginated table of all gyms |
| `gyms_components/SuperadminGymsTableRow.tsx` | Single gym row — name, owner, plan, status, actions |
| `gyms_components/SuperadminGymsFilterBar.tsx` | Search + status filter (ALL / ACTIVE / SUSPENDED / TRIAL) |
| `gyms_components/SuperadminGymsCreateModal.tsx` | Create new gym — owner email, gym name, plan selection |
| `gyms_components/SuperadminGymsDetailDrawer.tsx` | Slide-in drawer — full gym profile + branch list |
| `gyms_components/SuperadminGymsSuspendModal.tsx` | Suspend gym — reason input + confirmation |
| `gyms_types/SuperadminGymsTypes.ts` | `Gym`, `GymStatus`, `CreateGymDto`, `SuspendGymDto`, `GymsFilter` |
| `gyms_utils/SuperadminGymsConstants.ts` | `GYM_STATUS_STYLES`, `PLAN_BADGE_STYLES` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Gym List | `/superadmin/gyms` | Paginated list of all gyms | `GET /superadmin/gyms?page=&status=&search=` | ✅ Live |
| Create Gym | `/superadmin/gyms` | Register new gym tenant | `POST /superadmin/gyms` | ✅ Live |
| View Gym Detail | `/superadmin/gyms` | Full gym profile in drawer | `GET /superadmin/gyms/:id` | ✅ Live |
| Suspend Gym | `/superadmin/gyms` | Suspend with reason — `useConfirm()` | `PATCH /superadmin/gyms/:id/suspend` | ✅ Live |
| Reactivate Gym | `/superadmin/gyms` | Reactivate suspended gym | `PATCH /superadmin/gyms/:id/reactivate` | ✅ Live |
| Delete Gym | `/superadmin/gyms` | Permanent deletion — double confirm | `DELETE /superadmin/gyms/:id` | ✅ Live |
| Search + Filter | `/superadmin/gyms` | Filter by name/status | — (query params) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'gyms', { page, status, search }]`, `['superadmin', 'gyms', gymId]`
- Mutations: `useCreateGym`, `useSuspendGym`, `useReactivateGym`, `useDeleteGym`
- Zustand stores: None
- Context providers: None
- Local-state: `search`, `statusFilter`, `page` — local to `SuperadminGymsClient`

## User Flows
1. Superadmin opens `/superadmin/gyms` → paginated gym list loads
2. Superadmin types in search → debounced query refetch with `search` param
3. Superadmin clicks "Create Gym" → `SuperadminGymsCreateModal` → RHF + Zod → `POST` → list invalidated
4. Superadmin clicks gym row → `SuperadminGymsDetailDrawer` → `GET /superadmin/gyms/:id`
5. Superadmin clicks "Suspend" → `SuperadminGymsSuspendModal` (reason input) → `useConfirm()` → `PATCH`
6. Superadmin clicks "Delete" → `useConfirm()` double confirmation → `DELETE` → list invalidated

## Component Responsibility Map
- `SuperadminGymsClient` — filter state + pagination state. MUST NOT contain table row logic.
- `SuperadminGymsTable` — renders rows from query data. MUST NOT manage filter state.
- `SuperadminGymsTableRow` — display + action buttons. MUST NOT call mutations directly; emit events up.
- `SuperadminGymsSuspendModal` — reason form + confirmation. MUST use `useConfirm()` before mutating.
- `SuperadminGymsDetailDrawer` — read-only profile view. MUST NOT allow mutations from drawer.

## Permissions and Security
| Action | Required Role |
|---|---|
| View all gyms | `SUPERADMIN` |
| Create gym | `SUPERADMIN` |
| Suspend gym | `SUPERADMIN` |
| Reactivate gym | `SUPERADMIN` |
| Delete gym | `SUPERADMIN` |
| ❌ Access gym's internal data | Use tenant-preview module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 10 table row skeletons
- **Empty (no gyms):** "No gyms registered yet" with "Create First Gym" CTA
- **Empty (filtered):** "No gyms match your search" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Delete is permanent** — MUST use `useConfirm()` with explicit warning text "This will permanently delete all gym data". Never use `window.confirm()`.
- **Suspend requires reason** — `SuspendGymDto` requires a `reason` string; form must validate non-empty.
- **GYM_STATUS_STYLES** — maps `ACTIVE | SUSPENDED | TRIAL | EXPIRED` to badge classes; must live in constants, never inlined.
- **Search debounce** — debounce search input by 300ms before firing query to avoid excessive API calls.
- **Pagination** — page resets to 1 when search or status filter changes.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminGyms*`
- [x] Rule 7: Type isolation — all types in `SuperadminGymsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 26: Delete + Suspend use `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable gym IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
