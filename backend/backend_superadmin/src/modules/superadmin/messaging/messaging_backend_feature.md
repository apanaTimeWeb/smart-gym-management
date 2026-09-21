# messaging Backend Feature Map

## Module Purpose
Owns the `messaging` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/messaging-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/messaging-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/messaging-update.dto.ts` | Validates one request or response contract at the module edge. |
| `messaging-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `messaging-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `messaging-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `messaging-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `messaging-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `messaging-template-insights-response.dto.ts` | Validates one request or response contract at the module edge. |
| `messaging-whatsapp-bulk-center-response.dto.ts` | Validates one request or response contract at the module edge. |
| `messaging.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `messaging.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `messaging.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `messaging.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `messaging.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `messaging_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `responses/messaging-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/messaging-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-template-insights.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-whatsapp-bulk-center.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/messaging-whatsapp-campaign.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/messaging.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/messaging.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `messaging-command.controller.ts` / `create` | POST | `/superadmin/messaging` | Creates a resource after DTO validation and persists it through the feature repository. | `MessagingCreateDto` | `unknown` |
| `messaging-command.controller.ts` / `update` | PATCH | `/superadmin/messaging/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `MessagingUpdateDto` | `unknown` |
| `messaging-command.controller.ts` / `remove` | DELETE | `/superadmin/messaging/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `messaging-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/messaging/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `messaging-query.controller.ts` / `findAll` | GET | `/superadmin/messaging` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `messaging-query.controller.ts` / `findOne` | GET | `/superadmin/messaging/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `messaging-special.controller.ts` / `templateInsights` | GET | `/superadmin/messaging/template-insights` | Returns message-template usage, campaign engagement, and channel summary data. | `None` | `Record<string, unknown` |
| `messaging-special.controller.ts` / `whatsappBulkCenter` | GET | `/superadmin/messaging/whatsapp/bulk-center` | Returns the WhatsApp bulk-center templates, audiences, recipients, campaigns, and variables. | `None` | `Record<string, unknown` |
| `messaging-special.controller.ts` / `whatsappCampaign` | POST | `/superadmin/messaging/whatsapp/campaigns` | Creates a WhatsApp campaign request and persists its outbound job/campaign state. | `Record` | `Record<string, unknown` |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct business-code import. Runtime event dependencies are documented explicitly below.
- **Infrastructure Dependencies**: Core authentication/authorization, configuration, PostgreSQL/TypeORM repository infrastructure, Redis, response/error infrastructure, observability, and tenant resolution where applicable.
- **Runtime/Event Dependencies**: None unless an event appears in this module's source and dependency document.

## Data and State Architecture
- DB Entities: Every TypeORM entity registered by this module; contract snapshots are stored in explicit PostgreSQL JSONB tables when the frontend contract is snapshot-backed.
- Redis Caching Keys: Only feature-owned operational keys; Idempotency-Key reservations use the core idempotency namespace.
- Event Emitters: Only event names from the centralized registry are permitted.
- Background Jobs: Heavy exports, messaging, backups, migrations, and bulk work are queued where applicable; scheduled work is recorded in the central registry.
- Idempotency Keys: All mutations for which the frontend API exposes `idempotencyKey` are protected by `RequireIdempotencyKey`.

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security
Every Superadmin business endpoint is protected at controller level with `JwtAuthGuard`, `RolesGuard`, and the `SUPERADMIN` role. Resource-specific endpoints must additionally fail closed when the requested resource is missing, soft-deleted, outside the trusted tenant/resource scope, or otherwise unauthorized.

CODEOWNERS path: `src/modules/superadmin/messaging/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend messaging/superadmin_messaging_features.md -->

﻿# Superadmin Messaging â€” Feature Map

## Module Purpose
The messaging module is responsible for the Superadmin business workflow managing Messaging. It enables superadmins to view, monitor, and control the lifecycle and configurations of Messaging across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `messaging_api/` | Feature-owned responsibility for messaging api. | `SuperadminMessagingApi.ts`, `SuperadminMessagingTemplateInsightsApi.ts` |
| `messaging_mocks/` | Feature-owned responsibility for messaging mocks. | `(directory present; no direct files)` |
| `messaging_schemas/` | Feature-owned responsibility for messaging schemas. | `SuperadminMessagingComposeSchema.test.ts`, `SuperadminMessagingComposeSchema.ts` |
| `messaging_tests/` | Feature-owned responsibility for messaging tests. | `SuperadminMessagingBasic.test.tsx`, `SuperadminMessagingTemplateInsights.test.ts` |
| `messaging_types/` | Feature-owned responsibility for messaging types. | `SuperadminMessagingComposeModalTypes.ts`, `SuperadminMessagingConstants.ts`, `SuperadminMessagingMessagesTabTypes.ts`, `SuperadminMessagingNotificationIconTypes.ts`, `SuperadminMessagingNotificationsTabTypes.ts`, `SuperadminMessagingTenantDropdownTypes.ts`, `SuperadminMessagingTypes.ts`, `SuperadminMessagingV1Types.ts`, `SuperadminMessagingV1WhatsAppAudiencePanelTypes.ts`, `SuperadminMessagingV1WhatsAppCampaignHistoryPanelTypes.ts`, `SuperadminMessagingV1WhatsAppCampaignSummaryCardsTypes.ts`, `SuperadminMessagingV1WhatsAppComposerPanelTypes.ts` |
| `messaging_utils/` | Feature-owned responsibility for messaging utils. | `SuperadminMessagingStatusBadgeConfig.ts`, `useSuperadminMessaging.test.tsx`, `useSuperadminMessaging.ts`, `useSuperadminMessagingNotificationMutations.ts`, `useSuperadminMessagingNotifications.ts`, `useSuperadminMessagingV1.ts` |
| `messaging_whatsapp_api/` | Feature-owned responsibility for messaging whatsapp api. | `SuperadminMessagingWhatsappApi.ts` |
| `messaging_whatsapp_components/` | Feature-owned responsibility for messaging whatsapp components. | `SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `SuperadminMessagingV1WhatsAppTemplatePicker.tsx` |
| `messaging_whatsapp_mocks/` | Feature-owned responsibility for messaging whatsapp mocks. | `(directory present; no direct files)` |
| `messaging_whatsapp_tests/` | Feature-owned responsibility for messaging whatsapp tests. | `SuperadminMessagingV1WhatsAppBulkCenter.test.tsx`, `SuperadminMessagingV1WhatsAppSchema.test.ts` |
| `messaging_whatsapp_types/` | Feature-owned responsibility for messaging whatsapp types. | `SuperadminMessagingV1WhatsAppTypes.ts`, `SuperadminMessagingWhatsAppTypes.ts` |
| `messaging_whatsapp_utils/` | Feature-owned responsibility for messaging whatsapp utils. | `SuperadminMessagingV1WhatsApp.test.ts`, `SuperadminMessagingV1WhatsAppUtils.ts`, `useSuperadminMessagingV1WhatsApp.test.tsx`, `useSuperadminMessagingV1WhatsApp.ts`, `useSuperadminMessagingV1WhatsAppCampaign.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Messaging | `/superadmin/messaging` | clear queue; click outside; complete; mark all read; mark read; open; select; send | `SuperadminMessagingTemplateInsightsApi.ts`, `SuperadminMessagingApi.ts`, `SuperadminMessagingWhatsappApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/messaging route to load the Messaging data context securely via TanStack Query.
2. Interact with the Messaging dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Messaging status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `messaging`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp.ts`, `messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign.ts`, `messaging_components/useSuperadminMessagingDateRangePicker.ts`, `messaging_utils/useSuperadminMessagingNotifications.ts`, `messaging_utils/useSuperadminMessagingV1.ts`, `messaging_utils/useSuperadminMessaging.ts`, `messaging_utils/useSuperadminMessagingNotificationMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'messaging', 'whatsapp-bulk-center']`, `['superadmin', 'messaging_template_insights']`, `[...MESSAGE_QUERY_KEY, queryParams]`

## API Contract

- **API files:** `messaging_api/SuperadminMessagingApi.ts`, `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Renders the page component and its associated UI logic. |
| `messaging_components/SuperadminMessagingNotificationsTab.tsx` | Renders notification state and delegates read mutations to the Superadmin Messaging hook. |
| `messaging_components/SuperadminMessagingDateRangePicker.tsx` | Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility. |
| `messaging_components/SuperadminMessagingComposeModal.tsx` | Owns Superadmin Messaging form presentation and client-side Zod validation. |
| `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx` | Renders the Superadmin messaging V1 Campaign engagement view. |
| `messaging_components/SuperadminMessagingTenantDropdown.tsx` | Renders the Messaging Tenant Dropdown component and its associated UI logic. |
| `messaging_components/SuperadminMessagingMessagesTab.tsx` | Renders the searchable, filterable, URL-backed Superadmin tenant message table. |
| `messaging_components/SuperadminMessagingClient.tsx` | Renders the Superadmin tenant messaging workspace using the module's URL-backed query state. |
| `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx` | Renders the Superadmin messaging V1 Template library view. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature. |
| `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx` | Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications. |
| `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx` | Renders the semantic icon for one Superadmin notification severity. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into messaging.
- **Destructive Actions**: Any deletion or modification of messaging records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for messaging do not expose cross-tenant sensitive data.

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

