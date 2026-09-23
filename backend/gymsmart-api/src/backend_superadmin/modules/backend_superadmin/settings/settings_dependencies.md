# settings Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/settings/dtos/settings-create.dto`
- `@/modules/backend_superadmin/settings/dtos/settings-query.dto`
- `@/modules/backend_superadmin/settings/dtos/settings-update.dto`
- `@/modules/backend_superadmin/settings/services/settings-create.service`
- `@/modules/backend_superadmin/settings/services/settings-delete.service`
- `@/modules/backend_superadmin/settings/services/settings-find.service`
- `@/modules/backend_superadmin/settings/services/settings-governance.service`
- `@/modules/backend_superadmin/settings/services/settings-list.service`
- `@/modules/backend_superadmin/settings/services/settings-update.service`
- `@/modules/backend_superadmin/settings/settings-command.controller`
- `@/modules/backend_superadmin/settings/settings-contract-snapshot.entity`
- `@/modules/backend_superadmin/settings/settings-contract-snapshot.repository`
- `@/modules/backend_superadmin/settings/settings-governance-response.dto.ts`
- `@/modules/backend_superadmin/settings/settings-query.controller`
- `@/modules/backend_superadmin/settings/settings-special.controller`
- `@/modules/backend_superadmin/settings/settings.constants`
- `@/modules/backend_superadmin/settings/settings.entity`
- `@/modules/backend_superadmin/settings/settings.mapper`
- `@/modules/backend_superadmin/settings/settings.repository`
- `@/modules/backend_superadmin/settings/types/settings.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.