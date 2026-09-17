# Trainer Earnings — Feature Map

## Module Purpose
This module gives a Trainer a read-only view of their own earnings, pending payouts, TDS deductions and payout history. It supports date filtering, description search and ledger export without allowing the Trainer to edit or release payments. Financial data is server/API data and is rendered from the TanStack Query response path. Manager payroll controls remain outside this module.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `earnings_components/` | KPI, pending payout and ledger presentation | `TrainerEarningsMain.tsx`, `TrainerEarningsKPIs.tsx`, `TrainerEarningsPending.tsx`, `TrainerEarningsHistory.tsx` |
| `earnings_context/` | Stable feature UI coordination only | `TrainerEarningsContext.tsx`, `useTrainerEarningsLogic.ts` |
| `earnings_api/` | Earnings reads/export API boundary | `TrainerEarningsApi.ts` |
| `earnings_types/` | Earnings response and filter types | `TrainerEarningsTypes.ts` |
| `earnings_utils/` | Financial display/ledger constants | `TrainerEarningsSharedConstants.ts` |
| `earnings_fixtures/` | Module-owned earnings mock data | `TrainerEarningsMockData.ts` |
| `earnings_mocks/handlers/` | Module-owned MSW handlers | `TrainerEarningsMockHandlers.ts` |

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| Earnings KPIs | `/trainer/earnings` | `GET /trainer/earnings` | Live via MSW |
| Pending payouts | `/trainer/earnings` | `GET /trainer/earnings` | Live via MSW |
| Historical ledger | `/trainer/earnings` | `GET /trainer/earnings` | Live via MSW |
| Date/search filtering | `/trainer/earnings` | query parameters on earnings request | Live via UI/query layer |
| CSV export | `/trainer/earnings` | module export flow | Live UI behavior |

## Data and State Architecture
TanStack Query owns earnings server data. URL/query state owns shareable filter state where applicable. Context is restricted to stable UI coordination; it does not store the earnings API response as the primary source of truth.

## API Contract
`TrainerEarningsApi.ts` owns earnings retrieval and export-facing API calls and uses `Trainer_url_config.ts`. Every response is validated before the UI consumes it.

## UI Data Requirements
| UI Element | Field | Source |
|---|---|---|
| Total earnings KPI | `totalEarnings` | earnings response |
| Pending payout KPI | `pendingPayouts` | earnings response |
| Session count KPI | `totalSessions` | earnings response |
| TDS KPI | `tdsDeducted` | earnings response |
| Pending payout row | `period`, `amount`, `status`, `dueDate` | earnings response |
| Ledger row | `date`, `type`, `description`, `amount`, `status`, `tdsDeducted`, `netPayout`, `invoiceNumber` | earnings response |

## Edge Cases and AI Warnings
- **Financial actions are read-only:** Trainers cannot mark a payout as paid or edit financial records from this module.
- **Financial formatting:** Use the canonical `formatCurrency()`/`formatNumber()` from `@/lib/formatters`; do not define feature-local currency formatters or concatenate currency symbols/use `.toFixed()` in JSX.
- **Sensitive identifiers:** Invoice/tracking identifiers must expose the required copy interaction and must not be logged with sensitive payment details.
- **Server filters:** Search/date filters must affect the API/query request rather than merely filtering a downloaded full ledger in the component.
- **Export failure:** Export errors surface the backend/API message through the approved toast/error path.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerEarningsMain.tsx` | Layout and feature orchestration. |
| `TrainerEarningsKPIs.tsx` | Read-only financial KPI presentation. |
| `TrainerEarningsPending.tsx` | Pending payout list. |
| `TrainerEarningsHistory.tsx` | Filterable ledger and export controls. |

## Rule Compliance Checklist
- [x] Module-owned mock fixtures/handlers
- [x] Financial formatting via centralized formatters
- [x] Read-only Trainer permissions
- [x] Loading/error route states
- [x] No raw `.toFixed()` in UI
