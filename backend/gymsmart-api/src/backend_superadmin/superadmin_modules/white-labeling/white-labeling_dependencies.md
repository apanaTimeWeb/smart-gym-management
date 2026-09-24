# white-labeling Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/white-labeling/dtos/white-labeling-create.dto`
- `@/backend_superadmin/white-labeling/dtos/white-labeling-query.dto`
- `@/backend_superadmin/white-labeling/dtos/white-labeling-update.dto`
- `@/backend_superadmin/white-labeling/services/white-labeling-create.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-delete.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-domains.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-find.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-list.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-status.service`
- `@/backend_superadmin/white-labeling/services/white-labeling-update.service`
- `@/backend_superadmin/white-labeling/types/white-labeling.interfaces`
- `@/backend_superadmin/white-labeling/white-labeling-command.controller`
- `@/backend_superadmin/white-labeling/white-labeling-query.controller`
- `@/backend_superadmin/white-labeling/white-labeling-special.controller`
- `@/backend_superadmin/white-labeling/white-labeling.entity`
- `@/backend_superadmin/white-labeling/white-labeling.mapper`
- `@/backend_superadmin/white-labeling/white-labeling.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.