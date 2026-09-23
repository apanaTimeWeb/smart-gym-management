# export-data Module Dependencies

## Depends On
- `core/http` — canonical response/error envelope.
- `core/cache` — global idempotency protection and Redis infrastructure.
- `core/observability/request-context` — trusted actor/tenant context.
- `core/tenancy/tenant-registry.repository` — authorized tenant metadata and delivery contacts.
- `core/events/event-registry.constants` — declared `SUPERADMIN.EXPORT.COMPLETED` event.
- `core/jobs/distributed-job-queue.service` — Redis queue/DLQ primitives.
- `core/jobs/scheduled-job-registry.service` — distributed 90-day retention job registration.
- `core/realtime` — notification completion is consumed downstream, not directly imported.

## Consumers
- Global Audit export action
- Gyms export action
- Settings export action
- Reports export action
- Invoice/report export flows where the frontend uses the shared export endpoint

## Runtime Dependency
- Queue: `superadmin-export`
- DLQ: `superadmin-export:dlq`
- Event: `SUPERADMIN.EXPORT.COMPLETED`

## Isolation Guardrail
No direct sibling-feature business import is allowed. Export reads are owned by the export repository; downstream notification delivery uses the declared runtime event contract.
