# affiliates Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/affiliates/affiliates-command.controller`
- `@/modules/superadmin/affiliates/affiliates-query.controller`
- `@/modules/superadmin/affiliates/affiliates.entity`
- `@/modules/superadmin/affiliates/affiliates.mapper`
- `@/modules/superadmin/affiliates/affiliates.repository`
- `@/modules/superadmin/affiliates/dtos/affiliates-create.dto`
- `@/modules/superadmin/affiliates/dtos/affiliates-query.dto`
- `@/modules/superadmin/affiliates/dtos/affiliates-update.dto`
- `@/modules/superadmin/affiliates/services/affiliates-create.service`
- `@/modules/superadmin/affiliates/services/affiliates-delete.service`
- `@/modules/superadmin/affiliates/services/affiliates-find.service`
- `@/modules/superadmin/affiliates/services/affiliates-list.service`
- `@/modules/superadmin/affiliates/services/affiliates-status.service`
- `@/modules/superadmin/affiliates/services/affiliates-update.service`
- `@/modules/superadmin/affiliates/types/affiliates.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.