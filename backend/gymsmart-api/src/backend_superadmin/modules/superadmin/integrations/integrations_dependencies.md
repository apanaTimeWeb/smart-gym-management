# integrations Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/integrations/dtos/integrations-create.dto`
- `@/modules/superadmin/integrations/dtos/integrations-query.dto`
- `@/modules/superadmin/integrations/dtos/integrations-update.dto`
- `@/modules/superadmin/integrations/integrations-command.controller`
- `@/modules/superadmin/integrations/integrations-contract-snapshot.entity`
- `@/modules/superadmin/integrations/integrations-contract-snapshot.repository`
- `@/modules/superadmin/integrations/integrations-query.controller`
- `@/modules/superadmin/integrations/integrations-special.controller`
- `@/modules/superadmin/integrations/integrations.constants`
- `@/modules/superadmin/integrations/integrations.entity`
- `@/modules/superadmin/integrations/integrations.mapper`
- `@/modules/superadmin/integrations/integrations.repository`
- `@/modules/superadmin/integrations/services/integrations-create.service`
- `@/modules/superadmin/integrations/services/integrations-delete.service`
- `@/modules/superadmin/integrations/services/integrations-find.service`
- `@/modules/superadmin/integrations/services/integrations-generate-key.service`
- `@/modules/superadmin/integrations/services/integrations-list.service`
- `@/modules/superadmin/integrations/services/integrations-main.service`
- `@/modules/superadmin/integrations/services/integrations-status.service`
- `@/modules/superadmin/integrations/services/integrations-update.service`
- `@/modules/superadmin/integrations/types/integrations.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.