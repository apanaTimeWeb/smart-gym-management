# team Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/team/dtos/team-create.dto`
- `@/modules/superadmin/team/dtos/team-query.dto`
- `@/modules/superadmin/team/dtos/team-update.dto`
- `@/modules/superadmin/team/services/team-alerts.service`
- `@/modules/superadmin/team/services/team-create.service`
- `@/modules/superadmin/team/services/team-delete.service`
- `@/modules/superadmin/team/services/team-find.service`
- `@/modules/superadmin/team/services/team-list.service`
- `@/modules/superadmin/team/services/team-main.service`
- `@/modules/superadmin/team/services/team-update.service`
- `@/modules/superadmin/team/team-command.controller`
- `@/modules/superadmin/team/team-query.controller`
- `@/modules/superadmin/team/team-special.controller`
- `@/modules/superadmin/team/team.constants`
- `@/modules/superadmin/team/team.entity`
- `@/modules/superadmin/team/team.mapper`
- `@/modules/superadmin/team/team.repository`
- `@/modules/superadmin/team/types/team.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.