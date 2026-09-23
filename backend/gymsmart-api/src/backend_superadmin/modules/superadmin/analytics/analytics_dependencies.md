# analytics Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/analytics/analytics-command.controller`
- `@/modules/backend_superadmin/analytics/analytics-query.controller`
- `@/modules/backend_superadmin/analytics/analytics-retention-insights-response.dto.ts`
- `@/modules/backend_superadmin/analytics/analytics-special.controller`
- `@/modules/backend_superadmin/analytics/analytics.constants`
- `@/modules/backend_superadmin/analytics/analytics.entity`
- `@/modules/backend_superadmin/analytics/analytics.mapper`
- `@/modules/backend_superadmin/analytics/analytics.repository`
- `@/modules/backend_superadmin/analytics/dtos/analytics-create.dto`
- `@/modules/backend_superadmin/analytics/dtos/analytics-query.dto`
- `@/modules/backend_superadmin/analytics/dtos/analytics-update.dto`
- `@/modules/backend_superadmin/analytics/services/analytics-create.service`
- `@/modules/backend_superadmin/analytics/services/analytics-delete.service`
- `@/modules/backend_superadmin/analytics/services/analytics-find.service`
- `@/modules/backend_superadmin/analytics/services/analytics-list.service`
- `@/modules/backend_superadmin/analytics/services/analytics-main.service`
- `@/modules/backend_superadmin/analytics/services/analytics-retention-insights.service`
- `@/modules/backend_superadmin/analytics/services/analytics-update.service`
- `@/modules/backend_superadmin/analytics/types/analytics.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.