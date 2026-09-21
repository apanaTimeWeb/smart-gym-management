# features Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/features/dtos/features-create.dto`
- `@/modules/superadmin/features/dtos/features-query.dto`
- `@/modules/superadmin/features/dtos/features-update.dto`
- `@/modules/superadmin/features/features-command.controller`
- `@/modules/superadmin/features/features-contract-snapshot.entity`
- `@/modules/superadmin/features/features-contract-snapshot.repository`
- `@/modules/superadmin/features/features-query.controller`
- `@/modules/superadmin/features/features-rollout-insights-response.dto.ts`
- `@/modules/superadmin/features/features-special.controller`
- `@/modules/superadmin/features/features.constants`
- `@/modules/superadmin/features/features.entity`
- `@/modules/superadmin/features/features.mapper`
- `@/modules/superadmin/features/features.repository`
- `@/modules/superadmin/features/services/features-create.service`
- `@/modules/superadmin/features/services/features-delete.service`
- `@/modules/superadmin/features/services/features-find.service`
- `@/modules/superadmin/features/services/features-list.service`
- `@/modules/superadmin/features/services/features-main.service`
- `@/modules/superadmin/features/services/features-rollout-insights.service`
- `@/modules/superadmin/features/services/features-update.service`
- `@/modules/superadmin/features/types/features.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.