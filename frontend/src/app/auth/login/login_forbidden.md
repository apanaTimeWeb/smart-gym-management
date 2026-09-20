# Forbidden Patterns for `auth/login`

1. Do not store or return access/refresh tokens through browser JavaScript.
2. Do not call the backend auth service directly from `LoginForm.tsx`; use `AuthApi`.
3. Do not place mutation lifecycle state in Zustand or React Context.
4. Do not duplicate role dashboard redirects inside `useLoginForm.ts`.
5. Do not import `/admin`, `/manager`, `/trainer`, or `/superadmin` business modules.
6. Do not use raw colors, arbitrary Tailwind values, or semantic background opacity modifiers.
7. Do not remove `focus-visible` states or keyboard access from controls.
8. Do not use `tabIndex={-1}` to hide actionable controls from keyboard users.
9. Do not use hardcoded `/landing` or dashboard routes outside `auth_url_config.ts`.
10. Do not add client-side demo token generation. Demo sessions may run only inside the explicitly enabled non-production mock boundary.
11. Do not use toast-only error handling for Login form failures; keep the documented inline error flow.
12. Do not replace behavioral tests with render-only placeholder assertions.
