# Auth Module — Feature Map v9

## Module Purpose
The Auth module is the Smart Gym 360 frontend boundary for public authentication and secure session lifecycle interactions. It serves unauthenticated users and the login/session shell, while keeping credential/session secrets on the server boundary and exposing only sanitized identity information to browser UI. Users can sign in with credentials, use explicitly gated development demo roles, recover from Login/loading/error/not-found states, and rely on secure session lifecycle endpoints for refresh/logout/ghost restoration. The module does not own authenticated business pages such as Members, Billing, Plans, or Reports and must not import those business implementations.

## Dependency Manifest
- Next.js App Router/server route handlers.
- React.
- TanStack Query for async mutation state.
- React Hook Form for Login form state.
- Zod for all Auth/Login request and response boundary validation.
- `next-intl` for module-local English/Hindi copy.
- `lucide-react` for icons and async loading indicators.
- MSW for module-owned browser/test mocking.
- `http-status-codes` for server HTTP status constants.

## Feature Lifecycle Contract
| Lifecycle operation | Status | Reason |
|---|---|---|
| Create | N/A | Auth does not create business entities; it creates secure sessions through login/demo-login. |
| Read | Supported | Session status/token resolution is supported through `/auth/token` and server resolution. |
| Update | Supported for session state | Refresh rotates server-owned credentials; Login changes authenticated session identity. |
| Delete | Supported for session state | Logout revokes demo/backend session best-effort and always clears local cookies. |

## Directory Structure
| Folder | Responsibility | Key files |
|---|---|---|
| `auth_api/` | Browser/Auth upstream transport boundary and API validation | `AuthApi.ts`, `AuthApiError.ts`, `AuthBackendTransport.ts`, focused API tests |
| `auth_components/auth_main/` | Parent Auth orchestration | `AuthMain.tsx`, `AuthMain.test.tsx` |
| `auth_constants/` | Static Auth config, roles, response messages, canonical query-key registry, runtime gates |
| `auth_types/` | Auth contracts and mock session types | `AuthContracts.ts`, `AuthMockTypes.ts` |
| `auth_schemas/` | Request/response/cookie Zod schemas | `AuthSchema.ts` |
| `auth_utils/` | Canonical envelope, cookie, validation, redirect, request-header, session utilities | `AuthApiResponseUtilities.ts`, `AuthCookieUtilities.ts`, `AuthIdempotencyFingerprintUtilities.ts`, `AuthRequestHeaderUtilities.ts`, `AuthRoleRedirectUtilities.ts`, `AuthSessionServerUtilities.ts`, `AuthValidationUtilities.ts` |
| `auth_mocks/auth_mock_fixtures/` | Credential-safe split and mutable demo session state | `AuthMockFixtures.ts`, `AuthMockFixturesApi.ts`, `AuthMockPublicFixtures.ts`, `AuthMockTokenConstants.ts` |
| `auth_mocks/auth_mock_handlers/` | Module-owned MSW/browser/test handler families | `AuthMockBrowserHandlers.ts`, `AuthMockBrowserScenarioHandlers.ts`, `AuthMockBackendHandlers.ts`, `AuthMockBackendLoginHandlers.ts`, `AuthMockBackendSessionHandlers.ts`, `AuthMockHandlers.ts` |
| `auth_tests/` | Security regression suites and test-only environment constant | `AuthSecurityGhostAndLegacyRoutes.test.ts`, `AuthSecuritySessionLifecycleRoutes.test.ts`, `AuthSecuritySessionStatusRoutes.test.ts`, `AuthTestEnvironmentConstants.ts` |
| `login/auth_login_components/` | Login UI presentation, split into role+module-prefixed child folders | `AuthLoginMain.tsx` and its child components/tests |
| `login/auth_login_hooks/` | Login form/mutation/unsaved-change orchestration | `useAuthLoginForm.ts`, `useAuthLoginMutation.ts`, `useAuthLoginUnsavedChangesGuard.ts` and tests |
| `login/auth_login_constants/` | Login static UI configuration | `AuthLoginConstants.ts` |
| `login/auth_login_schemas/` | Login form Zod schema | `AuthLoginFormSchema.ts` |
| `login/auth_login_types/` | Login props/state/result types | `AuthLoginTypes.ts`, `AuthLoginErrorTypes.ts` |
| `login/auth_login_utils/` | Login-specific safe error message mapping | `AuthLoginErrorMessageUtilities.ts` |
| `login/auth_login_locales/` | Module-local English/Hindi translations | `auth_login_en.json`, `auth_login_hi.json` |
| `login/auth_login_tests/` | Route/not-found/error boundary tests | `AuthLoginPage.test.tsx`, `AuthLoginNotFound.test.tsx`, `AuthLoginRouteError.test.tsx` |
| `login/auth_login_forbidden.md` | Login-specific forbidden patterns | current file |
| `login/auth_login_theme_contract.md` | Login semantic token dependency list + source conflicts | current file |
| Root route folders | Secure Auth session lifecycle route ownership | `session/route.ts`, `demo-login/route.ts`, `refresh/route.ts`, `logout/route.ts`, `token/route.ts`, `exit-ghost-login/route.ts`, `set-cookie/route.ts` |

## Approved External Dependencies
### Application infrastructure
- `@/lib/api` — canonical global API transport.
- `@/lib/logger` — centralized logging/observability.
- `@/config/env` — validated runtime environment configuration.
- `@/components/ThemeToggle` — zero-business UI primitive.
- Next.js routing/server primitives.

### Approved third-party libraries
- React / React DOM.
- TanStack Query.
- React Hook Form + `@hookform/resolvers`.
- Zod.
- `next-intl`.
- `lucide-react`.
- `http-status-codes`.
- MSW for module tests/dev mocks.

### Business feature dependencies
- **None.**

### Role-level business dependencies
- **None.**

### Host dependencies that could not be verified
The supplied ZIP does not include `package.json`, so installed versions and duplicate-dependency checks cannot be executed against the host project. v9 adds **no new NPM dependency**.


## Feature Inventory
| Route | Method | External behavior | Ownership |
|---|---|---|---|
| `/auth/session` | POST | Validates login credentials; on approved demo mode resolves module fixture; otherwise calls backend login; sets HTTP-only cookies; returns sanitized `AuthUser`. | `session/route.ts` |
| `/auth/demo-login` | POST | Validates role-only request; requires server-only development demo gate; issues a secure mock session and returns sanitized user. | `demo-login/route.ts` |
| `/auth/refresh` | POST | Reads refresh cookie, calls mock/backend refresh, validates upstream envelope, rotates cookies, never returns tokens in JSON. | `refresh/route.ts` |
| `/auth/logout` | POST | Best-effort upstream/demo revocation and unconditional local Auth cookie cleanup. | `logout/route.ts` |
| `/auth/token` | GET | Resolves current user from authoritative access session and returns `{ authenticated, user }` only. | `token/route.ts` |
| `/auth/exit-ghost-login` | POST | Restores a previously stashed original session from secure ghost cookies and consumes the stash. | `exit-ghost-login/route.ts` |
| `/auth/set-cookie` | POST | Retired compatibility route; refuses client-provided credential/cookie setting and returns `410 Gone`. | `set-cookie/route.ts` |


### Login UI inventory
- Credential Email field.
- Credential Password field with Eye/EyeOff visibility toggle.
- Primary Sign In button with stable-width async loading.
- Back to Home text link using centralized URL config.
- Development demo role actions for Superadmin/Admin/Manager/Trainer when the client-safe presentation flag allows them and the server private gate authorizes the request.
- Offline connection status.
- Safe backend/form error region.
- Mobile brand header.
- Desktop hero brand/content/secure status/stat cards.
- Route-level structural loading skeleton.
- Component and route error recovery.
- Branded Login not-found recovery.

## User Flows & Interactions
### Flow 1 — Credential Login
1. User opens `/auth/login`.
2. Server route reads the access cookie and resolves an authenticated user; authenticated supported roles redirect to their configured dashboard.
3. Otherwise `AuthMain` renders `AuthLoginMain` and the form.
4. User enters email/password; RHF + Zod validates on blur and revalidates on change.
5. Submit enters the mutation hook; the intent fingerprint controls one idempotency key.
6. `AuthApi.login()` POSTs to `/auth/session` through the approved global transport.
7. The route validates the request, performs gated mock/backend authentication, writes HTTP-only cookies, and returns sanitized `AuthUser`.
8. The client validates the response with Zod, reconciles the Auth token-status Query key from the authoritative user, resets the form, and redirects to the role dashboard.
9. Failure preserves user input and exposes only safe backend/translated messaging; retry reuses the same idempotency key for the same intent.

### Flow 2 — Development Demo Login
1. User selects one demo role.
2. The client sends `{ role }` only; no password/credential fixture is sent to the browser.
3. `/auth/demo-login` checks the server-only demo gate and resolves the role fixture.
4. A mutable mock session is issued and stored server-side.
5. HTTP-only cookies are written; sanitized user data returns.
6. The client updates Auth session query state and redirects using the same role redirect utility.

### Flow 3 — Error / Recovery
1. Validation errors render below the associated field and block submission.
2. Network/backend error maps to a safe root message and preserves entered credentials.
3. Component render failure is caught by `AuthLoginErrorBoundary` and can be retried without exposing technical details.
4. Route failure is caught by `error.tsx`, logged through the approved logger with route/module/digest/timestamp context, and retried with `reset()`.

### Flow 4 — Session Lifecycle Security
1. Refresh reads only the refresh cookie and re-validates backend/mock response.
2. Successful refresh rotates cookie material without putting tokens in JSON.
3. Logout attempts upstream/demo revocation and always clears local Auth cookies.
4. Session status resolves identity from the access-token authority, never the convenience identity cookie.
5. Ghost restore restores only the stashed original session and consumes the stash; malformed user JSON is discarded.

## Data and State Architecture
- Form/input/dirty state: React Hook Form in `useAuthLoginForm.ts`.
- Validation: Zod schema `AuthLoginFormSchema` built with localized messages.
- Server/async authentication state: TanStack Query `useMutation` in `useAuthLoginMutation.ts`.
- Session status query identity: canonical `AUTH_QUERY_KEYS.tokenStatus()` in `auth_constants/AuthQueryKeys.ts`; Login exposes a local discovery adapter in `auth_constants/AuthQueryKeys.ts` without creating a second cache namespace.
- UI-private state: password visibility and browser connectivity state use React local state.
- Idempotency state: `useRef` in the mutation hook, keyed by normalized intent fingerprint; same intent retries reuse one key.
- URL state: not applicable because Login has no search/filter/pagination surface.
- Local storage/session storage: none for auth credentials or session tokens.
- MSW state: `AuthMockFixturesApi.ts` keeps mutable demo sessions and idempotency state inside the Auth module.


## API Contract
| Client function / route | Method | URL config key | Request | Successful data |
|---|---|---|---|---|
| `AuthApi.login(credentials, idempotencyKey)` | POST | `AuthUrlConfig.PROXY_API.SESSION` | `{ email, password }` | validated `AuthUser` |
| `AuthApi.loginDemo(role, idempotencyKey)` | POST | `AuthUrlConfig.PROXY_API.DEMO_LOGIN` | `{ role }` | validated `AuthUser` |
| `/auth/session` | POST | `AuthUrlConfig.BACKEND_API.LOGIN` upstream | validated `AuthLoginCredentialsSchema` request | `ApiResponse<AuthUser \| null>` |
| `/auth/demo-login` | POST | module-owned mock session issuance | validated `AuthDemoLoginRequestSchema` | `ApiResponse<AuthUser \| null>` |
| `/auth/refresh` | POST | `AuthUrlConfig.BACKEND_API.REFRESH` | refresh cookie + optional `Idempotency-Key` | `ApiResponse<null>` |
| `/auth/logout` | POST | `AuthUrlConfig.BACKEND_API.LOGOUT` | Auth cookies + optional `Idempotency-Key` | `ApiResponse<null>` |
| `/auth/token` | GET | `AuthUrlConfig.BACKEND_API.ME` when upstream | access cookie | `ApiResponse<AuthTokenStatus>` |
| `/auth/exit-ghost-login` | POST | secure module-owned ghost cookies | no body | `ApiResponse<null>` |
| `/auth/set-cookie` | POST | retired compatibility route | no accepted credential payload | `ApiResponse<null>` error with HTTP 410 |


### Canonical response envelope
All Auth server routes use the global `ApiResponse<T>` type with `success`, `message`, `data`, optional `error`, `errorCode`, `statusCode`, `validationErrors`, and no pagination metadata on these non-list responses. Zod validation rejects success/error body-vs-HTTP status mismatches and invalid validation-error placement.

## UI Data Requirements
| UI/contract surface | Required field(s) | Source | Nullable | Mocked |
|---|---|---|---|---|
| Login redirect identity | `role` | `POST /auth/session` or `/auth/demo-login` → `data.role` | No | Yes |
| Login redirect identity | `id` | same response → `data.id` | No | Yes |
| Login form email | user input `email` | RHF form state | No | N/A |
| Login form password | user input `password` | RHF form state; never persisted | No | N/A |
| Root validation message | `message` | Auth API error envelope | Yes if malformed/fallback case | Yes |
| Field validation message | `validationErrors[].field/message` | Auth API error envelope | Yes | Yes |
| Session status | `authenticated` | `GET /auth/token` → `data.authenticated` | No | Yes |
| Session status user | `data.user.id/name/email/role/tenantId` | `GET /auth/token` → `data.user` | `user` Yes; `tenantId` Yes | Yes |
| Hero stats | static display constants | `AuthLoginConstants.HERO_STATS` | No | N/A |
| Hero feature list | static translation-key constants | `AuthLoginConstants.HERO_FEATURE_KEYS` | No | N/A |
| Demo role labels | static role/translation config | `AuthLoginConstants.DEMO_BUTTONS` | No | N/A |
| Secure status | translated copy + semantic success visual | Login locale + design token | No | N/A |
| Loading skeleton accessible status | localized label | Login locale | No | N/A |


## Permissions and Security
- **Required runtime context:** public Login is intentionally outside the authenticated ERP shell.
- **Credential flow protection:** production authentication occurs through server route handlers and the authoritative backend/session contract; browser code never handles backend access/refresh token values directly.
- **Demo protection:** real demo issuance requires the private server gate `AUTH_DEMO_MODE=true` and a non-production runtime. Public client configuration is presentation-only.
- **Role redirect protection:** only roles declared in `AuthRoleConstants` are mapped to configured dashboard destinations; unknown/unverified roles remain on Login rather than inventing a route.
- **Sensitive cookie handling:** access/refresh/user cookies use the canonical Auth cookie policy; access/refresh are HTTP-only; session status does not trust the identity cookie.
- **Cross-feature isolation:** Business Feature Dependencies — None. Role-Level Business Dependencies — None. Login must not import Members/Billing/Trainer/Superadmin business implementations.
- **CODEOWNERS:** host repository review policy could not be verified because CODEOWNERS is not present in the supplied artifact. Security-sensitive Auth files remain clearly isolated for host-level review.

## Loading, Empty, and Error States
| Surface | Loading | Empty | Error / Recovery |
|---|---|---|---|
| Login route | `login/loading.tsx` → `AuthLoginLoadingSkeleton` with independently rendered hero/form skeleton regions | N/A | `login/error.tsx` safe translated fallback + `reset()` |
| Login form mutation | `AuthLoginSubmitButton` uses `isPending`, retains control width and shows `Loader2`; demo buttons expose the same pending state | N/A | Form root error preserves entered values; retry resubmits the same intent |
| Credential fields | Disabled while mutation pending | N/A | Field-specific Zod/backend validation via `aria-describedby` / `aria-invalid` |
| Offline state | Non-blocking `isOffline` status region | N/A | Actions re-enable when browser connectivity returns |
| Component subtree | `AuthLoginErrorBoundary` isolates hero/form child errors | N/A | Local retry action re-renders failed subtree |
| Login 404 | N/A | N/A | `not-found.tsx` branded recovery link |

## Mock / MSW Contract
- Browser request path matches `/auth/session` and `/auth/demo-login` exactly.
- Browser fixtures expose no credential-bearing fields.
- Server/test fixture layer contains demo passwords and mutable session tokens.
- Mock state supports login → session lookup → refresh → logout and idempotency replay/conflict cases.
- Tests reset mutable state to avoid order dependence.
- Backend mode uses the same API route contract; MSW is for dev/test/frontend-first execution only.

## Edge Cases and AI Warnings
- **Never move credential-bearing fixtures into browser code:** `AuthMockFixtures.ts` may contain passwords for server/test-only flows; browser MSW must use `AuthMockPublicFixtures.ts` and sanitized users only.
- **Never create a second Auth URL registry:** all Auth page/backend paths are canonicalized in `auth_url_config.ts`. Do not recreate route constants in API files, components, or tests.
- **Never treat the user identity cookie as authentication authority:** `AuthSessionServerUtilities.resolveUser()` validates the access token/session boundary. The unsigned/sanitized identity cookie is convenience data only.
- **Never return access/refresh tokens from browser JSON:** session, token-status, and refresh routes must keep token material in HTTP-only cookies; tests explicitly guard this contract.
- **Never weaken the demo gate:** client presentation availability and server authorization are separate. The client flag only controls presentation; the private server gate controls actual demo session issuance.
- **Never regenerate an idempotency key during retry:** the current intent fingerprint determines the stable key. A changed credential/role intent requires a new key.
- **Never import another feature's business code or fixtures:** Auth and Login must remain portable without sibling business modules.
- **Never reintroduce standalone query-key folders:** query-key registries belong under the owning module `_constants/` or `_api/` according to the architecture rule.
- **Never move Login desktop breakpoint back to `lg:` without an explicit source change:** the supplied design defines Desktop as ≥1280px, so `xl:` is the current boundary.
- **Never invent list/table requirements for Login:** this feature has no table, chart, KPI, pagination, export, drag/drop, or currency UI in supplied evidence. Mark those families N/A rather than adding scope.


## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `auth_components/auth_main/AuthMain.tsx` | Orchestrates the public Auth feature surface and delegates each auth sub-feature to its own presentation boundary. |
| `login/auth_login_components/auth_login_credential_fields/AuthLoginCredentialFields.tsx` | Renders Login email/password fields and their validation affordances; it does not submit or navigate. |
| `login/auth_login_components/auth_login_demo_actions/AuthLoginDemoActions.tsx` | Renders development-only Login demo role actions and their pending state. |
| `login/auth_login_components/auth_login_error_boundary/AuthLoginErrorBoundary.tsx` | Captures client render errors inside Login and renders the module-owned retry fallback. |
| `login/auth_login_components/auth_login_error_boundary/AuthLoginErrorBoundaryFallback.tsx` | Renders the Login client-error fallback and retry action using module-local translations and semantic tokens. |
| `login/auth_login_components/auth_login_form/AuthLoginForm.tsx` | Orchestrates the Login form view; field rendering and action controls are isolated into child components while state remains hook-owned. |
| `login/auth_login_components/auth_login_form_error/AuthLoginFormError.tsx` | Renders a user-safe authentication-level error message associated with the Login form. |
| `login/auth_login_components/auth_login_form_footer/AuthLoginFormFooter.tsx` | Renders the static Login security footer copy without containing business behavior. |
| `login/auth_login_components/auth_login_form_header_section/AuthLoginFormHeaderSection.tsx` | Renders the Login form's navigational back link and identity heading without owning form state. |
| `login/auth_login_components/auth_login_hero_brand/AuthLoginHeroBrand.tsx` | Renders the desktop Login hero brand identity only. |
| `login/auth_login_components/auth_login_hero_content/AuthLoginHeroContent.tsx` | Renders the central Login hero product message, feature list, and stat cards. |
| `login/auth_login_components/auth_login_hero_section/AuthLoginHeroSection.tsx` | Composes the static desktop Login hero regions and owns only the hero container/background treatment. |
| `login/auth_login_components/auth_login_hero_secure_status/AuthLoginHeroSecureStatus.tsx` | Renders the desktop Login security status indicator using feature-safe semantic status tokens. |
| `login/auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingFormSkeleton.tsx` | Renders only the Login form-side loading skeleton, matching the production form and header geometry. |
| `login/auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingHeroSkeleton.tsx` | Renders only the desktop Login hero loading skeleton, matching the production hero geometry. |
| `login/auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingSkeleton.tsx` | Orchestrates the Login route loading state from independently repairable hero and form skeleton regions. |
| `login/auth_login_components/auth_login_main/AuthLoginMain.tsx` | Orchestrates the public Login visual composition and route-level client error boundaries without owning authentication business logic. |
| `login/auth_login_components/auth_login_mobile_header/AuthLoginMobileHeader.tsx` | Renders the mobile-only Login brand header without authentication or navigation logic. |
| `login/auth_login_components/auth_login_submit_button/AuthLoginSubmitButton.tsx` | Renders the Login form submit control and its asynchronous loading state. |
| `login/error.tsx` | Renders the safe Login route-error recovery UI and invokes the Next.js reset action. |
| `login/loading.tsx` | Provides the route-level Login structural loading boundary and delegates skeleton composition to the Login loading view. |
| `login/not-found.tsx` | Provides the branded Login not-found route boundary and exposes the documented recovery navigation. |
| `login/page.tsx` | Resolves the Login route server session boundary and delegates interactive rendering to the Auth/Login client feature. |

## Rule Compliance Checklist
- [x] Module-prefixed feature structure and file-size ceilings verified statically.
- [x] Canonical Auth module and strict root quarantine verified.
- [x] Root `auth_url_config.ts` is the only Auth URL config.
- [x] No barrel/facade files or relative imports; module root remains quarantined to the canonical reserved route/config/docs set.
- [x] No sibling business-feature imports.
- [x] Server/client boundary is explicit.
- [x] Login form uses React Hook Form + Zod.
- [x] TanStack Query owns mutation state; no parallel `isLoading` enum.
- [x] Mutating browser Auth API calls require idempotency keys and retry reuse is tested.
- [x] Auth response envelopes are Zod-validated and use canonical `ApiResponse<T>` shape.
- [x] HTTP numeric status codes are sourced from `http-status-codes` in server code.
- [x] Production source contains no `any`, TS ignore, console.log, arbitrary theme values, inline style, semantic background opacity modifiers, or prop spreading.
- [x] Login includes structural loading skeleton, route error boundary, component error boundary, not-found, offline, validation, and async button states.
- [x] Interactive Login controls carry `data-testid` values.
- [x] Auth cookies are server-owned/HTTP-only; token route never returns secret material.
- [x] Module-owned MSW fixtures/handlers and mutable session behavior are present with security tests.
- [x] English/Hindi module-local locales are present.
- [x] Responsive desktop threshold aligns to documented ≥1280px design intent.
- [ ] Full host TypeScript/lint/test/build/security/browser/provider verification — **NOT VERIFIED** because required host tooling/configuration is absent from the supplied module archive.


## Host Integration Constraints
- Copy the `frontend_auth/auth/` module into the host `src/app/frontend_auth/auth/` location so its canonical Next.js route segments remain owned by the module.
- Keep `login/` route ownership intact; do not mirror the Login route elsewhere.
- Provide the global `@/lib/api`, `@/lib/logger`, and `@/config/env` contracts expected by this module.
- Ensure host Tailwind/theme config exposes the semantic classes consumed by Login and its theme contract.
- Ensure module-local `next-intl` locales are included in the host translation loading mechanism.
- Provide `/logo.png` and `/gym-hero.jpg` as public assets when the supplied Login design is enabled.
- Run host-level typecheck/lint/test/build/security gates before merge; these cannot be executed from the supplied module-only archive.

## v9 Repair Notes
- Auth URL config is now at the canonical module root: `auth/auth_url_config.ts`.
- Auth and Login query-key registries now live under `_constants/` rather than standalone `_query_keys/` folders.
- Three test syntax blockers were removed.
- Login Playwright URL-config import was updated to the canonical location.
- Type-only imports were corrected.
- Unused imports/dead helper were removed.
- Login desktop breakpoint was aligned to the design's ≥1280px desktop definition using `xl:`.
- Existing v7 functional/security behavior was preserved outside these documented repairs.
