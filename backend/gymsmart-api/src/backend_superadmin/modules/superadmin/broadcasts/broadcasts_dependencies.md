# broadcasts Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/broadcasts/broadcasts-audience-insights-response.dto.ts`
- `@/modules/superadmin/broadcasts/broadcasts-command.controller`
- `@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.entity`
- `@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.repository`
- `@/modules/superadmin/broadcasts/broadcasts-query.controller`
- `@/modules/superadmin/broadcasts/broadcasts-special.controller`
- `@/modules/superadmin/broadcasts/broadcasts.constants`
- `@/modules/superadmin/broadcasts/broadcasts.entity`
- `@/modules/superadmin/broadcasts/broadcasts.mapper`
- `@/modules/superadmin/broadcasts/broadcasts.repository`
- `@/modules/superadmin/broadcasts/dtos/broadcasts-create.dto`
- `@/modules/superadmin/broadcasts/dtos/broadcasts-query.dto`
- `@/modules/superadmin/broadcasts/dtos/broadcasts-update.dto`
- `@/modules/superadmin/broadcasts/services/broadcasts-audience-insights.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-create.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-delete.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-find.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-list.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-status.service`
- `@/modules/superadmin/broadcasts/services/broadcasts-update.service`
- `@/modules/superadmin/broadcasts/types/broadcasts.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.