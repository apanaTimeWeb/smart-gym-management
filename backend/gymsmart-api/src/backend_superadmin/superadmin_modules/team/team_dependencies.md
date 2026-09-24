# team Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/team/dtos/team-create.dto`
- `@/backend_superadmin/team/dtos/team-query.dto`
- `@/backend_superadmin/team/dtos/team-update.dto`
- `@/backend_superadmin/team/services/team-alerts.service`
- `@/backend_superadmin/team/services/team-create.service`
- `@/backend_superadmin/team/services/team-delete.service`
- `@/backend_superadmin/team/services/team-find.service`
- `@/backend_superadmin/team/services/team-list.service`
- `@/backend_superadmin/team/services/team-main.service`
- `@/backend_superadmin/team/services/team-update.service`
- `@/backend_superadmin/team/team-command.controller`
- `@/backend_superadmin/team/team-query.controller`
- `@/backend_superadmin/team/team-special.controller`
- `@/backend_superadmin/team/team.constants`
- `@/backend_superadmin/team/team.entity`
- `@/backend_superadmin/team/team.mapper`
- `@/backend_superadmin/team/team.repository`
- `@/backend_superadmin/team/types/team.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.