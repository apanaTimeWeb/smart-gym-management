# Admin Profile — Feature Map

## Module Purpose
The Profile module lets gym admins view and update their own account details — full name,
phone number, and password. Email cannot be changed from here (it requires Superadmin action).
The module has two tabs: Personal Info (editable fields) and Security (password change).
It is the only place in the admin module where admins modify their own identity data.
This module is strictly self-service — admins cannot view or edit other admins' profiles.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| View Profile | `/admin/profile` | See name, email (read-only), phone, role badge | — (from auth session) | ✅ Live |
| Edit Personal Info | `/admin/profile` | Update name and phone number | `PATCH /admin/profile` | ✅ Live |
| Change Password | `/admin/profile` | Change password — requires current password + confirmation | `POST /admin/profile/change-password` | ✅ Live |

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point | — |
| `loading.tsx` | Skeleton — avatar + two form sections | — |
| `error.tsx` | Module-level error boundary | — |
| `profile_components/AdminProfileMain/` | Root client orchestrator with Personal Info + Security tabs | `AdminProfileMain.tsx`, `useAdminProfileLogic.ts` (in `profile_context/`) |
| `profile_api/` | API client — `updateProfile()`, `changePassword()` | — |
| `profile_types/` | Types: `AdminProfileData`, `UpdateProfileDto`, `ChangePasswordDto` | — |
| `profile_context/` | `useAdminProfileLogic` hook — form state, save handlers | `useAdminProfileLogic.ts` |
| `profile_utils/` | Validation schemas | — |

## Edge Cases / AI Warnings
- **Email is read-only** — the input is disabled with `readOnly`. Never add an email edit field here.
- **All password inputs require Eye toggle** (Rule 23) — use `Eye`/`EyeOff` from `lucide-react`.
- **`page.tsx` is a Server Component** — no `'use client'` at the top level.
- **`useAdminProfileLogic` lives in `profile_context/`** — this is the single hook that owns all form state. Do not add `useState` directly into `AdminProfileMain`.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component — no `'use client'`
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: This document
- [x] Rule 23: Password fields have Eye toggle
- [x] Rule 40: `profile_forbidden.md` present


## User Flows & Interactions
1. Enter the `/admin/profile` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## Data and State Architecture
- Server state: TanStack Query owns API responses, loading/error state, pagination and mutation reconciliation.
- UI state: component-local state or module-scoped Zustand only for UI concerns.
- Query keys observed in source: none discovered.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminProfileApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Permissions and Security
- Required role: documented owning role for this module (`ADMIN`).
- Restricted/destructive actions must remain behind the module's existing permission/confirmation guards.
- Frontend permission checks are UI behavior only; backend authorization remains authoritative.

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

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `profile_components/AdminProfileMain/AdminProfileMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/admin_mocks/fixtures/AdminMockFixtures.ts` and `admin/admin_mocks/handlers/AdminMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.
