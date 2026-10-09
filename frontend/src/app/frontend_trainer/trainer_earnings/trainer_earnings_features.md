# trainer_earnings — Feature Map (v8-fix)

## Module Purpose
The Earnings module lets a trainer review their own earnings and pending payout information for the periods supported by the product. It provides KPI summaries, filterable history, status information, and pagination/sorting where the dataset is browsable. The module reads backend/API data through the feature-owned client and keeps financial formatting centralized. Trainer earnings administration or other users' payouts are outside this module's scope.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_earnings_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, date-fns, lucide-react, msw, next, next-intl, react, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Read-only module: no create/update/delete mutation API is documented.
Expected public route contract: `/trainer/earnings`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_earnings/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_earnings_api/
├──   TrainerEarningsApi.ts
├──   TrainerEarningsApiBehavior.test.ts
├── trainer_earnings_components/
├──   trainer_earnings_date_filter_dropdown/
├──     TrainerEarningsDateFilterDropdown.tsx
├──   trainer_earnings_empty_state/
├──     TrainerEarningsEmptyState.tsx
├──   trainer_earnings_history/
├──     TrainerEarningsHistory.tsx
├──   trainer_earnings_kpis/
├──     TrainerEarningsKPIs.tsx
├──   trainer_earnings_loading_skeleton/
├──     TrainerEarningsLoadingSkeleton.tsx
├──   trainer_earnings_main/
├──     TrainerEarningsMain.tsx
├──     TrainerEarningsMainBehavior.test.tsx
├──   trainer_earnings_not_found_view/
├──     TrainerEarningsNotFoundView.tsx
├──   trainer_earnings_pending/
├──     TrainerEarningsPending.tsx
├── trainer_earnings_constants/
├──   TrainerEarningsConstants.test.ts
├──   TrainerEarningsConstants.ts
├──   TrainerEarningsQueryKeys.ts
├── trainer_earnings_features.md
├── trainer_earnings_forbidden.md
├── trainer_earnings_hooks/
├──   useTrainerEarningsQuery.test.ts
├──   useTrainerEarningsQuery.ts
├── trainer_earnings_locales/
├──   trainer_earnings_en.json
├──   trainer_earnings_hi.json
├── trainer_earnings_mocks/
├──   trainer_earnings_fixtures/
├──     TrainerEarningsMockData.ts
├──   trainer_earnings_handlers/
├──     TrainerEarningsMockHandlers.ts
├── trainer_earnings_schemas/
├──   TrainerEarningsDomainSchemas.ts
├── trainer_earnings_tests/
├──   TrainerEarningsRouteStates.test.tsx
├── trainer_earnings_theme_contract.md
├── trainer_earnings_types/
├──   TrainerEarningsDateRangeTypes.ts
├──   TrainerEarningsEmptyStateProps.ts
├──   TrainerEarningsQueryTypes.ts
├──   TrainerEarningsSortTypes.ts
├──   TrainerEarningsTypes.ts
├── trainer_earnings_url_config.ts
├── trainer_earnings_utils/
├──   TrainerEarningsDateRangeConstants.test.ts
├──   TrainerEarningsDateRangeConstants.ts
├──   TrainerEarningsResolveTrainerEarningsDateRange.test.ts
├──   TrainerEarningsResolveTrainerEarningsDateRange.ts
├──   TrainerEarningsDisplayFormatters.test.ts
├──   TrainerEarningsDisplayFormatters.ts
├──   TrainerEarningsFormatCurrency.test.ts
└──   TrainerEarningsFormatCurrency.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Earnings KPIs | Total earnings, session count, TDS, pending payout. |
| Pending payouts | Pending payout period/status/due date display. |
| Ledger history | Searchable/paginated earnings history. |
| Date filter | URL-backed date range changes server query. |
| CSV export | **BLOCKED_BY_SUPPLIED_SCOPE** — Stage 1 requires a CSV endpoint, but the supplied API contract contains no export endpoint/function/response contract. The frontend must not invent or fake the download. |

## User Flows & Interactions
1. Open Earnings → skeleton → KPI/history/pending data.
2. Change date → URL/query changes → visible records update.
3. Search ledger → query result changes.
4. Change page → query page changes.
5. Export → **BLOCKED_BY_SUPPLIED_SCOPE** until an authoritative CSV export endpoint contract is supplied; no fabricated download behavior is allowed.


## CSV Export Contract Resolution

- **STATUS:** `BLOCKED_BY_SUPPLIED_SCOPE`
- **Higher-priority source:** `stage_1_frontend_requirements.md` requires `Export → CSV endpoint is generated from trainer_earnings_url_config.ts`.
- **Supplied implementation/API evidence:** `trainer_earnings_url_config.ts` defines DATA, KPIS, PENDING, and HISTORY only; no export endpoint/function/response type is supplied.
- **Repair decision:** No endpoint, response schema, mock behavior, or download success has been invented. This preserves the no-guessing rule.
- **Required follow-up evidence:** An authoritative export route + method + query parameters + response/download contract. After that is supplied, add the URL constant, API client, Zod/download contract as applicable, module-owned MSW handler/fixture, loading/error/success states, and interaction tests.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchEarningsData` | GET | `TRAINER_EARNINGS_URLS.API.DATA` | date/search/page/limit params | earnings KPIs + history/pending fields |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| KPI cards | earnings total/session/TDS/pending fields defined by response type | earnings response |
| Pending panel | period/status/due/amount fields | earnings response |
| Ledger table | `id`, `date`, `description`, `type`, `amount`, `status` | history response |
| Search/date/page controls | search/date/page/limit | URL/store/query/API |
| CSV export | current search/startDate/endDate query values | **BLOCKED_BY_SUPPLIED_SCOPE — export URL contract missing from supplied API contract** |

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
- **CSV export is currently blocked by supplied scope:** Stage 1 requires an export URL/function, but no authoritative export endpoint or response contract was supplied. Do not invent the endpoint or display a fake success.
- **Once the export contract is supplied:** search/date filters must be reflected in the CSV request, with a module URL constant, API client, mock handler/fixture, loading/error feedback, and interaction tests.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerEarningsMain` | Earnings route composition. |
| `TrainerEarningsKPIs` | KPI presentation. |
| `TrainerEarningsPending` | Pending payout summary. |
| `TrainerEarningsHistory` | Search/filter/export/history table. |
| `TrainerEarningsDateFilterDropdown` | URL-backed date selection. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerEarningsQueryKeys.ts, useTrainerEarningsQuery.test.ts, useTrainerEarningsQuery.ts.
- Hook files: useTrainerEarningsQuery.test.ts, useTrainerEarningsQuery.ts.
- Constants: TrainerEarningsConstants.test.ts, TrainerEarningsConstants.ts.
- Schemas: TrainerEarningsDomainSchemas.ts.
- Types: TrainerEarningsDateRangeTypes.ts, TrainerEarningsEmptyStateProps.ts, TrainerEarningsQueryTypes.ts, TrainerEarningsSortTypes.ts, TrainerEarningsTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerEarningsDateRangeConstants.test.ts, TrainerEarningsDateRangeConstants.ts, TrainerEarningsResolveTrainerEarningsDateRange.test.ts, TrainerEarningsResolveTrainerEarningsDateRange.ts, TrainerEarningsDisplayFormatters.ts, TrainerEarningsFormatCurrency.test.ts, TrainerEarningsFormatCurrency.ts.
- Module-owned tests: 9 files.
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
- `/trainer/earnings` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route.
2. Load server-backed queries and render KPI/list/detail content.
3. Apply documented filters/date/search controls; URL/query state updates the view.
4. Recover through loading, empty, and error states.

## Component Tree
```text
trainer_earnings/
  page.tsx
  trainer_earnings_components/
    trainer_earnings_date_filter_dropdown/
      TrainerEarningsDateFilterDropdown.tsx
    trainer_earnings_empty_state/
      TrainerEarningsEmptyState.tsx
    trainer_earnings_history/
      TrainerEarningsHistory.tsx
    trainer_earnings_kpis/
      TrainerEarningsKPIs.tsx
    trainer_earnings_loading_skeleton/
      TrainerEarningsLoadingSkeleton.tsx
    trainer_earnings_main/
      TrainerEarningsMain.tsx
    trainer_earnings_not_found_view/
      TrainerEarningsNotFoundView.tsx
    trainer_earnings_pending/
      TrainerEarningsPending.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_EARNINGS_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_EARNINGS_PAGE_LIST = '/trainer/earnings' as const;`
- `export const TRAINER_EARNINGS_API_DATA = '/trainer/earnings' as const;`
- `export const TRAINER_EARNINGS_API_KPIS = '/trainer/trainer_earnings/kpis' as const;`
- `export const TRAINER_EARNINGS_API_PENDING = '/trainer/trainer_earnings/pending' as const;`
- `export const TRAINER_EARNINGS_API_HISTORY = '/trainer/trainer_earnings/history' as const;`

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
- Do not import sibling feature business code into `trainer_earnings`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
