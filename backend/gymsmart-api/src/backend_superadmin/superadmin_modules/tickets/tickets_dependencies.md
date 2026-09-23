# tickets Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/tickets/dtos/tickets-create.dto`
- `@/modules/backend_superadmin/tickets/dtos/tickets-query.dto`
- `@/modules/backend_superadmin/tickets/dtos/tickets-update.dto`
- `@/modules/backend_superadmin/tickets/services/tickets-create.service`
- `@/modules/backend_superadmin/tickets/services/tickets-delete.service`
- `@/modules/backend_superadmin/tickets/services/tickets-find.service`
- `@/modules/backend_superadmin/tickets/services/tickets-insights.service`
- `@/modules/backend_superadmin/tickets/services/tickets-list.service`
- `@/modules/backend_superadmin/tickets/services/tickets-status.service`
- `@/modules/backend_superadmin/tickets/services/tickets-update.service`
- `@/modules/backend_superadmin/tickets/tickets-command.controller`
- `@/modules/backend_superadmin/tickets/tickets-contract-snapshot.entity`
- `@/modules/backend_superadmin/tickets/tickets-contract-snapshot.repository`
- `@/modules/backend_superadmin/tickets/tickets-query.controller`
- `@/modules/backend_superadmin/tickets/tickets-service-insights-response.dto.ts`
- `@/modules/backend_superadmin/tickets/tickets-special.controller`
- `@/modules/backend_superadmin/tickets/tickets.constants`
- `@/modules/backend_superadmin/tickets/tickets.entity`
- `@/modules/backend_superadmin/tickets/tickets.mapper`
- `@/modules/backend_superadmin/tickets/tickets.repository`
- `@/modules/backend_superadmin/tickets/types/tickets.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.