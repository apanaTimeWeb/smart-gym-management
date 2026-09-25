# messaging Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/messaging feature. It exposes 16 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `messaging_dtos/superadmin-messaging-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_dtos/superadmin-messaging-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_dtos/superadmin-messaging-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_dtos/superadmin-messaging-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_dtos/superadmin-messaging-whatsapp-campaign-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_responses/superadmin-messaging-notification-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_responses/superadmin-messaging-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_responses/superadmin-messaging-whatsapp-campaign-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging_services/superadmin-messaging-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-export-completion.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-notification.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-template-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-whatsapp-bulk-center.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_services/superadmin-messaging-whatsapp-campaign.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging_types/superadmin-messaging.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `messaging_types/superadmin-messaging.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-messaging-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-messaging-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-messaging-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-messaging-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-messaging-notification.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-messaging-notification.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-messaging-notification.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-messaging-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-messaging-template-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-messaging-whatsapp-bulk-center-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-messaging-whatsapp-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-messaging.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-messaging.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-messaging.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-messaging.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-messaging.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-messaging.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-messaging.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-messaging-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the create operation. | `SuperadminMessagingCreateDto` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-command.controller.ts::createMessage` | POST | `messages` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the createMessage operation. | `SuperadminMessagingCreateDto` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the update operation. | `SuperadminMessagingUpdateDto` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the remove operation. | `—` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the changeStatus operation. | `SuperadminMessagingStatusDto` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-insights-query.controller.ts::templateInsights` | GET | `superadmin/messaging/template-insights` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the templateInsights operation. | `SuperadminQueryDto` | `SuperadminMessagingTemplateInsightsResponseDto` |
| `superadmin-messaging-insights-query.controller.ts::templateInsights` | GET | `api/superadmin/messaging/template-insights` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the templateInsights operation. | `SuperadminQueryDto` | `SuperadminMessagingTemplateInsightsResponseDto` |
| `superadmin-messaging-insights-query.controller.ts::whatsappBulkCenter` | GET | `superadmin/messaging/whatsapp/bulk-center` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the whatsappBulkCenter operation. | `SuperadminQueryDto` | `SuperadminMessagingWhatsappBulkCenterResponseDto` |
| `superadmin-messaging-notification.controller.ts::list` | GET | `/` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the list operation. | `—` | `[SuperadminMessagingNotificationResponseDto]` |
| `superadmin-messaging-notification.controller.ts::markAllRead` | PATCH | `read-all` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the markAllRead operation. | `—` | `null` |
| `superadmin-messaging-notification.controller.ts::markRead` | PATCH | `:id/read` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the markRead operation. | `—` | `SuperadminMessagingNotificationResponseDto` |
| `superadmin-messaging-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the findAll operation. | `SuperadminMessagingQueryDto` | `See controller contract` |
| `superadmin-messaging-query.controller.ts::findTenants` | GET | `tenants` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the findTenants operation. | `—` | `Array<` |
| `superadmin-messaging-query.controller.ts::findMessages` | GET | `messages` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the findMessages operation. | `SuperadminMessagingQueryDto` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminMessagingResponseDto` |
| `superadmin-messaging-whatsapp-command.controller.ts::whatsappCampaign` | POST | `superadmin/messaging/whatsapp/campaigns` | This endpoint validates transport input, invokes the owning messaging use case, and returns the declared contract for the whatsappCampaign operation. | `SuperadminMessagingWhatsappCampaignCreateDto` | `SuperadminMessagingWhatsappCampaignResponseDto` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_events, superadmin_core_observability, superadmin_core_pagination, superadmin_core_realtime, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-messaging-contract-snapshot.entity → `superadmin_messaging_contract_snapshots`, superadmin-messaging-notification.entity → `superadmin_notifications`, superadmin-messaging.entity → `superadmin_tenant_messages`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: SUPERADMIN.EXPORT.COMPLETED
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/messaging`, `/superadmin/messaging/:id`, `/superadmin/messaging/:id/status`, `/superadmin/messaging/messages`, `/superadmin/messaging/notifications/:id/read`, `/superadmin/messaging/notifications/read-all`, `/superadmin/messaging/whatsapp/campaigns`

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/messaging` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/messaging/messages` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/template-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/messaging/template-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/whatsapp/bulk-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/notifications` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/notifications/read-all` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/notifications/:id/read` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/tenants` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/messages` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/messaging/whatsapp/campaigns` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `messaging/superadmin_messaging_features.md`

- **API files:** `messaging_api/SuperadminMessagingApi.ts`, `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `messaging/superadmin_messaging_template_insights_features.md`

- **API files:** `messaging_api/SuperadminMessagingApi.ts`, `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `messaging/superadmin_messaging_whatsapp_features.md`

- **API files:** `messaging_api/SuperadminMessagingApi.ts`, `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `messaging/superadmin_messaging_features.md`

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `messaging/superadmin_messaging_template_insights_features.md`

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `messaging/superadmin_messaging_whatsapp_features.md`

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``withQuery({superadmin}/messages, params)`` | ``ApiResponse<TenantMessage[]>`` | `REQ-055` / ``fetchMessages`` |
| ``{superadmin}/notifications`` | ``ApiResponse<SuperadminNotification[]>`` | `REQ-056` / ``fetchNotifications`` |
| ``{superadmin}/tenants`` | ``ApiResponse<MessagingTenant[]>`` | `REQ-057` / ``fetchTenants`` |
| ``{superadmin}/notifications/{id}/read`` | ``ApiResponse<SuperadminNotification>`` | `REQ-058` / ``markNotificationRead`` |
| ``{superadmin}/notifications/read-all`` | ``ApiResponse<SuperadminNotification[]>`` | `REQ-059` / ``markAllNotificationsRead`` |
| ``{superadmin}/messages`` | ``ApiResponse<TenantMessage>`` | `REQ-060` / ``sendMessage`` |
| ``/api/superadmin/messaging/template-insights`` | ``ApiResponse<SuperadminMessagingV1Data>`` | `REQ-061` / ``fetchMessagingTemplateInsights`` |
| ``/superadmin/messaging/whatsapp/bulk-center`` | ``ApiResponse<SuperadminWhatsAppBulkCenterData>`` | `REQ-062` / ``fetchWhatsAppBulkCenter`` |
| ``/superadmin/messaging/whatsapp/campaigns`` | ``ApiResponse<SuperadminWhatsAppCampaign>`` | `REQ-063` / ``createWhatsAppCampaign`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.

