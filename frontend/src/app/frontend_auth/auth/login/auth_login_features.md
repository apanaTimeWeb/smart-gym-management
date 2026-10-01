# Auth Login Feature Map v9

## Module Purpose
The Login sub-feature is the public credential and gated-demo UI under the canonical `frontend_auth/auth/` module. It renders the Login experience without using the authenticated ERP shell and delegates credential validation, mutation lifecycle, idempotency, connectivity, and navigation to isolated hooks/API boundaries. Users can sign in, choose a permitted development demo role, toggle password visibility, recover from validation/network/route errors, and return to the public landing page. Login does not own backend business pages and must not import any sibling business module.

## Dependency Manifest
- React / Next.js App Router.
- TanStack Query via the parent Auth mutation hook.
- React Hook Form + Zod.
- `next-intl`.
- `lucide-react`.
- Parent Auth module infrastructure only: `AuthApi`, Auth constants/types/utilities, and Auth URL config.

## Feature Lifecycle Contract
Login does not create/update/delete business entities. Its lifecycle is **authenticate / establish session**, **recover/retry**, and **navigate after successful authentication**. The separate parent Auth module owns secure refresh/logout/session lifecycle routes.

## Directory Structure
| Folder/File | Responsibility |
|---|---|
| `auth_login_components/auth_login_main/` | Login page orchestration. |
| `auth_login_components/auth_login_credential_fields/` | Email/password field rendering and accessibility. |
| `auth_login_components/auth_login_demo_actions/` | Gated demo role actions. |
| `auth_login_components/auth_login_error_boundary/` | Local component error isolation and safe retry. |
| `auth_login_components/auth_login_form/` | Form view orchestration. |
| `auth_login_components/auth_login_form_error/` | Root safe error message presentation. |
| `auth_login_components/auth_login_form_footer/` | Static footer presentation from translated props. |
| `auth_login_components/auth_login_form_header_section/` | Back-to-home + branding + title/subtitle. |
| `auth_login_components/auth_login_hero_brand/` | Desktop hero logo/brand presentation. |
| `auth_login_components/auth_login_hero_content/` | Desktop hero benefits/statistics. |
| `auth_login_components/auth_login_hero_section/` | Desktop hero composition. |
| `auth_login_components/auth_login_hero_secure_status/` | Secure-status semantic success indicator. |
| `auth_login_components/auth_login_loading_skeleton/` | Structural route loading composition and split skeletons. |
| `auth_login_components/auth_login_mobile_header/` | Mobile-only brand header. |
| `auth_login_components/auth_login_submit_button/` | Stable-width async Sign In button. |
| `auth_login_constants/` | Static Login UI configuration. |
| `auth_login_hooks/` | Form, mutation, and unsaved-change orchestration. |
| `auth_login_schemas/` | Login Zod validation schema. |
| `auth_login_types/` | Login-specific type contracts. |
| `auth_login_utils/` | Safe Login error-message mapping. |
| `auth_login_locales/` | English/Hindi UI copy plus active-locale parity verification. |
| `auth_login_tests/` | Route/error/not-found behavior tests. |
| `page.tsx` | Server route entry. |
| `loading.tsx` | Route-level loading boundary. |
| `error.tsx` | Route-level error boundary. |
| `not-found.tsx` | Route-level 404 recovery. |

## Approved External Dependencies
- **Application infrastructure:** `@/lib/api`, `@/lib/logger`, `@/config/env`, `@/components/ThemeToggle`, Next.js.
- **Business feature dependencies:** None.
- **Role-level business dependencies:** None.

## Feature Inventory
| UI Feature | Route | User action | Main implementation | API / data |
|---|---|---|---|---|
| Credential Login | `/auth/login` | Enter email/password and submit | `AuthLoginForm.tsx` + `useAuthLoginForm.ts` + `useAuthLoginMutation.ts` | `POST /auth/session` |
| Password visibility | `/auth/login` | Toggle password type | `AuthLoginCredentialFields.tsx` | Local state only |
| Demo Login | `/auth/login` | Choose one role in development | `AuthLoginDemoActions.tsx` + mutation hook | `POST /auth/demo-login` |
| Validation recovery | `/auth/login` | Correct invalid fields/retry server failure | `AuthLoginForm.tsx` + form hook | Zod + `ApiResponse<T>` error envelope |
| Offline recovery | `/auth/login` | Restore connectivity and retry | `useAuthLoginForm.ts` | Browser connectivity API + normal Auth request |
| Route recovery | `/auth/login` | Retry route failure | `error.tsx` | Next.js `reset()` |
| Not-found recovery | Login 404 | Return to public landing | `not-found.tsx` | Central `AuthUrlConfig.PAGES.LANDING` |

## User Flows
### Flow 1 — Credential Login
`Login page → RHF/Zod → mutation intent fingerprint → AuthApi.login → POST /auth/session → HTTP-only cookies + sanitized user → Query reconciliation → role redirect`.

### Flow 2 — Demo Login
`Demo role button → role-only request → server private demo gate → feature fixture lookup → mutable mock session → HTTP-only cookies + sanitized user → Query reconciliation → role redirect`.

### Flow 3 — Failed Login Retry
`Submit → backend/mock failure → safe error + preserved inputs → retry → same idempotency key for unchanged intent → success or repeat failure`.

### Flow 4 — Route/Component Recovery
`Render error → safe boundary → Retry/reset → Login subtree or route rerenders without raw technical details`.

## Data and State Architecture
- Form/input/dirty state: React Hook Form in `useAuthLoginForm.ts`.
- Validation: Zod schema `AuthLoginFormSchema` built with localized messages.
- Server/async authentication state: TanStack Query `useMutation` in `useAuthLoginMutation.ts`.
- Session status query identity: canonical `AUTH_QUERY_KEYS.tokenStatus()` in `auth_constants/AuthQueryKeys.ts`; Login consumes the parent Auth registry directly and does not create a second cache namespace.
- Query-key ownership decision: no Login-specific Query registry is created because the only server-state identity consumed by Login is the parent Auth session/token-status query; creating a duplicate Login registry would violate the single-source/no-duplicate-responsibility rule.
- UI-private state: password visibility and browser connectivity state use React local state.
- Idempotency state: `useRef` in the mutation hook, keyed by normalized intent fingerprint; same intent retries reuse one key.
- URL state: not applicable because Login has no search/filter/pagination surface.
- Local storage/session storage: none for auth credentials or session tokens.
- MSW state: `AuthMockFixturesApi.ts` keeps mutable demo sessions and idempotency state inside the Auth module.


## API Contract
- `AuthApi.login(credentials, idempotencyKey)` → `POST AuthUrlConfig.PROXY_API.SESSION` → `AuthUser`.
- `AuthApi.loginDemo(role, idempotencyKey)` → `POST AuthUrlConfig.PROXY_API.DEMO_LOGIN` → `AuthUser`.
- Login does not construct URLs itself and does not access fixtures directly.

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
- Login itself is public.
- Authenticated users are redirected server-side when their secure access cookie resolves to a supported role.
- Demo action visibility is only a UX/presentation gate; the server private gate is authoritative for demo issuance.
- Tokens are never stored in React state, browser storage, or returned in browser JSON.
- No Login dependency exists on another business feature or role-level business bucket.

## Loading, Empty, and Error States
| State | Exact owner | Behavior |
|---|---|---|
| Route loading | `loading.tsx` → `AuthLoginLoadingSkeleton` | Structural skeleton; desktop hero and form have independent child skeletons. |
| Mutation loading | `AuthLoginSubmitButton.tsx`, `AuthLoginDemoActions.tsx` | Stable-width controls, Loader2 with `motion-safe:animate-spin`, disabled while pending. |
| Field validation | `AuthLoginCredentialFields.tsx` | Field error/success affordances with labels, `aria-invalid`, `aria-describedby`. |
| Offline | `useAuthLoginForm.ts` + form view | Non-blocking status region; actions disabled until connectivity returns. |
| Component failure | `AuthLoginErrorBoundary.tsx` + fallback | Local retry without raw error details. |
| Route failure | `error.tsx` | Translated safe message + `reset()`. |
| 404 | `not-found.tsx` | Branded recovery to public landing. |
| Empty | N/A | Login is not a list/data-table feature. |

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `auth_login_components/auth_login_credential_fields/AuthLoginCredentialFields.tsx` | Renders Login email/password fields and their validation affordances; it does not submit or navigate. |
| `auth_login_components/auth_login_demo_actions/AuthLoginDemoActions.tsx` | Renders development-only Login demo role actions and their pending state. |
| `auth_login_components/auth_login_error_boundary/AuthLoginErrorBoundary.tsx` | Captures client render errors inside Login and renders the module-owned retry fallback. |
| `auth_login_components/auth_login_error_boundary/AuthLoginErrorBoundaryFallback.tsx` | Renders the Login client-error fallback and retry action using module-local translations and semantic tokens. |
| `auth_login_components/auth_login_form/AuthLoginForm.tsx` | Orchestrates the Login form view; field rendering and action controls are isolated into child components while state remains hook-owned. |
| `auth_login_components/auth_login_form_error/AuthLoginFormError.tsx` | Renders a user-safe authentication-level error message associated with the Login form. |
| `auth_login_components/auth_login_form_footer/AuthLoginFormFooter.tsx` | Renders the static Login security footer copy without containing business behavior. |
| `auth_login_components/auth_login_form_header_section/AuthLoginFormHeaderSection.tsx` | Renders the Login form's navigational back link and identity heading without owning form state. |
| `auth_login_components/auth_login_hero_brand/AuthLoginHeroBrand.tsx` | Renders the desktop Login hero brand identity only. |
| `auth_login_components/auth_login_hero_content/AuthLoginHeroContent.tsx` | Renders the central Login hero product message, feature list, and stat cards. |
| `auth_login_components/auth_login_hero_section/AuthLoginHeroSection.tsx` | Composes the static desktop Login hero regions and owns only the hero container/background treatment. |
| `auth_login_components/auth_login_hero_secure_status/AuthLoginHeroSecureStatus.tsx` | Renders the desktop Login security status indicator using feature-safe semantic status tokens. |
| `auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingFormSkeleton.tsx` | Renders only the Login form-side loading skeleton, matching the production form and header geometry. |
| `auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingHeroSkeleton.tsx` | Renders only the desktop Login hero loading skeleton, matching the production hero geometry. |
| `auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingSkeleton.tsx` | Orchestrates the Login route loading state from independently repairable hero and form skeleton regions. |
| `auth_login_components/auth_login_main/AuthLoginMain.tsx` | Orchestrates the public Login visual composition and route-level client error boundaries without owning authentication business logic. |
| `auth_login_components/auth_login_mobile_header/AuthLoginMobileHeader.tsx` | Renders the mobile-only Login brand header without authentication or navigation logic. |
| `auth_login_components/auth_login_submit_button/AuthLoginSubmitButton.tsx` | Renders the Login form submit control and its asynchronous loading state. |
| `error.tsx` | Renders the safe Login route-error recovery UI and invokes the Next.js reset action. |
| `loading.tsx` | Provides the route-level Login structural loading boundary and delegates skeleton composition to the Login loading view. |
| `not-found.tsx` | Provides the branded Login not-found route boundary and exposes the documented recovery navigation. |
| `page.tsx` | Resolves the Login route server session boundary and delegates interactive rendering to the Auth/Login client feature. |

## Edge Cases and AI Warnings
- **Do not call the backend directly from Login components:** use `useAuthLoginMutation` → `AuthApi`.
- **Do not generate a new idempotency key on retry:** keep the same intent key until success/abandon/new intent.
- **Do not send demo credentials from the browser:** demo payload contains only role.
- **Do not reset credentials after an authentication error:** preserve form input so the user can correct/retry.
- **Do not trust browser identity cookies for authentication:** route/page session resolution must use the access-token authority.
- **Do not change the Login desktop boundary back to `lg:`:** the supplied design defines Desktop ≥1280px.
- **Do not hardcode UI copy in JSX:** use the Login locale namespace or translated props.
- **Do not place new Login query keys in a standalone `_query_keys/` folder:** keep the canonical registry under `auth_login_constants/` or use the parent Auth registry when sharing the same cache identity.

## Rule Compliance Checklist
- [x] Single Login `AuthLoginMain.tsx` orchestration boundary.
- [x] Module-prefixed child folders and descriptive filenames.
- [x] No relative imports/barrels/prop spreading.
- [x] RHF + Zod form boundary.
- [x] TanStack Query mutation boundary + idempotency lifecycle.
- [x] Password visibility toggle.
- [x] Structural loading/error/not-found states.
- [x] `data-testid` coverage for interactive/critical UI.
- [x] English + Hindi local locales.
- [x] Semantic theme classes only; no raw/arbitrary colors.
- [x] Motion-safe transitions/animations.
- [x] Mobile-first/≥1280 desktop breakpoint intent.
- [x] Co-located hook/component/schema/utility tests are present.
- [ ] Browser execution/build/lint/CI security integration is **NOT VERIFIED** from the module-only artifact.

## Host Dependencies / Scope Notes
- The supplied module uses `@/` imports that must resolve in the host project.
- The host must provide the global API/logger/env/theme/provider infrastructure listed in the parent Auth feature map.
- The route may redirect to host dashboard paths declared in `AuthUrlConfig`; destination modules are outside Login repair scope.
- No separate feature requirements document was supplied, so no additional Login functionality was invented.
