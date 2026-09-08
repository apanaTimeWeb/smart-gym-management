# Trainer Notifications — Feature Map

## Module Purpose
The Trainer Notifications module delivers real-time and historical in-app alerts scoped
exclusively to the authenticated trainer. Notifications cover member assignment changes,
workout plan feedback, attendance anomalies, and system messages from the manager. Trainers
can only see their own notifications — cross-trainer notification access is architecturally
forbidden.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | List skeleton — 8 notification row placeholders |
| `error.tsx` | Error boundary with retry |
| `notifications_components/TrainerNotificationsMain.tsx` | Root Client Component — layout + provider mount |
| `notifications_components/TrainerNotificationsList.tsx` | Scrollable list of notification items |
| `notifications_components/TrainerNotificationItem.tsx` | Single notification row — icon, message, timestamp, read state |
| `notifications_components/TrainerNotificationsFilterBar.tsx` | Filter by type (ALL / MEMBER / WORKOUT / SYSTEM) |
| `notifications_components/TrainerNotificationsEmptyState.tsx` | Empty state for no notifications or filtered result |
| `notifications_context/NotificationsProvider.tsx` | Fetch state, unread count, mark-read logic |
| `notifications_types/TrainerNotificationsTypes.ts` | `TrainerNotification`, `NotificationType`, `MarkReadDto` |
| `notifications_api/TrainerNotificationsApi.ts` | API wrappers |
| `notifications_utils/TrainerNotificationsUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Notification List | `/trainer/notifications` | View all notifications for trainer | `GET /trainer/notifications` | ✅ Live |
| Mark Single Read | `/trainer/notifications` | Mark one notification as read | `PATCH /trainer/notifications/:id/read` | ✅ Live |
| Mark All Read | `/trainer/notifications` | Mark all unread as read | `POST /trainer/notifications/read-all` | ✅ Live |
| Filter by Type | `/trainer/notifications` | Client-side filter — MEMBER / WORKOUT / SYSTEM | — (client-side) | ✅ Live |
| Unread Count Badge | Sidebar / header | Shows unread count from `NotificationsProvider` | — (derived from list) | ✅ Live |

## Data and State Architecture
- Server-state: `NotificationsProvider` — notification list, unread count
- Zustand stores: `useTrainerNotificationsStore` — active filter tab
- Context providers: `NotificationsProvider`
- Local-storage keys: None

## User Flows
1. Trainer opens `/trainer/notifications` → `NotificationsProvider` fetches `GET /trainer/notifications` → list renders sorted by `createdAt` desc
2. Trainer clicks a notification item → `PATCH /trainer/notifications/:id/read` → item visually transitions to read state
3. Trainer clicks "Mark all read" → `POST /trainer/notifications/read-all` → all items update to read state, unread badge clears
4. Trainer clicks filter tab (e.g. "WORKOUT") → client-side filter applied → list re-renders filtered subset

## Component Responsibility Map
- `TrainerNotificationsMain` — layout + provider mount. MUST NOT contain fetch or filter logic.
- `TrainerNotificationsList` — renders items from context. MUST NOT call API directly.
- `TrainerNotificationItem` — display + click handler only. MUST NOT manage list state.
- `TrainerNotificationsFilterBar` — emits filter value to store. MUST NOT fetch data.
- `NotificationsProvider` — fetch + unread count derivation. MUST NOT render JSX.

## Permissions and Security
| Action | Required Role |
|---|---|
| View own notifications | `TRAINER` |
| Mark own notification read | `TRAINER` |
| Mark all own notifications read | `TRAINER` |
| ❌ View other trainers' notifications | Forbidden |
| ❌ Delete notifications | Forbidden — read-only lifecycle |
| ❌ Send notifications | Manager/Admin only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8 notification row skeletons with avatar + text placeholders
- **Empty (no notifications):** `TrainerNotificationsEmptyState` — "You're all caught up" with checkmark icon
- **Empty (filtered):** `TrainerNotificationsEmptyState` — "No [type] notifications" with filter reset link
- **Error:** `error.tsx` with retry button

## Edge Cases / AI Warnings
- **Unread count** — derived from `notifications.filter(n => !n.isRead).length` inside `NotificationsProvider`. Never store unread count as a separate API field that can drift.
- **Optimistic read state** — mark-read should optimistically update the item's `isRead` flag before the API responds; revert on error.
- **Notification type icons** — use a component (`NotificationTypeIcon`) not a `Record<string, React.ReactNode>` const to avoid JSX in plain objects (Rule 55 variant).
- **Polling vs WebSocket** — if real-time is needed, use polling interval in `NotificationsProvider`; never add WebSocket logic directly in a component.
- **Timestamp display** — use relative time (e.g. "2 hours ago") via a utility, not raw ISO strings.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — trainer sees only own notifications
- [x] Rule 6: Logic/UI Separation — fetch + unread count in context, display in components
- [x] Rule 7: Type isolation — all types in `TrainerNotificationsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 40: `_forbidden.md` present in module directory
- [x] Rule 55: No `key={index}` — stable notification IDs used
- [x] Rule 63: Zero cross-module imports
