# profile Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/profile/dtos/profile-create.dto`
- `@/modules/backend_superadmin/profile/dtos/profile-query.dto`
- `@/modules/backend_superadmin/profile/dtos/profile-update.dto`
- `@/modules/backend_superadmin/profile/profile-command.controller`
- `@/modules/backend_superadmin/profile/profile-query.controller`
- `@/modules/backend_superadmin/profile/profile-special.controller`
- `@/modules/backend_superadmin/profile/profile.entity`
- `@/modules/backend_superadmin/profile/profile.mapper`
- `@/modules/backend_superadmin/profile/profile.repository`
- `@/modules/backend_superadmin/profile/services/profile-create.service`
- `@/modules/backend_superadmin/profile/services/profile-delete.service`
- `@/modules/backend_superadmin/profile/services/profile-find.service`
- `@/modules/backend_superadmin/profile/services/profile-list.service`
- `@/modules/backend_superadmin/profile/services/profile-main.service`
- `@/modules/backend_superadmin/profile/services/profile-password.service`
- `@/modules/backend_superadmin/profile/services/profile-two-factor.service`
- `@/modules/backend_superadmin/profile/services/profile-update.service`
- `@/modules/backend_superadmin/profile/types/profile.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.