# integrations Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/integrations/dtos/integrations-create.dto`
- `@/modules/backend_superadmin/integrations/dtos/integrations-query.dto`
- `@/modules/backend_superadmin/integrations/dtos/integrations-update.dto`
- `@/modules/backend_superadmin/integrations/integrations-command.controller`
- `@/modules/backend_superadmin/integrations/integrations-contract-snapshot.entity`
- `@/modules/backend_superadmin/integrations/integrations-contract-snapshot.repository`
- `@/modules/backend_superadmin/integrations/integrations-query.controller`
- `@/modules/backend_superadmin/integrations/integrations-special.controller`
- `@/modules/backend_superadmin/integrations/integrations.constants`
- `@/modules/backend_superadmin/integrations/integrations.entity`
- `@/modules/backend_superadmin/integrations/integrations.mapper`
- `@/modules/backend_superadmin/integrations/integrations.repository`
- `@/modules/backend_superadmin/integrations/services/integrations-create.service`
- `@/modules/backend_superadmin/integrations/services/integrations-delete.service`
- `@/modules/backend_superadmin/integrations/services/integrations-find.service`
- `@/modules/backend_superadmin/integrations/services/integrations-generate-key.service`
- `@/modules/backend_superadmin/integrations/services/integrations-list.service`
- `@/modules/backend_superadmin/integrations/services/integrations-main.service`
- `@/modules/backend_superadmin/integrations/services/integrations-status.service`
- `@/modules/backend_superadmin/integrations/services/integrations-update.service`
- `@/modules/backend_superadmin/integrations/types/integrations.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.