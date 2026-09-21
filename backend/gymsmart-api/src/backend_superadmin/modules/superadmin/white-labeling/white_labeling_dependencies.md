# white-labeling Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/white-labeling/dtos/white-labeling-create.dto`
- `@/modules/superadmin/white-labeling/dtos/white-labeling-query.dto`
- `@/modules/superadmin/white-labeling/dtos/white-labeling-update.dto`
- `@/modules/superadmin/white-labeling/services/white-labeling-create.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-delete.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-domains.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-find.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-list.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-status.service`
- `@/modules/superadmin/white-labeling/services/white-labeling-update.service`
- `@/modules/superadmin/white-labeling/types/white-labeling.interfaces`
- `@/modules/superadmin/white-labeling/white-labeling-command.controller`
- `@/modules/superadmin/white-labeling/white-labeling-query.controller`
- `@/modules/superadmin/white-labeling/white-labeling-special.controller`
- `@/modules/superadmin/white-labeling/white-labeling.entity`
- `@/modules/superadmin/white-labeling/white-labeling.mapper`
- `@/modules/superadmin/white-labeling/white-labeling.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.