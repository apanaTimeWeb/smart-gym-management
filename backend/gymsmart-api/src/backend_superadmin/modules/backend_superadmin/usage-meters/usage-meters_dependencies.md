# usage-meters Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/usage-meters/dtos/usage-meters-create.dto`
- `@/modules/backend_superadmin/usage-meters/dtos/usage-meters-query.dto`
- `@/modules/backend_superadmin/usage-meters/dtos/usage-meters-update.dto`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-create.service`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-delete.service`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-find.service`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-list.service`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-main.service`
- `@/modules/backend_superadmin/usage-meters/services/usage-meters-update.service`
- `@/modules/backend_superadmin/usage-meters/types/usage-meters.interfaces`
- `@/modules/backend_superadmin/usage-meters/usage-meters-command.controller`
- `@/modules/backend_superadmin/usage-meters/usage-meters-query.controller`
- `@/modules/backend_superadmin/usage-meters/usage-meters-special.controller`
- `@/modules/backend_superadmin/usage-meters/usage-meters.entity`
- `@/modules/backend_superadmin/usage-meters/usage-meters.mapper`
- `@/modules/backend_superadmin/usage-meters/usage-meters.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.