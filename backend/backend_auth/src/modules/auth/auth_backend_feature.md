# Auth Backend Feature Map

## Module Purpose

This feature implements the authentication contract actually required by the supplied frontend Auth scope: login, refresh, logout, and `/auth/me`. It owns credential verification, access/refresh token issuance, persisted refresh-session rotation, lockout, replay recovery, authoritative identity lookup, and security audit records. Auth is a master-database feature in this supplied scope; it does not invent tenant-business endpoints or sibling Superadmin capabilities, and any future tenant-scoped feature must follow the frontend-first feature mirror and tenant authorization architecture before implementation.

## Directory Structure

| File | Responsibility |
|---|---|
| controllers/auth-command.controller.ts | Owns POST login/refresh/logout HTTP operations only. |
| controllers/auth-query.controller.ts | Owns GET /auth/me only. |
| orchestrators/auth-session.orchestrator.ts | Owns login/refresh/logout transaction boundaries and committed replay-recovery orchestration. |
| services/auth-login.service.ts | Owns credential verification, Redis lockout counters, token/session creation. |
| services/auth-refresh.service.ts | Owns refresh JWT validation and locked token rotation semantics. |
| services/auth-refresh-revocation.service.ts | Owns the Redis refresh-token denylist for post-commit revocation and replay hardening. |
| services/auth-logout.service.ts | Owns refresh-session revocation and logout audit. |
| services/auth-me.service.ts | Owns authoritative user lookup for the verified JWT subject. |
| repositories/auth-user.repository.ts | Owns active-user/credential queries and deterministic seed mutation. |
| repositories/auth-refresh-session.repository.ts | Owns refresh-session query and named rotation/revocation mutations. |
| mappers/auth-user.mapper.ts | Maps ORM auth user entities to domain/credential contracts. |
| mappers/auth-refresh-session.mapper.ts | Maps ORM refresh sessions to domain contracts. |
| dtos/auth-login.dto.ts | Validates the frozen login request. |
| dtos/auth-login-response.dto.ts | Documents the frozen login response data shape. |
| dtos/auth-refresh-response.dto.ts | Documents the frozen refresh response data shape. |
| dtos/auth-user-response.dto.ts | Documents the frozen user identity shape. |
| entities/auth-user.entity.ts | Maps the master `auth_users` table. |
| entities/auth-refresh-session.entity.ts | Maps the master `auth_refresh_sessions` table. |
| auth.interfaces.ts | Defines persistence-neutral Auth domain contracts. |
| auth.constants.ts | Centralizes Auth messages, codes, Redis prefixes and audit actions. |
| auth.roles.constants.ts | Defines the authoritative role enum and controller role set. |
| auth.status.constants.ts | Defines the finite Auth account-state enum. |
| auth.exceptions.ts | Defines Auth-specific typed application exceptions. |
| utils/auth-token.utils.ts | Isolates JWT signing, verification and refresh-token hashing. |
| utils/auth-password.utils.ts | Isolates bcrypt hashing/comparison. |
| utils/auth-lockout.utils.ts | Derives privacy-preserving Redis lockout keys. |
| utils/auth-api-response.mapper.ts | Maps domain results to HTTP response DTOs. |
| utils/auth-audit-role.mapper.ts | Converts AuthRole to the core audit actor-role enum. |
| auth.seeder.ts | Provides deterministic, idempotent, explicitly enabled seed identities. |
| auth_dependencies.md | Declares Auth business/infrastructure/event dependencies. |
| auth_forbidden.md | Documents module-specific prohibited patterns. |
| auth_collection.json | Provides the frozen Auth requests for Postman/manual QA. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| AuthCommandController.login | POST | /api/v1/auth/login | Verifies the supplied credentials, creates a persisted refresh session, and returns the frontend-frozen token pair and identity. | AuthLoginDto | AuthLoginResponseDto |
| AuthCommandController.refresh | POST | /api/v1/auth/refresh | Validates the Bearer refresh token and atomically rotates its persisted session under a pessimistic lock. | Authorization header | AuthRefreshResponseDto |
| AuthCommandController.logout | POST | /api/v1/auth/logout | Revokes the refresh session bound to the verified access-token session id and records the logout audit event. | Authorization header | null |
| AuthQueryController.me | GET | /api/v1/auth/me | Loads the authoritative active identity from PostgreSQL using the verified access-token subject. | Authorization header | AuthUserResponseDto |

## Approved External Dependencies

- **Business Feature Dependencies**: None in the supplied Auth scope.
- **Infrastructure Dependencies**: PostgreSQL/TypeORM, Redis/ioredis, bcrypt, JSON Web Token signing, AsyncLocalStorage request context, audit repository/service, structured logging, rate limiting, global response/validation/security infrastructure.
- **Runtime/Event Dependencies**: None; no Auth event is required by the supplied frontend contract.

## Data and State Architecture

- **DB Entities**: `auth_users`, `auth_refresh_sessions`, and `audit_logs` in the master database.
- **Redis Caching Keys**: `auth:attempts:{sha256(email)}` and `auth:lockout:{sha256(email)}`. Failed-attempt and lockout state uses the configured lockout window of 900 seconds by default. Rotated/revoked refresh tokens use `auth:refresh-revoked:{sha256(refreshToken)}` for immediate denylisting.
- **Event Emitters**: None in the supplied Auth contract.
- **Background Jobs**: None; supplied Auth flows are synchronous and do not require heavy async work.
- **Idempotency Keys**: No `Idempotency-Key` endpoint is required by the supplied Auth contract. Refresh duplication is prevented by persisted token-hash rotation plus pessimistic locking; logout is naturally repeat-safe.
- **Tenant Data Source**: Not selected by Auth endpoints because they operate against the master authentication store. The JWT may contain an optional `tenantId`, but no tenant-scoped Auth query is performed by this feature.
- **Named DB constraints**:
  - `PK_auth_users`
  - `UQ_auth_users_email`
  - `IDX_auth_users_role`
  - `IDX_auth_users_status`
  - `PK_auth_refresh_sessions`
  - `UQ_auth_refresh_sessions_refresh_token_hash`
  - `IDX_auth_refresh_sessions_user_id`
  - `IDX_auth_refresh_sessions_expires_at`
  - `FK_auth_refresh_sessions_auth_users_user_id`
  - `PK_audit_logs`
  - `IDX_audit_logs_entity_type_entity_id`
  - `IDX_audit_logs_actor_id_created_at`
- **Check constraints**: None are applicable to the current Auth schema because no financial/safety-critical numeric invariant is stored here.

## Business Flow / Key Sequences

### Login

1. `AuthCommandController.login` receives the frozen `email` and `password` request.
2. Global `CoreValidationPipe` validates the DTO with whitelist/forbid rules.
3. `AuthSessionOrchestrator` opens the master-database transaction.
4. `AuthLoginService` normalizes the email and checks Redis lockout state.
5. `AuthUserRepository` loads active credential fields only.
6. `AuthPasswordUtils` verifies bcrypt credentials.
7. The service clears failed-attempt state, creates a session UUID, signs access/refresh JWTs, hashes the refresh token, and calls the named repository mutation.
8. The login-success audit is persisted inside the same transaction.
9. The transaction commits and the response mapper creates the frozen DTO; the global response interceptor adds the canonical envelope.

### Failed Login / Lockout

1. Invalid credentials increment the privacy-preserving Redis attempt key.
2. When the configured threshold is reached, Redis lockout state is set and `AuthAccountLockedException` is raised.
3. The primary transaction rolls back.
4. `AuthSessionOrchestrator` writes the login-failure/lockout audit in a separate committed transaction so the security evidence cannot be rolled back.

### Refresh Rotation

1. `AuthCommandController.refresh` extracts only a Bearer refresh token from the Authorization header.
2. `AuthSessionOrchestrator` opens the transaction.
3. `AuthRefreshService` verifies the refresh JWT and extracts `userId` + `sessionId`.
4. `AuthRefreshSessionRepository.findSessionByIdForUpdate()` performs a pessimistic row lock.
5. The service checks user/session binding, expiry, revocation state and token-hash equality.
6. A valid token is replaced through `rotateRefreshSession()` and an audit event is written in the same transaction.
7. After the DB transaction commits, the old raw refresh token is added to the Redis denylist.
8. If the presented token hash no longer matches, the replay exception escapes the failed transaction.
9. The orchestrator opens a second committed transaction to revoke the session and write the replay audit, then denylisting is attempted for the replayed token as defense-in-depth.

### Logout

1. The global JWT guard verifies the access token and adds its typed claims to request context.
2. Controller-level `@CoreRoles()` authorizes all four supplied Auth roles.
3. `AuthSessionOrchestrator.logout()` opens a transaction.
4. `AuthLogoutService` revokes the JWT-bound session through the named repository mutation and writes the audit event.
5. The controller returns `null`; the canonical interceptor supplies the envelope.

### Me

1. The global JWT guard verifies the access token.
2. `AuthQueryController.me()` takes the verified subject only; no client profile fields are accepted.
3. `AuthMeService.findAuthenticatedUserById()` calls `AuthUserRepository.findUserByIdOrThrow()`.
4. `AuthUserMapper` and `AuthApiResponseMapper` produce the frontend-frozen identity shape.

## File Responsibility Map

- `controllers/auth-command.controller.ts` — HTTP write endpoints; MUST NOT access TypeORM or implement credential rules.
- `controllers/auth-query.controller.ts` — HTTP read endpoint; MUST NOT access TypeORM or trust request-body identity.
- `auth-session.orchestrator.ts` — Transaction/recovery orchestration; MUST NOT implement password or token policy.
- `auth-login.service.ts` — Login mechanics; MUST NOT access ORM entities or generic persistence methods.
- `auth-refresh.service.ts` — Refresh semantics; MUST NOT bypass `findSessionByIdForUpdate()`.
- `auth-logout.service.ts` — Session revocation/audit; MUST NOT hard-delete rows.
- `auth-me.service.ts` — Authoritative identity lookup; MUST NOT accept client-provided identity data.
- `auth-user.repository.ts` — Auth-user persistence only; MUST NOT call another repository.
- `auth-refresh-session.repository.ts` — Refresh-session persistence only; MUST NOT sign JWTs.
- `auth-user.mapper.ts` — ORM user → domain/credential mapping only; MUST NOT query the DB.
- `auth-refresh-session.mapper.ts` — ORM session → domain mapping only; MUST NOT query the DB.
- `auth-token.utils.ts` — JWT/hash primitives only; MUST NOT persist data.
- `auth-password.utils.ts` — bcrypt primitives only; MUST NOT contain login policy.
- `auth-lockout.utils.ts` — privacy-preserving Redis-key derivation only; MUST NOT authorize users.
- `auth-api-response.mapper.ts` — domain → response DTO mapping only; MUST NOT query the DB.
- `auth.seeder.ts` — deterministic local seed orchestration; MUST use the named repository seed mutation.

- `auth-refresh-revocation.service.spec.ts` — Verifies Redis refresh-token denylist behavior and key privacy guarantees.

## Permissions and Security

| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| POST /api/v1/auth/login | Public | Credentials must match an active account and Redis lockout must not be active. |
| POST /api/v1/auth/refresh | Public | Session must be verified, unexpired, unrevoked, user-bound, and hash-matched. |
| POST /api/v1/auth/logout | SUPERADMIN, ADMIN, MANAGER, TRAINER | Session id comes only from the verified JWT claims. |
| GET /api/v1/auth/me | SUPERADMIN, ADMIN, MANAGER, TRAINER | User id comes only from the verified JWT subject and the repository enforces active/non-deleted state. |

CODEOWNERS path: `src/modules/auth/` → human security-owner review required before merge (Rule 93).

## Edge Cases / AI Warnings

- Do not move failed-login audit into the same transaction as the failing authentication operation; rollback would remove the security evidence — Rules 36 and 54.
- Do not remove the pessimistic row lock during refresh rotation; concurrent requests could both observe the same token state — Rule 41.
- Do not revoke refresh replay inside the failed rotation transaction; rollback could leave the replayed session usable — Rules 36 and 41.
- Do not log or persist plaintext refresh tokens; only SHA-256 hashes are stored in the session table — Rules 14, 35 and 52.
- Do not treat `tenantId` inside a JWT as permission to access tenant data; Auth is master-database only in this supplied contract and future tenant-scoped modules require the full tenant authorization/data-source boundary — Rule 39.

## Frozen API Contract

### Request Shape

| Endpoint | Method | Request DTO fields / headers |
|---|---|---|
| /api/v1/auth/login | POST | `email: string`, `password: string` (minimum 6 characters) |
| /api/v1/auth/refresh | POST | `Authorization: Bearer <refreshToken>` |
| /api/v1/auth/logout | POST | `Authorization: Bearer <accessToken>` |
| /api/v1/auth/me | GET | `Authorization: Bearer <accessToken>` |

### Response Shape

| Endpoint | Response DTO fields | Notes |
|---|---|---|
| /api/v1/auth/login | `accessToken`, `refreshToken`, `user` | `user` contains `id`, `name`, `email`, `role`, optional `tenantId`. |
| /api/v1/auth/refresh | `accessToken`, `refreshToken` | Backend returns a rotated refresh token on every successful refresh. |
| /api/v1/auth/logout | `null` | Success envelope always keeps `data: null`. |
| /api/v1/auth/me | `id`, `name`, `email`, `role`, optional `tenantId` | Identity is loaded from the master database. |

### UI-Required Fields

- Login: `data.accessToken`, `data.refreshToken`, `data.user.id`, `data.user.name`, `data.user.email`, `data.user.role`, optional `data.user.tenantId`.
- Refresh: `data.accessToken`, optional `data.refreshToken` according to the frontend type; the implementation always supplies the field.
- Me: `data.id`, `data.name`, `data.email`, `data.role`, optional `data.tenantId`.
- Logout: `data` is `null`.
- Tables/KPIs/charts: none established by the supplied Auth frontend contract.

### Pagination / Error Contract

- Pagination: Not applicable to the current Auth endpoints; there are no tabular/list endpoints in the supplied Auth contract.
- Validation: HTTP 400 with `error: "VALIDATION_ERROR"`, `errorCode: "VALIDATION.DTO.FAILED"`, and `validationErrors[]` containing exact DTO field paths.
- Business errors: machine-readable `AUTH.*` error codes.
- Generic core errors: `CORE.*` error codes through the global exception filter.

## Rule Compliance Checklist

- [x] Rules 1–8: Isolated micro-features, DTO/domain/constant/exception/repository/adapter boundaries; TypeORM is the single approved ORM.
- [x] Rules 9–10: HTTP statuses use Nest `HttpStatus`; source imports use the `@/*` path alias with no relative imports.
- [x] Rules 11–19: Co-located Jest tests, canonical Swagger envelope decorators, validated config, structured logging, DI, API collection, and module documentation are present.
- [x] Rules 20–27: Compression, centralized rate limiting (including public health/metrics endpoints), migrations, graceful shutdown, URI versioning and the two-tier Jest/Pytest strategy are configured.
- [x] Rule 28: Global canonical `ApiResponse<T>` response envelope is enforced.
- [x] Rule 29: Soft-delete base entity/repository pattern is used; no Auth hard-delete endpoint exists.
- [x] Rule 30: Login, lockout, refresh rotation/reuse and logout security state changes are audited with server-derived request metadata when available.
- [x] Rule 31: No Auth endpoint in the supplied contract requires a dedicated idempotency key.
- [x] Rule 32: Structured logs, Prometheus metrics and OpenTelemetry bootstrap are included.
- [x] Rule 33: `.env.example` only documents local configuration; production secrets must come from a secrets manager.
- [x] Rule 34: Auth queries do not introduce N+1 relation loops and required lookup columns are indexed.
- [x] Rule 35: Passwords are bcrypt-hashed; raw tokens/PII are not logged; email fingerprints are hashed for Redis/audit metadata.
- [x] Rule 36: Fail-fast exceptions and explicit transaction error handling are implemented.
- [x] Rules 37–40: Strict payload limits, frontend-first naming, master-database Auth scope, and future tenant boundary are documented.
- [x] Rule 41: Refresh-session rotation uses pessimistic locking.
- [ ] Rule 43: Full isolated test-tenant/database lifecycle remains BLOCKED_BY_SUPPLIED_SCOPE until the project tenant-provisioning contract is supplied; Auth E2E must not be treated as proof of it.
- [x] Rules 44–47: Centralized rate-limit registry and adapter/security extension points are established; no Auth external adapter/webhook is required.
- [x] Rules 48–52: Query/command separation, dependency mapping, event naming policy, changelog, and JWT rotation are represented.
- [x] Rules 53–54: No Auth sensitive field requiring application-layer encryption is currently stored; brute-force lockout is implemented at 5 failed attempts by default and audited.
- [x] Rules 55–63: Deterministic seeder, strict null safety, AsyncLocalStorage, base entity/repository, SLA declarations, named FK convention and explicit DB pool policy are implemented.
- [x] Rules 64–66: Machine-readable errors and plural snake_case table names are implemented.
- [x] Rule 67: Frozen Auth contract is documented from the supplied frontend before implementation.
- [x] Rules 68–74: Health levels, strict tsconfig, typed ORM boundaries, UTC/ISO semantics, 1MB default payload limit, and lint-level module boundary enforcement are configured.
- [x] Rule 75: Auth files remain below their hard ceilings.
- [x] Rules 76–80: Responsibility/flow comments and JSDoc coverage are enforced for authored backend methods in scope.
- [x] Rule 81: No stub endpoint is left in the mergeable implementation.
- [x] Rule 82: `ApiResponse<T>` carries one explicitly typed success data value.
- [x] Rule 82A: Response DTOs include every Auth frontend-consumed backend-facing field.
- [x] Rule 83: Controller RBAC uses the typed `AUTH_ALL_ROLES` enum-backed set.
- [x] Rule 84: No barrel files/re-export indexes exist.
- [x] Rule 85: Auth services use guard-clause control flow.
- [x] Rule 86: Method names are intention-revealing verbs; `findByIdOrThrow` is used for required records.
- [x] Rule 87: Service methods are micro-featured and within the architecture's line budget.
- [x] Rule 88: ESLint `import-x/order` mechanically enforces import ordering and the known core violations have been corrected.
- [x] Rule 89: Dedicated mappers prevent ORM entities from reaching services.
- [x] Rule 90: CI defines typecheck, lint, SCA, SAST, secrets scanning and tests.
- [x] Rule 91: Pre-commit uses staged-file linting/formatting/type checking plus staged Gitleaks scanning; full-repository gates remain in CI.
- [x] Rule 92: User-controlled dynamic ORM order/where fields are absent from Auth.
- [x] Rule 93: Auth requires human CODEOWNERS review.
- [x] Rule 94: Canonical pagination types/utilities are installed for future list endpoints; Auth currently has no paginated endpoint.
- [x] Rule 95: Auth roles/statuses and core audit actor-role persistence use enum-backed TypeScript/PostgreSQL representations.
- [x] Rule 96: Central scheduled-job registry exists; Auth declares no scheduled job.
- [x] Rule 97: DB/Redis operations use explicit timeout tiers; HTTP SLA is declared with `@CoreSla` plus required comments.
- [x] Rule 98: Global validation pipe/filter produces the canonical `validationErrors` shape including nested dot paths.
- [x] Rule 99: All Auth mutations are named repository methods; services never mutate ORM entities or call `save()` directly.
- [x] Rule 100: Auth and audit DB constraints are explicitly named and documented above.
- [x] Rule 101: Unit/E2E tests assert observable login, lockout, refresh rotation/replay, logout, authoritative identity and validation behavior.

## Post-Audit Repair Status

The current source incorporates the verified Stage 2 repairs for logger typing, Swagger envelope documentation, public rate-limit coverage, import ordering, logout audit IP propagation, enum-driven audit actor roles, staged pre-commit gates, and module-prefix bootstrap naming. Full DB-per-tenant provisioning/routing and isolated test-tenant E2E lifecycle remain outside the supplied Auth-only scope and must not be represented as implemented here.

## Verification Notes

Static and syntax-level verification can be performed in this repository. A dependency-backed compile/test run requires the pinned npm dependencies plus PostgreSQL and Redis services; this sandbox did not have successful package-registry access, so runtime dependency gates must be executed in CI before merge. That limitation is recorded in `docs/verification-status.md` rather than represented as a false PASS.
