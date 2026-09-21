# Settings Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `settings` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

## Directory Structure
| File | Responsibility |
|---|---|
| `admin-settings.module.ts` | Single-purpose `admin-settings.module.ts` implementation for the `settings` feature. |
| `admin-settings.seeder.ts` | Single-purpose `admin-settings.seeder.ts` implementation for the `settings` feature. |
| `controllers/admin-settings-command.controller.ts` | Single-purpose `admin-settings-command.controller.ts` implementation for the `settings` feature. |
| `controllers/admin-settings-query.controller.ts` | Single-purpose `admin-settings-query.controller.ts` implementation for the `settings` feature. |
| `domain/admin-settings.domain.ts` | Single-purpose `admin-settings.domain.ts` implementation for the `settings` feature. |
| `dtos/admin-settings-id.dto.ts` | Single-purpose `admin-settings-id.dto.ts` implementation for the `settings` feature. |
| `dtos/admin-settings-mutation.dto.ts` | Single-purpose `admin-settings-mutation.dto.ts` implementation for the `settings` feature. |
| `dtos/admin-settings-query.dto.ts` | Single-purpose `admin-settings-query.dto.ts` implementation for the `settings` feature. |
| `dtos/admin-settings-response.dto.ts` | Single-purpose `admin-settings-response.dto.ts` implementation for the `settings` feature. |
| `entities/admin-settings-entity.ts` | Single-purpose `admin-settings-entity.ts` implementation for the `settings` feature. |
| `mappers/admin-settings.mapper.ts` | Single-purpose `admin-settings.mapper.ts` implementation for the `settings` feature. |
| `repositories/admin-settings-repository.ts` | Single-purpose `admin-settings-repository.ts` implementation for the `settings` feature. |
| `services/admin-settings-command.service.ts` | Single-purpose `admin-settings-command.service.ts` implementation for the `settings` feature. |
| `services/admin-settings-query.service.ts` | Single-purpose `admin-settings-query.service.ts` implementation for the `settings` feature. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| Controller | POST | `/api/v1/admin/settings/updateSettings` | Provides the POST operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | POST | `/api/v1/admin/settings/2fa/enable` | Provides the POST operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | POST | `/api/v1/admin/settings/2fa/disable` | Provides the POST operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | POST | `/api/v1/admin/settings/2fa/verify` | Provides the POST operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | GET | `/api/v1/admin/settings/fetchSettings` | Provides the GET operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | GET | `/api/v1/admin/settings/notifications` | Provides the GET operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | GET | `/api/v1/admin/settings/../permissions/fetchPermissions` | Provides the GET operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |
| Controller | GET | `/api/v1/admin/settings/2fa/status` | Provides the GET operation required by the Admin `settings` frontend capability. | Feature DTO | Feature response DTO |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `settings` tenant table/entity plus JSONB frontend contract payload.
- Redis Caching Keys: No feature-specific cache key is required in v1 unless later documented.
- Event Emitters: None declared in v1.
- Background Jobs: Data export uses the background-job pattern documented at core level; other endpoints are synchronous unless the route contract indicates otherwise.
- Idempotency Keys: Required on critical mutations; command controllers accept `Idempotency-Key` where duplicate execution would be unsafe.

## Business Flow / Key Sequences
1. Controller receives the frontend-aligned request.
2. Global validation, JWT authentication, tenant authorization, and canonical response/error infrastructure execute at the framework boundary.
3. The feature service validates the business state and calls only the feature repository.
4. The repository resolves the trusted tenant DataSource, performs parameterized TypeORM access, and returns an entity/domain mapping.
5. Mutation results are audited and returned through the canonical response interceptor.

## File Responsibility Map
- `admin-settings.module.ts` — Single responsibility within `settings`. MUST remain scoped to this feature responsibility.
- `admin-settings.seeder.ts` — Single responsibility within `settings`. MUST remain scoped to this feature responsibility.
- `controllers/admin-settings-command.controller.ts` — Single responsibility within `settings`. MUST NOT contain business or persistence logic.
- `controllers/admin-settings-query.controller.ts` — Single responsibility within `settings`. MUST NOT contain business or persistence logic.
- `domain/admin-settings.domain.ts` — Single responsibility within `settings`. MUST remain scoped to this feature responsibility.
- `dtos/admin-settings-id.dto.ts` — Single responsibility within `settings`. MUST NOT contain business side effects.
- `dtos/admin-settings-mutation.dto.ts` — Single responsibility within `settings`. MUST NOT contain business side effects.
- `dtos/admin-settings-query.dto.ts` — Single responsibility within `settings`. MUST NOT contain business side effects.
- `dtos/admin-settings-response.dto.ts` — Single responsibility within `settings`. MUST NOT contain business side effects.
- `entities/admin-settings-entity.ts` — Single responsibility within `settings`. MUST remain scoped to this feature responsibility.
- `mappers/admin-settings.mapper.ts` — Single responsibility within `settings`. MUST NOT perform DB I/O.
- `repositories/admin-settings-repository.ts` — Single responsibility within `settings`. MUST NOT contain controller or UI logic.
- `services/admin-settings-command.service.ts` — Single responsibility within `settings`. MUST NOT perform direct TypeORM persistence.
- `services/admin-settings-query.service.ts` — Single responsibility within `settings`. MUST NOT perform direct TypeORM persistence.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/settings/updateSettings` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/enable` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/disable` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/verify` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/fetchSettings` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/notifications` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/../permissions/fetchPermissions` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/2fa/status` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `settings` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
The frozen contract is derived from the supplied frontend source. This v1 package keeps the frontend path semantics under the global `/api/v1` prefix and uses the canonical response envelope. Before a production contract freeze, exact field-level approval should be recorded in this file alongside the frontend `_features.md`.

### Request Shape
| Endpoint | Method | Request DTO fields |
|---|---|---|
| `/api/v1/admin/settings/updateSettings` | POST | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/2fa/enable` | POST | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/2fa/disable` | POST | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/2fa/verify` | POST | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/fetchSettings` | GET | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/notifications` | GET | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/../permissions/fetchPermissions` | GET | Feature DTO fields exactly matching frontend request usage. |
| `/api/v1/admin/settings/2fa/status` | GET | Feature DTO fields exactly matching frontend request usage. |

### Response Shape
| Endpoint | Response DTO fields | Notes |
|---|---|---|
| `/api/v1/admin/settings/updateSettings` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/2fa/enable` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/2fa/disable` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/2fa/verify` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/fetchSettings` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/notifications` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/../permissions/fetchPermissions` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |
| `/api/v1/admin/settings/2fa/status` | Explicit frontend-consumed response DTO | Wrapped as `ApiResponse<T>`; pagination metadata is present only on paginated list responses. |

### UI-Required Fields
- Table: All fields consumed by the corresponding frontend table/list.
- KPI cards: All fields consumed by KPI cards in the frontend feature.
- Charts: All series and axis data consumed by frontend charts.
- Status badges: All status/severity/type values consumed by the UI.

### Pagination / Error Contract
- Pagination: List endpoints use `page`, `limit`, `search`, `sortKey`, and `sortDir`; pagination metadata follows the canonical `CorePaginationMeta`.
- Validation errors: HTTP 400 with `errorCode=VALIDATION.DTO.FAILED`, `validationErrors[]`, and `data=null`.
- Business errors: `DOMAIN.ENTITY.REASON` style machine-readable codes where a dedicated business state is exposed.

## Rule Compliance Checklist
- [ ] Rule 7: TypeORM is the single approved ORM and remains behind repositories.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is provided globally.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency applied to critical mutations.
- [ ] Rule 34: N+1 reviewed.
- [ ] Rule 36: Fail-fast on missing resources.
- [ ] Rule 48: Read/write controllers are separate.
- [ ] Rule 56: `findByIdOrThrow()` is used explicitly.
- [ ] Rule 62: Explicit return types are required.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc are required.
- [ ] Rule 82A: Response DTO covers the frontend UI data contract.
- [ ] Rule 83: RBAC uses controller-layer typed role guards.
- [ ] Rule 85/87: Guard clauses and small single-purpose service methods.
- [ ] Rule 89: ORM entities are mapped before business use.
- [ ] Rule 92: User-controlled ORM identifiers are allowlisted.
- [ ] Rule 93: Security-sensitive areas require human review.
- [ ] Rule 101: Tests must prove observable behavior.
