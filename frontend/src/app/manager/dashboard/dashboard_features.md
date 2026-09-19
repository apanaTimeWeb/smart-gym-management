# Manager Dashboard — Feature Map

## Module Purpose
Manager Dashboard is the branch operating overview. It displays management KPIs, member-growth and revenue charts, recent members, recent payments, pending payments, and expiring memberships for the selected reporting range. It is read-oriented and should consume dashboard data as server state rather than storing API payloads in client state. The module does not own CRUD business records.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `dashboard_api/` | Feature-owned responsibility for the dashboard module. | `ManagerDashboardApi.ts; ManagerDashboardServerApi.ts; ManagerUseManagerDashboardQueries.ts` |
| `dashboard_components/` | Feature-owned responsibility for the dashboard module. | `—` |
| `dashboard_fixtures/` | Feature-owned responsibility for the dashboard module. | `ManagerDashboardMockData.ts` |
| `dashboard_mocks/` | Feature-owned responsibility for the dashboard module. | `—` |
| `dashboard_hooks/` | Owns dashboard URL query state; does not store server data. | `ManagerUseManagerDashboardUrlState.ts` |
| `dashboard_types/` | Feature-owned responsibility for the dashboard module. | `ManagerDashboardSchema.ts; ManagerDashboardTypes.ts` |
| `dashboard_utils/` | Feature-owned responsibility for the dashboard module. | `ManagerDashboardSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchDashboardStats | `/manager/dashboard` | Uses the fetchDashboardStats workflow with typed request/response handling. | `GET /manager/dashboard/stats` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Review dashboard
1. Manager opens the dashboard and the selected date-range state is loaded from shareable URL/query state.
2. fetchDashboardStats(params) retrieves the complete dashboard snapshot.
3. MSW returns the full dashboard fixture, including KPIs, chart series, and recent lists.
4. TanStack Query exposes the response to KPI/chart/table sections, each with its own loading/error handling.

## Data and State Architecture
TanStack Query owns dashboard server/API data. Dashboard reporting range and custom dates are URL state; no Zustand store owns these server-query parameters. Module-local state is limited to transient UI state and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchDashboardStats` | `GET` | `/api/v1/manager/dashboard/stats` | `{ range?, startDate?, endDate? }` | `DashboardStats` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total members | `totalMembers` | `/api/v1/manager/dashboard/stats` | `data.totalMembers` | No | Yes |
| KPI: Active members | `activeMembers` | `/api/v1/manager/dashboard/stats` | `data.activeMembers` | No | Yes |
| KPI: Total revenue | `totalRevenue` | `/api/v1/manager/dashboard/stats` | `data.totalRevenue` | No | Yes |
| KPI: Pending payments | `pendingPayments` | `/api/v1/manager/dashboard/stats` | `data.pendingPayments` | No | Yes |
| KPI: Staff | `totalStaff/activeStaff` | `/api/v1/manager/dashboard/stats` | `data.totalStaff | data.activeStaff` | No | Yes |
| KPI: Attendance today | `todayAttendance` | `/api/v1/manager/dashboard/stats` | `data.todayAttendance` | No | Yes |
| Chart: Member growth | `memberGrowth[]` | `/api/v1/manager/dashboard/stats` | `data.memberGrowth[]` | No | Yes |
| Chart: Revenue | `revenueChart[]` | `/api/v1/manager/dashboard/stats` | `data.revenueChart[]` | No | Yes |
| Chart: Members by plan | `membersByPlan[]` | `/api/v1/manager/dashboard/stats` | `data.membersByPlan[]` | No | Yes |
| List: Recent member name | `name` | `/api/v1/manager/dashboard/stats` | `data.recentMembers[].name` | No | Yes |
| List: Recent member plan | `plan` | `/api/v1/manager/dashboard/stats` | `data.recentMembers[].plan` | No | Yes |
| List: Recent payment amount | `amount` | `/api/v1/manager/dashboard/stats` | `data.recentPayments[].amount` | No | Yes |
| List: Pending member | `name` | `/api/v1/manager/dashboard/stats` | `data.pendingPaymentsList[].name` | No | Yes |
| List: Expiring member | `name` | `/api/v1/manager/dashboard/stats` | `data.expiringMemberships[].name` | No | Yes |

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
- **Dashboard date-range changes must affect the actual API query, not only local labels:** Dashboard date-range changes must affect the actual API query, not only local labels.
- **Keep chart series in MSW fixtures; never hardcode chart points inside ApexCharts configuration:** Keep chart series in MSW fixtures; never hardcode chart points inside ApexCharts configuration.
- **Recent-member display fields are part of the dashboard response and must not be replaced with a second members API call:** Recent-member display fields are part of the dashboard response and must not be replaced with a second members API call.
- **Large numeric values must go through the shared formatting utility:** Large numeric values must go through the shared formatting utility.
- **The dashboard is read-oriented; do not introduce Zustand storage for the API payload itself:** The dashboard is read-oriented; do not introduce Zustand storage for the API payload itself.
- **A chart error should remain isolated to the chart section where possible instead of crashing the entire route:** A chart error should remain isolated to the chart section where possible instead of crashing the entire route.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `dashboard/dashboard_components/ManagerDashboardExpiringMemberships/ManagerDashboardExpiringMemberships.tsx` | Renders the expiring memberships list on the dashboard. |
| `dashboard/dashboard_components/ManagerDashboardKPIs/ManagerDashboardKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from the dashboard TanStack Query contract. |
| `dashboard/dashboard_components/ManagerDashboardMain/ManagerDashboardMain.tsx` | Entry component for the Dashboard module; delegates dashboard UI, loading, query and error behavior to module-owned child components. |
| `dashboard/dashboard_components/ManagerDashboardMemberGrowthChart/ManagerDashboardMemberGrowthChart.tsx` | Renders the Manager DashboardMemberGrowthChart presentation layer for the Manager module. |
| `dashboard/dashboard_components/ManagerDashboardMembershipDistribution/ManagerDashboardMembershipDistribution.tsx` | Renders the distribution of members by plan on the dashboard. |
| `dashboard/dashboard_components/ManagerDashboardPendingPayments/ManagerDashboardPendingPayments.tsx` | Renders the pending payments list on the dashboard with a local search filter. |
| `dashboard/dashboard_components/ManagerDashboardPromoCard/ManagerDashboardPromoCard.tsx` | Renders a promotional or informational card for the gym on the dashboard. |
| `dashboard/dashboard_components/ManagerDashboardRecentMembers/ManagerDashboardRecentMembers.tsx` | Renders the recent members table on the dashboard with a local search filter. |
| `dashboard/dashboard_components/ManagerDashboardRevenueChart/ManagerDashboardRevenueChart.tsx` | Renders the Manager DashboardRevenueChart presentation layer for the Manager module. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] Reporting range and custom dates are URL state and are propagated into the dashboard Query key/request.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
