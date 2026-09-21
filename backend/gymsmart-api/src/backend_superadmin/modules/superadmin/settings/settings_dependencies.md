# settings Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/settings/dtos/settings-create.dto`
- `@/modules/superadmin/settings/dtos/settings-query.dto`
- `@/modules/superadmin/settings/dtos/settings-update.dto`
- `@/modules/superadmin/settings/services/settings-create.service`
- `@/modules/superadmin/settings/services/settings-delete.service`
- `@/modules/superadmin/settings/services/settings-find.service`
- `@/modules/superadmin/settings/services/settings-governance.service`
- `@/modules/superadmin/settings/services/settings-list.service`
- `@/modules/superadmin/settings/services/settings-update.service`
- `@/modules/superadmin/settings/settings-command.controller`
- `@/modules/superadmin/settings/settings-contract-snapshot.entity`
- `@/modules/superadmin/settings/settings-contract-snapshot.repository`
- `@/modules/superadmin/settings/settings-governance-response.dto.ts`
- `@/modules/superadmin/settings/settings-query.controller`
- `@/modules/superadmin/settings/settings-special.controller`
- `@/modules/superadmin/settings/settings.constants`
- `@/modules/superadmin/settings/settings.entity`
- `@/modules/superadmin/settings/settings.mapper`
- `@/modules/superadmin/settings/settings.repository`
- `@/modules/superadmin/settings/types/settings.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.