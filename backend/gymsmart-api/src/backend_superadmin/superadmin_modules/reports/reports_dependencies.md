# reports Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/reports/dtos/reports-create.dto`
- `@/backend_superadmin/reports/dtos/reports-query.dto`
- `@/backend_superadmin/reports/dtos/reports-update.dto`
- `@/backend_superadmin/reports/reports-command.controller`
- `@/backend_superadmin/reports/reports-comparison-response.dto.ts`
- `@/backend_superadmin/reports/reports-query.controller`
- `@/backend_superadmin/reports/reports-special.controller`
- `@/backend_superadmin/reports/reports.constants`
- `@/backend_superadmin/reports/reports.entity`
- `@/backend_superadmin/reports/reports.mapper`
- `@/backend_superadmin/reports/reports.repository`
- `@/backend_superadmin/reports/services/reports-comparison.service`
- `@/backend_superadmin/reports/services/reports-create.service`
- `@/backend_superadmin/reports/services/reports-delete.service`
- `@/backend_superadmin/reports/services/reports-find.service`
- `@/backend_superadmin/reports/services/reports-list.service`
- `@/backend_superadmin/reports/services/reports-main.service`
- `@/backend_superadmin/reports/services/reports-update.service`
- `@/backend_superadmin/reports/types/reports.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.