# dashboard Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/dashboard/dashboard-business-overview-response.dto.ts`
- `@/modules/backend_superadmin/dashboard/dashboard-command.controller`
- `@/modules/backend_superadmin/dashboard/dashboard-query.controller`
- `@/modules/backend_superadmin/dashboard/dashboard-special.controller`
- `@/modules/backend_superadmin/dashboard/dashboard.constants`
- `@/modules/backend_superadmin/dashboard/dashboard.entity`
- `@/modules/backend_superadmin/dashboard/dashboard.mapper`
- `@/modules/backend_superadmin/dashboard/dashboard.repository`
- `@/modules/backend_superadmin/dashboard/dtos/dashboard-create.dto`
- `@/modules/backend_superadmin/dashboard/dtos/dashboard-query.dto`
- `@/modules/backend_superadmin/dashboard/dtos/dashboard-update.dto`
- `@/modules/backend_superadmin/dashboard/services/dashboard-business-overview.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-create.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-delete.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-find.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-list.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-main.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-metrics.service`
- `@/modules/backend_superadmin/dashboard/services/dashboard-update.service`
- `@/modules/backend_superadmin/dashboard/types/dashboard.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.