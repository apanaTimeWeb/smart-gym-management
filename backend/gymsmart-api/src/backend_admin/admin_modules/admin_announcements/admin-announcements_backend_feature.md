# Announcements Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `admin_announcements` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-announcements-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-announcements.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-announcements.module.ts` | Feature module registration and dependency wiring. |
| `admin-announcements.seeder.ts` | Idempotent feature-local seed data. |
| `admin-announcements_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-announcements_collection.json` | Module-local API collection for endpoint verification. |
| `admin-announcements_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-announcements_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `announcements_controllers/admin-announcements-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `announcements_controllers/admin-announcements-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `announcements_domain/admin-announcements.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `announcements_dtos/admin-announcements-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `announcements_dtos/admin-announcements-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `announcements_dtos/admin-announcements-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `announcements_dtos/admin-announcements-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `announcements_entities/admin-announcements-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `announcements_mappers/admin-announcements.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `announcements_mappers/admin-announcements.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `announcements_mappers/admin-announcements.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `announcements_repositories/admin-announcements-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `announcements_services/admin-announcements-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `announcements_services/admin-announcements-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-announcements-command.controller.ts:createAlias` | POST | `/api/v1/admin/announcements` | Executes the `createAlias` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsMutationDto` (body: AdminAnnouncementsMutationDto) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-command.controller.ts:createRecord` | POST | `/api/v1/admin/announcements/createAnnouncement` | Executes the `createRecord` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsMutationDto` (body: AdminAnnouncementsMutationDto) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-command.controller.ts:updateById` | POST | `/api/v1/admin/announcements/updateAnnouncement` | Executes the `updateById` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsMutationDto` (body: AdminAnnouncementsMutationDto) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-command.controller.ts:updateRest` | PATCH | `/api/v1/admin/announcements/:id` | Executes the `updateRest` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsMutationDto` (body: AdminAnnouncementsMutationDto) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-command.controller.ts:deleteAnnouncement` | DELETE | `/api/v1/admin/announcements/deleteAnnouncement` | Executes the `deleteAnnouncement` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsIdDto` (body: AdminAnnouncementsIdDto) | `Promise<unknown>` |
| `admin-announcements-command.controller.ts:deleteRest` | DELETE | `/api/v1/admin/announcements/:id` | Executes the `deleteRest` use case for Admin `announcements` within the owning feature boundary. | `None` (path: id: string) | `Promise<unknown>` |
| `admin-announcements-command.controller.ts:updatePinById` | POST | `/api/v1/admin/announcements/togglePin` | Executes the `updatePinById` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsIdDto` (body: AdminAnnouncementsIdDto) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-command.controller.ts:togglePinRest` | PATCH | `/api/v1/admin/announcements/:id/pin` | Executes the `togglePinRest` use case for Admin `announcements` within the owning feature boundary. | `None` (path: id: string) | `Promise<AdminAnnouncementDto>` |
| `admin-announcements-query.controller.ts:findAllAnnouncements` | GET | `/api/v1/admin/announcements/fetchAnnouncements` | Executes the `findAllAnnouncements` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsQueryDto` (query: AdminAnnouncementsQueryDto) | `Promise<AdminCorePaginatedResult<AdminAnnouncementDto>>` |
| `admin-announcements-query.controller.ts:findAnnouncementKpis` | GET | `/api/v1/admin/announcements/fetchKPIs` | Executes the `findAnnouncementKpis` use case for Admin `announcements` within the owning feature boundary. | `AdminAnnouncementsQueryDto` (query: AdminAnnouncementsQueryDto) | `Promise<AdminAnnouncementKPIDataDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `admin_announcements` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-announcements-exceptions.ts` — Feature-owned implementation artifact.
- `admin-announcements.constants.ts` — Feature-owned implementation artifact.
- `admin-announcements.module.ts` — Feature module provider/controller registration only.
- `admin-announcements.seeder.ts` — Idempotent feature seed data only.
- `admin-announcements_collection.json` — Module-local API collection/configuration artifact.
- `admin-announcements_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-announcements_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `announcements_controllers/admin-announcements-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `announcements_controllers/admin-announcements-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `announcements_domain/admin-announcements.domain.ts` — Framework-independent domain shape.
- `announcements_dtos/admin-announcements-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `announcements_dtos/admin-announcements-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `announcements_dtos/admin-announcements-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `announcements_dtos/admin-announcements-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `announcements_entities/admin-announcements-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `announcements_mappers/admin-announcements.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `announcements_mappers/admin-announcements.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `announcements_repositories/admin-announcements-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `announcements_services/admin-announcements-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `announcements_services/admin-announcements-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `GET /api/v1/admin/announcements/fetchAnnouncements` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/announcements/fetchKPIs` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/announcements` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/announcements/createAnnouncement` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/announcements/updateAnnouncement` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `PATCH /api/v1/admin/announcements/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/announcements/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/announcements/deleteAnnouncement` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `PATCH /api/v1/admin/announcements/:id/pin` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/announcements/togglePin` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `admin_announcements` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/announcements` | POST | body: AdminAnnouncementsMutationDto; `id: string`, `title: string`, `body: string`, `priority: string`, `audience: string[]`, `gymIds: string[]`, `publishedAt: string`, `expiresAt: string`, `isPinned: boolean` |
| `/api/v1/admin/announcements/createAnnouncement` | POST | body: AdminAnnouncementsMutationDto; `id: string`, `title: string`, `body: string`, `priority: string`, `audience: string[]`, `gymIds: string[]`, `publishedAt: string`, `expiresAt: string`, `isPinned: boolean` |
| `/api/v1/admin/announcements/updateAnnouncement` | POST | body: AdminAnnouncementsMutationDto; `id: string`, `title: string`, `body: string`, `priority: string`, `audience: string[]`, `gymIds: string[]`, `publishedAt: string`, `expiresAt: string`, `isPinned: boolean` |
| `/api/v1/admin/announcements/:id` | PATCH | body: AdminAnnouncementsMutationDto; `id: string`, `title: string`, `body: string`, `priority: string`, `audience: string[]`, `gymIds: string[]`, `publishedAt: string`, `expiresAt: string`, `isPinned: boolean` |
| `/api/v1/admin/announcements/deleteAnnouncement` | DELETE | body: AdminAnnouncementsIdDto; `id: string` |
| `/api/v1/admin/announcements/:id` | DELETE | path: id: string; none |
| `/api/v1/admin/announcements/togglePin` | POST | body: AdminAnnouncementsIdDto; `id: string` |
| `/api/v1/admin/announcements/:id/pin` | PATCH | path: id: string; none |
| `/api/v1/admin/announcements/fetchAnnouncements` | GET | query: AdminAnnouncementsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminAnnouncementsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/announcements/fetchKPIs` | GET | query: AdminAnnouncementsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminAnnouncementsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/announcements` | `createAlias` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/createAnnouncement` | `createRecord` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/updateAnnouncement` | `updateById` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/:id` | `updateRest` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/deleteAnnouncement` | `deleteAnnouncement` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/announcements/:id` | `deleteRest` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/announcements/togglePin` | `updatePinById` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/:id/pin` | `togglePinRest` | `Promise<AdminAnnouncementDto>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/fetchAnnouncements` | `findAllAnnouncements` | `Promise<AdminCorePaginatedResult<AdminAnnouncementDto>>` | AdminAnnouncementDto: `id: string`, `title: string`, `body: string`, `priority: string`, `status: AdminAnnouncementsStatus`, `audience: string[]`, `gymIds: string[]`, `gymNames: string[]`, `publishedAt: string`, `expiresAt: string`, `createdBy: string`, `createdAt: string`, `viewCount: number`, `viewsByBranch: AdminAnnouncementViewsByBranchDto[]`, `isPinned: boolean`, `deliveryStatus: string`, `pushNotificationSent: boolean`, `acknowledgedCount: number` |
| `/api/v1/admin/announcements/fetchKPIs` | `findAnnouncementKpis` | `Promise<AdminAnnouncementKPIDataDto>` | AdminAnnouncementKPIDataDto: `total: number`, `active: number`, `scheduled: number`, `expired: number`, `totalViews: number`, `pinned: number` |

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

### `admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi.ts`
- `L15: fetchAnnouncements: async (params: AdminAnnouncementsQueryParams) => apiFetch<ApiResponse<Announcement[]>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchAnnouncements${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(announcementSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<AnnouncementKPIData>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: announcementKpiDataSchema }),`
- `L17: createAnnouncement: async (payload: AnnouncementFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/createAnnouncement`, { method: 'POST', body: JSON.stringify(payload), dataSchema: announcementSchema,`
- `L20: updateAnnouncement: async (id: string, payload: AnnouncementFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/updateAnnouncement`, { method: 'POST', body: JSON.stringify({ id, ...payload }), dataSchema: announcementSchema,`
- `L23: deleteAnnouncement: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminAnnouncementsUrlConfig.api.base}/deleteAnnouncement`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L24: togglePin: async (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/togglePin`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: announcementSchema,`

### `admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi.ts`
- `L15: fetchAnnouncements: async (params: AdminAnnouncementsQueryParams) => apiFetch<ApiResponse<Announcement[]>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchAnnouncements${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(announcementSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<AnnouncementKPIData>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: announcementKpiDataSchema }),`
- `L17: createAnnouncement: async (payload: AnnouncementFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/createAnnouncement`, { method: 'POST', body: JSON.stringify(payload), dataSchema: announcementSchema,`
- `L20: updateAnnouncement: async (id: string, payload: AnnouncementFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/updateAnnouncement`, { method: 'POST', body: JSON.stringify({ id, ...payload }), dataSchema: announcementSchema,`
- `L23: deleteAnnouncement: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminAnnouncementsUrlConfig.api.base}/deleteAnnouncement`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L24: togglePin: async (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/togglePin`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: announcementSchema,`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
