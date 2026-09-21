# analytics Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/analytics/analytics-command.controller`
- `@/modules/superadmin/analytics/analytics-query.controller`
- `@/modules/superadmin/analytics/analytics-retention-insights-response.dto.ts`
- `@/modules/superadmin/analytics/analytics-special.controller`
- `@/modules/superadmin/analytics/analytics.constants`
- `@/modules/superadmin/analytics/analytics.entity`
- `@/modules/superadmin/analytics/analytics.mapper`
- `@/modules/superadmin/analytics/analytics.repository`
- `@/modules/superadmin/analytics/dtos/analytics-create.dto`
- `@/modules/superadmin/analytics/dtos/analytics-query.dto`
- `@/modules/superadmin/analytics/dtos/analytics-update.dto`
- `@/modules/superadmin/analytics/services/analytics-create.service`
- `@/modules/superadmin/analytics/services/analytics-delete.service`
- `@/modules/superadmin/analytics/services/analytics-find.service`
- `@/modules/superadmin/analytics/services/analytics-list.service`
- `@/modules/superadmin/analytics/services/analytics-main.service`
- `@/modules/superadmin/analytics/services/analytics-retention-insights.service`
- `@/modules/superadmin/analytics/services/analytics-update.service`
- `@/modules/superadmin/analytics/types/analytics.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.