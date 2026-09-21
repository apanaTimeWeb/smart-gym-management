# dashboard Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/dashboard/dashboard-business-overview-response.dto.ts`
- `@/modules/superadmin/dashboard/dashboard-command.controller`
- `@/modules/superadmin/dashboard/dashboard-query.controller`
- `@/modules/superadmin/dashboard/dashboard-special.controller`
- `@/modules/superadmin/dashboard/dashboard.constants`
- `@/modules/superadmin/dashboard/dashboard.entity`
- `@/modules/superadmin/dashboard/dashboard.mapper`
- `@/modules/superadmin/dashboard/dashboard.repository`
- `@/modules/superadmin/dashboard/dtos/dashboard-create.dto`
- `@/modules/superadmin/dashboard/dtos/dashboard-query.dto`
- `@/modules/superadmin/dashboard/dtos/dashboard-update.dto`
- `@/modules/superadmin/dashboard/services/dashboard-business-overview.service`
- `@/modules/superadmin/dashboard/services/dashboard-create.service`
- `@/modules/superadmin/dashboard/services/dashboard-delete.service`
- `@/modules/superadmin/dashboard/services/dashboard-find.service`
- `@/modules/superadmin/dashboard/services/dashboard-list.service`
- `@/modules/superadmin/dashboard/services/dashboard-main.service`
- `@/modules/superadmin/dashboard/services/dashboard-metrics.service`
- `@/modules/superadmin/dashboard/services/dashboard-update.service`
- `@/modules/superadmin/dashboard/types/dashboard.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.