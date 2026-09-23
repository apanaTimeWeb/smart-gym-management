# team Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/team/dtos/team-create.dto`
- `@/modules/backend_superadmin/team/dtos/team-query.dto`
- `@/modules/backend_superadmin/team/dtos/team-update.dto`
- `@/modules/backend_superadmin/team/services/team-alerts.service`
- `@/modules/backend_superadmin/team/services/team-create.service`
- `@/modules/backend_superadmin/team/services/team-delete.service`
- `@/modules/backend_superadmin/team/services/team-find.service`
- `@/modules/backend_superadmin/team/services/team-list.service`
- `@/modules/backend_superadmin/team/services/team-main.service`
- `@/modules/backend_superadmin/team/services/team-update.service`
- `@/modules/backend_superadmin/team/team-command.controller`
- `@/modules/backend_superadmin/team/team-query.controller`
- `@/modules/backend_superadmin/team/team-special.controller`
- `@/modules/backend_superadmin/team/team.constants`
- `@/modules/backend_superadmin/team/team.entity`
- `@/modules/backend_superadmin/team/team.mapper`
- `@/modules/backend_superadmin/team/team.repository`
- `@/modules/backend_superadmin/team/types/team.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.