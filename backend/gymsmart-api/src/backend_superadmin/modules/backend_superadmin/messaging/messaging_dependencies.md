# messaging Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/messaging/dtos/messaging-create.dto`
- `@/modules/backend_superadmin/messaging/dtos/messaging-query.dto`
- `@/modules/backend_superadmin/messaging/dtos/messaging-update.dto`
- `@/modules/backend_superadmin/messaging/messaging-command.controller`
- `@/modules/backend_superadmin/messaging/messaging-contract-snapshot.entity`
- `@/modules/backend_superadmin/messaging/messaging-contract-snapshot.repository`
- `@/modules/backend_superadmin/messaging/messaging-query.controller`
- `@/modules/backend_superadmin/messaging/messaging-special.controller`
- `@/modules/backend_superadmin/messaging/messaging-template-insights-response.dto.ts`
- `@/modules/backend_superadmin/messaging/messaging-whatsapp-bulk-center-response.dto.ts`
- `@/modules/backend_superadmin/messaging/messaging.constants`
- `@/modules/backend_superadmin/messaging/messaging.entity`
- `@/modules/backend_superadmin/messaging/messaging.mapper`
- `@/modules/backend_superadmin/messaging/messaging.repository`
- `@/modules/backend_superadmin/messaging/services/messaging-create.service`
- `@/modules/backend_superadmin/messaging/services/messaging-delete.service`
- `@/modules/backend_superadmin/messaging/services/messaging-find.service`
- `@/modules/backend_superadmin/messaging/services/messaging-list.service`
- `@/modules/backend_superadmin/messaging/services/messaging-status.service`
- `@/modules/backend_superadmin/messaging/services/messaging-template-insights.service`
- `@/modules/backend_superadmin/messaging/services/messaging-update.service`
- `@/modules/backend_superadmin/messaging/services/messaging-whatsapp-bulk-center.service`
- `@/modules/backend_superadmin/messaging/services/messaging-whatsapp-campaign.service`
- `@/modules/backend_superadmin/messaging/types/messaging.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.