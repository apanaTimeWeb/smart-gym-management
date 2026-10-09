# trainer_dashboard — Feature Map (v8-fix)

## Module Purpose
The Dashboard module is the trainer's operational landing page for daily coaching activity. It surfaces trainer-scoped KPIs, goal trends, membership distribution, upcoming sessions, and recent progress, with a URL-backed date-range selector. The module is intentionally non-financial and does not own payout, revenue, salary, commission, or TDS data. Dashboard server data is Query-owned and mockable inside the feature.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_dashboard_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, lucide-react, msw, next, next-intl, react, react-apexcharts, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Read-only module: no create/update/delete mutation API is documented.
Expected public route contract: `/trainer/dashboard`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_dashboard/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_dashboard_api/
├──   TrainerDashboardApi.ts
├──   TrainerDashboardApiBehavior.test.ts
├── trainer_dashboard_components/
├──   trainer_dashboard_date_filter_dropdown/
├──     TrainerDashboardDateFilterDropdown.tsx
├──   trainer_dashboard_empty_state/
├──     TrainerDashboardEmptyState.tsx
├──   trainer_dashboard_goal_trend_chart/
├──     TrainerDashboardGoalTrendChart.tsx
├──   trainer_dashboard_kpis/
├──     TrainerDashboardKPIs.tsx
├──   trainer_dashboard_loading_skeleton/
├──     TrainerDashboardLoadingSkeleton.tsx
├──   trainer_dashboard_main/
├──     TrainerDashboardMain.tsx
├──     TrainerDashboardMainBehavior.test.tsx
├──   trainer_dashboard_membership_distribution/
├──     TrainerDashboardMembershipDistribution.tsx
├──   trainer_dashboard_not_found_view/
├──     TrainerDashboardNotFoundView.tsx
├──   trainer_dashboard_quick_actions/
├──     TrainerDashboardQuickActions.tsx
├──   trainer_dashboard_recent_progress/
├──     TrainerDashboardRecentProgress.tsx
├──   trainer_dashboard_upcoming_sessions/
├──     TrainerDashboardUpcomingSessions.tsx
├── trainer_dashboard_constants/
├──   TrainerDashboardConstants.test.ts
├──   TrainerDashboardConstants.ts
├──   TrainerDashboardQueryKeys.ts
├── trainer_dashboard_features.md
├── trainer_dashboard_forbidden.md
├── trainer_dashboard_hooks/
├──   useTrainerDashboardQuery.test.ts
├──   useTrainerDashboardQuery.ts
├── trainer_dashboard_locales/
├──   trainer_dashboard_en.json
├──   trainer_dashboard_hi.json
├── trainer_dashboard_mocks/
├──   trainer_dashboard_fixtures/
├──     TrainerDashboardMockData.ts
├──   trainer_dashboard_handlers/
├──     TrainerDashboardMockHandlers.ts
├── trainer_dashboard_schemas/
├──   TrainerDashboardDomainSchemas.ts
├── trainer_dashboard_tests/
├──   TrainerDashboardRouteStates.test.tsx
├── trainer_dashboard_theme_contract.md
├── trainer_dashboard_types/
├──   TrainerDashboardDateRangeTypes.ts
├──   TrainerDashboardEmptyStateProps.ts
├──   TrainerDashboardQueryParamsTypes.ts
├──   TrainerDashboardTypes.ts
├── trainer_dashboard_url_config.ts
├── trainer_dashboard_utils/
├──   TrainerDashboardDateRangeConstants.test.ts
├──   TrainerDashboardDateRangeConstants.ts
├──   TrainerDashboardResolveDateRange.test.ts
├──   TrainerDashboardResolveDateRange.ts
├──   TrainerDashboardFormatNumber.test.ts
└──   TrainerDashboardFormatNumber.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| KPI cards | Operational trainer metrics only. |
| Goal trend | Goal-completion trend from dashboard response. |
| Membership distribution | Assigned-member plan distribution from dashboard response. |
| Upcoming sessions | Next trainer sessions from dashboard response. |
| Recent progress | Recent member progress activity. |
| Quick actions | Links to documented trainer workflows. |
| Date filter | Presets/custom range encoded in URL and sent to the query/mocks. |

## User Flows & Interactions
1. Open `/trainer/dashboard` → loading skeleton → dashboard response.
2. Select date range → URL updates → query key changes → mock/API receives the range → visible dashboard metrics update.
3. Use quick action → documented destination route opens.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchDashboardStats` | GET | `TRAINER_DASHBOARD_URLS.API.STATS` | `range`, optional `startDate`, `endDate` | `TrainerDashboardStats` |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Operational KPI cards | trainer-scoped operational KPI fields defined in `TrainerDashboardStats` | dashboard response |
| Goal trend | trend/date/value fields defined in `TrainerDashboardStats` | dashboard response |
| Membership distribution | plan/category/count fields defined in `TrainerDashboardStats` | dashboard response |
| Upcoming sessions | session identity/date/time fields defined in `TrainerDashboardStats` | dashboard response |
| Recent progress | progress item identity/date/measurement fields defined in `TrainerDashboardStats` | dashboard response |
| Date filter | `range`, `startDate`, `endDate` | URL + API request |

## Permissions and Security
- Required capability: `trainer.view` through the Trainer role guard.
- Dashboard must remain trainer-scoped and must not expose Manager/Superadmin financial data.
- Finance/payout/revenue fields are explicitly forbidden in this module.

## Loading, Empty, and Error States
- `loading.tsx` and `TrainerDashboardLoadingSkeleton` mirror KPI/chart regions.
- Route error uses `error.tsx` Retry fallback.
- Empty chart/list states are rendered by their owning sections rather than blank containers.
- Date-range query errors remain user-safe.

## Edge Cases and AI Warnings
- **No finance regression:** never reintroduce revenue, payout, salary, commission, or TDS fields here.
- **Date range is URL state:** changes must update the query key and server request.
- **KPI data is server state:** never move response fields into a Dashboard Zustand store.
- **Quick actions must point to valid Trainer destinations:** do not invent role routes.
- **Fixture parity matters:** any newly rendered KPI/chart field must also appear in module fixtures and the UI data contract.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerDashboardMain` | Dashboard composition and section layout. |
| `TrainerDashboardKPIs` | Operational KPI presentation. |
| `TrainerDashboardGoalTrend` | Goal trend chart/summary. |
| `TrainerDashboardMembershipDistribution` | Membership distribution visualization. |
| `TrainerDashboardUpcomingSessions` | Upcoming session list. |
| `TrainerDashboardRecentProgress` | Recent progress list. |
| `TrainerDashboardDateFilterDropdown` | URL-backed date selection. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerDashboardQueryKeys.ts, useTrainerDashboardQuery.test.ts, useTrainerDashboardQuery.ts.
- Hook files: useTrainerDashboardQuery.test.ts, useTrainerDashboardQuery.ts.
- Constants: TrainerDashboardConstants.test.ts, TrainerDashboardConstants.ts.
- Schemas: TrainerDashboardDomainSchemas.ts.
- Types: TrainerDashboardDateRangeTypes.ts, TrainerDashboardEmptyStateProps.ts, TrainerDashboardTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerDashboardDateRangeConstants.test.ts, TrainerDashboardDateRangeConstants.ts, TrainerDashboardResolveDateRange.test.ts, TrainerDashboardResolveDateRange.ts, TrainerDashboardFormatNumber.ts.
- Module-owned tests: 8 files.
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
- `/trainer/dashboard` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route.
2. Load server-backed queries and render KPI/list/detail content.
3. Apply documented filters/date/search controls; URL/query state updates the view.
4. Recover through loading, empty, and error states.

## Component Tree
```text
trainer_dashboard/
  page.tsx
  trainer_dashboard_components/
    trainer_dashboard_date_filter_dropdown/
      TrainerDashboardDateFilterDropdown.tsx
    trainer_dashboard_empty_state/
      TrainerDashboardEmptyState.tsx
    trainer_dashboard_goal_trend_chart/
      TrainerDashboardGoalTrendChart.tsx
    trainer_dashboard_kpis/
      TrainerDashboardKPIs.tsx
    trainer_dashboard_loading_skeleton/
      TrainerDashboardLoadingSkeleton.tsx
    trainer_dashboard_main/
      TrainerDashboardMain.tsx
    trainer_dashboard_membership_distribution/
      TrainerDashboardMembershipDistribution.tsx
    trainer_dashboard_not_found_view/
      TrainerDashboardNotFoundView.tsx
    trainer_dashboard_quick_actions/
      TrainerDashboardQuickActions.tsx
    trainer_dashboard_recent_progress/
      TrainerDashboardRecentProgress.tsx
    trainer_dashboard_upcoming_sessions/
      TrainerDashboardUpcomingSessions.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_DASHBOARD_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_DASHBOARD_PAGE_LIST = '/trainer/dashboard' as const;`
- `export const TRAINER_DASHBOARD_PAGE_WORKOUT = '/trainer/workout' as const;`
- `export const TRAINER_DASHBOARD_PAGE_ATTENDANCE = '/trainer/attendance' as const;`
- `export const TRAINER_DASHBOARD_PAGE_MEMBERS = '/trainer/members' as const;`
- `export const TRAINER_DASHBOARD_PAGE_LIBRARY = '/trainer/library' as const;`
- `export const TRAINER_DASHBOARD_PAGE_PROGRESS_TRACKING = '/trainer/progress-tracking' as const;`
- `export const TRAINER_DASHBOARD_PAGE_SCHEDULE = '/trainer/schedule' as const;`
- `export const TRAINER_DASHBOARD_API_STATS = '/trainer/trainer_dashboard/stats' as const;`

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
- Do not import sibling feature business code into `trainer_dashboard`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
