# Settings Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `settings` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-settings-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-settings.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-settings.module.ts` | Feature module registration and dependency wiring. |
| `admin-settings.seeder.ts` | Idempotent feature-local seed data. |
| `admin-settings_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-settings_collection.json` | Module-local API collection for endpoint verification. |
| `admin-settings_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-settings_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `settings_controllers/admin-settings-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `settings_controllers/admin-settings-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `settings_domain/admin-settings.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `settings_dtos/admin-settings-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `settings_dtos/admin-settings-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `settings_dtos/admin-settings-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `settings_dtos/admin-settings-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `settings_entities/admin-settings-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `settings_mappers/admin-settings.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `settings_mappers/admin-settings.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `settings_mappers/admin-settings.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `settings_repositories/admin-settings-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `settings_services/admin-settings-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `settings_services/admin-settings-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-settings-command.controller.ts:updateSettings` | POST | `/api/v1/admin/settings/updateSettings` | Executes the `updateSettings` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsMutationDto` (body: AdminSettingsMutationDto) | `Promise<AdminSettingsResponseDto>` |
| `admin-settings-command.controller.ts:updateTwoFactorEnabled` | POST | `/api/v1/admin/settings/2fa/enable` | Executes the `updateTwoFactorEnabled` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsMutationDto` (body: AdminSettingsMutationDto) | `Promise<unknown>` |
| `admin-settings-command.controller.ts:updateTwoFactorDisabled` | POST | `/api/v1/admin/settings/2fa/disable` | Executes the `updateTwoFactorDisabled` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsMutationDto` (body: AdminSettingsMutationDto) | `Promise<unknown>` |
| `admin-settings-command.controller.ts:updateTwoFactorVerified` | POST | `/api/v1/admin/settings/2fa/verify` | Executes the `updateTwoFactorVerified` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsMutationDto` (body: AdminSettingsMutationDto) | `Promise<unknown>` |
| `admin-settings-query.controller.ts:findSettings` | GET | `/api/v1/admin/settings/fetchSettings` | Executes the `findSettings` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsQueryDto` (query: AdminSettingsQueryDto) | `Promise<AdminSettingsResponseDto>` |
| `admin-settings-query.controller.ts:findNotificationSettings` | GET | `/api/v1/admin/settings/notifications` | Executes the `findNotificationSettings` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsQueryDto` (query: AdminSettingsQueryDto) | `Promise<AdminNotificationsSettingsDto>` |
| `admin-settings-query.controller.ts:findTwoFactorStatus` | GET | `/api/v1/admin/settings/2fa/status` | Executes the `findTwoFactorStatus` use case for Admin `settings` within the owning feature boundary. | `AdminSettingsQueryDto` (query: AdminSettingsQueryDto) | `Promise<` |

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
- `admin-settings-exceptions.ts` — Feature-owned implementation artifact.
- `admin-settings.constants.ts` — Feature-owned implementation artifact.
- `admin-settings.module.ts` — Feature module provider/controller registration only.
- `admin-settings.seeder.ts` — Idempotent feature seed data only.
- `admin-settings_collection.json` — Module-local API collection/configuration artifact.
- `admin-settings_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-settings_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `settings_controllers/admin-settings-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `settings_controllers/admin-settings-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `settings_domain/admin-settings.domain.ts` — Framework-independent domain shape.
- `settings_dtos/admin-settings-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `settings_dtos/admin-settings-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `settings_dtos/admin-settings-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `settings_dtos/admin-settings-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `settings_entities/admin-settings-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `settings_mappers/admin-settings.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `settings_mappers/admin-settings.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `settings_repositories/admin-settings-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `settings_services/admin-settings-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `settings_services/admin-settings-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/settings/updateSettings` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/enable` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/disable` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/settings/2fa/verify` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/fetchSettings` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/notifications` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/settings/2fa/status` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `settings` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/settings/updateSettings` | POST | body: AdminSettingsMutationDto; `id: string`, `profile: Record<string, unknown>`, `notifications: Record<string, unknown>`, `integration: Record<string, unknown>`, `gst: Record<string, unknown>`, `payment: Record<string, unknown>`, `general: Record<string, unknown>`, `twoFactorEnabled: boolean`, `currentPassword: string`, `verificationCode: string` |
| `/api/v1/admin/settings/2fa/enable` | POST | body: AdminSettingsMutationDto; `id: string`, `profile: Record<string, unknown>`, `notifications: Record<string, unknown>`, `integration: Record<string, unknown>`, `gst: Record<string, unknown>`, `payment: Record<string, unknown>`, `general: Record<string, unknown>`, `twoFactorEnabled: boolean`, `currentPassword: string`, `verificationCode: string` |
| `/api/v1/admin/settings/2fa/disable` | POST | body: AdminSettingsMutationDto; `id: string`, `profile: Record<string, unknown>`, `notifications: Record<string, unknown>`, `integration: Record<string, unknown>`, `gst: Record<string, unknown>`, `payment: Record<string, unknown>`, `general: Record<string, unknown>`, `twoFactorEnabled: boolean`, `currentPassword: string`, `verificationCode: string` |
| `/api/v1/admin/settings/2fa/verify` | POST | body: AdminSettingsMutationDto; `id: string`, `profile: Record<string, unknown>`, `notifications: Record<string, unknown>`, `integration: Record<string, unknown>`, `gst: Record<string, unknown>`, `payment: Record<string, unknown>`, `general: Record<string, unknown>`, `twoFactorEnabled: boolean`, `currentPassword: string`, `verificationCode: string` |
| `/api/v1/admin/settings/fetchSettings` | GET | query: AdminSettingsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSettingsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/settings/notifications` | GET | query: AdminSettingsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSettingsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/settings/2fa/status` | GET | query: AdminSettingsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSettingsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/settings/updateSettings` | `updateSettings` | `Promise<AdminSettingsResponseDto>` | AdminSettingsResponseDto: `success: boolean`, `message: string`, `data: AdminSettingsDto` |
| `/api/v1/admin/settings/2fa/enable` | `updateTwoFactorEnabled` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/settings/2fa/disable` | `updateTwoFactorDisabled` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/settings/2fa/verify` | `updateTwoFactorVerified` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/settings/fetchSettings` | `findSettings` | `Promise<AdminSettingsResponseDto>` | AdminSettingsResponseDto: `success: boolean`, `message: string`, `data: AdminSettingsDto` |
| `/api/v1/admin/settings/notifications` | `findNotificationSettings` | `Promise<AdminNotificationsSettingsDto>` | AdminNotificationsSettingsDto: `smssms: boolean`, `emailsms: boolean`, `whatsappsms: boolean`, `smsonJoin: boolean`, `emailonJoin: boolean`, `whatsapponJoin: boolean`, `smsonExpiry: boolean`, `emailonExpiry: boolean`, `whatsapponExpiry: boolean`, `smsonPayment: boolean`, `emailonPayment: boolean`, `whatsapponPayment: boolean`, `smsonAbsence: boolean`, `emailonAbsence: boolean`, `whatsapponAbsence: boolean`, `expiryReminderDays: number`, `absenceThresholdDays: number` |
| `/api/v1/admin/settings/2fa/status` | `findTwoFactorStatus` | `Promise<` | Primitive/unknown return; runtime/static proof required. |

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

### `admin/settings/settings_api/AdminSettingsRolesApi.ts`
- `L8: export const AdminSettingsRolesApi = { fetchRolePermissionReference: () => apiFetch<ApiResponse<{ roleDefaults: AdminSettingsRolePermission[]; gymOverrides: unknown[] }>>(`${SettingsUrlConfig.BACKEND_API.PERMISSIONS_REFERENCE}?consumer=settings`, { method: 'GET', dataSchema: responseSchema }) };`

### `admin/settings/settings_api/AdminSettingsApi.ts`
- `L11: return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/fetchSettings`, { method: 'GET', responseSchema: AdminSettingsResponseSchema });`
- `L14: return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/updateSettings`, { method: 'POST', body: JSON.stringify(body), responseSchema: AdminSettingsResponseSchema,`

### `admin/settings/settings_api/AdminSettingsRolesApi.ts`
- `L8: export const AdminSettingsRolesApi = { fetchRolePermissionReference: () => apiFetch<ApiResponse<{ roleDefaults: AdminSettingsRolePermission[]; gymOverrides: unknown[] }>>(`${SettingsUrlConfig.BACKEND_API.PERMISSIONS_REFERENCE}?consumer=settings`, { method: 'GET', dataSchema: responseSchema }) };`

### `admin/settings/settings_api/AdminSettingsApi.ts`
- `L11: return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/fetchSettings`, { method: 'GET', responseSchema: AdminSettingsResponseSchema });`
- `L14: return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/updateSettings`, { method: 'POST', body: JSON.stringify(body), responseSchema: AdminSettingsResponseSchema,`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
