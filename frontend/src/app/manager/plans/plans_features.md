# Manager Plans — Feature Map

## Module Purpose
The Manager Plans module provides a read-only view of all available membership plans for
the branch. Managers can view plan details (price, duration, features) to inform members
during enrollment. Plan creation and pricing changes are Admin-only — managers cannot
create or edit plans from this module.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Grid skeleton |
| `error.tsx` | Error boundary |
| `plans_components/ManagerPlansMain.tsx` | Root Client Component |
| `plans_components/ManagerPlansGrid.tsx` | Card grid of all available plans |
| `plans_components/ManagerPlanCard.tsx` | Single plan card — price, duration, features |
| `plans_context/PlansProvider.tsx` | Fetch state, plan list |
| `plans_types/ManagerPlansTypes.ts` | `Plan` type |
| `plans_api/ManagerPlansApi.ts` | API wrappers |
| `plans_utils/ManagerPlansUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Plans Grid | `/manager/plans` | View all membership plans | `GET /manager/plans` | ✅ Live |

## Data and State Architecture
- Server-state: `PlansProvider` — plan list (fetched once on mount, no pagination needed)
- Zustand stores: None — read-only module
- Context providers: `PlansProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/plans` → plan card grid loads with all active plans
2. Manager views plan details (price, duration, features) — no actions available

## Component Responsibility Map
- `ManagerPlansMain` — layout + provider. MUST NOT contain any mutation logic.
- `ManagerPlansGrid` — renders plan cards from context. MUST NOT fetch directly.
- `ManagerPlanCard` — pure display. Price formatted via `formatCurrency()`.

## Permissions and Security
| Action | Required Role |
|---|---|
| View plans | `MANAGER` |
| Create / Edit plans | ❌ Admin only — not available in this module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons
- **Empty:** "No plans available" — contact Admin message
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **No mutations** — this is a strictly read-only module. Never add create/edit/delete actions here.
- **Currency formatting** — plan prices arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, display in cards
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 21: Currency formatted via `formatters.ts`
