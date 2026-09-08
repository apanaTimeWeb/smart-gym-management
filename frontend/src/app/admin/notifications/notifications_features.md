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
