# gyms Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto`
- `@/modules/backend_superadmin/gyms/dtos/gyms-create.dto`
- `@/modules/backend_superadmin/gyms/dtos/gyms-query.dto`
- `@/modules/backend_superadmin/gyms/dtos/gyms-update.dto`
- `@/modules/backend_superadmin/gyms/gym-detail-business-overview-response.dto`
- `@/modules/backend_superadmin/gyms/gym-detail-contract-snapshot.entity`
- `@/modules/backend_superadmin/gyms/gym-detail-contract-snapshot.repository`
- `@/modules/backend_superadmin/gyms/gyms-business-controls-response.dto`
- `@/modules/backend_superadmin/gyms/gyms-command.controller`
- `@/modules/backend_superadmin/gyms/gyms-lookup.controller`
- `@/modules/backend_superadmin/gyms/gyms-query.controller`
- `@/modules/backend_superadmin/gyms/gyms-special.controller`
- `@/modules/backend_superadmin/gyms/gyms.entity`
- `@/modules/backend_superadmin/gyms/gyms.mapper`
- `@/modules/backend_superadmin/gyms/gyms.repository`
- `@/modules/backend_superadmin/gyms/services/gyms-bulk-action.service`
- `@/modules/backend_superadmin/gyms/services/gyms-business-controls.service`
- `@/modules/backend_superadmin/gyms/services/gyms-create.service`
- `@/modules/backend_superadmin/gyms/services/gyms-delete.service`
- `@/modules/backend_superadmin/gyms/services/gyms-detail-business-overview.service`
- `@/modules/backend_superadmin/gyms/services/gyms-find.service`
- `@/modules/backend_superadmin/gyms/services/gyms-list.service`
- `@/modules/backend_superadmin/gyms/services/gyms-lookup.service`
- `@/modules/backend_superadmin/gyms/services/gyms-status.service`
- `@/modules/backend_superadmin/gyms/services/gyms-update.service`
- `@/modules/backend_superadmin/gyms/types/gyms.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.
- **Runtime Event Published**: `SUPERADMIN.TENANT.PROVISIONED` (registered in `core/events/event-registry.constants.ts`).
