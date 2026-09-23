# affiliates Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/affiliates/affiliates-command.controller`
- `@/modules/backend_superadmin/affiliates/affiliates-query.controller`
- `@/modules/backend_superadmin/affiliates/affiliates.entity`
- `@/modules/backend_superadmin/affiliates/affiliates.mapper`
- `@/modules/backend_superadmin/affiliates/affiliates.repository`
- `@/modules/backend_superadmin/affiliates/dtos/affiliates-create.dto`
- `@/modules/backend_superadmin/affiliates/dtos/affiliates-query.dto`
- `@/modules/backend_superadmin/affiliates/dtos/affiliates-update.dto`
- `@/modules/backend_superadmin/affiliates/services/affiliates-create.service`
- `@/modules/backend_superadmin/affiliates/services/affiliates-delete.service`
- `@/modules/backend_superadmin/affiliates/services/affiliates-find.service`
- `@/modules/backend_superadmin/affiliates/services/affiliates-list.service`
- `@/modules/backend_superadmin/affiliates/services/affiliates-status.service`
- `@/modules/backend_superadmin/affiliates/services/affiliates-update.service`
- `@/modules/backend_superadmin/affiliates/types/affiliates.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.