# Admin Notifications — Feature Map

## Module Purpose
The Admin Notifications module presents administrative notifications and their read-state workflows in a dedicated feature boundary. Users can review notifications, open the notification panel, mark a notification as read, mark all notifications as read, and navigate to the module route for the full list. The module owns the client presentation and notification API contract while relying on approved application-level realtime infrastructure where required. It does not redefine the application's WebSocket transport or session infrastructure.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/notifications` | ``frontend_admin/admin_notifications/page.tsx`` | ``frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_main/AdminNotificationsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_notifications/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_notifications_api/` | Typed API transport boundary. | AdminNotificationsApi.ts |
| `admin_notifications_components/` | Feature component root. | (empty) |
| `admin_notifications_constants/` | Static business configuration and query-key registries. | AdminNotificationsConstants.ts, AdminNotificationsQueryKeys.ts |
| `admin_notifications_hooks/` | Feature data-flow and interaction hooks. | useAdminNotificationsMutations.test.tsx, useAdminNotificationsMutations.ts, useAdminNotificationsPage.test.tsx, useAdminNotificationsPage.ts |
| `admin_notifications_locales/` | Module-owned localized resources. | admin_notifications_en.json, admin_notifications_hi.json |
| `admin_notifications_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_notifications_schemas/` | Zod validation/runtime contracts. | AdminNotificationsSchemas.ts |
| `admin_notifications_types/` | Domain, DTO, state, and prop type contracts. | AdminNotificationsErrorPropsTypes.ts, AdminNotificationsListPropsTypes.ts, AdminNotificationsMockHandlerTypes.ts, AdminNotificationsQueryTypes.ts, AdminNotificationsTypes.ts |
| `admin_notifications_utils/` | Feature-local deterministic utilities and formatters. | AdminNotificationsFormatters.test.ts, AdminNotificationsFormatters.ts |
| `admin_notifications_components/admin_notifications_client/` | Feature-owned implementation boundary. | AdminNotificationsClient.test.tsx, AdminNotificationsClient.tsx |
| `admin_notifications_components/admin_notifications_empty_state/` | Feature-owned implementation boundary. | AdminNotificationsEmptyState.tsx |
| `admin_notifications_components/admin_notifications_header/` | Feature-owned implementation boundary. | AdminNotificationsHeader.tsx, useAdminNotificationsHeader.test.ts, useAdminNotificationsHeader.ts |
| `admin_notifications_components/admin_notifications_list/` | Feature-owned implementation boundary. | AdminNotificationsList.test.tsx, AdminNotificationsList.tsx |
| `admin_notifications_components/admin_notifications_list_skeleton/` | Feature-owned implementation boundary. | AdminNotificationsListSkeleton.tsx |
| `admin_notifications_components/admin_notifications_main/` | Feature-owned implementation boundary. | AdminNotificationsMain.tsx |
| `admin_notifications_mocks/admin_notifications_fixtures/` | Module-owned mock API datasets. | AdminNotificationsMockFixtures.ts, AdminNotificationsMockState.ts |
| `admin_notifications_mocks/admin_notifications_handlers/` | Module-owned MSW request handlers. | AdminNotificationsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Present in supplied API client.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutWebSocketProvider`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminNotificationsClient.tsx` | `Orchestrates the notifications list and actions (mark all read, clear all).` |
| `AdminNotificationsEmptyState.tsx` | `Presents the feature-owned no-notification terminal state for the Admin Notifications module.` |
| `AdminNotificationsHeader.tsx` | `Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.` |
| `AdminNotificationsList.tsx` | `Renders the Admin notification feed and marks unread notifications as read through explicit user interaction.` |
| `AdminNotificationsListSkeleton.tsx` | `Renders the structural loading state for the Admin notification feed.` |
| `AdminNotificationsMain.tsx` | `Route-level orchestrator for the Admin Notifications feature.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: markNotificationAsRead
markNotificationAsRead: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: markAllNotificationsAsRead
markAllNotificationsAsRead: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminNotificationsMutations.ts`, `useAdminNotificationsPage.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `list`, `notifications`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminNotificationsApi.ts` | `fetchNotifications` | `GET` | `params?: AdminNotificationsQueryParams` | `ApiResponse<AdminNotification[]` |
| `AdminNotificationsApi.ts` | `markNotificationAsRead` | `PATCH` | `id: string, idempotencyKey: string` | `ApiResponse<AdminNotification | null` |
| `AdminNotificationsApi.ts` | `markAllNotificationsAsRead` | `PATCH` | `idempotencyKey: string` | `ApiResponse<null` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_notifications_url_config.ts` | `markRead: (id: string) => `/admin/notifications/${encodeURIComponent(id)}/read`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminNotificationsClient.tsx` | Orchestrates the notifications list and actions (mark all read, clear all). | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminNotificationsEmptyState.tsx` | Presents the feature-owned no-notification terminal state for the Admin Notifications module. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminNotificationsHeader.tsx` | Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminNotificationsList.tsx` | Renders the Admin notification feed and marks unread notifications as read through explicit user interaction. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminNotificationsMain.tsx` | Route-level orchestrator for the Admin Notifications feature. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminNotificationsClient.tsx` | Orchestrates the notifications list and actions (mark all read, clear all). | 2 |
| `AdminNotificationsEmptyState.tsx` | Presents the feature-owned no-notification terminal state for the Admin Notifications module. | 1 |
| `AdminNotificationsHeader.tsx` | Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 |
| `AdminNotificationsList.tsx` | Renders the Admin notification feed and marks unread notifications as read through explicit user interaction. | 1 |
| `AdminNotificationsListSkeleton.tsx` | Renders the structural loading state for the Admin notification feed. | 0 |
| `AdminNotificationsMain.tsx` | Route-level orchestrator for the Admin Notifications feature. | 0 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.


## Component Tree

`admin_notifications_components/`
- `admin_notifications_client/AdminNotificationsClient.test.tsx`
- `admin_notifications_client/AdminNotificationsClient.tsx`
- `admin_notifications_empty_state/AdminNotificationsEmptyState.tsx`
- `admin_notifications_header/AdminNotificationsHeader.tsx`
- `admin_notifications_header/useAdminNotificationsHeader.test.ts`
- `admin_notifications_header/useAdminNotificationsHeader.ts`
- `admin_notifications_list/AdminNotificationsList.test.tsx`
- `admin_notifications_list/AdminNotificationsList.tsx`
- `admin_notifications_list_skeleton/AdminNotificationsListSkeleton.tsx`
- `admin_notifications_main/AdminNotificationsMain.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_notifications_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
