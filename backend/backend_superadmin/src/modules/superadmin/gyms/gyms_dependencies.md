# gyms Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto`
- `@/modules/superadmin/gyms/dtos/gyms-create.dto`
- `@/modules/superadmin/gyms/dtos/gyms-query.dto`
- `@/modules/superadmin/gyms/dtos/gyms-update.dto`
- `@/modules/superadmin/gyms/gym-detail-business-overview-response.dto`
- `@/modules/superadmin/gyms/gym-detail-contract-snapshot.entity`
- `@/modules/superadmin/gyms/gym-detail-contract-snapshot.repository`
- `@/modules/superadmin/gyms/gyms-business-controls-response.dto`
- `@/modules/superadmin/gyms/gyms-command.controller`
- `@/modules/superadmin/gyms/gyms-lookup.controller`
- `@/modules/superadmin/gyms/gyms-query.controller`
- `@/modules/superadmin/gyms/gyms-special.controller`
- `@/modules/superadmin/gyms/gyms.entity`
- `@/modules/superadmin/gyms/gyms.mapper`
- `@/modules/superadmin/gyms/gyms.repository`
- `@/modules/superadmin/gyms/services/gyms-bulk-action.service`
- `@/modules/superadmin/gyms/services/gyms-business-controls.service`
- `@/modules/superadmin/gyms/services/gyms-create.service`
- `@/modules/superadmin/gyms/services/gyms-delete.service`
- `@/modules/superadmin/gyms/services/gyms-detail-business-overview.service`
- `@/modules/superadmin/gyms/services/gyms-find.service`
- `@/modules/superadmin/gyms/services/gyms-list.service`
- `@/modules/superadmin/gyms/services/gyms-lookup.service`
- `@/modules/superadmin/gyms/services/gyms-status.service`
- `@/modules/superadmin/gyms/services/gyms-update.service`
- `@/modules/superadmin/gyms/types/gyms.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.