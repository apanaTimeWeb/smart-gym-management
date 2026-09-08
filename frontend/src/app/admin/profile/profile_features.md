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
