# gyms Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto`
- `@/backend_superadmin/gyms/dtos/gyms-create.dto`
- `@/backend_superadmin/gyms/dtos/gyms-query.dto`
- `@/backend_superadmin/gyms/dtos/gyms-update.dto`
- `@/backend_superadmin/gyms/gym-detail-business-overview-response.dto`
- `@/backend_superadmin/gyms/gym-detail-contract-snapshot.entity`
- `@/backend_superadmin/gyms/gym-detail-contract-snapshot.repository`
- `@/backend_superadmin/gyms/gyms-business-controls-response.dto`
- `@/backend_superadmin/gyms/gyms-command.controller`
- `@/backend_superadmin/gyms/gyms-lookup.controller`
- `@/backend_superadmin/gyms/gyms-query.controller`
- `@/backend_superadmin/gyms/gyms-special.controller`
- `@/backend_superadmin/gyms/gyms.entity`
- `@/backend_superadmin/gyms/gyms.mapper`
- `@/backend_superadmin/gyms/gyms.repository`
- `@/backend_superadmin/gyms/services/gyms-bulk-action.service`
- `@/backend_superadmin/gyms/services/gyms-business-controls.service`
- `@/backend_superadmin/gyms/services/gyms-create.service`
- `@/backend_superadmin/gyms/services/gyms-delete.service`
- `@/backend_superadmin/gyms/services/gyms-detail-business-overview.service`
- `@/backend_superadmin/gyms/services/gyms-find.service`
- `@/backend_superadmin/gyms/services/gyms-list.service`
- `@/backend_superadmin/gyms/services/gyms-lookup.service`
- `@/backend_superadmin/gyms/services/gyms-status.service`
- `@/backend_superadmin/gyms/services/gyms-update.service`
- `@/backend_superadmin/gyms/types/gyms.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.
- **Runtime Event Published**: `SUPERADMIN.TENANT.PROVISIONED` (registered in `core/events/event-registry.constants.ts`).

## Repair Addendum — Runtime Dependencies
- Infrastructure: Redis queue primitives via `SuperadminCoreDistributedJobQueueService`, ConfigService, protected export storage.
- Background Jobs: `superadmin:gyms-export`; terminal failures route to `superadmin:gyms-export:dlq`.
