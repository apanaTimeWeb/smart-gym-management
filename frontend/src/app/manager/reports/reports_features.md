# Manager Reports — Feature Map

## Module Purpose
Manager Reports is the branch reporting workspace for financial, attendance, member, and expense analytics. Managers can choose a reporting range, inspect KPI/chart/table views, and export the selected report. Report payloads are server data and chart series must be fully provided by MSW during frontend-first development.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `reports_api/` | Feature-owned responsibility for the reports module. | `ManagerReportsApi.ts` |
| `reports_components/` | Feature-owned responsibility for the reports module. | `—` |
| `reports_context/` | Feature-owned responsibility for the reports module. | `ManagerReportsContext.tsx` |
| `reports_fixtures/` | Feature-owned responsibility for the reports module. | `ManagerReportsMockData.ts` |
| `reports_mocks/` | Feature-owned responsibility for the reports module. | `—` |
| `reports_types/` | Feature-owned responsibility for the reports module. | `ManagerReportsSchema.ts; ManagerReportsTypes.ts` |
| `reports_utils/` | Feature-owned responsibility for the reports module. | `ManagerReportsSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSummary | `/manager/reports` | Uses the fetchSummary workflow with typed request/response handling. | `GET /manager/reports/summary` | ✅ Implemented |
| exportReportsReport | `/manager/reports` | Uses the exportReportsReport workflow with typed request/response handling. | `GET /manager/reports/export` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Review report
1. Manager chooses the report range/tab.
2. fetchSummary(params) loads the report summary.
3. The KPI and chart/table sections render from the returned report contract.
4. MSW fixtures include complete series data and deterministic empty/error variants.
### Flow 2: Export report
1. Manager chooses a report tab and export action.
2. exportReportsReport(tab, params) calls the dedicated report export endpoint.
3. The response is treated as an export/download response rather than current-page table data.

## Data and State Architecture
TanStack Query owns reports server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchSummary` | `GET` | `/api/v1/manager/reports/summary` | `{ startDate?, endDate?, range? }` | `ReportSummary` |
| `exportReportsReport` | `GET` | `/api/v1/manager/reports/export` | `{ tab: string; params?: Record<string,string> }` | `Blob` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total revenue | `kpis.totalRevenue` | `/api/v1/manager/reports/summary` | `data.kpis.totalRevenue` | No | Yes |
| KPI: Total members | `kpis.totalMembers` | `/api/v1/manager/reports/summary` | `data.kpis.totalMembers` | No | Yes |
| KPI: Attendance rate | `kpis.avgAttendanceRate` | `/api/v1/manager/reports/summary` | `data.kpis.avgAttendanceRate` | No | Yes |
| KPI: Total expenses | `kpis.totalExpenses` | `/api/v1/manager/reports/summary` | `data.kpis.totalExpenses` | No | Yes |
| Chart/Table: Revenue month | `revenueData[].month` | `/api/v1/manager/reports/summary` | `data.revenueData[].month` | No | Yes |
| Chart/Table: Revenue | `revenueData[].revenue` | `/api/v1/manager/reports/summary` | `data.revenueData[].revenue` | No | Yes |
| Chart/Table: Revenue expenses | `revenueData[].expenses` | `/api/v1/manager/reports/summary` | `data.revenueData[].expenses` | No | Yes |
| Chart: Attendance date | `attendanceData[].date` | `/api/v1/manager/reports/summary` | `data.attendanceData[].date` | No | Yes |
| Chart: Attendance rate | `attendanceData[].rate` | `/api/v1/manager/reports/summary` | `data.attendanceData[].rate` | No | Yes |
| Chart: Member churn month | `memberChurnData[].month` | `/api/v1/manager/reports/summary` | `data.memberChurnData[].month` | No | Yes |
| Chart: New members | `memberChurnData[].newMembers` | `/api/v1/manager/reports/summary` | `data.memberChurnData[].newMembers` | No | Yes |
| Expense breakdown: Category | `expenseBreakdown[].category` | `/api/v1/manager/reports/summary` | `data.expenseBreakdown[].category` | No | Yes |
| Expense breakdown: Amount | `expenseBreakdown[].amount` | `/api/v1/manager/reports/summary` | `data.expenseBreakdown[].amount` | No | Yes |

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
- **Report chart values must come from the report response; never embed static series in chart config:** Report chart values must come from the report response; never embed static series in chart config.
- **Exports must not export only the currently rendered table rows unless explicitly defined by the backend contract:** Exports must not export only the currently rendered table rows unless explicitly defined by the backend contract.
- **Date-range selection must affect fetchSummary parameters:** Date-range selection must affect fetchSummary parameters.
- **Financial report values use centralized currency/number formatting:** Financial report values use centralized currency/number formatting.
- **Export failures should remain visible to the reports module and provide retry guidance:** Export failures should remain visible to the reports module and provide retry guidance.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `reports/reports_components/ManagerReportsCharts/ManagerReportsCharts.tsx` | ApexCharts-based charts for each report tab — Revenue, Attendance, Members, Expenses. |
| `reports/reports_components/ManagerReportsKPIs/ManagerReportsKPIs.tsx` | KPI stat cards row for the Manager Reports module. |
| `reports/reports_components/ManagerReportsMain/ManagerReportsMain.tsx` | Orchestrator for the Reports module — KPIs, tab switcher, charts, table, and CSV export. |
| `reports/reports_components/ManagerReportsTable/ManagerReportsTable.tsx` | Renders the data table for the active report tab — Revenue, Attendance, Members, or Expenses. |
| `reports/reports_context/ManagerReportsContext.tsx` | Bridges URL-owned report controls with module server state. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
