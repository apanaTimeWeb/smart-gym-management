# gyms Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/gyms feature. It exposes 31 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `gyms_dtos/superadmin-gyms-business-controls-bulk-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-owner-email.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-provision.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-stats.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_dtos/superadmin-gyms-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_repositories/superadmin-gyms-export-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `gyms_responses/superadmin-gyms-export-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_responses/superadmin-gyms-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms_services/superadmin-gyms-bulk-action.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-business-controls.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-detail-business-overview.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-export-download-token.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-lookup.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-operational.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-provision.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_services/superadmin-gyms-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms_types/superadmin-gyms.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `gyms_types/superadmin-gyms.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `gyms_workers/superadmin-gyms-export-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `superadmin-gyms-administration-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms-administration-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms-api.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms-business-controls-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-gyms-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms-detail-business-overview-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-gyms-detail-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-gyms-detail-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-gyms-export-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-gyms-lookup.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-gyms.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-gyms.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-gyms.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-gyms.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-gyms.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-gyms.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-gyms.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-gyms-administration-command.controller.ts::bulkAction` | POST | `superadmin/gyms/business-controls` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the bulkAction operation. | `SuperadminGymsBusinessControlsBulkActionDto` | `SuperadminGymsBusinessControlsResponseDto` |
| `superadmin-gyms-administration-command.controller.ts::bulkAction` | POST | `api/superadmin/gyms/business-controls` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the bulkAction operation. | `SuperadminGymsBusinessControlsBulkActionDto` | `SuperadminGymsBusinessControlsResponseDto` |
| `superadmin-gyms-administration-command.controller.ts::emailOwner` | POST | `superadmin/gyms/:id/email` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the emailOwner operation. | `SuperadminGymsOwnerEmailDto` | `null` |
| `superadmin-gyms-administration-command.controller.ts::impersonate` | POST | `superadmin/gyms/:id/impersonate` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the impersonate operation. | `—` | `See controller contract` |
| `superadmin-gyms-administration-query.controller.ts::businessControls` | GET | `superadmin/gyms/business-controls` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the businessControls operation. | `SuperadminQueryDto` | `SuperadminGymsBusinessControlsResponseDto` |
| `superadmin-gyms-administration-query.controller.ts::businessControls` | GET | `api/superadmin/gyms/business-controls` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the businessControls operation. | `SuperadminQueryDto` | `SuperadminGymsBusinessControlsResponseDto` |
| `superadmin-gyms-administration-query.controller.ts::stats` | GET | `superadmin/gyms/stats` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the stats operation. | `—` | `See controller contract` |
| `superadmin-gyms-administration-query.controller.ts::detailBusinessOverview` | GET | `superadmin/gym-detail/business-overview` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the detailBusinessOverview operation. | `SuperadminQueryDto` | `SuperadminGymsDetailBusinessOverviewResponseDto` |
| `superadmin-gyms-administration-query.controller.ts::detailBusinessOverview` | GET | `api/superadmin/gym-detail/business-overview` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the detailBusinessOverview operation. | `SuperadminQueryDto` | `SuperadminGymsDetailBusinessOverviewResponseDto` |
| `superadmin-gyms-api.controller.ts::findAll` | GET | `api/gyms` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the findAll operation. | `SuperadminGymsQueryDto` | `See controller contract` |
| `superadmin-gyms-api.controller.ts::stats` | GET | `api/gyms/stats` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the stats operation. | `—` | `See controller contract` |
| `superadmin-gyms-api.controller.ts::export` | POST | `api/gyms/export` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the export operation. | `—` | `SuperadminGymsExportQueuedResponseDto` |
| `superadmin-gyms-api.controller.ts::exportStatus` | GET | `api/gyms/export/:jobId` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the exportStatus operation. | `—` | `SuperadminGymsExportJobStatusResponseDto` |
| `superadmin-gyms-api.controller.ts::exportDownload` | GET | `api/gyms/export/:jobId/download` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the exportDownload operation. | `—` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::provision` | POST | `api/gyms/provision` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the provision operation. | `SuperadminGymsProvisionDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::findOne` | GET | `api/gyms/:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::create` | POST | `api/gyms` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the create operation. | `SuperadminGymsCreateDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::update` | PATCH | `api/gyms/:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the update operation. | `SuperadminGymsUpdateDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::changeStatus` | PATCH | `api/gyms/:id/status` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the changeStatus operation. | `SuperadminGymsStatusDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-api.controller.ts::remove` | DELETE | `api/gyms/:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-gyms-api.controller.ts::emailOwner` | POST | `api/gyms/:id/email` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the emailOwner operation. | `SuperadminGymsOwnerEmailDto` | `null` |
| `superadmin-gyms-api.controller.ts::impersonate` | POST | `api/gyms/:id/impersonate` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the impersonate operation. | `—` | `See controller contract` |
| `superadmin-gyms-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the create operation. | `SuperadminGymsCreateDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-command.controller.ts::provision` | POST | `/provision` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the provision operation. | `SuperadminGymsProvisionDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the update operation. | `SuperadminGymsUpdateDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the remove operation. | `—` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the changeStatus operation. | `SuperadminGymsStatusDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-lookup.controller.ts::findGymsLookup` | GET | `gyms` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the findGymsLookup operation. | `—` | `SuperadminGymsLookupItem[]` |
| `superadmin-gyms-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the findAll operation. | `SuperadminGymsQueryDto` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-query.controller.ts::export` | GET | `export` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the export operation. | `—` | `SuperadminGymsResponseDto` |
| `superadmin-gyms-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning gyms use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminGymsResponseDto` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_events, superadmin_core_jobs, superadmin_core_observability, superadmin_core_pagination, superadmin_core_security, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-gyms-detail-contract-snapshot.entity → `superadmin_gym_detail_contract_snapshots`, superadmin-gyms-export-job.entity → `superadmin_gyms_export_jobs`, superadmin-gyms.entity → `tenants`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: superadmin-gyms-export-job.entity.ts, gyms_responses/superadmin-gyms-export-job-status-response.dto.ts, gyms_repositories/superadmin-gyms-export-job.repository.ts
- Idempotency Keys: `/api/gyms`, `/api/gyms/:id`, `/api/gyms/:id/email`, `/api/gyms/:id/impersonate`, `/api/gyms/:id/status`, `/api/gyms/export`, `/api/gyms/provision`, `/api/superadmin/gyms/business-controls`, `/superadmin/gyms`, `/superadmin/gyms/:id`, `/superadmin/gyms/:id/email`, `/superadmin/gyms/:id/impersonate`, `/superadmin/gyms/:id/status`, `/superadmin/gyms/business-controls`, `/superadmin/gyms/provision`

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/:id/email` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/:id/impersonate` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/stats` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gym-detail/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/gym-detail/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/stats` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/export/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/export/:jobId/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/provision` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/gyms/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/:id/email` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/:id/impersonate` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/provision` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/gyms/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `gyms/superadmin_gym_detail_features.md`

- **API files:** `gyms_api/SuperadminGymsApi.ts`, `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`, `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Detected API symbols:** `fetchGyms` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymById` — `gyms_api/SuperadminGymsApi.ts`; `fetchSubscriptionPlans` — `gyms_api/SuperadminGymsApi.ts`; `createGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGymStatus` — `gyms_api/SuperadminGymsApi.ts`; `impersonateTenant` — `gyms_api/SuperadminGymsApi.ts`; `deleteGym` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymStats` — `gyms_api/SuperadminGymsApi.ts`; `emailGymOwner` — `gyms_api/SuperadminGymsApi.ts`; `exportGymsReport` — `gyms_api/SuperadminGymsApi.ts`; `provisionGym` — `gyms_api/SuperadminGymsApi.ts`; `exitGhostLogin` — `gyms_api/SuperadminGymsApi.ts`; `setGhostLoginCookie` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymDetailBusinessOverview` — `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`; `fetchGymsBusinessControls` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`; `updateGymsBulkAction` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `gyms/superadmin_gyms_business_controls_features.md`

- **API files:** `gyms_api/SuperadminGymsApi.ts`, `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`, `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Detected API symbols:** `fetchGyms` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymById` — `gyms_api/SuperadminGymsApi.ts`; `fetchSubscriptionPlans` — `gyms_api/SuperadminGymsApi.ts`; `createGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGymStatus` — `gyms_api/SuperadminGymsApi.ts`; `impersonateTenant` — `gyms_api/SuperadminGymsApi.ts`; `deleteGym` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymStats` — `gyms_api/SuperadminGymsApi.ts`; `emailGymOwner` — `gyms_api/SuperadminGymsApi.ts`; `exportGymsReport` — `gyms_api/SuperadminGymsApi.ts`; `provisionGym` — `gyms_api/SuperadminGymsApi.ts`; `exitGhostLogin` — `gyms_api/SuperadminGymsApi.ts`; `setGhostLoginCookie` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymDetailBusinessOverview` — `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`; `fetchGymsBusinessControls` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`; `updateGymsBulkAction` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `gyms/superadmin_gyms_features.md`

- **API files:** `gyms_api/SuperadminGymsApi.ts`, `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`, `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Detected API symbols:** `fetchGyms` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymById` — `gyms_api/SuperadminGymsApi.ts`; `fetchSubscriptionPlans` — `gyms_api/SuperadminGymsApi.ts`; `createGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGymStatus` — `gyms_api/SuperadminGymsApi.ts`; `impersonateTenant` — `gyms_api/SuperadminGymsApi.ts`; `deleteGym` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymStats` — `gyms_api/SuperadminGymsApi.ts`; `emailGymOwner` — `gyms_api/SuperadminGymsApi.ts`; `exportGymsReport` — `gyms_api/SuperadminGymsApi.ts`; `provisionGym` — `gyms_api/SuperadminGymsApi.ts`; `exitGhostLogin` — `gyms_api/SuperadminGymsApi.ts`; `setGhostLoginCookie` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymDetailBusinessOverview` — `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`; `fetchGymsBusinessControls` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`; `updateGymsBulkAction` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `gyms/superadmin_gym_detail_features.md`

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `gyms/superadmin_gyms_business_controls_features.md`

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `gyms/superadmin_gyms_features.md`

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``/api/superadmin/gym-detail/business-overview?gymId={encodeURIComponent}(gymId)`` | ``ApiResponse<SuperadminGymDetailData>`` | `REQ-036` / ``fetchGymDetailBusinessOverview`` |
| ``{api}{q}`` | ``ApiResponse<Tenant[]>`` | `REQ-037` / ``fetchGyms`` |
| ``{api}/{id}`` | ``ApiResponse<Tenant>`` | `REQ-038` / ``fetchGymById`` |
| ``/superadmin/saas-billing/plans`` | ``ApiResponse<SuperadminGymsPlanOption[]>`` | `REQ-039` / ``fetchSubscriptionPlans`` |
| ``/api/gyms`` | ``ApiResponse<Tenant>`` | `REQ-040` / ``createGym`` |
| ``{api}/{id}`` | ``ApiResponse<Tenant>`` | `REQ-041` / ``updateGym`` |
| ``{api}/{id}/status`` | ``ApiResponse<Tenant>`` | `REQ-042` / ``updateGymStatus`` |
| ``{api}/{id}/impersonate`` | ``ApiResponse<{` | `REQ-043` / ``impersonateTenant`` |
| ``{api}/{id}`` | ``ApiResponse<void>`` | `REQ-044` / ``deleteGym`` |
| ``{api}/stats`` | ``ApiResponse<GymStats>`` | `REQ-045` / ``fetchGymStats`` |
| ``{api}/{id}/email`` | ``ApiResponse<void>`` | `REQ-046` / ``emailGymOwner`` |
| ``{api}/export{q}`` | ``ApiResponse<{` | `REQ-047` / ``exportGymsReport`` |
| ``{api}/provision`` | ``ApiResponse<Tenant>`` | `REQ-048` / ``provisionGym`` |
| ``GymsUrlConfig.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY`` | ``ApiResponse<null>`` | `REQ-049` / ``exitGhostLogin`` |
| ``GymsUrlConfig.GHOST_LOGIN.SET_COOKIE_PROXY`` | ``ApiResponse<null>`` | `REQ-050` / ``setGhostLoginCookie`` |
| ``{api}{query}`` | ``ApiResponse<SuperadminGymsV1Data>`` | `REQ-051` / ``fetchGymsBusinessControls`` |
| ``/api/superadmin/gyms/business-controls`` | ``ApiResponse<SuperadminGymsV1Data>`` | `REQ-052` / ``updateGymsBulkAction`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.



### Repair Contract Notes
- Gym CSV export is `POST /api/gyms/export` with `Idempotency-Key`, returns `202 Accepted` plus durable `jobId`/status/download URLs, and is processed in bounded 500-row pages.
- Export search/status/plan filters are persisted with the job and re-applied server-side in the worker.

## Repair Addendum — Asynchronous Gym Export

Gym CSV export is now a durable background workflow. `POST /api/gyms/export` creates a job and returns `202 Accepted`; the worker reads the master tenant dataset in bounded pages, writes a protected CSV artifact, persists terminal state, retries transient failures, and exposes a status endpoint before download.

| Endpoint | HTTP | Purpose | Response |
|---|---|---|---|
| `/api/gyms/export` | POST | Starts a filtered Gym CSV export job. | `SuperadminGymsExportQueuedResponseDto` |
| `/api/gyms/export/:jobId` | GET | Returns durable export job status. | `SuperadminGymsExportJobStatusResponseDto` |
| `/api/gyms/export/:jobId/download` | GET | Streams the completed protected CSV artifact. | CSV binary |

- Queue: `superadmin:gyms-export`; DLQ: `superadmin:gyms-export:dlq`.
- Export filters (`search`, `status`, `plan`) are re-applied by the backend repository before pagination.
- Frontend polling stops only on terminal SUCCESS/FAILED state or explicit timeout.


## Repair Baseline — 2026-09-24
2026-09-24 repair: frontend GET export compatibility returns only downloadUrl while CSV generation remains asynchronous and POST retains the idempotent command lifecycle.
