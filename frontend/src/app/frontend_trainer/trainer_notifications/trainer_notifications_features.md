# trainer_notifications — Feature Map (v8-fix)

## Module Purpose
The Notifications module lets a trainer review their own application notifications and mark notifications as read. It supports paginated browsing and the documented read-state mutations while keeping server data in TanStack Query. Trainer users cannot delete or administratively manage notifications beyond the permitted read actions. Notification records and mutation responses are owned by the module's API and MSW layer.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_notifications_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, http-status-codes, lucide-react, msw, next, next-intl, react, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
List → mark one/all read → mutation response → list invalidation → unread actions disappear from the affected rows.
Expected public route contract: `/trainer/notifications`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_notifications/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_notifications_api/
├──   TrainerNotificationsApi.ts
├──   TrainerNotificationsApiBehavior.test.ts
├── trainer_notifications_components/
├──   trainer_notifications_content/
├──     TrainerNotificationsContent.tsx
├──   trainer_notifications_empty_state/
├──     TrainerNotificationsEmptyState.tsx
├──   trainer_notifications_list/
├──     TrainerNotificationsList.tsx
├──   trainer_notifications_loading_skeleton/
├──     TrainerNotificationsLoadingSkeleton.tsx
├──   trainer_notifications_main/
├──     TrainerNotificationsMain.tsx
├──     TrainerNotificationsMainBehavior.test.tsx
├──   trainer_notifications_not_found_view/
├──     TrainerNotificationsNotFoundView.tsx
├── trainer_notifications_constants/
├──   TrainerNotificationsConstants.test.ts
├──   TrainerNotificationsConstants.ts
├──   TrainerNotificationsQueryKeys.ts
├── trainer_notifications_features.md
├── trainer_notifications_forbidden.md
├── trainer_notifications_hooks/
├──   useTrainerNotificationsLogic.test.ts
├──   useTrainerNotificationsLogic.ts
├──   useTrainerNotificationsMutations.test.ts
├──   useTrainerNotificationsMutations.ts
├── trainer_notifications_locales/
├──   trainer_notifications_en.json
├──   trainer_notifications_hi.json
├── trainer_notifications_mocks/
├──   trainer_notifications_fixtures/
├──     TrainerNotificationsMockData.ts
├──   trainer_notifications_handlers/
├──     TrainerNotificationsMockHandlers.ts
├── trainer_notifications_schemas/
├──   TrainerNotificationsApiSchema.ts
├──   TrainerNotificationsSchemas.ts
├── trainer_notifications_tests/
├──   TrainerNotificationsRouteStates.test.tsx
├── trainer_notifications_theme_contract.md
├── trainer_notifications_types/
├──   TrainerNotificationsListProps.ts
├──   TrainerNotificationsMutationTypes.ts
├──   TrainerNotificationsTypes.ts
└── trainer_notifications_url_config.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Route | Main API | State Owner | Status |
|---|---|---|---|---|
| Notification List | `/trainer/notifications` | `GET /trainer/notifications` | TanStack Query | Live |
| Mark Single Read | `/trainer/notifications` | `PATCH /trainer/trainer_notifications/:id/read` | TanStack Query mutation + invalidation | Live |
| Mark All Read | `/trainer/notifications` | `PATCH /trainer/trainer_notifications/read-all` | TanStack Query mutation + invalidation | Live |
| Empty State | `/trainer/notifications` | Derived from query result | Component presentation | Live |

## User Flows & Interactions
All discovered actionable controls are recorded in the v8-fix actionable-control matrix. Important flows are verified through their module-owned hooks, mutations, MSW handlers, and co-located tests.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerNotifications(page, limit)` | GET | `/trainer/notifications?page=&limit=` | pagination query | validated notification list |
| `markTrainerNotificationRead(id)` | PATCH | `/trainer/trainer_notifications/:id/read` | notification ID | validated mutation envelope |
| `markAllTrainerNotificationsRead()` | PATCH | `/trainer/trainer_notifications/read-all` | none | validated mutation envelope |

## UI Data Requirements
| UI element | Required field(s) | Endpoint | Response path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Notification title | `title` | `GET /trainer/notifications` | `data.items[].title` | No | Yes |
| Notification message | `message` | `GET /trainer/notifications` | `data.items[].message` | No | Yes |
| Notification status | `isRead` | `GET /trainer/notifications` | `data.items[].isRead` | No | Yes |
| Notification timestamp | `createdAt` | `GET /trainer/notifications` | `data.items[].createdAt` | No | Yes |
| Unread count | `unreadCount` | `GET /trainer/notifications` | `data.unreadCount` | No | Yes |

## Permissions and Security
- Required role: `TRAINER`.
- Trainers may view only their own notification feed according to the frontend route/capability contract.
- Trainers may mark notifications as read.
- Delete/send operations are not exposed.
- Frontend permission behavior is defense in depth; backend authorization remains authoritative.

## Loading, Empty, and Error States
- Route `loading.tsx` renders a structural notifications skeleton.
- `TrainerNotificationsEmptyState` handles zero-result lists.
- Query errors remain user-safe and expose retry where meaningful.
- Load-more remains disabled while another page is fetching.

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
| `trainer_notifications_components/trainer_notifications_list/TrainerNotificationsList.tsx` | Renders notification records and accessible mark-read actions. |
| `TrainerNotificationsEmptyState.tsx` | Displays the no-data state. |
| `useTrainerNotificationsLogic.ts` | Owns Query/mutation orchestration; contains no JSX. |
| `TrainerNotificationsApi.ts` | Network transport and response validation only. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerNotificationsQueryKeys.ts, useTrainerNotificationsMutations.ts.
- Hook files: useTrainerNotificationsLogic.test.ts, useTrainerNotificationsLogic.ts.
- Constants: TrainerNotificationsConstants.test.ts, TrainerNotificationsConstants.ts.
- Schemas: TrainerNotificationsApiSchema.ts, TrainerNotificationsSchemas.ts.
- Types: TrainerNotificationsListProps.ts, TrainerNotificationsMutationTypes.ts, TrainerNotificationsTypes.ts.
- Locales: en.json, hi.json.
- Utils: None.
- Module-owned tests: 6 files.
- Mock/fixture files: 2 files.

## Rule Compliance Checklist
- [x] Canonical feature module retained as single source of business implementation.
- [x] Route files physically owned by this module.
- [x] Prefixed snake_case internal folders.
- [x] Role+module filename contract for module-owned artifacts.
- [x] Component/hook/store/schema/API size ceilings.
- [x] No global business formatter dependency.
- [x] Feature-owned localization, mocks, schemas, query keys, and tests.
- [x] No raw theme colors/arbitrary Tailwind values in feature JSX.
- [x] No fake/no-op controls found in static source checks.
- [ ] Host build/CI/runtime/browser verification — NOT VERIFIED; host application configuration was not supplied.
- [x] URL configuration placement follows the documented feature-root URL configuration exception; no source conflict remains.

## Routes
- `/trainer/notifications` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_notifications/
  page.tsx
  trainer_notifications_components/
    trainer_notifications_content/
      TrainerNotificationsContent.tsx
    trainer_notifications_empty_state/
      TrainerNotificationsEmptyState.tsx
    trainer_notifications_list/
      TrainerNotificationsList.tsx
    trainer_notifications_loading_skeleton/
      TrainerNotificationsLoadingSkeleton.tsx
    trainer_notifications_main/
      TrainerNotificationsMain.tsx
    trainer_notifications_not_found_view/
      TrainerNotificationsNotFoundView.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_NOTIFICATIONS_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_NOTIFICATIONS_PAGE_LIST = '/trainer/notifications' as const;`
- `export const TRAINER_NOTIFICATIONS_API_LIST = '/trainer/notifications' as const;`
- `export const TRAINER_NOTIFICATIONS_API_LIST_PAGINATED = (page: number, limit: number) => `/trainer/notifications?page=${page}&limit=${limit}` as const;`
- `export const TRAINER_NOTIFICATIONS_API_MARK_READ = (id: string) => `/trainer/trainer_notifications/${id}/read` as const;`
- `export const TRAINER_NOTIFICATIONS_API_MARK_ALL_READ = '/trainer/trainer_notifications/read-all' as const;`
- `export const TRAINER_NOTIFICATIONS_API_WS_ENDPOINT = '/trainer/trainer_notifications/ws' as const;`
- `export const TRAINER_NOTIFICATIONS_API_PREFERENCES = '/trainer/trainer_notifications/preferences' as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: no module-scoped Zustand store is present; keep state local or server-owned.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_notifications`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
