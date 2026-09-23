# features Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/features/dtos/features-create.dto`
- `@/modules/backend_superadmin/features/dtos/features-query.dto`
- `@/modules/backend_superadmin/features/dtos/features-update.dto`
- `@/modules/backend_superadmin/features/features-command.controller`
- `@/modules/backend_superadmin/features/features-contract-snapshot.entity`
- `@/modules/backend_superadmin/features/features-contract-snapshot.repository`
- `@/modules/backend_superadmin/features/features-query.controller`
- `@/modules/backend_superadmin/features/features-rollout-insights-response.dto.ts`
- `@/modules/backend_superadmin/features/features-special.controller`
- `@/modules/backend_superadmin/features/features.constants`
- `@/modules/backend_superadmin/features/features.entity`
- `@/modules/backend_superadmin/features/features.mapper`
- `@/modules/backend_superadmin/features/features.repository`
- `@/modules/backend_superadmin/features/services/features-create.service`
- `@/modules/backend_superadmin/features/services/features-delete.service`
- `@/modules/backend_superadmin/features/services/features-find.service`
- `@/modules/backend_superadmin/features/services/features-list.service`
- `@/modules/backend_superadmin/features/services/features-main.service`
- `@/modules/backend_superadmin/features/services/features-rollout-insights.service`
- `@/modules/backend_superadmin/features/services/features-update.service`
- `@/modules/backend_superadmin/features/types/features.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.