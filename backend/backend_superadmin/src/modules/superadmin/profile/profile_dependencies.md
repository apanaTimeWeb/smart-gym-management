# profile Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/profile/dtos/profile-create.dto`
- `@/modules/superadmin/profile/dtos/profile-query.dto`
- `@/modules/superadmin/profile/dtos/profile-update.dto`
- `@/modules/superadmin/profile/profile-command.controller`
- `@/modules/superadmin/profile/profile-query.controller`
- `@/modules/superadmin/profile/profile-special.controller`
- `@/modules/superadmin/profile/profile.entity`
- `@/modules/superadmin/profile/profile.mapper`
- `@/modules/superadmin/profile/profile.repository`
- `@/modules/superadmin/profile/services/profile-create.service`
- `@/modules/superadmin/profile/services/profile-delete.service`
- `@/modules/superadmin/profile/services/profile-find.service`
- `@/modules/superadmin/profile/services/profile-list.service`
- `@/modules/superadmin/profile/services/profile-main.service`
- `@/modules/superadmin/profile/services/profile-password.service`
- `@/modules/superadmin/profile/services/profile-two-factor.service`
- `@/modules/superadmin/profile/services/profile-update.service`
- `@/modules/superadmin/profile/types/profile.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.