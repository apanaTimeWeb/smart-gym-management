# Auth Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/auth feature. It exposes 5 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `auth_dtos/superadmin-auth-ghost-cookie-user.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth_dtos/superadmin-auth-ghost-cookie.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth_dtos/superadmin-auth-login.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth_dtos/superadmin-auth-refresh.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-auth.controller.spec.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-auth.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-auth.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-auth.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-auth.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-auth.controller.ts::login` | POST | `login` | This endpoint validates transport input, invokes the owning auth use case, and returns the declared contract for the login operation. | `SuperadminAuthLoginDto` | `See controller contract` |
| `superadmin-auth.controller.ts::refresh` | POST | `refresh` | This endpoint validates transport input, invokes the owning auth use case, and returns the declared contract for the refresh operation. | `—` | `See controller contract` |
| `superadmin-auth.controller.ts::logout` | POST | `logout` | This endpoint validates transport input, invokes the owning auth use case, and returns the declared contract for the logout operation. | `—` | `void` |
| `superadmin-auth.controller.ts::setGhostLoginCookie` | POST | `set-cookie` | This endpoint validates transport input, invokes the owning auth use case, and returns the declared contract for the setGhostLoginCookie operation. | `SuperadminAuthGhostCookieDto` | `null` |
| `superadmin-auth.controller.ts::exitGhostLogin` | POST | `exit-ghost-login` | This endpoint validates transport input, invokes the owning auth use case, and returns the declared contract for the exitGhostLogin operation. | `—` | `null` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_observability
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: none in this module scope
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/auth/exit-ghost-login`, `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/set-cookie`

## Business Flow / Key Sequences
1. HTTP request reaches the module-owned controller.
2. Framework validation/guards execute before business behavior.
3. The module executes its isolated use case.
4. The response is passed through the canonical response infrastructure where applicable.

## File Responsibility Map
- Module controllers — transport only; MUST NOT contain business persistence logic.
- Module services — isolated use-case behavior.
- DTOs — edge validation only.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /auth/login` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/refresh` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/logout` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/set-cookie` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/exit-ghost-login` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Do not bypass JWT verification in protected flows — see Rule 83.
- Do not trust a client tenant identifier without server-side tenant authorization — see Rule 39.
- Do not expose credentials, tokens, or request bodies in logs — see Rule 14.

## Frozen API Contract
Use the exact controller decorators and DTOs in source; do not invent additional endpoints.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
No dedicated frontend UI Data Requirements section was supplied for this module. The frozen Stage 1 requirement IDs remain the authoritative frontend-derived evidence; no additional fields are invented here.

### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [ ] Rule 19: Documentation remains synchronized with code changes.
- [ ] Rule 28: Responses use the canonical API envelope where applicable.
- [ ] Rule 83: RBAC/guards remain at the controller boundary.

## Repair Addendum — Token Version Revocation and Lockout

Access and refresh JWTs now carry the persisted Superadmin `token_version`. Protected access rejects a token when the profile is missing or its persisted version differs from the claim; password changes increment the stored version so previously issued tokens are revoked immediately. Failed-login lockout remains Redis-backed and records the lock event through the centralized audit trail without logging credentials.

- Password mutation: `SuperadminProfileRepository.updatePasswordAndIncrementTokenVersion()` atomically changes the password hash and increments the token version.
- Access guard: verifies JWT, then compares `claims.tokenVersion` with the authoritative profile value before establishing tenant context.
- Refresh flow: verifies denylist state and persisted token version before minting the next token pair.
