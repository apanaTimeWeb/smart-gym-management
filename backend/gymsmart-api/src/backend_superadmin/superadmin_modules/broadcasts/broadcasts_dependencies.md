# broadcasts Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/broadcasts/broadcasts-audience-insights-response.dto.ts`
- `@/backend_superadmin/broadcasts/broadcasts-command.controller`
- `@/backend_superadmin/broadcasts/broadcasts-contract-snapshot.entity`
- `@/backend_superadmin/broadcasts/broadcasts-contract-snapshot.repository`
- `@/backend_superadmin/broadcasts/broadcasts-query.controller`
- `@/backend_superadmin/broadcasts/broadcasts-special.controller`
- `@/backend_superadmin/broadcasts/broadcasts.constants`
- `@/backend_superadmin/broadcasts/broadcasts.entity`
- `@/backend_superadmin/broadcasts/broadcasts.mapper`
- `@/backend_superadmin/broadcasts/broadcasts.repository`
- `@/backend_superadmin/broadcasts/dtos/broadcasts-create.dto`
- `@/backend_superadmin/broadcasts/dtos/broadcasts-query.dto`
- `@/backend_superadmin/broadcasts/dtos/broadcasts-update.dto`
- `@/backend_superadmin/broadcasts/services/broadcasts-audience-insights.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-create.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-delete.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-find.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-list.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-status.service`
- `@/backend_superadmin/broadcasts/services/broadcasts-update.service`
- `@/backend_superadmin/broadcasts/types/broadcasts.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.