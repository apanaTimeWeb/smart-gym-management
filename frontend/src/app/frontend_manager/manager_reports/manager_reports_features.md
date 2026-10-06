# Manager Reports — Feature Map

## Module Purpose
Manager Reports is the branch reporting workspace for financial, attendance, member, and expense analytics. Managers can choose a reporting range, inspect KPI/chart/table views, and refresh the current report data. The Manager role does not expose tenant-wide data export/download controls.

Module root: `frontend_manager/manager_reports/`

## Routes
| URL | Page | Canonical Client Entry |
|---|---|---|
| `/manager/reports` | `manager_reports/page.tsx` | `ManagerReportsMain.tsx` |

## Directory Structure

| Folder | Responsibility |
|---|---|
| `manager_reports_api/` | Summary API transport only. |
| `manager_reports_components/` | Reports presentation tree, grouped by visual responsibility. |
| `manager_reports_constants/` | Static report tabs/date options/query keys. |
| `manager_reports_hooks/` | URL state, summary-query orchestration, and UI flow hooks. |
| `manager_reports_locales/` | English/Hindi module catalogs. |
| `manager_reports_mocks/` | Module-owned MSW fixtures and handlers for the summary contract. |
| `manager_reports_schemas/` | Zod response schema. |
| `manager_reports_store/` | Module-scoped UI tab state only. |
| `manager_reports_tests/` | Behavior/regression tests. |
| `manager_reports_types/` | Summary, tab, KPI-card, and view-model contracts. |
| `manager_reports_utils/` | Locale-aware number/currency/date formatting helpers. |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Reports summary | `/manager/reports` | Switch report tab, choose date range, refresh, and inspect KPI/chart/table results | `GET /manager/reports/summary` | Implemented |

## User Flows
### Flow 1: Review and refresh report
1. Manager opens `/manager/reports`.
2. The module reads the `range` URL parameter or defaults to the documented current-month range.
3. The summary query loads server data through `ManagerReportsApi.fetchReportsSummary`.
4. KPI, chart, and table components render from the validated summary response.
5. Manager can switch tabs or date range; the URL state changes and the summary query reconciles to the new range.
6. Manager can refresh; only the Manager Reports query namespace is invalidated.

## Component Tree
- `manager_reports/page.tsx`
  - `ManagerReportsMain`
    - `ManagerReportsContent`
      - Manager role header
      - tab controls
      - date range filter
      - refresh control
      - KPI grid
      - charts
      - active-tab table

## Component Responsibility Map
| Component/File | Responsibility |
|---|---|
| `ManagerReportsMain.tsx` | Canonical client route orchestrator; assembles the Reports content without owning API calls. |
| `ManagerReportsContent.tsx` | Composes the Reports page sections and connects view-model state to presentation components. |
| `ManagerReportsDateFilterDropdown.tsx` | Renders the URL-backed date-range control. |
| `ManagerReportsKPIs.tsx` | Renders the KPI group using server-derived report values. |
| `ManagerReportsKpiCard.tsx` | Renders one KPI/stat card with semantic theme tokens. |
| `ManagerReportsCharts.tsx` | Composes the report chart sections. |
| `ManagerReportsRevenueChart.tsx` | Renders revenue trend visualization. |
| `ManagerReportsMembersChart.tsx` | Renders member/volume visualization. |
| `ManagerReportsAttendanceChart.tsx` | Renders attendance visualization. |
| `ManagerReportsExpensesChart.tsx` | Renders expenses visualization. |
| `ManagerReportsTable.tsx` | Renders the report table shell and table-state composition. |
| `ManagerReportsRevenueTable.tsx` | Renders the revenue detail table. |
| `ManagerReportsMembersTable.tsx` | Renders the member detail table. |
| `ManagerReportsAttendanceTable.tsx` | Renders the attendance detail table. |
| `ManagerReportsExpensesTable.tsx` | Renders the expenses detail table. |
| `ManagerReportsEmptyState.tsx` | Renders the module empty state and any documented recovery CTA. |

## Data and State Architecture
- **Server state:** TanStack Query in `useManagerReportsSummaryQuery.ts`.
- **Shared UI state:** Zustand in `useManagerReportsUiStore.ts` for the active report tab only.
- **URL state:** `range` is stored in the route query string.
- **API transport:** `@/lib/api` through `apiFetch`.
- **Mock layer:** `manager_reports_mocks/` owns realistic summary fixtures and MSW handlers.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchReportsSummary(params?)` | `GET` | `/api/v1/manager/reports/summary` | Optional query parameters such as `range` | `ReportSummary` |

No Manager-role synchronous export/download API exists in the final implementation.

## UI Data Requirements
KPI values, revenue series, attendance series, member churn series, and expense breakdown values must all originate from `ReportSummary` returned by the summary API. Mock values live only in the module fixture layer.

## External Dependencies
- `@/lib/api` through the module-owned `ManagerReportsApi` boundary.
- TanStack Query for server-state caching/query lifecycle.
- `next-intl` for localized UI strings.
- `lucide-react` for zero-business icon primitives used by the module.
- Approved role/application infrastructure such as environment configuration and route error logging, where imported by this module.

## Known Forbidden Patterns
See `manager_reports_forbidden.md`. Do not hardcode API URLs, bypass `ManagerReportsQueryKeys`, store server data in Zustand, add synchronous browser exports/downloads, or import sibling business modules.

## Permissions and Security
- Required role: `MANAGER`.
- Navigation is not authorization. Backend authorization remains authoritative.
- The Manager role does not expose the tenant-wide data export/offboarding workflow; that workflow is reserved for the authorized top-level role by the governing frontend architecture contract.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-aligned skeleton.
- Summary-query pending state shows KPI skeletons.
- Summary failures show an inline retry action and route error fallback.
- Empty tab data renders the module-specific empty state without inventing synthetic rows.

## Edge Cases / AI Warnings
- Keep the `range` query parameter synchronized with summary requests.
- Do not add a synchronous blob/file export path to this Manager module.
- Do not hardcode chart series in presentation components.
- Keep formatting locale-aware and pass the active `next-intl` locale into module formatters.
- Do not move report business logic into global UI primitives.

## Theme Contract
See `manager_reports_theme_contract.md` for the exact semantic global tokens used by this module.
