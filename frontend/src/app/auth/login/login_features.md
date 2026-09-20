# Login — Feature Map

## Module Purpose
`/auth/login` is the public authentication entry point for the supported ERP roles. The Login feature collects email/password credentials, validates them, submits them through the Auth API client to `/auth/session`, and relies on the Auth server route to establish the secure session. Role-based redirect remains server-owned by `login/page.tsx`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — reads secure session cookies and redirects authenticated users. |
| `loading.tsx` | Framework loading boundary. |
| `error.tsx` | Framework route-segment error boundary. |
| `login_components/LoginForm/LoginForm.tsx` | Client View only. |
| `login_components/LoginForm/useLoginForm.ts` | Form interaction and TanStack Query mutation logic. |
| `login_components/LoginHeroSection/LoginHeroSection.tsx` | Static desktop branding presentation. |
| `login_components/LoginMobileHeader/LoginMobileHeader.tsx` | Static mobile branding presentation. |
| `login_components/LoginErrorBoundary/LoginErrorBoundary.tsx` | Client component error boundary. |
| `login_components/LoginLoadingSkeleton/LoginLoadingSkeleton.tsx` | Skeleton layout for route loading. |
| `login_constants/LoginSharedConstants.ts` | Static Login copy, assets, and demo presentation settings. |
| `login_types/login_types.ts` | Login form types and schema alias. |
| `login_types/LoginErrorTypes.ts` | Error boundary prop/state types. |
| `login_tests/LoginFormBehavior.test.tsx` | Behavioral form tests covering validation, keyboard behavior, loading, success, and error outcomes. |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Login form | `/auth/login` | Enter credentials and sign in | `POST /auth/session` | Implemented |
| Password visibility | `/auth/login` | Show/hide password | Client-only | Implemented |
| Development demo login | `/auth/login` | Select a demo role when explicitly enabled outside production | `POST /auth/session` | Implemented; server-gated |
| Authenticated redirect | `/auth/login` | Reach the role dashboard after session creation | Secure cookie read | Implemented |

## Data and State Architecture
- Form state: React Hook Form.
- Validation: Auth-owned Zod schema with `onBlur` validation.
- Server-state mutation: TanStack Query `useMutation`.
- Query key: None; Login is a mutation-only feature.
- Component-private state: `showPassword` only.
- Zustand: None required.
- React Context: None required.
- Browser storage: None.

## User Flows
### Flow 1: Normal Login
1. User enters email and password.
2. Blur/submit validation runs through `LoginSchema`.
3. `useLoginForm` invokes `AuthApi.login()`.
4. `AuthApi.login()` calls `POST /auth/session` through the global API transport.
5. The server route validates the request and backend response, then writes HTTP-only cookies.
6. Browser receives only sanitized user data.
7. `router.replace(AuthUrlConfig.PAGES.LOGIN)` returns to the Login Server Component.
8. `login/page.tsx` reads the secure user cookie and performs the role dashboard redirect.

### Flow 2: Invalid Credentials
1. User submits credentials.
2. Schema validation passes.
3. Server/Auth API returns a canonical error response.
4. `useLoginForm` maps the safe `message` to the form root error.
5. Entered credentials remain available for correction and retry.

### Flow 3: Development Demo Login
1. Demo controls appear only when `NODE_ENV !== production` and `NEXT_PUBLIC_AUTH_DEMO_MODE=true`.
2. The selected demo profile is read from `auth_mocks/AuthMockFixtures.ts`.
3. Credentials follow the exact same `AuthApi.login()` path as normal login.
4. The server session route additionally requires `AUTH_DEMO_MODE=true` and non-production execution.
5. Mock session cookies are created only in this development path.
6. The same server-side role redirect flow is used.

## Permissions and Security
- Login page access: Public.
- Authenticated session redirect: server-side only.
- Browser code never receives access or refresh token values.
- `gymsmart_token`, `gymsmart_refresh_token`, and `gymsmart_user` are HTTP-only.
- There is no `localStorage`/`sessionStorage` token path.
- No role-specific business module import exists inside Login.

## Loading, Error, and Empty States
- Loading: `LoginLoadingSkeleton` mirrors the Login page structure.
- Submission: button remains usable in a stable layout but is disabled while mutation is pending.
- Field validation: field-specific error with `aria-invalid` and `aria-describedby`.
- Server/authentication failure: form-level alert with server-provided safe `message`.
- Client render failure: `LoginErrorBoundary` with retry.
- Route failure: `error.tsx` with `reset()`.
- Empty state: Not applicable; Login is not a record-list UI.

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — canonical HTTP transport and `ApiResponse` type.
- `@/lib/logger` — application logging.
- `@/components/ThemeToggle` — zero-business UI primitive.
- TanStack Query — server mutation state.

### Business Feature Dependencies
- None.

### Role-Level Business Dependencies
- None.

## AI Repair Rules
- `login/page.tsx` owns authenticated-role redirect behavior.
- `useLoginForm.ts` owns mutation orchestration, not JSX.
- `LoginForm.tsx` owns presentation only.
- Demo credentials remain module-owned mock data and never become production session material.
- Do not restore `/auth/set-cookie` as a direct token writer.
- Do not make `/auth/token` return raw token values.

## UI Data Requirements
| UI Element | Required Source | Endpoint/Source Path | Nullable? | Notes |
|---|---|---|---|---|
| Email input value | React Hook Form `LoginFormData.email` | Login form state | No | Validated by `LoginSchema`. |
| Password input value | React Hook Form `LoginFormData.password` | Login form state | No | Validated by `LoginSchema`. |
| Field validation messages | Zod issues | Login schema errors | No when invalid | Connected through `aria-describedby`. |
| Server authentication error | Canonical `message` | `POST /auth/session` response | No on error | Rendered as a form-level alert. |
| Authenticated role | `AuthUser.role` | `POST /auth/session` response `data.role` | No | Used by server-side redirect after session creation. |
| Authenticated identity | `AuthUser.id`, `name`, `email`, optional `tenantId` | `POST /auth/session` response `data.*` | `tenantId` optional | Never contains access/refresh tokens in browser response. |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — canonical browser HTTP transport and `ApiResponse` contract.
- `@/lib/logger` — approved error logging infrastructure.
- `@/components/ThemeToggle` — zero-business visual primitive.
- TanStack Query — mutation lifecycle for the Login request.
- Next.js `next/image`, `next/link`, `next/navigation`, and `next/headers` — framework infrastructure.

### Business Feature Dependencies
- None.

### Role-Level Business Dependencies
- None.

## Component Responsibility Map
| File | Responsibility | Forbidden responsibility |
|---|---|---|
| `LoginForm.tsx` | Render the Login UI and invoke hook actions. | Direct backend/network calls or role redirect logic. |
| `useLoginForm.ts` | Own RHF/Zod state, TanStack Query mutation lifecycle, safe error state, and submit orchestration. | JSX-heavy rendering or direct dashboard-route selection. |
| `LoginFormSchema.ts` | Export the credential schema used by Login form validation. | Network requests or UI rendering. |
| `login_types.ts` | Define Login form/hook types only. | Schema declarations or API calls. |
| `LoginHeroSection.tsx` | Render desktop branding/product presentation. | Authentication/session logic. |
| `LoginMobileHeader.tsx` | Render mobile branding. | Authentication/session logic. |
| `LoginErrorBoundary.tsx` | Catch client render failures and retry. | Token/session mutation. |
| `LoginLoadingSkeleton.tsx` | Render route-loading skeleton geometry. | Authentication/session logic. |

## Edge Cases and AI Warnings
- Do not bypass `AuthApi.login()` from `LoginForm.tsx`.
- Do not call dashboard routes from `useLoginForm.ts`; Login returns to `AuthUrlConfig.PAGES.LOGIN` and lets the server route determine the dashboard.
- Do not put access or refresh tokens in browser state, storage, query parameters, or response UI.
- Do not enable demo controls in production, even if a developer accidentally sets the public presentation flag.
- Do not replace the form-level API error with a success toast when the session request fails.
- Keep the password visibility control keyboard accessible and at least the documented touch target.
- Keep the Login route outside the authenticated ERP shell; Auth pages are explicitly excluded from that shell.

## Verification Requirements
- Form invalid submit shows both validation messages and blocks `AuthApi.login()`.
- Email invalidity is also visible after blur, not only after submit.
- Password visibility toggles by keyboard-accessible button and does not submit the form.
- Pending mutation shows the stable `Signing in…` action and prevents duplicate submission.
- Successful mutation calls `router.replace(AuthUrlConfig.PAGES.LOGIN)` so server-side redirect ownership remains centralized.
- Failed mutation preserves user input and exposes the safe API message through an accessible alert.
