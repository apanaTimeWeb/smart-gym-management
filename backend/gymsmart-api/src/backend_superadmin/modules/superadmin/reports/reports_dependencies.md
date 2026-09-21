# reports Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/reports/dtos/reports-create.dto`
- `@/modules/superadmin/reports/dtos/reports-query.dto`
- `@/modules/superadmin/reports/dtos/reports-update.dto`
- `@/modules/superadmin/reports/reports-command.controller`
- `@/modules/superadmin/reports/reports-comparison-response.dto.ts`
- `@/modules/superadmin/reports/reports-query.controller`
- `@/modules/superadmin/reports/reports-special.controller`
- `@/modules/superadmin/reports/reports.constants`
- `@/modules/superadmin/reports/reports.entity`
- `@/modules/superadmin/reports/reports.mapper`
- `@/modules/superadmin/reports/reports.repository`
- `@/modules/superadmin/reports/services/reports-comparison.service`
- `@/modules/superadmin/reports/services/reports-create.service`
- `@/modules/superadmin/reports/services/reports-delete.service`
- `@/modules/superadmin/reports/services/reports-find.service`
- `@/modules/superadmin/reports/services/reports-list.service`
- `@/modules/superadmin/reports/services/reports-main.service`
- `@/modules/superadmin/reports/services/reports-update.service`
- `@/modules/superadmin/reports/types/reports.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.