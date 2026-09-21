# global-audit Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/global-audit/dtos/global-audit-create.dto`
- `@/modules/superadmin/global-audit/dtos/global-audit-query.dto`
- `@/modules/superadmin/global-audit/dtos/global-audit-update.dto`
- `@/modules/superadmin/global-audit/global-audit-command.controller`
- `@/modules/superadmin/global-audit/global-audit-contract-snapshot.entity`
- `@/modules/superadmin/global-audit/global-audit-contract-snapshot.repository`
- `@/modules/superadmin/global-audit/global-audit-investigation-response.dto.ts`
- `@/modules/superadmin/global-audit/global-audit-query.controller`
- `@/modules/superadmin/global-audit/global-audit-special.controller`
- `@/modules/superadmin/global-audit/global-audit.constants`
- `@/modules/superadmin/global-audit/global-audit.entity`
- `@/modules/superadmin/global-audit/global-audit.mapper`
- `@/modules/superadmin/global-audit/global-audit.repository`
- `@/modules/superadmin/global-audit/services/global-audit-create.service`
- `@/modules/superadmin/global-audit/services/global-audit-delete.service`
- `@/modules/superadmin/global-audit/services/global-audit-find.service`
- `@/modules/superadmin/global-audit/services/global-audit-investigation.service`
- `@/modules/superadmin/global-audit/services/global-audit-list.service`
- `@/modules/superadmin/global-audit/services/global-audit-update.service`
- `@/modules/superadmin/global-audit/types/global-audit.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.