# Superadmin Profile — Feature Map

## Purpose
Allows the superadmin to view and manage their own account: update personal info, change their password, and toggle two-factor authentication (2FA). This is the only self-service identity management surface for the superadmin role.

---

## Directory

```
profile/
├── page.tsx                          # Server Component entry point
├── loading.tsx                       # Skeleton loader
├── error.tsx                         # Route-level error boundary
├── profile_forbidden.md              # Forbidden pattern rules
├── profile_features.md               # This file
├── profile_api/
│   └── superadmin_profile_api.ts     # All API calls (fetchProfile, updateProfile, updatePassword, toggle2FA)
├── profile_types/
│   └── SuperadminProfileTypes.ts     # All TypeScript types and enums
├── profile_utils/
│   └── SuperadminProfileUrlConfig.ts # Centralized URL config (PAGES + BACKEND_API)
└── profile_components/
    ├── SuperadminProfileMain/
    │   └── SuperadminProfileMain.tsx  # Root client orchestrator — owns all state and mutation handlers
    ├── SuperadminProfileAvatarCard/
    │   └── SuperadminProfileAvatarCard.tsx  # Display-only: initials, name, email, role badge, last login, 2FA status
    ├── SuperadminProfilePersonalForm/
    │   └── SuperadminProfilePersonalForm.tsx  # RHF + Zod form: name + phone (email is read-only)
    └── SuperadminProfileSecurityForm/
        └── SuperadminProfileSecurityForm.tsx  # Password change form + 2FA toggle with password confirmation
```

---

## Feature Inventory

| Feature | Component | Status |
|---|---|---|
| View profile (name, email, role, last login, 2FA) | `SuperadminProfileAvatarCard` | ✅ |
| Edit name and phone | `SuperadminProfilePersonalForm` | ✅ |
| Read-only email field | `SuperadminProfilePersonalForm` | ✅ |
| Change password (current + new + confirm) | `SuperadminProfileSecurityForm` | ✅ |
| Eye toggle on all password fields | `SuperadminProfileSecurityForm` | ✅ |
| Enable / Disable 2FA with password confirmation | `SuperadminProfileSecurityForm` | ✅ |
| Tab navigation (Personal / Security) | `SuperadminProfileMain` | ✅ |
| Toast feedback on save/error | `SuperadminProfileMain` | ✅ |
| Skeleton loading state | `loading.tsx` | ✅ |
| Error boundary with retry | `error.tsx` | ✅ |

---

## API Contract

| Method | Endpoint | Payload | Response |
|---|---|---|---|
| `GET` | `/superadmin/profile` | — | `SuperadminProfileData` |
| `PATCH` | `/superadmin/profile` | `{ name, phone }` | `SuperadminProfileData` |
| `PATCH` | `/superadmin/profile/password` | `{ currentPassword, newPassword, confirmPassword }` | `void` |
| `PATCH` | `/superadmin/profile/2fa` | `{ enabled: boolean, password: string }` | `SuperadminProfileData` |

---

## Edge Cases

- **Dirty form guard**: Save button is disabled when `isDirty === false` on the personal form — prevents no-op API calls.
- **Password mismatch**: Zod `.refine()` on `confirmPassword` catches mismatches before submission.
- **2FA without password**: `handleToggle2FA` is a no-op if `twoFAPassword` is empty — button is also `disabled`.
- **Email immutability**: Email field is `readOnly` with `cursor-not-allowed` styling and an explanatory hint.
- **Form reset after save**: `useEffect` on `profile` prop resets the personal form to the latest server values after a successful save.
- **Password cleared after submit**: `reset()` is called immediately after `onSavePassword` to clear all password fields.

---

## Compliance Checklist

- [x] No API calls in `.tsx` files — all calls go through `superadmin_profile_api.ts`
- [x] No hardcoded URLs — all paths from `SuperadminProfileUrlConfig`
- [x] No inline styles — CSS variable tokens only
- [x] All interactive elements have `focus-visible` ring styles
- [x] Password fields have `aria-label` on eye-toggle buttons
- [x] Error messages use `role="alert"` for screen reader accessibility
- [x] Disabled states use `disabled:opacity-50 disabled:cursor-not-allowed`
- [x] `motion-safe:` prefix on all transitions and animations
