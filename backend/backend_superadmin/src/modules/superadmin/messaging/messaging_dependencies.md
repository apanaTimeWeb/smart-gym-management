# messaging Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/messaging/dtos/messaging-create.dto`
- `@/modules/superadmin/messaging/dtos/messaging-query.dto`
- `@/modules/superadmin/messaging/dtos/messaging-update.dto`
- `@/modules/superadmin/messaging/messaging-command.controller`
- `@/modules/superadmin/messaging/messaging-contract-snapshot.entity`
- `@/modules/superadmin/messaging/messaging-contract-snapshot.repository`
- `@/modules/superadmin/messaging/messaging-query.controller`
- `@/modules/superadmin/messaging/messaging-special.controller`
- `@/modules/superadmin/messaging/messaging-template-insights-response.dto.ts`
- `@/modules/superadmin/messaging/messaging-whatsapp-bulk-center-response.dto.ts`
- `@/modules/superadmin/messaging/messaging.constants`
- `@/modules/superadmin/messaging/messaging.entity`
- `@/modules/superadmin/messaging/messaging.mapper`
- `@/modules/superadmin/messaging/messaging.repository`
- `@/modules/superadmin/messaging/services/messaging-create.service`
- `@/modules/superadmin/messaging/services/messaging-delete.service`
- `@/modules/superadmin/messaging/services/messaging-find.service`
- `@/modules/superadmin/messaging/services/messaging-list.service`
- `@/modules/superadmin/messaging/services/messaging-status.service`
- `@/modules/superadmin/messaging/services/messaging-template-insights.service`
- `@/modules/superadmin/messaging/services/messaging-update.service`
- `@/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service`
- `@/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service`
- `@/modules/superadmin/messaging/types/messaging.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.