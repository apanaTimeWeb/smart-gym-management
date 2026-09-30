# Auth Module Feature Map

## Module Purpose
Provides the public Auth surface and secure server-side session gateway for Login, logout, refresh, session status, ghost-session restoration, and development-only demo authentication. Browser JavaScript receives sanitized identity data only; session credentials remain in HTTP-only cookies.

## AI Repair Boundary
Default repair boundary is this `auth/` module. A Login-only defect should normally use `auth/login/` as the AI context. Global application infrastructure may be inspected only when the documented dependency is genuinely required.

## Owned Structure
```text
auth/
├── auth_api/
├── auth_constants/
├── auth_mocks/
│   ├── fixtures/
│   └── handlers/
├── auth_tests/
├── auth_types/
├── auth_utils/
├── login/
│   ├── _locales/{en.json,hi.json}
│   ├── auth_login_components/
│   ├── auth_login_constants/
│   ├── auth_login_schemas/
│   ├── auth_login_types/
│   ├── auth_login_features.md
│   ├── auth_login_forbidden.md
│   ├── auth_login_theme_contract.md
│   ├── error.tsx
│   ├── loading.tsx
│   └── page.tsx
├── demo-login/route.ts
├── exit-ghost-login/route.ts
├── logout/route.ts
├── refresh/route.ts
├── session/route.ts
├── set-cookie/route.ts
└── token/route.ts
```

## Feature Inventory
- `/auth/login`: public login page with credential submission and gated development demo role buttons.
- `/auth/session`: secure credential gateway; validates the request, authenticates against backend or gated mock session, sets HTTP-only cookies, returns sanitized user.
- `/auth/demo-login`: server-only role-based demo gateway; no demo passwords enter the browser.
- `/auth/refresh`: rotates session credentials into HTTP-only cookies without exposing tokens in JSON.
- `/auth/logout`: best-effort upstream logout plus unconditional local cookie cleanup.
- `/auth/token`: safe authenticated-session status with sanitized user only.
- `/auth/exit-ghost-login`: restores a stashed original session and consumes its stash.
- `/auth/set-cookie`: retired compatibility endpoint; client-supplied session credentials are refused.

## UI Data Requirements
| UI/route | Field | Source | Response path | Nullable | Mocked |
|---|---|---|---|---|---|
| Login redirect | `id` | `POST /auth/session` | `data.id` | No | Yes |
| Login redirect | `role` | `POST /auth/session` | `data.role` | No | Yes |
| Login server resolution | `id,name,email,role,tenantId` | HTTP-only access cookie + session resolver | validated `AuthUser` | `tenantId` Yes | Yes in gated demo |
| Session status | `authenticated` | `GET /auth/token` | `data.authenticated` | No | Yes |
| Session status | `user` | `GET /auth/token` | `data.user` | Yes | Yes |

## API Contract
All browser-facing Auth responses use the canonical application `ApiResponse<T>` envelope through `AuthApiResponseUtils`. Backend login/refresh envelopes are validated with module-owned Zod schemas before credentials or identities are consumed.

### Module API Client Functions
| Function | Method | Endpoint | Request | Response | Mutation/Query | Idempotency |
|---|---|---|---|---|---|---|
| `AuthApi.login(credentials, idempotencyKey)` | POST | `AuthUrlConfig.PROXY_API.SESSION` (`/auth/session`) | `{ email, password }` | `AuthUser` via `AuthSessionResponseSchema` | Mutation | Required |
| `AuthApi.loginDemo(role, idempotencyKey)` | POST | `AuthUrlConfig.PROXY_API.DEMO_LOGIN` (`/auth/demo-login`) | `{ role }` | `AuthUser` via `AuthSessionResponseSchema` | Mutation | Required |

### Server Route Contract
| Route | Method | Downstream | Response contract |
|---|---|---|---|
| `/auth/session` | POST | `AuthUrlConfig.BACKEND_API.LOGIN` (`/auth/login`) or gated server mock | `ApiResponse<AuthUser \| null>` |
| `/auth/demo-login` | POST | gated server-owned demo fixture/session issuance | `ApiResponse<AuthUser \| null>` |
| `/auth/refresh` | POST | `AuthUrlConfig.BACKEND_API.REFRESH` (`/auth/refresh`) or gated server mock | `ApiResponse<null>` |
| `/auth/logout` | POST | `AuthUrlConfig.BACKEND_API.LOGOUT` (`/auth/logout`) or best-effort mock | `ApiResponse<null>` |
| `/auth/token` | GET | `AuthUrlConfig.BACKEND_API.ME` (`/auth/me`) or mock | `ApiResponse<AuthTokenStatus>` |
| `/auth/exit-ghost-login` | POST | module-owned secure ghost-session state | `ApiResponse<AuthUser \| null>` |
| `/auth/set-cookie` | POST | retired compatibility route | `410 Gone` canonical error envelope |

### Response Contract Integrity
- Success responses require `success=true`, `message`, `data`, and omit `statusCode`.
- Error responses require `success=false`, `message`, `data=null`, and `statusCode` matching the HTTP response status.
- `validationErrors` is accepted only with `400 Bad Request`.
- Auth non-paginated responses reject `meta` because Auth has no list endpoint.
- Browser API parsing rejects malformed or HTTP/body success-status mismatches before UI consumption.

## State Architecture
- Auth Login uses React Hook Form + Zod for form state/validation.
- TanStack Query owns login mutation lifecycle and network status.
- No API data is stored in Context or Zustand.
- Password visibility is component-local state.
- Idempotency key/fingerprint is held in a ref for the current intent and reused for retries.

## Permissions / Security
- Auth pages do not use the authenticated ERP shell.
- Production session identity is verified from the access token; the user identity cookie is not an authentication authority.
- Access and refresh tokens are HTTP-only cookie material and are never returned in browser JSON responses.
- Demo server authentication is enabled only when runtime is non-production and private `AUTH_DEMO_MODE=true`.
- Backend authorization remains authoritative; frontend guards never replace backend authorization.

## Mock Ownership
- `auth_mocks/fixtures/AuthMockFixtures.ts` owns credential-bearing demo fixtures and mutable session issuance.
- `auth_mocks/fixtures/AuthMockPublicFixtures.ts` owns the single browser-safe demo identity source of truth.
- `auth_mocks/handlers/AuthMockBrowserHandlers.ts` owns browser-facing MSW proxy handlers and imports browser-safe identities only.
- `auth_mocks/handlers/AuthMockBackendHandlers.ts` owns server/test-only upstream backend handlers and credential-bearing fixture access.
- `auth_mocks/handlers/AuthMockHandlers.ts` is a test-only aggregate; it must not be registered by the browser MSW worker.
- `AuthMockHandlersTestApi` is test-only reset/seed support for deterministic mutable mock state.
- Feature mock data must not move to global mock folders or unrelated modules.

## External Application Dependencies
- `@/lib/api`: approved global API transport.
- `@/lib/logger`: approved global logging infrastructure.
- `@/config/env`: approved global runtime environment validation.
- `@/components/ThemeToggle`: approved zero-business UI primitive.
- Next.js routing/runtime, TanStack Query, React Hook Form, Zod, next-intl, lucide-react, MSW, http-status-codes.

## Host Integration Requirements
- Public Login assets must be available at `/logo.png` and `/gym-hero.jpg`.
- Global `ApiResponse<T>` and validation types must match the Auth module's consumed contract.
- Host Tailwind/global theme mapping must expose the semantic classes used by the module.
- Host next-intl loader must include module `_locales/en.json` and `_locales/hi.json`.
- Host E2E runner must execute `frontend_e2e/auth_e2e/auth/AuthLogin.spec.ts`.

## Loading / Empty / Error Coverage
- Login route has `loading.tsx` with structural skeletons.
- Login route has `error.tsx` with `reset()` retry.
- Login also has component-level `AuthLoginErrorBoundary` fallback with retry.
- Credential and demo mutation loading are rendered from TanStack Query mutation state.
- Form validation errors are field-associated through `aria-describedby` and `aria-invalid`.
- Raw backend errors are not exposed; safe backend `message` values are preserved when available.
- No list/table empty state exists because Auth Login contains no entity list.

## User Flows
1. Credential Login: Login page → validation → `AuthApi.login()` → `/auth/session` → HTTP-only cookies → sanitized user → role dashboard.
2. Demo Login: demo role button → `AuthApi.loginDemo()` → `/auth/demo-login` → server-only fixture → HTTP-only cookies → sanitized user → role dashboard.
3. Password visibility: closed eye → visible text → closed eye, without submitting.
4. Route recovery: route error → safe fallback → `reset()` → route rerender.
5. Component recovery: child render failure → boundary fallback → Retry → child restored.
6. Session refresh/logout/ghost restore are available through module route handlers and are covered by module security tests.

## Verification Notes
Source-level TypeScript parsing for all module `.ts/.tsx` files succeeds with zero syntax diagnostics. Full host `tsc --noEmit`, ESLint, Vitest, Playwright, production build, CI security scans, and global provider/runtime checks remain `NOT VERIFIED` because the supplied v3 artifact is a module delivery without host package/config/dependency files.

## AI Warnings
- Never move browser-safe demo identity data back into the server credential fixture.
- Never put demo passwords/tokens into client constants or MSW browser payloads.
- Never add another Auth URL source outside `auth_url_config.ts`.
- Never replace server-generated response messages with duplicate strings in route handlers.
- Never add a new global business abstraction to repair Auth.
- Never mark Auth fully verified from static inspection alone when host runtime evidence is unavailable.
