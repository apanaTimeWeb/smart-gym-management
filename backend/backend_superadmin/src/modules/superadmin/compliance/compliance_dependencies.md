# compliance Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/compliance/compliance-command.controller`
- `@/modules/superadmin/compliance/compliance-query.controller`
- `@/modules/superadmin/compliance/compliance-response-data.dto.ts`
- `@/modules/superadmin/compliance/compliance-special.controller`
- `@/modules/superadmin/compliance/compliance.constants`
- `@/modules/superadmin/compliance/compliance.entity`
- `@/modules/superadmin/compliance/compliance.mapper`
- `@/modules/superadmin/compliance/compliance.repository`
- `@/modules/superadmin/compliance/dtos/compliance-create.dto`
- `@/modules/superadmin/compliance/dtos/compliance-query.dto`
- `@/modules/superadmin/compliance/dtos/compliance-update.dto`
- `@/modules/superadmin/compliance/services/compliance-create.service`
- `@/modules/superadmin/compliance/services/compliance-delete.service`
- `@/modules/superadmin/compliance/services/compliance-find.service`
- `@/modules/superadmin/compliance/services/compliance-list.service`
- `@/modules/superadmin/compliance/services/compliance-main.service`
- `@/modules/superadmin/compliance/services/compliance-update.service`
- `@/modules/superadmin/compliance/types/compliance.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.