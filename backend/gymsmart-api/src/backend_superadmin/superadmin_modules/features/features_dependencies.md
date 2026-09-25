# features Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/features/dtos/features-create.dto`
- `@/backend_superadmin/features/dtos/features-query.dto`
- `@/backend_superadmin/features/dtos/features-update.dto`
- `@/backend_superadmin/features/features-command.controller`
- `@/backend_superadmin/features/features-contract-snapshot.entity`
- `@/backend_superadmin/features/features-contract-snapshot.repository`
- `@/backend_superadmin/features/features-query.controller`
- `@/backend_superadmin/features/features-rollout-insights-response.dto.ts`
- `@/backend_superadmin/features/features-special.controller`
- `@/backend_superadmin/features/features.constants`
- `@/backend_superadmin/features/features.entity`
- `@/backend_superadmin/features/features.mapper`
- `@/backend_superadmin/features/features.repository`
- `@/backend_superadmin/features/services/features-create.service`
- `@/backend_superadmin/features/services/features-delete.service`
- `@/backend_superadmin/features/services/features-find.service`
- `@/backend_superadmin/features/services/features-list.service`
- `@/backend_superadmin/features/services/features-main.service`
- `@/backend_superadmin/features/services/features-rollout-insights.service`
- `@/backend_superadmin/features/services/features-update.service`
- `@/backend_superadmin/features/types/features.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.