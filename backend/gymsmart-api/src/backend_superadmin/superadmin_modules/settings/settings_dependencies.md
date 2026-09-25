# settings Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/settings/dtos/settings-create.dto`
- `@/backend_superadmin/settings/dtos/settings-query.dto`
- `@/backend_superadmin/settings/dtos/settings-update.dto`
- `@/backend_superadmin/settings/services/settings-create.service`
- `@/backend_superadmin/settings/services/settings-delete.service`
- `@/backend_superadmin/settings/services/settings-find.service`
- `@/backend_superadmin/settings/services/settings-governance.service`
- `@/backend_superadmin/settings/services/settings-list.service`
- `@/backend_superadmin/settings/services/settings-update.service`
- `@/backend_superadmin/settings/settings-command.controller`
- `@/backend_superadmin/settings/settings-contract-snapshot.entity`
- `@/backend_superadmin/settings/settings-contract-snapshot.repository`
- `@/backend_superadmin/settings/settings-governance-response.dto.ts`
- `@/backend_superadmin/settings/settings-query.controller`
- `@/backend_superadmin/settings/settings-special.controller`
- `@/backend_superadmin/settings/settings.constants`
- `@/backend_superadmin/settings/settings.entity`
- `@/backend_superadmin/settings/settings.mapper`
- `@/backend_superadmin/settings/settings.repository`
- `@/backend_superadmin/settings/types/settings.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.