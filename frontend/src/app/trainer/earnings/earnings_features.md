# Earnings Module — Features

## Module Purpose
**What problem it solves:** Provides a transparent and structured view of a trainer's financial metrics, payout history, and pending earnings.
**Who uses it:** Trainers.
**What they can do:** View high-level KPIs (Total Earnings, Pending Payouts, Total Sessions, TDS), track upcoming pending payouts, search and filter historical payouts, and export the earnings ledger as a CSV.
**What is strictly off-limits:** Trainers CANNOT edit payout records, change their commission rate, or initiate payouts directly without approval.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — Renders TrainerEarningsMain. |
| `loading.tsx` | Skeleton loader. |
| `error.tsx` | Error boundary. |
| `earnings_components/TrainerEarningsMain/` | Client root component setting up layout. |
| `earnings_components/TrainerEarningsKPIs/` | Top-level KPI cards for financial overview. |
| `earnings_components/TrainerEarningsPending/` | List of upcoming payouts with due dates. |
| `earnings_components/TrainerEarningsHistory/` | Paginated, filterable ledger table with CSV export. |
| `earnings_context/TrainerEarningsContext.tsx` | React Context for providing earnings state globally. |
| `earnings_context/useTrainerEarningsLogic.ts` | State and API integration hook. |
| `earnings_api/trainer_earnings_api.ts` | Backend integration wrappers. |
| `earnings_types/TrainerEarningsTypes.ts` | Data models and interfaces. |
| `earnings_utils/TrainerEarningsSharedConstants.ts` | `formatCurrency`, status styles, constants. |
| `earnings_utils/TrainerEarningsUrlConfig.ts` | Centralized URL and API path configuration. |

## Feature Inventory
| Feature | Location | Purpose | Status |
|---|---|---|---|
| KPIs | Top Section | Display Total Earnings, Pending, Sessions, Commission Rate, TDS. | ✅ Live |
| Upcoming Payouts | Left Column | List pending transactions and due dates. | ✅ Live |
| Ledger Table | Right Column | Display paginated history of all financial activities. | ✅ Live |
| Date Filters | Ledger Header | Filter ledger by start and end dates. | ✅ Live |
| Search | Ledger Header | Filter ledger by transaction description. | ✅ Live |
| CSV Export | Ledger Header | Download earnings history as a CSV file. | ✅ Live |

## Data Flow
```
page.tsx (Server Component)
  └── TrainerEarningsMain (Client)
        ├── TrainerEarningsProvider (Context)
        │     └── useTrainerEarningsLogic (State & Fetching)
        │           └── trainer_earnings_api.ts
        ├── TrainerEarningsKPIs
        ├── TrainerEarningsPending
        └── TrainerEarningsHistory
```

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — Only trainer-specific financial data is accessible.
- [x] Rule 5: State location — UI State in context, memoized safely.
- [x] Rule 6: Logic/UI Separation — API calls and state orchestration reside in `useTrainerEarningsLogic`.
- [x] Rule 8: Server/Client Boundary — Page is server, logic uses `use client`.
- [x] Rule 9: `loading.tsx` and `error.tsx` implemented.
- [x] Rule 11: Uses URL Config `TrainerEarningsUrlConfig`.
- [x] Rule 13: Feature documentation created.
- [x] Rule 80: Shared formatters (`formatCurrency`) used exclusively instead of raw `.toLocaleString()`.
