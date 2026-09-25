# compliance Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/compliance/compliance-command.controller`
- `@/backend_superadmin/compliance/compliance-query.controller`
- `@/backend_superadmin/compliance/compliance-response-data.dto.ts`
- `@/backend_superadmin/compliance/compliance-special.controller`
- `@/backend_superadmin/compliance/compliance.constants`
- `@/backend_superadmin/compliance/compliance.entity`
- `@/backend_superadmin/compliance/compliance.mapper`
- `@/backend_superadmin/compliance/compliance.repository`
- `@/backend_superadmin/compliance/dtos/compliance-create.dto`
- `@/backend_superadmin/compliance/dtos/compliance-query.dto`
- `@/backend_superadmin/compliance/dtos/compliance-update.dto`
- `@/backend_superadmin/compliance/services/compliance-create.service`
- `@/backend_superadmin/compliance/services/compliance-delete.service`
- `@/backend_superadmin/compliance/services/compliance-find.service`
- `@/backend_superadmin/compliance/services/compliance-list.service`
- `@/backend_superadmin/compliance/services/compliance-main.service`
- `@/backend_superadmin/compliance/services/compliance-update.service`
- `@/backend_superadmin/compliance/types/compliance.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.