# Manager Notifications — Feature Map

## Module Purpose
The Manager Notifications module displays branch-level system alerts for the Manager role:
membership expiry warnings, pending payment reminders, attendance anomalies, and manager
broadcasts from Admin. Notifications are read-only — mark-as-read is the only mutation.
The unread count drives the bell badge in the Manager sidebar header.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for notification list |
| `error.tsx` | Error boundary |
| `notifications_components/ManagerNotificationsMain.tsx` | Root Client Component |
| `notifications_components/ManagerNotificationsList.tsx` | Scrollable notification card list |
| `notifications_components/ManagerNotificationsCard.tsx` | Single notification item with type badge |
| `notifications_components/ManagerNotificationsEmptyState.tsx` | "You're all caught up" empty state |
| `notifications_context/NotificationsProvider.tsx` | Fetch state, unread count |
| `notifications_types/ManagerNotificationsTypes.ts` | `Notification`, `NotificationType` enum |
| `notifications_api/ManagerNotificationsApi.ts` | API wrappers |
| `notifications_utils/ManagerNotificationsUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Notification Feed | `/manager/notifications` | View all alerts | `GET /manager/notifications` | ✅ Live (mock) |
| Mark as Read | `/manager/notifications` | Clear unread badge | `PATCH /manager/notifications/:id/read` | ✅ Live (mock) |
| Mark All Read | `/manager/notifications` | Bulk clear unread | `PATCH /manager/notifications/read-all` | ✅ Live (mock) |

## Data and State Architecture
- Server-state: `NotificationsProvider` — notification list, unread count
- Zustand stores: None
- Context providers: `NotificationsProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/notifications` → list loads, unread items highlighted
2. Manager clicks a notification → marks as read via `PATCH`, highlight clears
3. Manager clicks "Mark All Read" → bulk `PATCH` → all highlights clear, header badge resets to 0

## Component Responsibility Map
- `ManagerNotificationsMain` — layout + provider. MUST NOT contain list logic.
- `ManagerNotificationsList` — renders cards from context data.
- `ManagerNotificationsCard` — pure display. Badge color driven by `NotificationType` via `statusBadgeConfig.ts`.
- `ManagerNotificationsEmptyState` — shown when all notifications are read or list is empty.

## Permissions and Security
| Action | Required Role |
|---|---|
| View notifications | `MANAGER` |
| Mark as read | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 notification card skeletons
- **Empty:** `ManagerNotificationsEmptyState` — "You're all caught up" with checkmark icon
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Unread count in sidebar** — the bell badge in `ManagerLayout` reads from `NotificationsProvider`. Do not duplicate unread count state in a separate store.
- **Notification type badge colors** — must use `statusBadgeConfig.ts` token map, never inline color logic per notification type.
- **No delete** — notifications are never deleted from the UI. Mark-as-read only.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 3B: Badge colors via `statusBadgeConfig.ts`
- [x] Rule 6: Logic/UI Separation — list logic in context, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
