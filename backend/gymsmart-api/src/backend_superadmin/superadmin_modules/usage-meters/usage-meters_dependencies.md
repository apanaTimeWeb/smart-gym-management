# usage-meters Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/usage-meters/dtos/usage-meters-create.dto`
- `@/backend_superadmin/usage-meters/dtos/usage-meters-query.dto`
- `@/backend_superadmin/usage-meters/dtos/usage-meters-update.dto`
- `@/backend_superadmin/usage-meters/services/usage-meters-create.service`
- `@/backend_superadmin/usage-meters/services/usage-meters-delete.service`
- `@/backend_superadmin/usage-meters/services/usage-meters-find.service`
- `@/backend_superadmin/usage-meters/services/usage-meters-list.service`
- `@/backend_superadmin/usage-meters/services/usage-meters-main.service`
- `@/backend_superadmin/usage-meters/services/usage-meters-update.service`
- `@/backend_superadmin/usage-meters/types/usage-meters.interfaces`
- `@/backend_superadmin/usage-meters/usage-meters-command.controller`
- `@/backend_superadmin/usage-meters/usage-meters-query.controller`
- `@/backend_superadmin/usage-meters/usage-meters-special.controller`
- `@/backend_superadmin/usage-meters/usage-meters.entity`
- `@/backend_superadmin/usage-meters/usage-meters.mapper`
- `@/backend_superadmin/usage-meters/usage-meters.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.