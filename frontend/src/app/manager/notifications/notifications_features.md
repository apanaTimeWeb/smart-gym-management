# Manager Notifications — Feature Map

## Module Purpose
Manager Notifications is the branch notification inbox. Managers can review unread/high-priority notifications, filter/search the inbox, mark individual or all notifications as read, and delete notifications. Notification records and KPI counts are API data owned by this module. The module must keep global transport/auth handling separate from its business errors.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `notifications_api/` | Feature-owned responsibility for the notifications module. | `ManagerNotificationsApi.ts` |
| `notifications_components/` | Feature-owned responsibility for the notifications module. | `—` |
| `notifications_hooks/` | Feature-owned responsibility for the notifications module. | `ManagerUseManagerNotificationsLogic.ts` |
| `notifications_fixtures/` | Feature-owned responsibility for the notifications module. | `ManagerNotificationsMockData.ts` |
| `notifications_mocks/` | Feature-owned responsibility for the notifications module. | `ManagerNotificationsMockHandlers.ts` |
| `notifications_types/` | Feature-owned responsibility for the notifications module. | `ManagerNotificationsSchema.ts; ManagerNotificationsTypes.ts` |
| `notifications_utils/` | Feature-owned responsibility for the notifications module. | `ManagerNotificationsSharedConstants.ts` |

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchManagerNotifications | `/manager/notifications` | Uses the fetchManagerNotifications workflow with typed request/response handling. | `GET /manager/notifications` | ✅ Implemented |
| fetchNotificationKPIs | `/manager/notifications` | Uses the fetchNotificationKPIs workflow with typed request/response handling. | `GET /manager/notifications/kpis` | ✅ Implemented |
| markNotificationRead | `/manager/notifications` | Uses the markNotificationRead workflow with typed request/response handling. | `PATCH /manager/notifications/:id/read` | ✅ Implemented |
| markAllNotificationsRead | `/manager/notifications` | Uses the markAllNotificationsRead workflow with typed request/response handling. | `PATCH /manager/notifications/read-all` | ✅ Implemented |
| deleteNotification | `/manager/notifications` | Uses the deleteNotification workflow with typed request/response handling. | `DELETE /manager/notifications/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Process notifications
1. The inbox loads notifications and KPI counts from the module API.
2. The manager searches/filters the list using server parameters where supported.
3. Mark-read or delete actions call the corresponding mutation.
4. The response message is surfaced and the relevant notification/KPI queries are reconciled.

## Data and State Architecture
TanStack Query owns notifications server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchManagerNotifications` | `GET` | `/api/v1/manager/notifications` | `{ page?, limit?, search?, status?, priority?, type? }` | `{ notifications: Notification[]; total: number }` |
| `fetchNotificationKPIs` | `GET` | `/api/v1/manager/notifications/kpis` | `—` | `NotificationKPIData` |
| `markNotificationRead` | `PATCH` | `/api/v1/manager/notifications/:id/read` | `{ id: string }` | `null` |
| `markAllNotificationsRead` | `PATCH` | `/api/v1/manager/notifications/read-all` | `—` | `null` |
| `deleteNotification` | `DELETE` | `/api/v1/manager/notifications/:id` | `{ id: string }` | `null` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total | `total` | `/api/v1/manager/notifications/kpis` | `data.total` | No | Yes |
| KPI: Unread | `unread` | `/api/v1/manager/notifications/kpis` | `data.unread` | No | Yes |
| KPI: High priority | `highPriority` | `/api/v1/manager/notifications/kpis` | `data.highPriority` | No | Yes |
| KPI: Today count | `todayCount` | `/api/v1/manager/notifications/kpis` | `data.todayCount` | No | Yes |
| List: Title | `title` | `/api/v1/manager/notifications` | `data.notifications[].title` | No | Yes |
| List: Message | `message` | `/api/v1/manager/notifications` | `data.notifications[].message` | No | Yes |
| List: Type | `type` | `/api/v1/manager/notifications` | `data.notifications[].type` | No | Yes |
| List: Priority | `priority` | `/api/v1/manager/notifications` | `data.notifications[].priority` | No | Yes |
| List: Status | `status` | `/api/v1/manager/notifications` | `data.notifications[].status` | No | Yes |
| List: Created at | `createdAt` | `/api/v1/manager/notifications` | `data.notifications[].createdAt` | No | Yes |
| List: Member name | `memberName` | `/api/v1/manager/notifications` | `data.notifications[].memberName` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
- **Unread/read state is server state; do not mirror it as the primary source of truth in Zustand:** Unread/read state is server state; do not mirror it as the primary source of truth in Zustand.
- **Mark-all-read and delete operations must reconcile KPI counts with the authoritative result:** Mark-all-read and delete operations must reconcile KPI counts with the authoritative result.
- **Optional member names and read timestamps must render with explicit empty-value handling:** Optional member names and read timestamps must render with explicit empty-value handling.
- **Do not send module business errors through the global interceptor as generic toasts:** Do not send module business errors through the global interceptor as generic toasts.
- **Notification title/message must never include raw backend stack traces or sensitive tokens:** Notification title/message must never include raw backend stack traces or sensitive tokens.
- **Pagination/filter controls must change the request or be omitted if the endpoint is intentionally non-paginated:** Pagination/filter controls must change the request or be omitted if the endpoint is intentionally non-paginated.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `notifications/notifications_components/ManagerNotificationsKPIs/ManagerNotificationsKPIs.tsx` | KPI stat cards for the Notifications module. |
| `notifications/notifications_components/ManagerNotificationsMain/ManagerNotificationsMain.tsx` | Framework entry component for the Notifications module; delegates feature behavior and UI composition to `ManagerNotificationsContent`. |
| `notifications/notifications_components/ManagerNotificationsTable/ManagerNotificationsTable.tsx` | Notifications list with toolbar (search + filters) and row actions (mark read, delete). |
| `notifications/notifications_hooks/ManagerUseManagerNotificationsLogic.ts` | Bridges URL-owned filter state with module server state and mutations. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
