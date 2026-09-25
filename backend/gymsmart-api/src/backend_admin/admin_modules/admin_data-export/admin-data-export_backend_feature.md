# Data-Export Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `data-export` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-data-export-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-data-export.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-data-export.module.ts` | Feature module registration and dependency wiring. |
| `admin-data-export.seeder.ts` | Idempotent feature-local seed data. |
| `admin-data-export_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-data-export_collection.json` | Module-local API collection for endpoint verification. |
| `admin-data-export_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-data-export_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `data-export_controllers/admin-data-export-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `data-export_controllers/admin-data-export-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `data-export_domain/admin-data-export.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `data-export_dtos/admin-data-export-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `data-export_dtos/admin-data-export-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `data-export_dtos/admin-data-export-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `data-export_dtos/admin-data-export-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `data-export_entities/admin-data-export-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `data-export_jobs/admin-data-export-retention-cleanup.job.ts` | Background-job trigger/schedule boundary for heavy work. |
| `data-export_mappers/admin-data-export.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `data-export_mappers/admin-data-export.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `data-export_mappers/admin-data-export.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `data-export_repositories/admin-data-export-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `data-export_repositories/admin-data-export-retention.repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `data-export_services/admin-data-export-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `data-export_services/admin-data-export-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `data-export_utils/admin-data-export-flatten-row.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `data-export_utils/admin-data-export-streaming-zip.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `data-export_utils/admin-data-export-zip.utils.spec.ts` | Feature-local pure utility; no cross-module business sharing. |
| `data-export_utils/admin-data-export-zip.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `data-export_workers/admin-data-export.worker.ts` | Background worker lifecycle; owns async job processing for the feature. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-data-export-command.controller.ts:createExportJob` | POST | `/api/v1/admin/data-export/createExport` | Executes the `createExportJob` use case for Admin `data-export` within the owning feature boundary. | `AdminDataExportMutationDto` (body: AdminDataExportMutationDto) | `Promise<AdminExportJobDto>` |
| `admin-data-export-command.controller.ts:deleteDataExport` | DELETE | `/api/v1/admin/data-export/deleteJob` | Executes the `deleteDataExport` use case for Admin `data-export` within the owning feature boundary. | `AdminDataExportIdDto` (body: AdminDataExportIdDto) | `Promise<unknown>` |
| `admin-data-export-query.controller.ts:findAllJobs` | GET | `/api/v1/admin/data-export/fetchJobs` | Executes the `findAllJobs` use case for Admin `data-export` within the owning feature boundary. | `AdminDataExportQueryDto` (query: AdminDataExportQueryDto) | `Promise<AdminCorePaginatedResult<AdminExportJobDto>>` |
| `admin-data-export-query.controller.ts:findExportDownload` | GET | `/api/v1/admin/data-export/download` | Executes the `findExportDownload` use case for Admin `data-export` within the owning feature boundary. | `None` (none) | `Promise<StreamableFile>` |
| `admin-data-export-query.controller.ts:findDataExportKpis` | GET | `/api/v1/admin/data-export/fetchKPIs` | Executes the `findDataExportKpis` use case for Admin `data-export` within the owning feature boundary. | `AdminDataExportQueryDto` (query: AdminDataExportQueryDto) | `Promise<AdminDataExportKPIDataDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `data-export` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-data-export-exceptions.ts` — Feature-owned implementation artifact.
- `admin-data-export_collection.json` — Module-local API collection/configuration artifact.
- `admin-data-export_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-data-export_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-data-export.constants.ts` — Feature-owned implementation artifact.
- `admin-data-export.module.ts` — Feature module provider/controller registration only.
- `admin-data-export.seeder.ts` — Idempotent feature seed data only.
- `data-export_controllers/admin-data-export-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `data-export_controllers/admin-data-export-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `data-export_domain/admin-data-export.domain.ts` — Framework-independent domain shape.
- `data-export_dtos/admin-data-export-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `data-export_dtos/admin-data-export-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `data-export_dtos/admin-data-export-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `data-export_dtos/admin-data-export-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `data-export_entities/admin-data-export-entity.ts` — ORM persistence mapping only.
- `data-export_jobs/admin-data-export-retention-cleanup.job.ts` — Feature-local async job scheduling/processing.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `data-export_mappers/admin-data-export.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `data-export_mappers/admin-data-export.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `data-export_repositories/admin-data-export-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `data-export_services/admin-data-export-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `data-export_services/admin-data-export-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `data-export_utils/admin-data-export-streaming-zip.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `data-export_utils/admin-data-export-zip.utils.spec.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `data-export_utils/admin-data-export-zip.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `data-export_workers/admin-data-export.worker.ts` — Feature-local async job scheduling/processing.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/data-export/createExport` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/data-export/deleteJob` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/data-export/fetchJobs` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/data-export/fetchKPIs` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `data-export` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/data-export/createExport` | POST | body: AdminDataExportMutationDto; `id: string`, `dataType: string`, `format: string`, `gymIds: string[]`, `dateFrom: string`, `dateTo: string` |
| `/api/v1/admin/data-export/deleteJob` | DELETE | body: AdminDataExportIdDto; `id: string` |
| `/api/v1/admin/data-export/fetchJobs` | GET | query: AdminDataExportQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDataExportStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/data-export/download` | GET | none; none |
| `/api/v1/admin/data-export/fetchKPIs` | GET | query: AdminDataExportQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDataExportStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/data-export/createExport` | `createExportJob` | `Promise<AdminExportJobDto>` | AdminExportJobDto: `id: string`, `dataType: string`, `format: string`, `gymIds: string[]`, `gymNames: string[]`, `dateFrom: string`, `dateTo: string`, `status: AdminDataExportStatus`, `rowCount: number`, `fileSizeKb: number`, `createdAt: string`, `completedAt: string`, `createdBy: string`, `downloadUrl: string`, `downloadExpiresAt: string` |
| `/api/v1/admin/data-export/deleteJob` | `deleteDataExport` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/data-export/fetchJobs` | `findAllJobs` | `Promise<AdminCorePaginatedResult<AdminExportJobDto>>` | AdminExportJobDto: `id: string`, `dataType: string`, `format: string`, `gymIds: string[]`, `gymNames: string[]`, `dateFrom: string`, `dateTo: string`, `status: AdminDataExportStatus`, `rowCount: number`, `fileSizeKb: number`, `createdAt: string`, `completedAt: string`, `createdBy: string`, `downloadUrl: string`, `downloadExpiresAt: string` |
| `/api/v1/admin/data-export/download` | `findExportDownload` | `Promise<StreamableFile>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/data-export/fetchKPIs` | `findDataExportKpis` | `Promise<AdminDataExportKPIDataDto>` | AdminDataExportKPIDataDto: `totalExports: number`, `totalRowsExported: number`, `lastExportDate: string`, `pendingJobs: number` |

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

### `admin/data-export/data_export_api/AdminDataExportApi.ts`
- `L15: fetchJobs: async (params?: AdminDataExportQueryParams) => apiFetch<ApiResponse<ExportJob[]>>(`${AdminDataExportUrlConfig.api.base}/fetchJobs${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(exportJobSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<DataExportKPIData>>(`${AdminDataExportUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: dataExportKpiDataSchema }),`
- `L17: createExport: async (payload: ExportFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<ExportJob>>(`${AdminDataExportUrlConfig.api.base}/createExport`, { method: 'POST', body: JSON.stringify(payload), dataSchema: exportJobSchema,`
- `L20: deleteJob: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminDataExportUrlConfig.api.base}/deleteJob`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`

### `admin/data-export/data_export_api/AdminDataExportApi.ts`
- `L15: fetchJobs: async (params?: AdminDataExportQueryParams) => apiFetch<ApiResponse<ExportJob[]>>(`${AdminDataExportUrlConfig.api.base}/fetchJobs${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(exportJobSchema) }),`
- `L16: fetchKPIs: async () => apiFetch<ApiResponse<DataExportKPIData>>(`${AdminDataExportUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: dataExportKpiDataSchema }),`
- `L17: createExport: async (payload: ExportFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<ExportJob>>(`${AdminDataExportUrlConfig.api.base}/createExport`, { method: 'POST', body: JSON.stringify(payload), dataSchema: exportJobSchema,`
- `L20: deleteJob: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminDataExportUrlConfig.api.base}/deleteJob`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`


## Repair Delta — Static Hardening Pass
The export worker now produces CSV files and bundles them into a ZIP archive rather than storing a JSON manifest. Data extraction uses the trusted tenant DataSource and the registered tenant entities, with bounded pagination per table, so the feature does not import sibling business modules directly. Completed jobs receive a 48-hour signed download reference and a `GET /admin/data-export/download` route; the worker records completion before emitting `ADMIN.EXPORT.COMPLETED`.

### Current Export Artifact Contract
| Stage | Contract |
|---|---|
| Queue trigger | `POST /api/v1/admin/data-export/createExport` returns `202 Accepted` |
| Artifact | One or more CSV files compressed into `.zip` |
| Access | Signed reference valid for 48 hours |
| Download | `GET /api/v1/admin/data-export/download?reference=...` |
| Tenant context | Worker resolves the tenant from the trusted job context before DB access |
| Completion | Persist job + audit record, then emit `ADMIN.EXPORT.COMPLETED` |

### Explicit Remaining Rule 119 Work
Deep human-readable foreign-key resolution, admin email delivery of the secure URL, and the centrally registered 90-day tenant offboarding hard-purge job are still application-level dependencies outside the repaired feature worker and are not claimed as complete by this document.

### AI Warnings Added During Repair
- Never trust a client tenant identifier inside the worker; use the trusted tenant context captured in the job (Rule 39).
- Never emit `ADMIN.EXPORT.COMPLETED` before the completed job state is persisted (Rule 120).
- Never remove the signed-reference expiry check or expose a raw storage object key to the frontend.

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
