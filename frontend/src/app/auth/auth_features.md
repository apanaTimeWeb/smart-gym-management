# Auth Feature Map

## Module Purpose
The Auth module is the security-sensitive authentication gateway for the ERP roles `SUPERADMIN`, `ADMIN`, `MANAGER`, and `TRAINER`. Browser code submits credentials only to the same-origin Auth session route. The server route validates the credentials, calls the configured backend endpoint, validates the backend response, writes the access/refresh session into HTTP-only cookies, and returns only sanitized user data.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `login/page.tsx` | Server Component — validates the secure user cookie and performs role-aware redirect before rendering Login UI. |
| `login/loading.tsx` | Framework loading boundary delegating to the Login skeleton component. |
| `login/error.tsx` | Framework route-segment error boundary with safe fallback and retry. |
| `login/login_components/LoginForm/` | Client View + adjacent form hook. |
| `login/login_components/LoginHeroSection/` | Static desktop branding presentation. |
| `login/login_components/LoginMobileHeader/` | Static mobile branding presentation. |
| `login/login_components/LoginErrorBoundary/` | Client render-error boundary. |
| `login/login_components/LoginLoadingSkeleton/` | Skeleton layout matching the Login route. |
| `login/login_constants/` | Login-only labels, assets, and development-demo presentation configuration. |
| `login/login_types/` | Login form/error types and Auth-owned credential contract usage. |
| `login/login_tests/` | Behavioral Login tests. |
| `session/route.ts` | Secure browser-to-server login boundary; backend tokens never return to browser JavaScript. |
| `refresh/route.ts` | Refreshes HTTP-only cookies without returning tokens. |
| `logout/route.ts` | Best-effort backend logout plus authoritative local cookie clearing. |
| `exit-ghost-login/route.ts` | Restores only a previously stashed secure session; never invents a privileged session. |
| `token/route.ts` | Safe session-status endpoint; it never returns access/refresh token values. |
| `set-cookie/route.ts` | Retired insecure token-to-cookie bridge; returns deterministic `410 Gone`. |
| `auth_api/` | Browser and server Auth API transport/error responsibilities. |
| `auth_constants/` | Auth session cookie/lifetime configuration. |
| `auth_types/` | Auth domain schemas and contracts. |
| `auth_utils/` | Canonical response, validation, cookie, and server-session resolution helpers. |
| `auth_mocks/fixtures/` | Development-only demo credentials and safe mock user profiles. |
| `auth_mocks/handlers/` | Module-owned MSW handlers for the backend Auth contract. |
| `auth_url_config.ts` | Single Auth URL configuration source. |
| `auth_utils/AuthSessionServerUtils.ts` | Server-side session identity resolution; production verifies `GET /auth/me`, while demo mode uses only the gated module fixture cookie. |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Login Form | `/auth/login` | Authenticate user and establish secure session | `POST /auth/session` → configured backend `POST /auth/login` | Implemented |
| Role Redirect | `/auth/login` | Redirect authenticated user server-side | Secure cookie read | Implemented |
| Password Toggle | `/auth/login` | Show/hide password field | Client-only | Implemented |
| Session Refresh | `/auth/refresh` | Refresh access session | Backend `POST /auth/refresh` | Implemented |
| Logout | `/auth/logout` | Revoke best-effort + clear local session | Backend `POST /auth/logout` | Implemented |
| Ghost Session Restore | `/auth/exit-ghost-login` | Restore an existing stashed session | Secure original-session cookies | Implemented without static privileged session |
| Safe Session Status | `/auth/token` | Report authentication status without secrets | Cookie inspection | Implemented; tokens never returned |
| Retired Cookie Bridge | `/auth/set-cookie` | Block legacy arbitrary token-to-cookie writes | None | Retired with `410 Gone` |

## Data and State Architecture
- Server state / mutation lifecycle: TanStack Query `useMutation` in `useLoginForm.ts`.
- Component-private state: password visibility via `useState`.
- Form state: React Hook Form using Auth-owned Zod credential schema.
- URL state: Auth URL configuration only; role redirect is server-owned.
- Zustand: not required by current Login UI because no cross-component UI state exists.
- Context: none.
- Local/session storage: none.
- Access/refresh tokens: HTTP-only secure session cookies only.
- Browser login API: same-origin `/auth/session`; browser JavaScript receives sanitized `AuthUser` data only.

## API Contract
### Browser session request
`POST /auth/session`

Request body:
```json
{ "email": "string", "password": "string" }
```

Response body:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "tenantId": "string"
  }
}
```

Error response uses the canonical `ApiResponse<T>` envelope with `data: null`, `message`, `error`, `errorCode`, `statusCode`, and `validationErrors` only for validation failures.

### Backend contract consumed server-side
`POST /auth/login` returns `data.accessToken`, `data.refreshToken`, and `data.user`. The entire backend `data` object is Zod-validated before cookies are written.

### Refresh contract
`POST /auth/refresh` consumes the HTTP-only refresh cookie. Backend tokens are used only on the server and are never included in the browser response body.

### Session identity contract
`GET /auth/me` is consumed only on the server for production session verification. Its canonical envelope contains `data: AuthUser`; the browser never receives backend token material from this verification call.

## Security and Permissions
| Action | Required Role | Frontend behavior |
|---|---|---|
| Access `/auth/login` | Public | Renders login UI unless a valid secure session is already present. |
| Access protected routes after login | Authenticated session | Login route redirects based on server-read role cookie. Backend authorization remains authoritative. |
| Demo Login buttons | Development only | Visible only when `NODE_ENV !== production` and `NEXT_PUBLIC_AUTH_DEMO_MODE=true`; server additionally requires `AUTH_DEMO_MODE=true`. |
| Ghost Session Restore | Existing stashed session | Requires all secure original-session cookies; no fallback account/token exists. |

### Sensitive data handling
- Access and refresh tokens never enter browser JavaScript through JSON responses.
- `gymsmart_token`, `gymsmart_refresh_token`, and `gymsmart_user` are HTTP-only cookies.
- SameSite policy is `strict` and production cookies are `Secure`.
- No Auth token is stored in `localStorage` or `sessionStorage`.

## UI Data Requirements
| UI Element | Required Source | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Login validation: Email | Login credential schema | `/auth/session` | request.email | No | Yes |
| Login validation: Password | Login credential schema | `/auth/session` | request.password | No | Yes |
| Server error message | `message` | `/auth/session` | `message` | No | Yes |
| Authenticated user role | `user.role` | `/auth/session` | `data.role` | No | Yes |
| Authenticated user identity | `id`, `name`, `email`, `tenantId` | `/auth/session` | `data.*` | `tenantId` optional | Yes |

## User Flows
### Normal login
`/auth/login`
→ enter credentials
→ blur/submit validation
→ `AuthApi.login`
→ `POST /auth/session`
→ backend contract validation
→ HTTP-only cookies written
→ sanitized user response
→ `router.replace(AuthUrlConfig.PAGES.LOGIN)`
→ `login/page.tsx` resolves the session server-side via `AuthSessionServerUtils`
→ role dashboard redirect

### Invalid login
Enter invalid credentials
→ schema/API validation
→ `root` form error
→ user can correct fields
→ retry submission

### Development demo login
Demo control visible only in explicitly enabled non-production demo mode
→ fills credentials from `auth_mocks/AuthMockFixtures.ts`
→ uses the exact same `AuthApi.login` path
→ server-side demo fixture creates development-only mock session
→ sanitized user response
→ same server-side role redirect path

### Logout
Current session
→ `/auth/logout`
→ best-effort backend revocation
→ local HTTP-only cookies cleared regardless of backend response
→ canonical success response

## Loading, Empty, Error States
- Route loading: `login/loading.tsx` → `LoginLoadingSkeleton` mirrors the page structure using `bg-skeleton-base` and `bg-skeleton-highlight`.
- Form submitting: button remains structurally stable and becomes disabled with loading indicator.
- Validation error: field-level message + `aria-invalid` + `aria-describedby`.
- API/authentication error: form-level alert using the server-provided message.
- Client component crash: `LoginErrorBoundary` fallback with Retry.
- Route crash: `login/error.tsx` fallback with `reset()` and safe logging.
- Empty state: N/A for the authentication form.

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global HTTP transport and canonical `ApiResponse` type.
- `@/lib/logger` — centralized logging infrastructure.
- `@/components/ThemeToggle` — zero-business UI primitive.
- TanStack Query — server mutation lifecycle.

### Business Feature Dependencies
- None.

### Role-Level Business Dependencies
- None.

The Auth module may depend on these approved global infrastructure contracts:
- `@/lib/api` for the canonical client HTTP wrapper and `ApiResponse` type.
- `@/lib/logger` for error reporting.
- `@/components/ThemeToggle` as a zero-business global UI primitive.
- TanStack Query provider in the application root.

No Auth file imports `/admin`, `/manager`, `/trainer`, or `/superadmin` business code.

## Rule Compliance Checklist
- [x] Feature-owned API, types, schemas, constants, mocks, tests, and documentation.
- [x] No cross-role business imports.
- [x] No browser-visible access/refresh token response.
- [x] No arbitrary token-to-cookie client bridge; legacy bridge retired.
- [x] Secure HTTP-only cookies with consistent SameSite policy.
- [x] Canonical API response envelope for Auth-owned routes.
- [x] Zod validation at Auth boundaries.
- [x] Login mutation lifecycle owned by TanStack Query.
- [x] Server-side role redirect ownership is centralized in `login/page.tsx`.
- [x] No hardcoded Login navigation URLs outside `auth_url_config.ts`.
- [x] Development demos use the normal Auth API path and are server-gated outside production.
- [x] Behavioral Login tests are co-located in `login/login_tests/`.
- [x] Loading uses a layout skeleton rather than a full-page spinner.
- [x] Theme uses semantic Tailwind classes only.
- [x] Focus, labels, ARIA state, and keyboard interaction are explicitly implemented.

## Component Responsibility Map
| Component | Responsibility | Auth/API ownership |
|---|---|---|
| `LoginForm.tsx` | Renders inputs, validation messages, password visibility control, submit CTA, and development-only demo buttons. | No direct API/network calls. |
| `useLoginForm.ts` | Owns React Hook Form state, Zod validation lifecycle, TanStack Query mutation lifecycle, safe error mapping, and submit/navigation orchestration. | Calls `AuthApi.login()`. |
| `LoginHeroSection.tsx` | Renders desktop-only branding, product highlights, and decorative hero imagery. | No API/network calls. |
| `LoginMobileHeader.tsx` | Renders mobile-only Login branding. | No API/network calls. |
| `LoginErrorBoundary.tsx` | Catches client render errors and exposes retry. | Logs through approved global logger. |
| `LoginLoadingSkeleton.tsx` | Mirrors the Login layout while Next.js route loading is active. | No API/network calls. |

## Edge Cases and AI Warnings
- Production session redirect MUST use `AuthSessionServerUtils.resolveUser()` so an unsigned `gymsmart_user` cookie cannot become the authentication authority.
- Development demo authentication is available only when both the client presentation flag and server `AUTH_DEMO_MODE` are explicitly enabled outside production.
- `/auth/set-cookie` is intentionally retired. Do not reintroduce a route that accepts browser-supplied access/refresh tokens and converts them into HTTP-only cookies.
- `/auth/token` is a safe status endpoint. It must never return `accessToken` or `refreshToken` in its JSON response.
- `/auth/exit-ghost-login` restores only previously stashed original-session cookies. It must never manufacture a privileged account or token.
- Backend Auth responses must remain inside the canonical `ApiResponse<T>` envelope and pass the module-owned Zod boundary before token cookies are written.
- `login/page.tsx` is a Server Component. Do not add client hooks to it or move role redirection back into `useLoginForm.ts`.
- Auth has no business dependency on `/admin`, `/manager`, `/trainer`, or `/superadmin` modules.

## Verification Requirements
- Static syntax parsing of all Auth `.ts` and `.tsx` files must pass.
- Every internal `@/app/auth/...` import must resolve to a file in this module.
- No Auth production component may contain raw hex/RGBA colors, arbitrary Tailwind values, semantic background opacity modifiers, or browser token storage.
- Security route tests must prove that session-status and refresh flows never put access/refresh token values in JSON.
- Login interaction tests must prove validation, blur behavior, password-toggle keyboard access, loading behavior, successful mutation/navigation, and failed-request feedback.
- The complete application `tsc`, production build, dependency scan, CI gates, and Playwright E2E remain project-level verification tasks when the parent application is available.

## Rule Compliance Checklist
- [x] Secure browser-to-server session boundary.
- [x] No client-generated auth tokens.
- [x] No hardcoded privileged session.
- [x] No browser-visible access/refresh token response.
- [x] Production role redirect verifies the backend session identity.
- [x] Module-owned constants, API, schemas, utilities, fixtures, handlers, tests, and docs.
- [x] No cross-role business imports.
- [x] Canonical API envelope for Auth-owned routes.
- [x] Zod validation at request/backend/session boundaries.
- [x] TanStack Query for Login mutation lifecycle.
- [x] Semantic theme token usage in Login JSX.
- [x] Motion-safe interaction states.
- [x] Form labels, required semantics, ARIA invalid/error relationships, and keyboard-accessible icon control.
- [x] Structural Login route skeleton.
- [x] Behavioral tests replaced placeholder tests.
- [x] Retired token-to-cookie bridge cannot set cookies.
