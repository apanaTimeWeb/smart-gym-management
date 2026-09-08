# Manager Referrals — Feature Map

## Module Purpose
The Manager Referrals module is the dedicated tracking system for word-of-mouth member acquisition. It tracks when an existing member refers a new lead, monitors the conversion status of that lead, and provides a workflow for managers to claim and distribute rewards (like discounts) to the referring member once the lead joins.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `referrals_components/ManagerReferralsMain/` | Root client orchestrator — assembles KPIs, Table, and Add Modal | `ManagerReferralsMain.tsx` |
| `referrals_api/` | Mock API: fetchReferrals, fetchKPIs, createReferral, claimReward | `ManagerReferralsApi.ts` |
| `referrals_context/` | Business logic hook — queries, mutations, filtering, pagination | `useManagerReferralsLogic.ts` |
| `referrals_store/` | Zustand store — modal visibility, search, filter, pagination | `useManagerReferralsStore.ts` |
| `referrals_types/` | TypeScript types: ManagerReferral, ManagerReferralsKPIs | `ManagerReferralsTypes.ts` |
| `referrals_utils/` | Mock data, constants, URL config | `ManagerReferralsConstants.ts` |

## Feature Inventory

| Feature | Route | What the Manager Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| KPI Overview | `/manager/referrals` | See total referrals, conversions, and reward claims | `ManagerReferralsKPIs` | `GET /manager/referrals/kpis` | ✅ Live |
| View Referrals | `/manager/referrals` | Filterable, paginated table of all referrals | `ManagerReferralsTable` | `GET /manager/referrals` | ✅ Live |
| Log Referral | `/manager/referrals` | Manually log that Member A referred Lead B | `ManagerReferralsAddModal` | `POST /manager/referrals` | ✅ Live |
| Claim Reward | `/manager/referrals` | Mark a pending reward as claimed after the lead joins | `ManagerReferralsTable` | `PATCH /manager/referrals/:id/claim` | ✅ Live |

## Data and State Architecture

- **State pattern:** Zustand for UI state (search, filter, pagination, modal open/close) + TanStack Query for server state.
- **Zustand store:** `useManagerReferralsStore.ts`
- **TanStack Query keys:**
  - `['managerReferrals', 'kpis']`
  - `['managerReferrals', 'list']`

## Permissions and Security

- **Required role:** `MANAGER` — enforced by `middleware.ts`
- **Cross-role isolation:** Zero imports from `/admin`, `/trainer`, `/superadmin`

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useManagerReferralsLogic` extracts all logic
- [x] Rule 40: `referrals_forbidden.md` present
