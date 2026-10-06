# Manager Notifications — Feature Map

## Module Purpose
Manager Notifications is the branch notification inbox. Managers can review unread/high-priority notifications, filter/search the inbox, mark individual or all notifications as read, and delete notifications. Notification records and KPI counts are API data owned by this module. The module must keep global transport/auth handling separate from its business errors.

Module root: `frontend_manager/manager_notifications/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `vitest`
- `zod`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Not exposed | No module API client uses POST in the supplied snapshot. |
| Read | Exposed | ManagerNotificationsApi: fetchManagerNotifications, fetchNotificationKPIs. |
| Update | Exposed | ManagerNotificationsApi, query |
| Delete | Exposed | ManagerNotificationsApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_notifications_api/` | Owns feature API clients and request/response transport contracts. | `ManagerNotificationsApi.ts` |
| `manager_notifications_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_notifications_components/manager_notifications_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsKPIs.tsx` |
| `manager_notifications_components/manager_notifications_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsMain.tsx` |
| `manager_notifications_components/manager_notifications_main/manager_notifications_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsContent.tsx` |
| `manager_notifications_components/manager_notifications_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsTable.tsx` |
| `manager_notifications_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerNotificationsConstants.ts`, `ManagerNotificationsQueryKeys.ts`, `ManagerNotificationsSharedConstants.test.ts`, `ManagerNotificationsSharedConstants.ts` |
| `manager_notifications_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerNotificationsLogic.test.ts`, `useManagerNotificationsLogic.ts` |
| `manager_notifications_locales/` | Owns module English and Hindi translation catalogs. | `manager_notifications_en.json`, `manager_notifications_hi.json` |
| `manager_notifications_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_notifications_mocks/manager_notifications_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsMockData.ts` |
| `manager_notifications_mocks/manager_notifications_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerNotificationsMockHandlers.ts` |
| `manager_notifications_schemas/` | Owns feature Zod validation and response schemas. | `ManagerNotificationsSchema.ts` |
| `manager_notifications_tests/` | Owns module behavior and utility tests. | `ManagerNotificationsBehavior.test.tsx` |
| `manager_notifications_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerNotificationsTypes.ts`, `ManagerNotificationsViewModelTypes.ts` |
| `manager_notifications_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerNotificationsFormatters.test.ts`, `ManagerNotificationsFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_notifications_features.md`
- `manager_notifications_forbidden.md`
- `manager_notifications_theme_contract.md`
- `manager_notifications_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_stat_card/ManagerStatCard`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `vitest`
- `zod`

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

## Component Tree

- Route: `manager_notifications/page.tsx`
  - `<ManagerNotificationsMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `["manager", "notifications", "list", queryParams]`; `["manager", "notifications", "kpis"]`; `["manager", "notifications"]`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_notifications/manager_notifications_mocks/manager_notifications_mocks_handlers/` and `manager_notifications/manager_notifications_mocks/manager_notifications_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

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
**Forbidden-pattern contract:** See `manager_notifications_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Unread/read state is server state; do not mirror it as the primary source of truth in Zustand:** Unread/read state is server state; do not mirror it as the primary source of truth in Zustand.
- **Mark-all-read and delete operations must reconcile KPI counts with the authoritative result:** Mark-all-read and delete operations must reconcile KPI counts with the authoritative result.
- **Optional member names and read timestamps must render with explicit empty-value handling:** Optional member names and read timestamps must render with explicit empty-value handling.
- **Do not send module business errors through the global interceptor as generic toasts:** Do not send module business errors through the global interceptor as generic toasts.
- **Notification title/message must never include raw backend stack traces or sensitive tokens:** Notification title/message must never include raw backend stack traces or sensitive tokens.
- **Pagination/filter controls must change the request or be omitted if the endpoint is intentionally non-paginated:** Pagination/filter controls must change the request or be omitted if the endpoint is intentionally non-paginated.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_notifications/manager_notifications_components/manager_notifications_kpis/ManagerNotificationsKPIs.tsx` | KPI stat cards for the Notifications module. |
| `manager_notifications/manager_notifications_components/manager_notifications_main/ManagerNotificationsMain.tsx` | Framework entry component for the Notifications module; delegates feature behavior and UI composition to `ManagerNotificationsContent`. |
| `manager_notifications/manager_notifications_components/manager_notifications_table/ManagerNotificationsTable.tsx` | Notifications list with toolbar (search + filters) and row actions (mark read, delete). |
| `manager_notifications/manager_notifications_hooks/useManagerNotificationsLogic.ts` | Bridges URL-owned filter state with module server state and mutations. |
| `manager_notifications_components/manager_notifications_main/manager_notifications_content/ManagerNotificationsContent.tsx` | Composes the Notifications Content content sections while keeping data/state orchestration outside the view layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_NOTIFICATIONS`
- Active locales: `en`, `hi`
- English catalog: `manager_notifications/manager_notifications_locales/manager_notifications_en.json`
- Hindi catalog: `manager_notifications/manager_notifications_locales/manager_notifications_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerNotificationsMain.tsx`
- Primary query-key registry: `ManagerNotificationsQueryKeys.ts`
- Primary module constants registry: `ManagerNotificationsConstants.ts`
- Canonical schema file: `ManagerNotificationsSchema.ts` in `manager_notifications_schemas/`
- Module theme contract: `manager_notifications_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_notifications_components/manager_notifications_main/ManagerNotificationsMain.tsx` | YES |
| API client | `ManagerNotificationsApi.ts` | YES |
| Schema file | `ManagerNotificationsSchema.ts` | YES |
| Query-key registry | `ManagerNotificationsQueryKeys.ts` | YES |
| Constants registry | `ManagerNotificationsConstants.ts` | YES |
| URL config | `manager_notifications_url_config.ts` | YES |
| Behavior test | `ManagerNotificationsBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_notifications_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_notifications/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_notifications/manager_notifications_mocks/manager_notifications_mocks_fixtures/` and `manager_notifications/manager_notifications_mocks/manager_notifications_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
