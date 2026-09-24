# Export Data Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/export-data feature. It exposes 3 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `export-data_adapters/superadmin-export-data-email.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data_adapters/superadmin-export-data-storage.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data_adapters/superadmin-export-data-whatsapp.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data_dtos/superadmin-export-data-request.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data_repositories/superadmin-export-data-archive.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `export-data_repositories/superadmin-export-data-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `export-data_responses/superadmin-export-data-accepted-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data_responses/superadmin-export-data-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data_services/superadmin-export-data-archive.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data_services/superadmin-export-data-delivery.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data_services/superadmin-export-data-retention.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data_services/superadmin-export-data.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data_workers/superadmin-export-data-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `superadmin-export-data-job.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-export-data-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-export-data-request.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-export-data.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-export-data.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-export-data.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-export-data.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-export-data.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-export-data.controller.ts::start` | POST | `api/superadmin/export-data` | This endpoint validates transport input, invokes the owning export-data use case, and returns the declared contract for the start operation. | `SuperadminExportDataRequestDto` | `SuperadminExportDataAcceptedResponseDto` |
| `superadmin-export-data.controller.ts::status` | GET | `api/superadmin/export-data/:jobId` | This endpoint validates transport input, invokes the owning export-data use case, and returns the declared contract for the status operation. | `—` | `SuperadminExportDataStatusResponseDto` |
| `superadmin-export-data.controller.ts::download` | GET | `api/superadmin/export-data/download/:jobId/:token` | This endpoint validates transport input, invokes the owning export-data use case, and returns the declared contract for the download operation. | `—` | `void` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_config, superadmin_core_database, superadmin_core_events, superadmin_core_external, superadmin_core_jobs, superadmin_core_observability, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-export-data-job.entity → `superadmin_export_jobs`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: superadmin-export-data-job.constants.ts, superadmin-export-data-job.entity.ts, export-data_repositories/superadmin-export-data-job.repository.ts
- Idempotency Keys: `/api/superadmin/export-data`

## Business Flow / Key Sequences
1. POST `/api/superadmin/export-data` validates request and trusted tenant scope.
2. Idempotency protection reserves the request.
3. `ExportDataJobRepository` writes a durable QUEUED job and pushes a typed Redis envelope.
4. Worker claims the job and marks it ACTIVE.
5. Archive repository performs paginated tenant-aware reads; archive service writes CSV content and ZIP packaging.
6. Storage adapter writes a 0600 artifact into a 0700 directory.
7. Delivery service sends through requested Email/WhatsApp medium and configured fallback.
8. Only after successful delivery does the worker store completion state and emit `SUPERADMIN.EXPORT.COMPLETED`.
9. Messaging consumes that event, persists a notification first, then publishes `export.completed` through authenticated Redis-backed WebSockets.
10. The distributed retention handler permanently removes tenant databases and retained export artifacts after 90 days.

## File Responsibility Map
- `export-data.controller.ts` — HTTP boundary only; MUST NOT create archives.
- `export-data.service.ts` — request/authorization/job orchestration only.
- `export-data-archive.repository.ts` — data reads only; MUST NOT write files.
- `export-data-archive.service.ts` — CSV/ZIP assembly only.
- `export-data-delivery.service.ts` — delivery routing only; MUST NOT access DB.
- `export-data-worker.service.ts` — queue lifecycle only; MUST NOT implement SQL inline.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /api/superadmin/export-data` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/export-data/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/export-data/download/:jobId/:token` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Export generation MUST remain asynchronous (Rule 23); synchronous archive generation defeats the request SLA.
- Export job completion MUST occur only after successful delivery (Rule 119); otherwise the UI can claim success when no proof was delivered.
- Critical notification emission is save-first, emit-second (Rule 120).
- Redis queue failure paths MUST reach the DLQ (Rule 61).
- Tenant IDs from the request body are never trusted without master-database authorization (Rule 39).

## Frozen API Contract
### Request Shape
| Endpoint | Method | Request DTO fields |
|---|---|---|
| `/api/superadmin/export-data` | POST | resources?: ExportDataResource[], tenantIds?: string[], format?: ZIP\|CSV, deliveryMedium?: EMAIL\|WHATSAPP |

### Response Shape
| Endpoint | Response DTO fields | Notes |
|---|---|---|
| `/api/superadmin/export-data` | jobId, status | HTTP 202, status=`QUEUED`. |

### UI-Required Fields
- Table: none directly.
- KPI cards: none directly.
- Charts: none directly.
- Status badges: job status.

### Pagination / Error Contract
- Pagination: no.
- Validation errors: canonical 400 envelope.
- Business errors: `EXPORT.JOB.*`, `EXPORT.ARTIFACT.*`, `EXPORT.DELIVERY.*`.

## Rule Compliance Checklist
- [x] Rule 23: worker + DLQ consumer code exists.
- [x] Rule 31/112: Idempotency-Key mandatory on export start.
- [x] Rule 37: DTO validation plus global payload guard remains required at host bootstrap.
- [x] Rule 39: requested tenant IDs are authorized before queueing.
- [x] Rule 40: Email + optional WhatsApp with explicit deliveryMedium and fallback routing.
- [x] Rule 61: worker failures are dead-lettered.
- [x] Rule 96: offboarding purge is registered with mandatory metadata.
- [x] Rule 119: asynchronous ZIP export, secure storage, expiring download token, delivery, completion event, and 90-day purge are implemented.
- [x] Rule 120: completion notification is persisted before realtime publication.
- [x] Rule 82A: shared export response contract remains `jobId/status` as required by the frontend.


## Repair Baseline — 2026-09-24
2026-09-24 repair: tenant export retention soft-deletes metadata before removing expired storage artifacts; permanent offboarding deletion remains an explicit lifecycle operation.
