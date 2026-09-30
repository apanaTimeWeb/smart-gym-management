# Auth Login — Feature Map

## Module Purpose
`/auth/login` is the public authentication entry point. It renders the Login view, validates credentials through module-owned Zod/RHF contracts, calls the Auth API client, shows safe loading/error states, and redirects from the sanitized AuthUser role.

## Owned Structure
```text
login/
├── _locales/en.json
├── _locales/hi.json
├── auth_login_components/
│   ├── AuthLoginErrorBoundary/
│   ├── AuthLoginForm/
│   ├── AuthLoginHeroSection/
│   ├── AuthLoginLoadingSkeleton/
│   └── AuthLoginMobileHeader/
├── auth_login_constants/AuthLoginSharedConstants.ts
├── auth_login_schemas/AuthLoginFormSchema.ts
├── auth_login_types/AuthLoginTypes.ts
├── auth_login_types/AuthLoginErrorTypes.ts
├── auth_login_features.md
├── auth_login_forbidden.md
├── auth_login_theme_contract.md
├── page.tsx
├── loading.tsx
├── error.tsx
└── error.test.tsx
```

## Expected UI Inventory
- Back to Home link.
- Desktop product hero, branding, feature list, KPI-style presentation stats, and secure-status indicator.
- Mobile brand header.
- Email input with inline validation.
- Password input with Lucide visibility toggle and inline validation.
- Primary Sign In button with stable loading state.
- Development demo role buttons only when the documented non-production gate is enabled.
- Demo buttons expose an explicit loading/busy state while the corresponding mutation is pending.
- Route-level and component-level error recovery.
- Structural route skeleton with reduced-motion-safe animation.

## Complete Login Flow
`/auth/login` → user input → RHF/Zod validation → `AuthApi.login()` or `AuthApi.loginDemo()` → same-origin Auth route → canonical response validation → HTTP-only session cookies → sanitized `AuthUser` → role dashboard route.

## Demo Flow
`AuthLoginSharedConstants.DEMO_BUTTONS` contains roles only; demo credentials remain server-owned in `auth_mocks/fixtures/AuthMockFixtures.ts`. Browser-safe identity data used by MSW is owned once by `auth_mocks/fixtures/AuthMockPublicFixtures.ts`. The client calls `/auth/demo-login` with a role and never receives fixture credentials.

## UI Data Requirements
The Login UI is not a list/entity-management surface, so table/search/filter/sort/pagination data contracts are not applicable. The dynamic server-derived values used by the Login UI are limited to the sanitized `AuthUser` response and canonical error-envelope fields.

| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Credential Login redirect | `id`, `name`, `email`, `role` | `POST /auth/session` | `data` | No on success | Yes |
| Demo Login redirect | `id`, `name`, `email`, `role` | `POST /auth/demo-login` | `data` | No on success | Yes |
| Role-aware dashboard redirect | `role` | `POST /auth/session` or `POST /auth/demo-login` | `data.role` | No on success | Yes |
| Server-level error state | `message`, optional `errorCode`, optional `validationErrors` | Auth session route | response envelope root | Optional fields per contract | Yes |

Browser-facing MSW stores only sanitized identities in `AuthMockPublicFixtures.ts`; credential passwords and mutable session/token state remain server/test-only.

## State Ownership
- React Hook Form: credential fields and validation state.
- TanStack Query: Login mutation lifecycle.
- Local React state: password visibility only.
- Ref: idempotency key/fingerprint for the current Login intent.
- `pendingDemoRole` is derived from TanStack Query mutation state and variables; no parallel network-state enum is introduced.
- No browser storage and no feature business state in Context/Zustand.

## Interaction Contract
- `auth-login-form-back-to-home` navigates to `AuthUrlConfig.PAGES.LANDING`.
- `auth-login-form-email` and `auth-login-form-password` are labeled and validated.
- `auth-login-form-password-toggle` changes password visibility only.
- `auth-login-form-submit` triggers credential mutation and exposes a stable loading state.
- `auth-login-form-demo-{role}` triggers the role demo mutation and exposes a role-specific loading state while preserving button width.
- `auth-login-form-error` exposes the safe server/client form error.
- `auth-login-route-error-retry` and `auth-login-error-boundary-retry` invoke the appropriate Next.js/component reset path.

## Design Contract
- Auth route does not use the authenticated ERP shell.
- Semantic Smart Gym 360 tokens only.
- Primary CTA uses `bg-primary text-on-primary`.
- Inputs use `bg-input`, `border-border`, `border-focus`, `ring-primary`.
- All transitions/animations use motion-safe variants.
- Loading route uses structural skeletons.
- Mobile remains usable at narrow widths.

## Test Contract
- `AuthLoginForm.test.tsx`: validation, blur validation, password toggle, credential loading, success redirect, retry idempotency, demo visibility, demo loading, safe error message.
- `useAuthLoginForm.test.tsx`: mutation lifecycle, retry key reuse, demo API path, backend field-error mapping.
- `AuthLoginFormSchema.test.ts`: validation rules and translated messages.
- `AuthApi.test.ts`: canonical response validation and backend field-error preservation.
- `AuthLoginErrorBoundary.test.tsx`: rendered-error recovery.
- `AuthLoginLoadingSkeleton.test.tsx`: structural loading state and motion-safe highlight animation.
- `error.test.tsx`: route error retry.

## AI-Testable IDs
All Login interactive/critical states use `auth-login-*` test IDs. The host-supplied global `ThemeToggle` remains an external infrastructure dependency; its own internal `data-testid` contract is outside this module artifact and must be verified at integration time.

## Host Asset Dependency
This feature references `/logo.png` and `/gym-hero.jpg` from `AuthLoginSharedConstants.ASSETS`. The files were not present in the supplied artifact and therefore were not fabricated during repair.

## AI Repair Notes
- Keep UI in component files and complex orchestration in `useAuthLoginForm.ts`.
- Keep static Login presentation configuration in `AuthLoginSharedConstants.ts`.
- Keep all API URLs in `auth_url_config.ts`.
- Keep server credentials and mutable session mock state in Auth mock fixtures/handlers only.
- Do not add a table/search/filter/pagination architecture that the Login requirements do not call for.
