# Trainer Notifications — Feature Map

## Module Purpose
The Trainer Notifications feature displays notifications belonging to the authenticated Trainer and supports read-state mutations. It is a server-state feature: TanStack Query owns the notification list and mutation invalidation, while React component state is limited to presentation. Trainers can mark one notification or all notifications as read, but cannot delete or send notifications.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `notifications_components/` | Notification page, list, and empty-state presentation | `TrainerNotificationsMain.tsx`, `TrainerNotificationsList.tsx`, `TrainerNotificationsEmptyState.tsx` |
| `notifications_context/` | Query logic naming retained for compatibility; no React Context owns server state | `useTrainerNotificationsLogic.ts` |
| `notifications_api/` | Validated API functions | `TrainerNotificationsApi.ts` |
| `notifications_types/` | Notification response/domain schemas and types | `TrainerNotificationsTypes.ts`, `TrainerNotificationsApiSchema.ts`, `TrainerNotificationsSchemas.ts` |
| `notifications_mocks/` / fixtures | Module-owned test/mock transport where present | feature-owned mock artifacts |

## Feature Inventory
| Feature | Route | Main API | State Owner | Status |
|---|---|---|---|---|
| Notification List | `/trainer/notifications` | `GET /trainer/notifications` | TanStack Query | Live |
| Mark Single Read | `/trainer/notifications` | `PATCH /trainer/notifications/:id/read` | TanStack Query mutation + invalidation | Live |
| Mark All Read | `/trainer/notifications` | `PATCH /trainer/notifications/read-all` | TanStack Query mutation + invalidation | Live |
| Empty State | `/trainer/notifications` | Derived from query result | Component presentation | Live |

## Data and State Architecture
- Server state is owned by `useTrainerNotificationsLogic` through `useInfiniteQuery` and mutations.
- No React Context is used to own notification API data.
- No Zustand store is required for the current read-only/read-state interaction model.
- Pagination is implemented with `useInfiniteQuery`; each request uses the API client.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerNotifications(page, limit)` | GET | `/trainer/notifications?page=&limit=` | pagination query | validated notification list |
| `markTrainerNotificationRead(id)` | PATCH | `/trainer/notifications/:id/read` | notification ID | validated mutation envelope |
| `markAllTrainerNotificationsRead()` | PATCH | `/trainer/notifications/read-all` | none | validated mutation envelope |

## User Flows
### Flow 1: Mark one notification read
1. Trainer sees an unread notification.
2. Trainer activates the accessible `Mark notification as read` button.
3. `markTrainerNotificationRead(id)` executes.
4. The notifications Query cache is invalidated on success.
5. The list re-renders with the notification read.

### Flow 2: Mark all notifications read
1. Trainer activates `Mark all as read`.
2. `markAllTrainerNotificationsRead()` executes.
3. The notifications Query cache is invalidated.
4. Unread count is recalculated from returned notification data.

## Permissions and Security
- Required role: `TRAINER`.
- Trainers may view only their own notification feed according to the frontend route/capability contract.
- Trainers may mark notifications as read.
- Delete/send operations are not exposed.
- Frontend permission behavior is defense in depth; backend authorization remains authoritative.

## Loading, Empty, Error States
- `loading.tsx` renders the route skeleton.
- `TrainerNotificationsEmptyState` renders when the query has no notifications.
- Main content renders a concise user-safe error banner when the query fails.
- `Load More` uses button-level loading state and is disabled while fetching another page.

## Edge Cases and AI Warnings
- **No hover-only mutation:** Mark-read must remain keyboard/touch accessible; never rely on mouse hover.
- **No global notification context:** Do not place API notification data in a React Context merely for deep component access.
- **Pagination source:** `useInfiniteQuery` owns page progression; do not fetch the same notification pages manually elsewhere.
- **Mutation reconciliation:** Successful mark-read operations invalidate the canonical notification query.
- **No delete/send controls:** These operations are outside the Trainer capability.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerNotificationsMain.tsx` | Runs notification query logic and orchestrates page presentation. |
| `TrainerNotificationsList.tsx` | Renders notification records and accessible mark-read actions. |
| `TrainerNotificationsEmptyState.tsx` | Displays the no-data state. |
| `useTrainerNotificationsLogic.ts` | Owns Query/mutation orchestration; contains no JSX. |
| `TrainerNotificationsApi.ts` | Network transport and response validation only. |
