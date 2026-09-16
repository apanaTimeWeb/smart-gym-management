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
| `notifications_components/AdminNotificationsMain.tsx` | Root Client Component |
| `notifications_components/AdminNotificationsList.tsx` | Scrollable list of notification cards |
| `notifications_components/AdminNotificationsCard.tsx` | Single notification item with type badge |
| `notifications_components/AdminNotificationsFilters.tsx` | Filter by type, read/unread, date |
| `notifications_types/AdminNotificationsTypes.ts` | `Notification`, `NotificationType` enum |
| `notifications_api/AdminNotificationsApi.ts` | API wrappers |
| `notifications_utils/AdminNotificationsUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Notification Feed | `/admin/notifications` | View all system alerts | `GET /admin/notifications` | ✅ Live |
| Mark as Read | `/admin/notifications` | Clear unread badge | `PATCH /admin/notifications/:id/read` | ✅ Live |
| Mark All Read | `/admin/notifications` | Bulk clear unread | `PATCH /admin/notifications/read-all` | ✅ Live |
| Filter by Type | `/admin/notifications` | Scoped view | Query params on GET | ✅ Live |

## Data and State Architecture
- Server-state: `AdminNotificationsContext` — notification list, unread count
- Zustand stores: None
- Context providers: `AdminNotificationsProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

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
| View notifications | `SUPERADMIN` |
| Mark as read | `SUPERADMIN` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 notification card skeletons
- **Empty:** "You're all caught up" with checkmark icon, no CTA needed
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Notification type badge colors** — must use `statusBadgeConfig.ts` token map, never inline color logic per notification type.
- **Unread count in header** — the bell icon badge in `AdminLayout` reads from `AdminNotificationsContext`. Do not duplicate state.
- **No delete** — notifications are never hard-deleted from the UI. Only mark-as-read is allowed.

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
| None discovered | API routes are defined through URL config; inspect module API file. |

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

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/admin_mocks/fixtures/AdminMockFixtures.ts` and `admin/admin_mocks/handlers/AdminMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.
