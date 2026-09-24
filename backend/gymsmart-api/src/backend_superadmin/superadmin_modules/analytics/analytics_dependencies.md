# analytics Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/analytics/analytics-command.controller`
- `@/backend_superadmin/analytics/analytics-query.controller`
- `@/backend_superadmin/analytics/analytics-retention-insights-response.dto.ts`
- `@/backend_superadmin/analytics/analytics-special.controller`
- `@/backend_superadmin/analytics/analytics.constants`
- `@/backend_superadmin/analytics/analytics.entity`
- `@/backend_superadmin/analytics/analytics.mapper`
- `@/backend_superadmin/analytics/analytics.repository`
- `@/backend_superadmin/analytics/dtos/analytics-create.dto`
- `@/backend_superadmin/analytics/dtos/analytics-query.dto`
- `@/backend_superadmin/analytics/dtos/analytics-update.dto`
- `@/backend_superadmin/analytics/services/analytics-create.service`
- `@/backend_superadmin/analytics/services/analytics-delete.service`
- `@/backend_superadmin/analytics/services/analytics-find.service`
- `@/backend_superadmin/analytics/services/analytics-list.service`
- `@/backend_superadmin/analytics/services/analytics-main.service`
- `@/backend_superadmin/analytics/services/analytics-retention-insights.service`
- `@/backend_superadmin/analytics/services/analytics-update.service`
- `@/backend_superadmin/analytics/types/analytics.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.