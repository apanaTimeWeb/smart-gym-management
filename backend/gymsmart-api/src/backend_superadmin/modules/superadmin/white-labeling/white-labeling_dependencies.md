# white-labeling Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/white-labeling/dtos/white-labeling-create.dto`
- `@/modules/backend_superadmin/white-labeling/dtos/white-labeling-query.dto`
- `@/modules/backend_superadmin/white-labeling/dtos/white-labeling-update.dto`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-create.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-delete.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-domains.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-find.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-list.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-status.service`
- `@/modules/backend_superadmin/white-labeling/services/white-labeling-update.service`
- `@/modules/backend_superadmin/white-labeling/types/white-labeling.interfaces`
- `@/modules/backend_superadmin/white-labeling/white-labeling-command.controller`
- `@/modules/backend_superadmin/white-labeling/white-labeling-query.controller`
- `@/modules/backend_superadmin/white-labeling/white-labeling-special.controller`
- `@/modules/backend_superadmin/white-labeling/white-labeling.entity`
- `@/modules/backend_superadmin/white-labeling/white-labeling.mapper`
- `@/modules/backend_superadmin/white-labeling/white-labeling.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.