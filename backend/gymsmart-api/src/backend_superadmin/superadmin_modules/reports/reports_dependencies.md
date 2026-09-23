# reports Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/reports/dtos/reports-create.dto`
- `@/modules/backend_superadmin/reports/dtos/reports-query.dto`
- `@/modules/backend_superadmin/reports/dtos/reports-update.dto`
- `@/modules/backend_superadmin/reports/reports-command.controller`
- `@/modules/backend_superadmin/reports/reports-comparison-response.dto.ts`
- `@/modules/backend_superadmin/reports/reports-query.controller`
- `@/modules/backend_superadmin/reports/reports-special.controller`
- `@/modules/backend_superadmin/reports/reports.constants`
- `@/modules/backend_superadmin/reports/reports.entity`
- `@/modules/backend_superadmin/reports/reports.mapper`
- `@/modules/backend_superadmin/reports/reports.repository`
- `@/modules/backend_superadmin/reports/services/reports-comparison.service`
- `@/modules/backend_superadmin/reports/services/reports-create.service`
- `@/modules/backend_superadmin/reports/services/reports-delete.service`
- `@/modules/backend_superadmin/reports/services/reports-find.service`
- `@/modules/backend_superadmin/reports/services/reports-list.service`
- `@/modules/backend_superadmin/reports/services/reports-main.service`
- `@/modules/backend_superadmin/reports/services/reports-update.service`
- `@/modules/backend_superadmin/reports/types/reports.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.