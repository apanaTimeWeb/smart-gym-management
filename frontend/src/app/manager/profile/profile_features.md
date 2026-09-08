# Manager Profile — Feature Map

## Module Purpose
The Profile module lets managers view and update their own account information — display name, phone number, and branch assignment (read-only). They can also change their password. This is strictly self-service: a manager can only edit their own profile. They cannot view or edit other managers' profiles, and they have no access to salary or HR data from this module.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/ManagerProfileMain/` | Root client component with Personal Info and Security tabs | `ManagerProfileMain.tsx` |
| `profile_api/` | API calls for fetching and updating manager profile | `ManagerProfileApi.ts` |
| `profile_types/` | TypeScript interfaces for manager profile data and form DTOs | `ManagerProfileTypes.ts` |
| `profile_context/` | Logic hook: form state, save handlers, password change | `useManagerProfileLogic.ts` |
| `profile_utils/` | Centralized constants: tab definitions | `ManagerProfileSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| View Profile | `/manager/profile` | View name, email (read-only), phone, branch assignment | `ManagerProfileMain` | `GET /api/v1/manager/profile` | 🔧 Stub |
| Edit Profile | `/manager/profile` | Update name and phone number | `ManagerProfileMain` | `PATCH /api/v1/manager/profile` | 🔧 Stub |
| Change Password | `/manager/profile` (Security tab) | Change password with current + new + confirm, eye-toggle | `ManagerProfileMain` | `PATCH /api/v1/manager/profile/password` | 🔧 Stub |

## Edge Cases and AI Warnings
- **Email and branch are always read-only** — Never make these fields editable from the profile page.
- **No salary or HR data** — Salary details belong to `manager/hr/`. Never fetch or display them here.
- **Password fields require eye-toggle** — All three password inputs must have Eye/EyeOff visibility toggles. Rule 23.
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 23: Password visibility toggle on all password fields
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `ManagerProfileUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
