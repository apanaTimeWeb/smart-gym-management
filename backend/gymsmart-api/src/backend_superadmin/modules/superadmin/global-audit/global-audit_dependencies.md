# global-audit Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/global-audit/dtos/global-audit-create.dto`
- `@/modules/backend_superadmin/global-audit/dtos/global-audit-query.dto`
- `@/modules/backend_superadmin/global-audit/dtos/global-audit-update.dto`
- `@/modules/backend_superadmin/global-audit/global-audit-command.controller`
- `@/modules/backend_superadmin/global-audit/global-audit-contract-snapshot.entity`
- `@/modules/backend_superadmin/global-audit/global-audit-contract-snapshot.repository`
- `@/modules/backend_superadmin/global-audit/global-audit-investigation-response.dto.ts`
- `@/modules/backend_superadmin/global-audit/global-audit-query.controller`
- `@/modules/backend_superadmin/global-audit/global-audit-special.controller`
- `@/modules/backend_superadmin/global-audit/global-audit.constants`
- `@/modules/backend_superadmin/global-audit/global-audit.entity`
- `@/modules/backend_superadmin/global-audit/global-audit.mapper`
- `@/modules/backend_superadmin/global-audit/global-audit.repository`
- `@/modules/backend_superadmin/global-audit/services/global-audit-create.service`
- `@/modules/backend_superadmin/global-audit/services/global-audit-delete.service`
- `@/modules/backend_superadmin/global-audit/services/global-audit-find.service`
- `@/modules/backend_superadmin/global-audit/services/global-audit-investigation.service`
- `@/modules/backend_superadmin/global-audit/services/global-audit-list.service`
- `@/modules/backend_superadmin/global-audit/services/global-audit-update.service`
- `@/modules/backend_superadmin/global-audit/types/global-audit.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.