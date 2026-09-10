# Superadmin Profile — Feature Map

## Module Purpose
The Superadmin Profile module is the self-service identity management surface for the platform
operator. It allows the superadmin to update their personal information (name, phone, timezone,
language), change their account password, and toggle two-factor authentication (2FA). This is
the only place where the superadmin can manage their own credentials — it does not expose any
tenant data or platform configuration. Gym owners, managers, and trainers have zero access to
this route.

---

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/SuperadminProfileMain/` | Root client orchestrator — tab state, delegates to child forms | `SuperadminProfileMain.tsx` |
| `profile_components/SuperadminProfileAvatarCard/` | Display-only: initials, name, email, role badge, last login, 2FA status | `SuperadminProfileAvatarCard.tsx` |
| `profile_components/SuperadminProfilePersonalForm/` | RHF + Zod form for name, phone, timezone, language | `SuperadminProfilePersonalForm.tsx` |
| `profile_components/SuperadminProfileSecurityForm/` | Password change form + 2FA toggle with password confirmation | `SuperadminProfileSecurityForm.tsx` |
| `profile_api/` | All API calls for profile CRUD | `superadmin_profile_api.ts` |
| `profile_types/` | TypeScript interfaces for profile data and payloads | `SuperadminProfileTypes.ts` |
| `profile_utils/` | URL config, Zod schemas, constants, page hook | `SuperadminProfileUrlConfig.ts`, `SuperadminProfileConstants.ts`, `SuperadminProfilePersonalForm.schema.ts`, `SuperadminProfileSecurityForm.schema.ts`, `useProfilePage.ts` |

---

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Personal Info | `/superadmin/profile` | Update name, phone, timezone, language. Email is read-only. | `SuperadminProfilePersonalForm` | `PATCH /superadmin/profile` | ✅ Live |
| Change Password | `/superadmin/profile` (Security tab) | Enter current password + new password + confirm. Zod validates match. | `SuperadminProfileSecurityForm` | `PATCH /superadmin/profile/password` | ✅ Live |
| Toggle 2FA | `/superadmin/profile` (Security tab) | Enable or disable 2FA — requires current password confirmation | `SuperadminProfileSecurityForm` | `PATCH /superadmin/profile/2fa` | ✅ Live |
| Avatar Display | `/superadmin/profile` | View initials, role badge, last login timestamp, 2FA status badge | `SuperadminProfileAvatarCard` | `GET /superadmin/profile` | ✅ Live |

---

## User Flows & Interactions

### Flow 1: Update Personal Info
1. Superadmin navigates to `/superadmin/profile` — Personal tab is active by default
2. `useProfilePage.ts` fires `useQuery(['superadmin', 'profile'])` → `GET /superadmin/profile`
3. Form pre-fills with current name, phone, timezone, language via `reset()` in `useEffect`
4. Superadmin edits a field → `isDirty` becomes `true` → Save button enables
5. `useWarnIfUnsavedChanges(isDirty)` activates — guards both `beforeunload` and router navigation
6. Superadmin clicks "Save Changes" → `updatePersonalMutation.mutate(data)` fires
7. On success: `toast.success(res.message)`, query invalidated, form resets to new server values
8. On error: `toast.error(err.message)`, form preserves entered data

### Flow 2: Change Password
1. Superadmin switches to Security tab → password form renders empty
2. Fills Current Password, New Password, Confirm Password
3. Zod `.refine()` validates `newPassword === confirmPassword` before submission
4. Clicks "Update Password" → `updatePasswordMutation.mutate(values)` fires
5. On success: `toast.success(res.message)`, form resets via `reset()`
6. On error: `toast.error(err.message)`, form preserves entered data

### Flow 3: Toggle 2FA
1. Superadmin is on Security tab — sees current 2FA status badge (Enabled/Disabled)
2. Enters current password in the 2FA confirmation input
3. Clicks "Enable 2FA" or "Disable 2FA" (button is disabled until password is non-empty)
4. `toggle2FAMutation.mutate({ enabled: !profile.twoFactorEnabled, password })` fires
5. On success: `toast.success(res.message)`, query invalidated, avatar card updates status badge

---

## Data and State Architecture

- **State pattern:** TanStack Query (`useQuery` / `useMutation`) via `useProfilePage.ts` — single source of truth for all server data
- **Zustand stores:** None — no complex shared UI state needed
- **TanStack Query keys:** `['superadmin', 'profile']`
- **Mutations:** `updatePersonalMutation`, `updatePasswordMutation`, `toggle2FAMutation` — all in `useProfilePage.ts`
- **FetchState enum:** `personalState`, `passwordState`, `twoFAState` track mutation lifecycle (`'idle' | 'loading' | 'success' | 'error'`) — passed as `isSaving` booleans to child forms
- **Context providers:** None — inherits `SuperadminQueryProvider` from root layout
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured — `src/mocks/handlers/superadmin-profile.handlers.ts` (planned)

---

## API Contract

All calls go through `apiFetch` at `@/lib/api`. Response envelope: `{ success, message, data: T | null }`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchProfile()` | GET | `/superadmin/profile` | — | `SuperadminProfileData` |
| `updateProfile(dto)` | PATCH | `/superadmin/profile` | `{ name, phone, timezone?, language? }` | `SuperadminProfileData` |
| `updatePassword(dto)` | PATCH | `/superadmin/profile/password` | `{ currentPassword, newPassword, confirmPassword }` | `void` |
| `toggle2FA(dto)` | PATCH | `/superadmin/profile/2fa` | `{ enabled: boolean, password: string }` | `SuperadminProfileData` |

---

## Permissions and Security

- **Required role:** `SUPERADMIN` — enforced by `middleware.ts` checking the `gymsmart_token` HTTP-only cookie
- **Self-service only:** This module only exposes the currently authenticated superadmin's own data. There is no admin-impersonation or cross-user editing.
- **Sensitive data:** Password fields use `type="password"` with show/hide toggle. Passwords are never stored in component state beyond the form submission lifecycle.
- **2FA guard:** `toggle2FAMutation` requires the current password in the payload — backend validates before changing 2FA state.
- **Cross-role isolation:** Zero imports from `/admin`, `/manager`, `/trainer`. `profile_forbidden.md` enforces this.

---

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking avatar card + tabbed form layout | N/A | `error.tsx` — module-branded error card with "Try Again" calling `reset()` |
| Profile data | Inline skeleton in `SuperadminProfileMain` when `profileLoading === true` — avatar card ghost + form ghost | N/A | `useProfilePage` `isError` — toast shown, form renders empty |
| Save button | `Loader2` spinner + "Saving..." text while `isSaving === true`. Button disabled. | N/A | Toast error from mutation `onError` |

---

## Edge Cases and AI Warnings

- **Save button disabled when form is not dirty:** `SuperadminProfilePersonalForm` disables the submit button when `isDirty === false`. This prevents no-op API calls. Do not remove this guard.
- **Password mismatch caught by Zod before submission:** `passwordSchema` uses `.refine()` to validate `newPassword === confirmPassword`. The error appears inline below the Confirm Password field. Never add a manual comparison check in the component.
- **2FA toggle requires non-empty password:** `handleToggle2FA` is a no-op if `twoFAPassword.trim()` is empty. The button is also `disabled`. Do not remove either guard — both are required.
- **Email field is permanently read-only:** `profile.email` renders as a `readOnly` input with `cursor-not-allowed`. There is no endpoint to change the superadmin email from this panel. Never add an email field to the form schema.
- **Form resets after successful save:** `useEffect` on the `profile` prop in `SuperadminProfilePersonalForm` calls `reset()` with the latest server values after a successful mutation. This ensures `isDirty` returns to `false` and the unsaved-changes guard deactivates.
- **Password form resets immediately after submit:** `reset()` is called in `handlePasswordSubmit` right after `onSavePassword`. This clears all password fields regardless of API outcome — intentional UX to prevent re-submission of the same password.
- **`useWarnIfUnsavedChanges` guards both beforeunload and router navigation:** The hook intercepts `beforeunload`, anchor clicks, and browser back/forward via `popstate`. It does NOT intercept programmatic `router.push()` calls from within the same module — avoid navigating away programmatically while a form is dirty.

---

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `SuperadminProfileMain.tsx` | Root client orchestrator. Owns tab state. Consumes `useProfilePage`. Passes mutation callbacks and loading states to child forms. No direct API calls. |
| `SuperadminProfileAvatarCard.tsx` | Display-only. Shows initials avatar, name, email, role badge, last login timestamp, 2FA status badge. Receives `profile` as prop. No mutations. |
| `SuperadminProfilePersonalForm.tsx` | RHF + Zod form for name, phone, timezone, language. Emits `onSave(payload)` to parent. Manages `isDirty` guard via `useWarnIfUnsavedChanges`. |
| `SuperadminProfileSecurityForm.tsx` | Password change form (RHF + Zod) + 2FA toggle section. Emits `onSavePassword` and `onToggle2FA` to parent. Local state for password visibility toggles only. |
| `useProfilePage.ts` | All TanStack Query logic — `useQuery` for profile fetch, three `useMutation` hooks for personal/password/2FA updates. Returns state and mutation functions to `SuperadminProfileMain`. |
| `superadmin_profile_api.ts` | API layer — `fetchProfile`, `updateProfile`, `updatePassword`, `toggle2FA`. All calls via `apiFetch`. |
| `SuperadminProfilePersonalForm.schema.ts` | Zod schema for personal form — `personalSchema` + `PersonalFormValues` type. |
| `SuperadminProfileSecurityForm.schema.ts` | Zod schema for password form — `passwordSchema` + `PasswordFormValues` type with `.refine()` for match validation. |
| `SuperadminProfileConstants.ts` | `TIMEZONE_OPTIONS` and `LANGUAGE_OPTIONS` arrays — single source of truth for dropdown data. |

---

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling respected
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — `SuperadminProfile*` prefix on all files
- [x] Rule 3B: Centralized data — `TIMEZONE_OPTIONS`, `LANGUAGE_OPTIONS` in `SuperadminProfileConstants.ts`
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind arbitrary values in JSX
- [x] Rule 6: Logic/UI Separation — all mutations and query logic in `useProfilePage.ts`
- [x] Rule 7: Type Isolation — all types in `SuperadminProfileTypes.ts`; Zod schemas in dedicated `.schema.ts` files
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `SuperadminProfileMain` = Client
- [x] Rule 9: `loading.tsx` + `error.tsx` present with non-generic content
- [x] Rule 11: Centralized URL Config — `SuperadminProfileUrlConfig.ts` used in API layer
- [x] Rule 13: Feature Map — this document
- [x] Rule 14: Backend-driven messages — all toasts display `res.message` / `err.message`; no hardcoded strings
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 15C: Mutations use TanStack Query `useMutation` — no manual try/catch async state
- [x] Rule 26: Loading button states — `Loader2` spinner on all async actions
- [x] Rule 32: No barrel files — direct named imports only
- [x] Rule 40: `profile_forbidden.md` present
- [x] Rule 42: Network State Enum — `FetchState` enum used, not boolean flags
- [x] Rule 73: `import type` used for all type-only imports
- [x] Rule 79: Unsaved changes guard — `useWarnIfUnsavedChanges(isDirty)` on personal and security forms
- [ ] Rule 15A: Tests — `SuperadminProfileMain.test.tsx` exists; hooks and utils need co-located tests
- [ ] Rule 75: MSW handlers — not yet configured
