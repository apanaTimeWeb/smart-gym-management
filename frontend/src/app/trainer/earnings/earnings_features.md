# Trainer Earnings — Feature Map

## Module Purpose
The Earnings module lets a trainer review their own earnings and pending payout information for the periods supported by the product. It provides KPI summaries, filterable history, status information, and pagination/sorting where the dataset is browsable. The module reads backend/API data through the feature-owned client and keeps financial formatting centralized. Trainer earnings administration or other users' payouts are outside this module's scope.

## Directory Structure
- `page.tsx` — Server Component route entry.
- `loading.tsx`, `error.tsx`, `not-found.tsx` — route states.
- `earnings_components/` — KPIs, pending payout, date filter, history, and main composition.
- `earnings_queries/` — TanStack Query server state.
- `earnings_store/` — UI-only search/page state.
- `earnings_api/TrainerEarnings_api.ts` — API boundary and response validation.
- `earnings_types/TrainerEarningsTypes.ts` — domain/schema contracts.
- `earnings_utils/` — date-range configuration and financial display constants.
- `earnings_mocks/fixtures/` / `earnings_mocks/` — feature-owned demo server data/handlers.
- `earnings_url_config.ts` — page/API URL contract.
- `earnings_tests/` — API, main UI, and route-state tests.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Earnings KPIs | Total earnings, session count, TDS, pending payout. |
| Pending payouts | Pending payout period/status/due date display. |
| Ledger history | Searchable/paginated earnings history. |
| Date filter | URL-backed date range changes server query. |
| CSV export | Uses feature URL contract and current query parameters. |

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Data and State Architecture
- TanStack Query owns earnings server response.
- URL owns shareable date range.
- Zustand owns only search/current page UI state.
- No React Context owns earnings data.
- Mock handler applies search/page/date inputs to feature-owned demo state.

## User Flows & Interactions
1. Open Earnings → skeleton → KPI/history/pending data.
2. Change date → URL/query changes → visible records update.
3. Search ledger → query result changes.
4. Change page → query page changes.
5. Export → CSV endpoint is generated from `earnings_url_config.ts`.

## Architecture Notes
No `Request Payout` no-op control is exposed by this read-only Trainer module. Financial data stays local to Earnings and never enters Dashboard.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`.
- Role infrastructure: Trainer feedback and generic table/pagination primitives only.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchEarningsData` | GET | `EarningsUrlConfig.BACKEND_API.DATA` | date/search/page/limit params | earnings KPIs + history/pending fields |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| KPI cards | earnings total/session/TDS/pending fields defined by response type | earnings response |
| Pending panel | period/status/due/amount fields | earnings response |
| Ledger table | `id`, `date`, `description`, `type`, `amount`, `status` | history response |
| Search/date/page controls | search/date/page/limit | URL/store/query/API |
| CSV export | current search/startDate/endDate query values | export URL contract |

## Permissions and Security
- Required capability: `trainer.view`.
- Financial information is trainer-scoped read-only presentation in this module.
- Payout-release/request controls are not exposed.
- Currency formatting must use the approved utility; monetary response data remains server-owned.

## Loading, Empty, and Error States
- Route skeleton in `loading.tsx`.
- History uses a structural skeleton while the query is pending.
- Empty history shows an explanatory empty state.
- Export button has a stable-width loading state.
- Route errors use Retry fallback.

## Edge Cases and AI Warnings
- **Do not expose payout request as a fake action:** the current Trainer surface is read-only.
- **Currency formatting is centralized:** do not add raw `.toFixed()` or hand-built rupee strings in JSX.
- **Search must reach the API/mock contract:** UI-only filtering is not sufficient.
- **Pagination must alter the request/result page:** visual page number changes alone are not functional.
- **Exports must preserve current filters:** search/date filters must be reflected in the CSV request.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerEarningsMain` | Earnings route composition. |
| `TrainerEarningsKPIs` | KPI presentation. |
| `TrainerEarningsPending` | Pending payout summary. |
| `TrainerEarningsHistory` | Search/filter/export/history table. |
| `TrainerEarningsDateFilterDropdown` | URL-backed date selection. |

## Rule Compliance Checklist
- [x] Read-only financial surface has no no-op payout action
- [x] Server-state via TanStack Query
- [x] Feature-owned fixtures/handlers
- [x] Currency formatting uses formatter path
- [x] Semantic theme classes
- [x] Route loading/error/not-found files
- [ ] Parent-app runtime/tooling verification — NOT VERIFIED
