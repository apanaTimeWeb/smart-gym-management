# integrations Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/integrations/dtos/integrations-create.dto`
- `@/backend_superadmin/integrations/dtos/integrations-query.dto`
- `@/backend_superadmin/integrations/dtos/integrations-update.dto`
- `@/backend_superadmin/integrations/integrations-command.controller`
- `@/backend_superadmin/integrations/integrations-contract-snapshot.entity`
- `@/backend_superadmin/integrations/integrations-contract-snapshot.repository`
- `@/backend_superadmin/integrations/integrations-query.controller`
- `@/backend_superadmin/integrations/integrations-special.controller`
- `@/backend_superadmin/integrations/integrations.constants`
- `@/backend_superadmin/integrations/integrations.entity`
- `@/backend_superadmin/integrations/integrations.mapper`
- `@/backend_superadmin/integrations/integrations.repository`
- `@/backend_superadmin/integrations/services/integrations-create.service`
- `@/backend_superadmin/integrations/services/integrations-delete.service`
- `@/backend_superadmin/integrations/services/integrations-find.service`
- `@/backend_superadmin/integrations/services/integrations-generate-key.service`
- `@/backend_superadmin/integrations/services/integrations-list.service`
- `@/backend_superadmin/integrations/services/integrations-main.service`
- `@/backend_superadmin/integrations/services/integrations-status.service`
- `@/backend_superadmin/integrations/services/integrations-update.service`
- `@/backend_superadmin/integrations/types/integrations.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.