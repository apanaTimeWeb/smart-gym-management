# profile Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/profile/dtos/profile-create.dto`
- `@/backend_superadmin/profile/dtos/profile-query.dto`
- `@/backend_superadmin/profile/dtos/profile-update.dto`
- `@/backend_superadmin/profile/profile-command.controller`
- `@/backend_superadmin/profile/profile-query.controller`
- `@/backend_superadmin/profile/profile-special.controller`
- `@/backend_superadmin/profile/profile.entity`
- `@/backend_superadmin/profile/profile.mapper`
- `@/backend_superadmin/profile/profile.repository`
- `@/backend_superadmin/profile/services/profile-create.service`
- `@/backend_superadmin/profile/services/profile-delete.service`
- `@/backend_superadmin/profile/services/profile-find.service`
- `@/backend_superadmin/profile/services/profile-list.service`
- `@/backend_superadmin/profile/services/profile-main.service`
- `@/backend_superadmin/profile/services/profile-password.service`
- `@/backend_superadmin/profile/services/profile-two-factor.service`
- `@/backend_superadmin/profile/services/profile-update.service`
- `@/backend_superadmin/profile/types/profile.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.