# messaging Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/messaging/dtos/messaging-create.dto`
- `@/backend_superadmin/messaging/dtos/messaging-query.dto`
- `@/backend_superadmin/messaging/dtos/messaging-update.dto`
- `@/backend_superadmin/messaging/messaging-command.controller`
- `@/backend_superadmin/messaging/messaging-contract-snapshot.entity`
- `@/backend_superadmin/messaging/messaging-contract-snapshot.repository`
- `@/backend_superadmin/messaging/messaging-query.controller`
- `@/backend_superadmin/messaging/messaging-special.controller`
- `@/backend_superadmin/messaging/messaging-template-insights-response.dto.ts`
- `@/backend_superadmin/messaging/messaging-whatsapp-bulk-center-response.dto.ts`
- `@/backend_superadmin/messaging/messaging.constants`
- `@/backend_superadmin/messaging/messaging.entity`
- `@/backend_superadmin/messaging/messaging.mapper`
- `@/backend_superadmin/messaging/messaging.repository`
- `@/backend_superadmin/messaging/services/messaging-create.service`
- `@/backend_superadmin/messaging/services/messaging-delete.service`
- `@/backend_superadmin/messaging/services/messaging-find.service`
- `@/backend_superadmin/messaging/services/messaging-list.service`
- `@/backend_superadmin/messaging/services/messaging-status.service`
- `@/backend_superadmin/messaging/services/messaging-template-insights.service`
- `@/backend_superadmin/messaging/services/messaging-update.service`
- `@/backend_superadmin/messaging/services/messaging-whatsapp-bulk-center.service`
- `@/backend_superadmin/messaging/services/messaging-whatsapp-campaign.service`
- `@/backend_superadmin/messaging/types/messaging.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.
- Runtime/Event dependency: `SUPERADMIN.EXPORT.COMPLETED` from `superadmin_core/superadmin_core_events/superadmin-core-event-registry.constants.ts`.
