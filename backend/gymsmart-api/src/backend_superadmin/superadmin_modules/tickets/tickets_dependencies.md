# tickets Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/tickets/dtos/tickets-create.dto`
- `@/backend_superadmin/tickets/dtos/tickets-query.dto`
- `@/backend_superadmin/tickets/dtos/tickets-update.dto`
- `@/backend_superadmin/tickets/services/tickets-create.service`
- `@/backend_superadmin/tickets/services/tickets-delete.service`
- `@/backend_superadmin/tickets/services/tickets-find.service`
- `@/backend_superadmin/tickets/services/tickets-insights.service`
- `@/backend_superadmin/tickets/services/tickets-list.service`
- `@/backend_superadmin/tickets/services/tickets-status.service`
- `@/backend_superadmin/tickets/services/tickets-update.service`
- `@/backend_superadmin/tickets/tickets-command.controller`
- `@/backend_superadmin/tickets/tickets-contract-snapshot.entity`
- `@/backend_superadmin/tickets/tickets-contract-snapshot.repository`
- `@/backend_superadmin/tickets/tickets-query.controller`
- `@/backend_superadmin/tickets/tickets-service-insights-response.dto.ts`
- `@/backend_superadmin/tickets/tickets-special.controller`
- `@/backend_superadmin/tickets/tickets.constants`
- `@/backend_superadmin/tickets/tickets.entity`
- `@/backend_superadmin/tickets/tickets.mapper`
- `@/backend_superadmin/tickets/tickets.repository`
- `@/backend_superadmin/tickets/types/tickets.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.