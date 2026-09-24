# global-audit Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/global-audit/dtos/global-audit-create.dto`
- `@/backend_superadmin/global-audit/dtos/global-audit-query.dto`
- `@/backend_superadmin/global-audit/dtos/global-audit-update.dto`
- `@/backend_superadmin/global-audit/global-audit-command.controller`
- `@/backend_superadmin/global-audit/global-audit-contract-snapshot.entity`
- `@/backend_superadmin/global-audit/global-audit-contract-snapshot.repository`
- `@/backend_superadmin/global-audit/global-audit-investigation-response.dto.ts`
- `@/backend_superadmin/global-audit/global-audit-query.controller`
- `@/backend_superadmin/global-audit/global-audit-special.controller`
- `@/backend_superadmin/global-audit/global-audit.constants`
- `@/backend_superadmin/global-audit/global-audit.entity`
- `@/backend_superadmin/global-audit/global-audit.mapper`
- `@/backend_superadmin/global-audit/global-audit.repository`
- `@/backend_superadmin/global-audit/services/global-audit-create.service`
- `@/backend_superadmin/global-audit/services/global-audit-delete.service`
- `@/backend_superadmin/global-audit/services/global-audit-find.service`
- `@/backend_superadmin/global-audit/services/global-audit-investigation.service`
- `@/backend_superadmin/global-audit/services/global-audit-list.service`
- `@/backend_superadmin/global-audit/services/global-audit-update.service`
- `@/backend_superadmin/global-audit/types/global-audit.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.