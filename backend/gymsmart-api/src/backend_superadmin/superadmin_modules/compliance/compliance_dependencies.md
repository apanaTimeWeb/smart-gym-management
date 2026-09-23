# compliance Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/compliance/compliance-command.controller`
- `@/modules/backend_superadmin/compliance/compliance-query.controller`
- `@/modules/backend_superadmin/compliance/compliance-response-data.dto.ts`
- `@/modules/backend_superadmin/compliance/compliance-special.controller`
- `@/modules/backend_superadmin/compliance/compliance.constants`
- `@/modules/backend_superadmin/compliance/compliance.entity`
- `@/modules/backend_superadmin/compliance/compliance.mapper`
- `@/modules/backend_superadmin/compliance/compliance.repository`
- `@/modules/backend_superadmin/compliance/dtos/compliance-create.dto`
- `@/modules/backend_superadmin/compliance/dtos/compliance-query.dto`
- `@/modules/backend_superadmin/compliance/dtos/compliance-update.dto`
- `@/modules/backend_superadmin/compliance/services/compliance-create.service`
- `@/modules/backend_superadmin/compliance/services/compliance-delete.service`
- `@/modules/backend_superadmin/compliance/services/compliance-find.service`
- `@/modules/backend_superadmin/compliance/services/compliance-list.service`
- `@/modules/backend_superadmin/compliance/services/compliance-main.service`
- `@/modules/backend_superadmin/compliance/services/compliance-update.service`
- `@/modules/backend_superadmin/compliance/types/compliance.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.