# Admin Notifications — Feature Map

## Module Purpose
The Admin Notifications module displays system-level alerts and global communications for the
Admin role. It shows expiry warnings, payment overdue alerts, system health notices, and
admin-broadcast messages. Notifications are read-only from the admin perspective — sending
broadcasts is handled by a separate broadcast module. Mark-as-read is the only mutation.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for notification list |
| `error.tsx` | Error boundary |
| `notifications_components/AdminNotificationsClient.tsx` | Root Client Component |
| `notifications_components/AdminNotificationsList/AdminNotificationsList.tsx` | Scrollable list of notification cards |
| Not present; list items are rendered directly by `AdminNotificationsList.tsx` | Single notification item with type badge |
| Not present; no filter UI is exposed | Filter by type, read/unread, date |
| `notifications_types/AdminNotificationsTypes.ts` | `Notification`, `NotificationType` enum |
| `notifications_api/AdminNotificationsApi.ts` | API wrappers |
| `admin_notifications_url_config.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Notification Feed | `/admin/notifications` | View all system alerts | `GET /admin/notifications` | ✅ Mocked/Frontend-ready |
| Mark as Read | `/admin/notifications` | Mark one notification as read | `PATCH /admin/notifications/:id/read` | ✅ Mocked/Frontend-ready |
| Mark All Read | `/admin/notifications` | Mark every notification as read | `PATCH /admin/notifications/read-all` | ✅ Mocked/Frontend-ready |


## Data and State Architecture
- Server-state: TanStack Query in `useAdminNotificationsPage.ts`; UI-only derived unread count stays in the client component.
- Zustand stores: None
- Context providers: None
- Local-storage keys: None
- MSW handler: `admin/notifications/notifications_mocks/handlers/AdminNotificationsMockHandlers.ts`

## User Flows
1. Admin opens `/admin/notifications` → list loads, unread items highlighted
2. Admin clicks a notification card → marks as read via `PATCH`, card loses unread highlight
3. Admin clicks "Mark All Read" → bulk `PATCH` → all cards update, header badge clears

## Component Responsibility Map
- `AdminNotificationsMain` — layout + provider. MUST NOT contain list logic.
- `AdminNotificationsList` — renders notification cards from context data.
- `AdminNotificationsCard` — pure display. Badge color driven by `NotificationType` enum via `statusBadgeConfig.ts`.
- `AdminNotificationsFilters` — owns filter state, dispatches to context.

## Permissions and Security
| Action | Required Role |
|---|---|
| View notifications | `ADMIN` |
| Mark as read | `ADMIN` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 notification card skeletons
- **Empty:** "You're all caught up" with checkmark icon, no CTA needed
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Server state ownership:** notification records are owned by TanStack Query; do not recreate a local seed array in the page hook.
- **Mutation consistency:** mark-read and mark-all-read invalidate the `adminNotifications` query so rendered data comes from the API contract.
- **Delete semantics:** deletion is an explicit API operation only where the current UI exposes it; do not add destructive bulk deletion without a documented endpoint and confirmation.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 3B: Badge colors via `statusBadgeConfig.ts`
- [x] Rule 6: Logic/UI Separation — list logic in context, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — toast on mark-read error uses `response.message`


## User Flows & Interactions
1. Enter the `/admin/notifications` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminNotificationsApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/notifications_mocks/fixtures/AdminNotificationsMockFixtures.ts` and `admin/notifications/notifications_mocks/handlers/AdminNotificationsMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.
