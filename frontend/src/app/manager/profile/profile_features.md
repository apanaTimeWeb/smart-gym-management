# Manager Profile — Feature Map

## Module Purpose
The Profile module allows a Manager to view and update their own account details (name, phone) and change their login password. It is a self-service identity module — the manager cannot change their email, role, or branch assignment here. Those are controlled by the Admin/Superadmin. This module is strictly read/write for personal info and security credentials only.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/ManagerProfileMain/` | Root client component — renders avatar card, tab switcher, personal info form, password form | `ManagerProfileMain.tsx` |
| `profile_context/` | Logic hook — form state, API calls, password validation | `useManagerProfileLogic.ts` |
| `profile_api/` | API client for GET/PATCH profile and PATCH password | `ManagerProfileApi.ts` |
| `profile_types/` | TypeScript interfaces for profile data, update payloads, tab enum | `ManagerProfileTypes.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| View Profile | `/manager/profile` | See name, email (read-only), role, branch | `ManagerProfileMain` | GET `/manager/profile` | ✅ Live |
| Edit Personal Info | `/manager/profile` (Personal tab) | Update name and phone number | `ManagerProfileMain` | PATCH `/manager/profile` | ✅ Live |
| Change Password | `/manager/profile` (Security tab) | Change login password with current password verification | `ManagerProfileMain` | PATCH `/manager/profile/password` | ✅ Live |

## Edge Cases / AI Warnings
- **Email is read-only:** The email field is always disabled. Never make it editable — email changes require superadmin action.
- **Password mismatch check is client-side only:** `useManagerProfileLogic` checks `newPassword !== confirmPassword` before calling the API. The backend still validates independently.
- **No optimistic update on profile save:** The form does not update the cookie-stored user object after save. A page refresh is needed to see the new name in the header avatar.
- **`getUser()` is called on client only:** `mounted` guard prevents SSR hydration mismatch. Never call `getUser()` outside the `mounted` check.
- **Role field is read-only:** Never allow managers to change their own role. It is display-only.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming
- [x] Rule 4: No hardcoded colors
- [x] Rule 6: Logic/UI separation via useManagerProfileLogic
- [x] Rule 7: Types in profile_types/
- [x] Rule 8: page.tsx is Server Component
- [x] Rule 9: loading.tsx + error.tsx present
- [x] Rule 11: ManagerProfileUrlConfig.ts present
- [x] Rule 23: Password visibility toggle (Eye/EyeOff)
