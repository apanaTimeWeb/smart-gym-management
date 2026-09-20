# Trainer Dashboard — Feature Map

## Module Purpose
The Dashboard module is the trainer's operational landing page for daily coaching activity. It surfaces trainer-scoped KPIs, goal trends, membership distribution, upcoming sessions, and recent progress, with a URL-backed date-range selector. The module is intentionally non-financial and does not own payout, revenue, salary, commission, or TDS data. Dashboard server data is Query-owned and mockable inside the feature.

## Directory Structure
- `page.tsx` — Server Component route entry.
- `loading.tsx` — Dashboard-shaped skeleton.
- `error.tsx` / `not-found.tsx` — route fallbacks.
- `dashboard_components/` — page sections, KPI/chart components, and date filter.
- `dashboard_queries/` — TanStack Query server state.
- `dashboard_api/` — API boundary.
- `dashboard_types/` — response schema/domain types.
- `dashboard_mocks/fixtures/` / `dashboard_mocks/` — feature-owned demo response and date-range behavior.
- `dashboard_utils/` — date-range configuration/helpers and shared UI constants.
- `dashboard_url_config.ts` — Dashboard page/backend URL contract plus documented navigation targets used by dashboard actions.
- `dashboard_tests/` — API, main UI, and route-state behavior.

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

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Data and State Architecture
- TanStack Query is the only server-state owner.
- Date range is URL state (`range`, optional `startDate`, `endDate`).
- No Dashboard React Context.
- No Dashboard Zustand store is used for server/date state.
- Feature fixtures are demo server data; dashboard mock responses vary deterministically by requested range.

## User Flows & Interactions
1. Open `/trainer/dashboard` → loading skeleton → dashboard response.
2. Select date range → URL updates → query key changes → mock/API receives the range → visible dashboard metrics update.
3. Use quick action → documented destination route opens.

## Forbidden Data
Dashboard does not own revenue, payout, salary, commission, TDS, or other financial KPI fields.

## Architecture Notes
- `dashboard_url_config.ts` owns the Dashboard module's route/API contract.
- Feature-specific UI data stays in `dashboard_utils/` and fixture data stays in `dashboard_mocks/fixtures/`.
- Root tooling is outside the archive, so runtime build/lint/typecheck/E2E remain `NOT VERIFIED` until the application root is available.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, global formatting primitives, and approved role shell components.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchDashboardStats` | GET | `DashboardUrlConfig.BACKEND_API.STATS` | `range`, optional `startDate`, `endDate` | `DashboardStats` |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Operational KPI cards | trainer-scoped operational KPI fields defined in `DashboardStats` | dashboard response |
| Goal trend | trend/date/value fields defined in `DashboardStats` | dashboard response |
| Membership distribution | plan/category/count fields defined in `DashboardStats` | dashboard response |
| Upcoming sessions | session identity/date/time fields defined in `DashboardStats` | dashboard response |
| Recent progress | progress item identity/date/measurement fields defined in `DashboardStats` | dashboard response |
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

## Rule Compliance Checklist
- [x] No financial/revenue data in Dashboard
- [x] URL-backed date filter
- [x] TanStack Query server-state ownership
- [x] Feature-owned fixtures/handlers
- [x] Feature loading/error/not-found routes
- [x] No cross-feature business imports
- [ ] Parent-app runtime/tooling verification — NOT VERIFIED outside supplied archive
