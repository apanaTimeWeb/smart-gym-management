# Manager Sales — Feature Map

## Module Purpose
The Manager Sales module provides branch-level membership sales analytics across four tabs:
Revenue Overview, Membership Report, Pending Payments, and All Memberships. It is read-only
analytics — no payment collection happens here. All monetary values arrive as paise integers
and are formatted via `formatters.ts`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + tabs |
| `error.tsx` | Error boundary |
| `sales_components/ManagerSalesMain.tsx` | Root Client Component, tab switcher |
| `sales_components/ManagerSalesRevenueTab.tsx` | Revenue KPIs + trend chart |
| `sales_components/ManagerSalesMembershipTab.tsx` | Membership breakdown table |
| `sales_components/ManagerSalesPendingTab.tsx` | Pending payments list |
| `sales_components/ManagerSalesAllTab.tsx` | All memberships paginated table |
| `sales_components/ManagerSalesEmptyState.tsx` | Empty state component |
| `sales_context/SalesProvider.tsx` | Fetch state per active tab |
| `sales_types/ManagerSalesTypes.ts` | `SalesStat`, `MembershipRecord` types |
| `sales_api/ManagerSalesApi.ts` | API wrappers |
| `sales_utils/ManagerSalesUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Revenue Overview | `/manager/sales` | KPI cards + revenue chart | `GET /manager/sales/revenue` | ✅ Live |
| Membership Report | `/manager/sales` | Plan-wise breakdown | `GET /manager/sales/memberships` | ✅ Live |
| Pending Payments | `/manager/sales` | Overdue payment list | `GET /manager/sales/pending` | ✅ Live |
| All Memberships | `/manager/sales` | Full paginated membership list | `GET /manager/sales/all` | ✅ Live |

## Data and State Architecture
- Server-state: `SalesProvider` — active tab data, filters
- Zustand stores: None — read-only module
- Context providers: `SalesProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/sales` → Revenue tab loads by default with KPIs + chart
2. Manager switches tab → `SalesProvider` fetches data for that tab
3. Manager clicks a pending payment row → navigates to member profile in Members module

## Component Responsibility Map
- `ManagerSalesMain` — tab switcher + provider. MUST NOT contain chart logic.
- `ManagerSalesRevenueTab` — wraps `react-apexcharts`. MUST NOT use Recharts.
- `ManagerSalesPendingTab` — read-only list. Row click navigates to Members module.
- `ManagerSalesEmptyState` — reusable empty state, receives entity name as prop.

## Permissions and Security
| Action | Required Role |
|---|---|
| View sales analytics | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 KPI shimmer cards + chart placeholder + table skeleton
- **Empty:** `ManagerSalesEmptyState` — "No sales data for this period"
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **No mutations** — this is a read-only analytics module.
- **ApexCharts only** — never use Recharts or Chart.js.
- **Currency formatting** — all amounts arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, display in tab components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 21: Currency formatted via `formatters.ts`
- [x] Design §10: ApexCharts with correct color tokens
