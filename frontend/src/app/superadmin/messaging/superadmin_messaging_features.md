# Messaging Module — Feature Map

## Module Purpose
This Superadmin feature owns the `messaging` route and its feature-specific UI, client logic, API boundary, types, schemas, constants, mocks, tests, and documentation. It is intended to be operable by the Superadmin role without importing sibling Superadmin business modules. The feature exposes only the controls represented by the current route and code in this folder. Backend authorization remains outside the frontend audit scope.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `__tests__/` | Contract/smoke coverage for the feature. | `superadmin_messaging_basic.test.tsx` |
| `messaging_api/` | Owns API URL/query/payload contracts and response validation. | `superadmin_messaging_api.ts` |
| `messaging_components/` | Owns messaging presentation and form controls. | `SuperadminMessagingClient.tsx`, `SuperadminMessagingComposeModal.tsx`, `SuperadminMessagingMessagesTab.tsx`, `SuperadminMessagingNotificationsTab.tsx`, `SuperadminMessagingTenantDropdown.tsx` |
| `messaging_mocks/` | Owns mutable MSW state and request/response behavior for core messaging. | `SuperadminMessagingMockHandlers.ts` |
| `messaging_types/` | Owns core message/notification/tenant schemas and display constants. | `SuperadminMessagingConstants.ts`, `superadmin_messaging_types.ts` |
| `messaging_whatsapp_api/` | Owns the free WhatsApp bulk campaign API boundary. | `superadmin_messaging_whatsapp_api.ts` |
| `messaging_whatsapp_components/` | Owns the guided bulk WhatsApp UI. | `SuperadminMessagingV1WhatsAppBulkCenter.tsx`, focused child panels |
| `messaging_whatsapp_mocks/` | Owns feature fixtures and MSW handlers for the WhatsApp flow. | `SuperadminMessagingV1WhatsAppMockFixtures.ts`, `SuperadminMessagingV1WhatsAppMockHandlers.ts` |
| `messaging_whatsapp_types/` | Owns runtime schemas and types for WhatsApp audiences, templates, recipients, campaigns and queue state. | `SuperadminMessagingV1WhatsAppTypes.ts` |
| `messaging_whatsapp_utils/` | Owns personalization, click-to-chat, audience matching and TanStack Query hook logic. | `SuperadminMessagingV1WhatsAppUtils.ts`, `useSuperadminMessagingV1WhatsApp.ts` |

## Feature Inventory

| Feature | Route | User action | Key API/client owner | Status |
|---|---|---|---|---|
| `messaging` | `/superadmin/messaging` | Search/filter/date-range/paginate tenant messages, mark notifications read, and compose a tenant-level message. | `useSuperadminMessaging.ts` + `superadmin_messaging_api.ts` | Implemented in source; runtime integration **NOT VERIFIED** without browser/tooling execution. |
| `free-smart-whatsapp` | `/superadmin/messaging` | Build a personalized WhatsApp campaign queue for tenant owners, admins, and managers and guide the operator through each chat. | `messaging_whatsapp_*` | Implemented in source; runtime integration **NOT VERIFIED** without installing project dependencies. |

## User Flows & Interactions

### Flow 1: Open Feature
1. User navigates to the route shown above.
2. Next.js renders the route `page.tsx` and its client view.
3. The feature-owned client layer loads the data needed by the visible UI.
4. Loading, empty, error, or populated state is rendered according to the current implementation.

### Flow 2: Execute an Available Action
1. User activates an action exposed by the current feature UI.
2. The feature client/hook invokes the feature-owned API function.
3. The API boundary validates response data using the feature schema when a schema is supplied.
4. The UI updates local/query state and shows the resulting feedback.

## Data and State Architecture
- **Server state:** TanStack Query for messages, notifications, tenants, and mutations.
- **UI state:** local `useState` or a feature-scoped Zustand store where present.
- **URL state:** `useSuperadminUrlState` only where the feature currently uses query-string filters/pagination.
- **Sibling business dependencies:** must remain zero; shared transport/UI primitives are infrastructure exceptions only.

## API Contract

| Function | Method | Endpoint expression | API file |
|---|---|---|---|
| `fetchMessages(params?)` | GET | `MessagingUrlConfig.BACKEND_API.BASE/messages` with query parameters | `messaging_api/superadmin_messaging_api.ts` |
| `fetchNotifications` | GET | `MessagingUrlConfig.BACKEND_API.BASE/notifications` | `messaging_api/superadmin_messaging_api.ts` |
| `fetchTenants` | GET | `MessagingUrlConfig.BACKEND_API.BASE/tenants` | `messaging_api/superadmin_messaging_api.ts` |
| `markNotificationRead` | PATCH | `MessagingUrlConfig.BACKEND_API.BASE/notifications/:id/read` | `messaging_api/superadmin_messaging_api.ts` |
| `markAllNotificationsRead` | PATCH | `MessagingUrlConfig.BACKEND_API.BASE/notifications/read-all` | `messaging_api/superadmin_messaging_api.ts` |
| `sendMessage` | POST | `MessagingUrlConfig.BACKEND_API.BASE/messages` | `messaging_api/superadmin_messaging_api.ts` |
| `fetchSuperadminWhatsAppBulkCenter` | GET | `MessagingUrlConfig.BACKEND_API.WHATSAPP_BULK_CENTER` | `messaging_whatsapp_api/superadmin_messaging_whatsapp_api.ts` |
| `createSuperadminWhatsAppCampaign` | POST | `MessagingUrlConfig.BACKEND_API.WHATSAPP_CAMPAIGNS` | `messaging_whatsapp_api/superadmin_messaging_whatsapp_api.ts` |

## UI Data Requirements

Observed schema/type fields in this feature are listed below. Any UI field not represented by a schema/type is **NOT VERIFIED** and must be checked by the coding agent.

| Field | Source location |
|---|---|
| `id` | Feature-owned schema/type file |
| `tenantId` | Feature-owned schema/type file |
| `tenantName` | Feature-owned schema/type file |
| `channel` | Feature-owned schema/type file |
| `subject` | Feature-owned schema/type file |
| `body` | Feature-owned schema/type file |
| `status` | Feature-owned schema/type file |
| `sentAt` | Feature-owned schema/type file |
| `scheduledAt` | Feature-owned schema/type file |
| `createdAt` | Feature-owned schema/type file |
| `title` | Feature-owned schema/type file |
| `type` | Feature-owned schema/type file |
| `read` | Feature-owned schema/type file |
| `name` | Feature-owned schema/type file |
| `plan` | Feature-owned schema/type file |

## Free Smart Bulk WhatsApp Data Requirements
The WhatsApp extension consumes these feature-owned records: `templates`, `audiences`, `recipients`, `campaigns`, and `variables`. Recipient records include `tenantId`, `tenantName`, `contactName`, `contactRole`, `phone`, `audienceKey`, nullable subscription/onboarding/maintenance fields, support/dashboard links, and `whatsappOptIn`. Campaign records include queue totals, sent/skipped counts, status, and creation time.

## Permissions and Security
- **Role:** `SUPERADMIN` UI.
- **Frontend boundary:** route and feature UI are under `/superadmin`.
- **Destructive actions:** must use the Superadmin confirmation infrastructure where the feature exposes destructive controls.
- **Backend authorization:** not evaluated here and must not be inferred from frontend checks.

## Loading, Empty, and Error States
- **Route loading:** use the feature `loading.tsx` when present.
- **Route error:** use the feature `error.tsx` when present.
- **Feature empty/error:** use the feature-specific empty/error UI already present in the source.
- Any runtime transition behavior not statically provable is **NOT VERIFIED**.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not reintroduce imports from another Superadmin business feature.
- **No fake production data:** server-like records belong in feature mocks/fixtures, never fallback constants inside production UI.
- **No hardcoded URLs:** feature-owned routes belong in the single feature URL config.
- **No async state in Zustand:** use TanStack Query for server state.
- **Preserve destructive confirmation:** do not bypass the Superadmin confirmation flow.

## Component Responsibility Map

| File | Responsibility |
|---|---|
| `__tests__/superadmin_messaging_basic.test.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `error.tsx` | Route-level error boundary for messaging. |
| `loading.tsx` | Route-level loading UI for messaging. |
| `messaging_components/SuperadminMessagingClient.tsx` | Renders core tenant messaging and notification flows from `useSuperadminMessaging`. |
| `messaging_components/SuperadminMessagingComposeModal.tsx` | React Hook Form + Zod tenant message composer. |
| `messaging_components/SuperadminMessagingMessagesTab.tsx` | Search/filter/date-range/pagination table for tenant messages. |
| `messaging_components/SuperadminMessagingNotificationsTab.tsx` | Notification list with mark-read actions. |
| `messaging_components/SuperadminMessagingTenantDropdown.tsx` | Searchable tenant-only recipient selector with keyboard-reachable options. |
| `not-found.tsx` | Route-level not-found UI. |
| `page.tsx` | Route entry that mounts the core Messaging client and supplementary V1 insights/WhatsApp panels. |

## Rule Compliance Checklist
- [x] Feature has a route-level `page.tsx` or the route does not require one.
- [x] Feature has module-owned documentation file.
- [x] Feature URL configuration is feature-owned when routes/API calls exist.
- [x] Sibling Superadmin business imports are not allowed.
- [x] API responses must use Zod validation at the boundary.
- [x] Server state is owned by TanStack Query where async data is used.
- [x] UI state remains local or feature-scoped.
- [ ] Full typecheck/lint/test/build/E2E verification — **NOT VERIFIED** in this working environment because project dependencies are not installed.
- [ ] Full visual comparison against `web_global_design.md` — **NOT VERIFIED** without browser execution.

## Documentation Consistency
This feature map is generated from the current repository structure. Where the code does not expose enough static evidence to state an exact runtime fact, the documentation deliberately uses **NOT VERIFIED** rather than inventing a result.


## Module-Owned MSW Fixtures

Feature-specific mock fixtures and MSW handlers are owned by this feature directory. API responses consumed by UI must remain complete for all documented table fields, KPIs, charts, filters, detail views and mutation messages. Global MSW bootstrap is registration infrastructure only.
