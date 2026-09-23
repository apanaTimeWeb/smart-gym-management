# Export Data Backend Feature Map

## Module Purpose
The Export Data feature owns the Superadmin-wide asynchronous export contract consumed by Settings, Reports, Global Audit, and Gyms. It creates a durable master-database export job, publishes work to the Redis-backed `superadmin-export` queue, and never performs archive generation inside the HTTP request. Export execution produces protected ZIP output, sends the result through the requested delivery medium with a configured fallback, persists the completion notification before realtime publication, and remains subject to the 90-day offboarding cleanup contract.

## Directory Structure
| File | Responsibility |
|---|---|
| export-data.controller.ts | HTTP start/status/download transport only. |
| dtos/export-data-request.dto.ts | Validates resource, tenant, format, and delivery-medium selectors. |
| services/export-data.service.ts | Authorizes tenant scope and creates durable jobs. |
| services/export-data-archive.service.ts | Builds bounded CSV/ZIP archive buffers. |
| services/export-data-delivery.service.ts | Selects primary/fallback proof-of-delivery medium. |
| workers/export-data-worker.service.ts | Consumes Redis queue, builds archive, stores artifact, delivers it, then marks completion. |
| repositories/export-data-job.repository.ts | Owns export job persistence. |
| repositories/export-data-archive.repository.ts | Owns denormalized export reads. |
| adapters/export-data-storage.adapter.ts | Owns protected local artifact storage. |
| adapters/export-data-email.adapter.ts | External Email adapter with timeout/circuit breaker. |
| adapters/export-data-whatsapp.adapter.ts | Optional WhatsApp adapter with timeout/circuit breaker. |
| services/export-data-retention.service.ts | Registered 90-day distributed purge handler. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| ExportDataController.start | POST | /api/superadmin/export-data | Accepts a validated export request and queues a durable asynchronous export job. | ExportDataRequestDto | ExportDataAcceptedResponseDto |
| ExportDataController.status | GET | /api/superadmin/export-data/:jobId | Returns the persisted lifecycle state and expiring download metadata for one export job. | jobId path parameter | ExportDataStatusResponseDto |
| ExportDataController.download | GET | /api/superadmin/export-data/download/:jobId/:token | Streams a completed ZIP only after actor, tenant, signature, and expiry checks succeed. | jobId/token path parameters | Protected ZIP stream |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: ConfigService, Redis, TypeORM master database, TenantRegistryRepository, Realtime event infrastructure, ScheduledJobRegistryService.
- **Runtime/Event Dependencies**: `SUPERADMIN.EXPORT.COMPLETED`; queue `superadmin-export`; DLQ `superadmin-export:dlq`.

## Data and State Architecture
- DB Entities: `superadmin_export_jobs`; `audit_logs` and tenant registry tables are read during export.
- Redis keys: `superadmin-export`, `superadmin-export:dlq`; idempotency keys remain global.
- Event Emitters: `SUPERADMIN.EXPORT.COMPLETED`.
- Background Jobs: `superadmin-export` worker; `SUPERADMIN.TENANT.OFFBOARDING_PURGE` distributed scheduled job.
- Idempotency Keys: mandatory on POST `/api/superadmin/export-data`.

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
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| POST `/api/superadmin/export-data` | SUPERADMIN | Each requested tenant must be authorized in the master database before it is placed in the export job. |
| GET `/api/superadmin/export-data/:jobId` | SUPERADMIN | Job owner/authorized tenant context must match. |
| GET `/api/superadmin/export-data/download/:jobId/:token` | SUPERADMIN | Job token must match HMAC and remain unexpired. |

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
