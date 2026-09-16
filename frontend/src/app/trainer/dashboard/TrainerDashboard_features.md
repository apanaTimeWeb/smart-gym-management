# Trainer Dashboard — Feature Map

## Module Purpose
The Trainer Dashboard is the primary landing page for the Trainer role. It shows KPIs
scoped to the trainer's own clients: assigned member count, today's sessions, upcoming
sessions, and recent member activity. Financial data, global member counts, and revenue
are strictly forbidden in this module. All data is read-only.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Structural skeleton matching KPI grid layout |
| `error.tsx` | Error boundary |
| `dashboard_components/TrainerDashboardMain.tsx` | Root Client Component |
| `dashboard_components/TrainerDashboardKpiCards.tsx` | Assigned members, today's sessions KPIs |
| `dashboard_components/TrainerDashboardUpcomingSessions.tsx` | Next 5 scheduled sessions list |
| `dashboard_components/TrainerDashboardRecentActivity.tsx` | Recent member check-ins / progress updates |
| `dashboard_context/DashboardProvider.tsx` | Fetch state for all dashboard data |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| KPI Cards | `/trainer/dashboard` | Assigned members, session counts | `GET /trainer/dashboard/stats` | ✅ Live |
| Upcoming Sessions | `/trainer/dashboard` | Next scheduled sessions | `GET /trainer/dashboard/sessions` | ✅ Live |
| Recent Activity | `/trainer/dashboard` | Member check-ins / updates | `GET /trainer/dashboard/activity` | ✅ Live |

## Data and State Architecture
- Server-state: `DashboardProvider` — parallel fetch of all 3 endpoints
- Zustand stores: None — read-only
- Context providers: `DashboardProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Trainer logs in → redirected to `/trainer/dashboard`
2. `loading.tsx` skeleton renders immediately
3. `DashboardProvider` fires parallel API calls → sections populate
4. Trainer clicks a member in recent activity → navigates to `/trainer/members/:id`

## Component Responsibility Map
- `TrainerDashboardMain` — layout grid. MUST NOT fetch data directly.
- `DashboardProvider` — owns all fetch state. MUST NOT render UI.
- `TrainerDashboardKpiCards` — pure display, receives stats as props.
- `TrainerDashboardUpcomingSessions` — read-only list, no actions.

## Permissions and Security
| Action | Required Role |
|---|---|
| View dashboard | `TRAINER` |
| ❌ View revenue / finance | Strictly forbidden — Trainer role |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 KPI shimmer cards + 2 list skeletons
- **Empty:** KPI cards show `0`; lists show "No upcoming sessions"
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **No financial data** — never add revenue, payment, or salary KPIs to this dashboard. Trainer role is strictly forbidden from financial data.
- **Parallel fetches mandatory** — all 3 API calls must fire simultaneously via `Promise.all`.
- **No mutations** — this page is 100% read-only.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — no financial data, no cross-role imports
- [x] Rule 6: Logic/UI Separation — all fetch in `DashboardProvider`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
