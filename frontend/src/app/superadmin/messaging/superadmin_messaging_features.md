# Messaging Module — Feature Map

## Module Purpose
Provides superadmins with per-tenant direct messaging (Email, SMS, In-App) and an in-app notification center for system alerts. Replaces the gap left by Broadcasts (which are mass announcements) with targeted 1-to-1 tenant communication.

## Directory Structure
- `messaging_components/` — Client UI orchestrator (`SuperadminMessagingClient.tsx`)
- `messaging_types/` — TypeScript types (`messaging_types.ts`) and static constants/mock data (`messaging_constants.ts`)
- `page.tsx` — Server component entry point
- `loading.tsx` — Structural skeleton UI
- `error.tsx` — Module-level error boundary with `reset()` retry

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| Messages tab | `SuperadminMessagingClient.tsx` | Lists all sent/draft messages with channel + status badges | `GET /superadmin/messaging`  | Superadmin |
| Channel filter | `SuperadminMessagingClient.tsx` | Filters messages by EMAIL / SMS / IN_APP | — (client-side) | Superadmin |
| Compose modal | `SuperadminMessagingClient.tsx` | Compose and send a message to a specific tenant | `POST /superadmin/messaging`  | Superadmin |
| Notifications tab | `SuperadminMessagingClient.tsx` | In-app alert center with unread count badge | `GET /superadmin/notifications`  | Superadmin |
| Mark read | `SuperadminMessagingClient.tsx` | Marks individual notification as read | `PATCH /superadmin/notifications/:id/read`  | Superadmin |
| Mark all read | `SuperadminMessagingClient.tsx` | Marks all notifications as read | `POST /superadmin/notifications/read-all`  | Superadmin |

## Data and State Architecture
- Server-state query keys: `['superadmin', 'messaging']`, `['superadmin', 'notifications']` 
- Zustand stores: none
- Context providers: none
- Local-storage keys: none
- MSW handler file: `src/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers.ts` 

## API Contract
- `GET /superadmin/messaging` → `ApiResponse<TenantMessage[]>`
- `POST /superadmin/messaging` → `ApiResponse<TenantMessage>`
- `GET /superadmin/notifications` → `ApiResponse<SuperadminNotification[]>`
- `PATCH /superadmin/notifications/:id/read` → `ApiResponse<SuperadminNotification>`
- `POST /superadmin/notifications/read-all` → `ApiResponse<{ updated: number }>`

## Permissions and Security
- All actions restricted to `SUPERADMIN` role only
- Message body must be sanitized server-side before delivery

## Loading, Empty, Error States
- Loading: `loading.tsx` — structural skeleton (tabs + table rows)
- Empty messages: inline "No messages found" in table body
- Empty notifications: inline "No notifications" in list
- Error: `error.tsx` — module-specific fallback with `reset()` retry button

## Edge Cases / AI Warnings
- `NotifIcon` is a small component, NOT a `Record<string, React.ReactNode>` const — avoids JSX in plain objects
- `CHANNEL_STYLES` and `MESSAGE_STATUS_STYLES` live in `messaging_constants.ts` — never inline
- Tab state is local `useState` — not synced to URL (notifications are ephemeral)
- Compose modal uses `z-40` not `z-50` (Design §12 Z-index scale)

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

Types found but could not be parsed.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — single client component, types + constants isolated
- [x] Rule 3: Module prefix naming — `SuperadminMessagingClient`, `messaging_types`, `messaging_constants`
- [x] Rule 7: Type isolation — all types in `messaging_types.ts`
- [x] Rule 8: Server/client boundary — `page.tsx` is server component
- [x] Rule 9: Loading/error handling — `loading.tsx` skeleton + `error.tsx` with `reset()`
- [x] Rule 38: RESPONSIBILITY comment on client component
- [x] Rule 40: `forbidden.md` present
- [x] Rule 55: No `key={index}` — stable IDs used (`msg.id`, `notif.id`)
- [x] Rule 73: `import type` used for all type-only imports
- [x] Design §9: `size={18} strokeWidth={2}` on all icons
- [x] Design §12/29: `motion-safe:` prefix on all transitions
- [x] Rule 63: Zero cross-module imports — `MESSAGING_TENANTS` is self-contained in `messaging_constants.ts`
- [x] Rule 20: Custom searchable `TenantSearchDropdown` component — no native `<select>` for tenant list
- [x] Rule 7: `MessagingTab` type exported from `messaging_types.ts`; `NotificationType` used on `SuperadminNotification.type`
- [x] Rule 9: `not-found.tsx` present with branded 404 + Back to Dashboard
- [x] Design §30: `bg-overlay` used for compose modal

---

## Edge Cases and AI Warnings

- **Delete Messaging is permanent and irreversible:** Never use `window.confirm()` for Messaging deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Messaging Table Row Clicks:** The `Messaging` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Messaging:** Do not allow a single failed API fetch in Messaging to unmount the entire page. Major components (like the Messaging data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Messaging Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Messaging.
- **No Client-Side Pagination for Messaging:** If the dataset grows large, do not fetch all Messaging and paginate on the client. always implement robust server-side pagination, sorting, and filtering via query parameters using useSuperadminUrlState.


## State Architecture
- Server State: TanStack Query
- UI State: React `useState` or Zustand


## Component Responsibility Map

| Component | Responsibility |
|---|---|
| `SuperadminMessagingClient.tsx` | Renders UI for messaging |
| `SuperadminMessagingComposeModal.tsx` | Renders UI for messaging |
| `SuperadminMessagingMessagesTab.tsx` | Renders UI for messaging |
| `SuperadminMessagingNotificationsTab.tsx` | Renders UI for messaging |
| `SuperadminMessagingTenantDropdown.tsx` | Renders UI for messaging |
