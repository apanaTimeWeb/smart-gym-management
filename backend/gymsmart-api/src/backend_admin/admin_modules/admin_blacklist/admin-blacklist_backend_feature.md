# Blacklist Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `blacklist` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

## Directory Structure
| File | Responsibility |
|---|---|
| `_locales/bn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/bn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-blacklist-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-blacklist.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-blacklist.module.ts` | Feature module registration and dependency wiring. |
| `admin-blacklist.seeder.ts` | Idempotent feature-local seed data. |
| `admin-blacklist_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-blacklist_collection.json` | Module-local API collection for endpoint verification. |
| `admin-blacklist_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-blacklist_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `blacklist_controllers/admin-blacklist-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `blacklist_controllers/admin-blacklist-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `blacklist_domain/admin-blacklist.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `blacklist_dtos/admin-blacklist-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `blacklist_dtos/admin-blacklist-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `blacklist_dtos/admin-blacklist-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `blacklist_dtos/admin-blacklist-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `blacklist_entities/admin-blacklist-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `blacklist_mappers/admin-blacklist.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `blacklist_mappers/admin-blacklist.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `blacklist_mappers/admin-blacklist.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `blacklist_repositories/admin-blacklist-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `blacklist_services/admin-blacklist-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `blacklist_services/admin-blacklist-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-blacklist-command.controller.ts:createRecord` | POST | `/api/v1/admin/blacklist/addToBlacklist` | Executes the `createRecord` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistMutationDto` (body: AdminBlacklistMutationDto) | `Promise<AdminBlacklistedMemberDto>` |
| `admin-blacklist-command.controller.ts:deleteBlacklist` | DELETE | `/api/v1/admin/blacklist/removeFromBlacklist` | Executes the `deleteBlacklist` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistIdDto` (body: AdminBlacklistIdDto) | `Promise<unknown>` |
| `admin-blacklist-command.controller.ts:updateActiveById` | POST | `/api/v1/admin/blacklist/toggleBlacklist` | Executes the `updateActiveById` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistIdDto` (body: AdminBlacklistIdDto) | `Promise<AdminBlacklistedMemberDto>` |
| `admin-blacklist-command.controller.ts:updatePropagationById` | POST | `/api/v1/admin/blacklist/propagateToAllBranches` | Executes the `updatePropagationById` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistIdDto` (body: AdminBlacklistIdDto) | `Promise<AdminBlacklistedMemberDto>` |
| `admin-blacklist-query.controller.ts:findAllBlacklist` | GET | `/api/v1/admin/blacklist/fetchBlacklist` | Executes the `findAllBlacklist` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistQueryDto` (query: AdminBlacklistQueryDto) | `Promise<AdminCorePaginatedResult<AdminBlacklistedMemberDto>>` |
| `admin-blacklist-query.controller.ts:findBlacklistKpis` | GET | `/api/v1/admin/blacklist/fetchKPIs` | Executes the `findBlacklistKpis` use case for Admin `blacklist` within the owning feature boundary. | `AdminBlacklistQueryDto` (query: AdminBlacklistQueryDto) | `Promise<AdminBlacklistKPIDataDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `blacklist` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-blacklist-exceptions.ts` — Feature-owned implementation artifact.
- `admin-blacklist.constants.ts` — Feature-owned implementation artifact.
- `admin-blacklist.module.ts` — Feature module provider/controller registration only.
- `admin-blacklist.seeder.ts` — Idempotent feature seed data only.
- `admin-blacklist_collection.json` — Module-local API collection/configuration artifact.
- `admin-blacklist_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-blacklist_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `blacklist_controllers/admin-blacklist-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `blacklist_controllers/admin-blacklist-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `blacklist_domain/admin-blacklist.domain.ts` — Framework-independent domain shape.
- `blacklist_dtos/admin-blacklist-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `blacklist_dtos/admin-blacklist-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `blacklist_dtos/admin-blacklist-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `blacklist_dtos/admin-blacklist-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `blacklist_entities/admin-blacklist-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `blacklist_mappers/admin-blacklist.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `blacklist_mappers/admin-blacklist.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `blacklist_repositories/admin-blacklist-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `blacklist_services/admin-blacklist-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `blacklist_services/admin-blacklist-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/blacklist/addToBlacklist` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/blacklist/removeFromBlacklist` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/blacklist/toggleBlacklist` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/blacklist/propagateToAllBranches` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/blacklist/fetchBlacklist` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/blacklist/fetchKPIs` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `blacklist` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/blacklist/addToBlacklist` | POST | body: AdminBlacklistMutationDto; `id: string`, `memberId: string`, `memberName: string`, `memberPhone: string`, `memberEmail: string`, `reason: string`, `scope: string`, `assignedGyms: string[]` |
| `/api/v1/admin/blacklist/removeFromBlacklist` | DELETE | body: AdminBlacklistIdDto; `id: string` |
| `/api/v1/admin/blacklist/toggleBlacklist` | POST | body: AdminBlacklistIdDto; `id: string` |
| `/api/v1/admin/blacklist/propagateToAllBranches` | POST | body: AdminBlacklistIdDto; `id: string` |
| `/api/v1/admin/blacklist/fetchBlacklist` | GET | query: AdminBlacklistQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminBlacklistStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/blacklist/fetchKPIs` | GET | query: AdminBlacklistQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminBlacklistStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/blacklist/addToBlacklist` | `createRecord` | `Promise<AdminBlacklistedMemberDto>` | AdminBlacklistedMemberDto: `id: string`, `memberId: string`, `memberName: string`, `memberPhone: string`, `memberEmail: string`, `reason: string`, `blacklistedBy: string`, `blacklistedAt: string`, `scope: string`, `assignedGyms: string[]`, `assignedGymNames: string[]`, `isActive: boolean`, `history: AdminBlacklistHistoryDto[]` |
| `/api/v1/admin/blacklist/removeFromBlacklist` | `deleteBlacklist` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/blacklist/toggleBlacklist` | `updateActiveById` | `Promise<AdminBlacklistedMemberDto>` | AdminBlacklistedMemberDto: `id: string`, `memberId: string`, `memberName: string`, `memberPhone: string`, `memberEmail: string`, `reason: string`, `blacklistedBy: string`, `blacklistedAt: string`, `scope: string`, `assignedGyms: string[]`, `assignedGymNames: string[]`, `isActive: boolean`, `history: AdminBlacklistHistoryDto[]` |
| `/api/v1/admin/blacklist/propagateToAllBranches` | `updatePropagationById` | `Promise<AdminBlacklistedMemberDto>` | AdminBlacklistedMemberDto: `id: string`, `memberId: string`, `memberName: string`, `memberPhone: string`, `memberEmail: string`, `reason: string`, `blacklistedBy: string`, `blacklistedAt: string`, `scope: string`, `assignedGyms: string[]`, `assignedGymNames: string[]`, `isActive: boolean`, `history: AdminBlacklistHistoryDto[]` |
| `/api/v1/admin/blacklist/fetchBlacklist` | `findAllBlacklist` | `Promise<AdminCorePaginatedResult<AdminBlacklistedMemberDto>>` | AdminBlacklistedMemberDto: `id: string`, `memberId: string`, `memberName: string`, `memberPhone: string`, `memberEmail: string`, `reason: string`, `blacklistedBy: string`, `blacklistedAt: string`, `scope: string`, `assignedGyms: string[]`, `assignedGymNames: string[]`, `isActive: boolean`, `history: AdminBlacklistHistoryDto[]` |
| `/api/v1/admin/blacklist/fetchKPIs` | `findBlacklistKpis` | `Promise<AdminBlacklistKPIDataDto>` | AdminBlacklistKPIDataDto: `totalBlacklisted: number`, `globalBans: number`, `gymSpecificBans: number`, `addedThisMonth: number` |

### UI-Required Fields
The response contract must contain every backend-derived field in the frozen Stage 1 requirement baseline, including table fields, KPIs, chart series, lookup labels, relationship values, computed values, and status badges. Frontend-side reconstruction of business semantics is not an accepted substitute.

### Pagination / Error Contract
- All paginated list endpoints must use server-driven `page`, `limit`, filtering and allowlisted sorting as defined by the module DTO.
- All endpoints return the canonical `ApiResponse<T>` envelope through the global response interceptor; validation failures use `VALIDATION.DTO.FAILED` with `data = null` and `validationErrors[]`.
- Non-paginated endpoints omit `meta`.

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

## Source-Frozen Frontend API Contract

The following frontend API-client call sites were inspected during the audit and are retained here as contract evidence. This section is evidence of the current frontend requirement, not proof that the backend implementation works. Any deliberate contract change must update the frontend contract, backend contract, types/schemas, mocks, and tests together.

### `admin/blacklist/blacklist_api/AdminBlacklistApi.ts`
- `L15: fetchBlacklist: async (params?: AdminBlacklistQueryParams) => apiFetch<ApiResponse<BlacklistedMember[]>>(`${AdminBlacklistUrlConfig.api.base}/fetchBlacklist${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(blacklistedMemberSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<BlacklistKPIData>>(`${AdminBlacklistUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: blacklistKpiDataSchema }),`
- `L17: addToBlacklist: async (payload: BlacklistFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/addToBlacklist`, { method: 'POST', body: JSON.stringify(payload), dataSchema: blacklistedMemberSchema,`
- `L20: removeFromBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminBlacklistUrlConfig.api.base}/removeFromBlacklist`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L21: toggleBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/toggleBlacklist`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),`
- `L22: propagateToAllBranches: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/propagateToAllBranches`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),`

### `admin/blacklist/blacklist_api/AdminBlacklistApi.ts`
- `L15: fetchBlacklist: async (params?: AdminBlacklistQueryParams) => apiFetch<ApiResponse<BlacklistedMember[]>>(`${AdminBlacklistUrlConfig.api.base}/fetchBlacklist${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(blacklistedMemberSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<BlacklistKPIData>>(`${AdminBlacklistUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: blacklistKpiDataSchema }),`
- `L17: addToBlacklist: async (payload: BlacklistFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/addToBlacklist`, { method: 'POST', body: JSON.stringify(payload), dataSchema: blacklistedMemberSchema,`
- `L20: removeFromBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminBlacklistUrlConfig.api.base}/removeFromBlacklist`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L21: toggleBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/toggleBlacklist`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),`
- `L22: propagateToAllBranches: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/propagateToAllBranches`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
