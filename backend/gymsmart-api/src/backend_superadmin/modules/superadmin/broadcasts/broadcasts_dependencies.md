# broadcasts Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/broadcasts/broadcasts-audience-insights-response.dto.ts`
- `@/modules/backend_superadmin/broadcasts/broadcasts-command.controller`
- `@/modules/backend_superadmin/broadcasts/broadcasts-contract-snapshot.entity`
- `@/modules/backend_superadmin/broadcasts/broadcasts-contract-snapshot.repository`
- `@/modules/backend_superadmin/broadcasts/broadcasts-query.controller`
- `@/modules/backend_superadmin/broadcasts/broadcasts-special.controller`
- `@/modules/backend_superadmin/broadcasts/broadcasts.constants`
- `@/modules/backend_superadmin/broadcasts/broadcasts.entity`
- `@/modules/backend_superadmin/broadcasts/broadcasts.mapper`
- `@/modules/backend_superadmin/broadcasts/broadcasts.repository`
- `@/modules/backend_superadmin/broadcasts/dtos/broadcasts-create.dto`
- `@/modules/backend_superadmin/broadcasts/dtos/broadcasts-query.dto`
- `@/modules/backend_superadmin/broadcasts/dtos/broadcasts-update.dto`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-audience-insights.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-create.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-delete.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-find.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-list.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-status.service`
- `@/modules/backend_superadmin/broadcasts/services/broadcasts-update.service`
- `@/modules/backend_superadmin/broadcasts/types/broadcasts.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.