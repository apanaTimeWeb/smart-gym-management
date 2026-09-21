# tickets Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/tickets/dtos/tickets-create.dto`
- `@/modules/superadmin/tickets/dtos/tickets-query.dto`
- `@/modules/superadmin/tickets/dtos/tickets-update.dto`
- `@/modules/superadmin/tickets/services/tickets-create.service`
- `@/modules/superadmin/tickets/services/tickets-delete.service`
- `@/modules/superadmin/tickets/services/tickets-find.service`
- `@/modules/superadmin/tickets/services/tickets-insights.service`
- `@/modules/superadmin/tickets/services/tickets-list.service`
- `@/modules/superadmin/tickets/services/tickets-status.service`
- `@/modules/superadmin/tickets/services/tickets-update.service`
- `@/modules/superadmin/tickets/tickets-command.controller`
- `@/modules/superadmin/tickets/tickets-contract-snapshot.entity`
- `@/modules/superadmin/tickets/tickets-contract-snapshot.repository`
- `@/modules/superadmin/tickets/tickets-query.controller`
- `@/modules/superadmin/tickets/tickets-service-insights-response.dto.ts`
- `@/modules/superadmin/tickets/tickets-special.controller`
- `@/modules/superadmin/tickets/tickets.constants`
- `@/modules/superadmin/tickets/tickets.entity`
- `@/modules/superadmin/tickets/tickets.mapper`
- `@/modules/superadmin/tickets/tickets.repository`
- `@/modules/superadmin/tickets/types/tickets.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.