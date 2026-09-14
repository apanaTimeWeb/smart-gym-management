# Superadmin Churn Alerts — Feature Map

## Module Purpose
The Churn Alerts module gives superadmins early warning when gym tenants are at risk of
cancelling their SaaS subscription. The system flags tenants based on signals like inactivity
(days since last login), member count drops, payment failures, and days until renewal. Each
alert has a risk level (CRITICAL / HIGH / MEDIUM / LOW) and an action status that the
superadmin updates as they work through retention outreach. This module is the primary
retention tool for the platform operator — acting on CRITICAL alerts before renewal day
is the single most impactful churn-reduction workflow.

## Directory Structure
| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point | — |
| `loading.tsx` | 4 KPI card skeletons + 6 table row skeletons | — |
| `error.tsx` | Module-level error boundary with retry | — |
| `churn_forbidden.md` | Anti-pattern rules for this module | — |
| `churn_types/churn_types.ts` | `ChurnAlert`, `ChurnRiskLevel`, `ChurnActionStatus`, `ChurnKpiData`, `ChurnActionPayload`, `ChurnFilterStatus` | — |
| `churn_utils/churn_constants.ts` | `CHURN_RISK_STYLES`, `CHURN_ACTION_STATUS_STYLES`, `KPI_CARD_GRADIENT`, `MOCK_CHURN_ALERTS`, `MOCK_CHURN_KPI` | — |
| `churn_api/superadmin_churn_api.ts` | API client — fetch alerts, fetch KPIs, update action, dismiss alert | — |
| `churn_components/SuperadminChurnMain/` | Root client orchestrator — owns filter + modal state | `SuperadminChurnMain.tsx` |
| `churn_components/SuperadminChurnKPIs/` | 4 KPI stat cards (total at risk, critical, high, MRR at risk) | `SuperadminChurnKPIs.tsx` |
| `churn_components/SuperadminChurnFilters/` | Search input + risk/status filter pill buttons | `SuperadminChurnFilters.tsx` |
| `churn_components/SuperadminChurnTable/` | Paginated alerts table with inline email/call/action buttons | `SuperadminChurnTable.tsx` |
| `churn_components/SuperadminChurnEmptyState/` | Empty state for zero results | `SuperadminChurnEmptyState.tsx` |
| `churn_components/SuperadminChurnActionModal/` | Update action status + notes modal | `SuperadminChurnActionModal.tsx` |

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Churn Alert List | `/superadmin/churn-alerts` | View all at-risk tenants with risk level, score, last login, member drop, MRR | `SuperadminChurnMain`, `SuperadminChurnTable` | `GET /superadmin/churn-alerts` | ✅ Live (mock) |
| KPI Summary | `/superadmin/churn-alerts` | See total at-risk count, critical count, high count, MRR at risk | `SuperadminChurnKPIs` | `GET /superadmin/churn-alerts/kpis` | ✅ Live (mock) |
| Filter & Search | `/superadmin/churn-alerts` | Filter by risk level or action status; search by gym/owner name | `SuperadminChurnFilters` | — (client-side) | ✅ Live |
| Update Action | `/superadmin/churn-alerts` | Set action status (PENDING/CONTACTED/RESOLVED/CHURNED) + add notes | `SuperadminChurnActionModal` | `PATCH /superadmin/churn-alerts/:id/action` | ✅ Live (mock) |
| Email / Call | `/superadmin/churn-alerts` | Quick mailto/tel links on each row | `SuperadminChurnTable` | — (native links) | ✅ Live |

## Data and State Architecture
- **State pattern:** TanStack Query (`useQuery` / `useMutation`) via `useChurnAlertsPage.ts` — this is the single source of truth for all server data. Local `useState` is used only for UI-only state (search, filter, modal, pagination).
- **TanStack Query keys:** `['superadmin', 'churn-alerts']`, `['superadmin', 'churn-kpis']`
- **Mutations:** `updateActionMutation` (PATCH action), `bulkOutreachMutation` — both in `useChurnAlertsPage.ts`
- **Zustand stores:** None
- **Mock data:** `MOCK_CHURN_ALERTS` + `MOCK_CHURN_KPI` in `churn_constants.ts` — gated with `process.env.NODE_ENV === 'development'`

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `churnAlertsApi.fetchAlerts()` | GET | `/superadmin/churn-alerts` | — | `ChurnAlert[]` |
| `churnAlertsApi.fetchKpis()` | GET | `/superadmin/churn-alerts/kpis` | — | `ChurnKpiData` |
| `churnAlertsApi.updateAction(payload)` | PATCH | `/superadmin/churn-alerts/:id/action` | `{ status, notes }` | `ChurnAlert` |
| `churnAlertsApi.dismissAlert(id)` | DELETE | `/superadmin/churn-alerts/:id` | — | `void` |

## Edge Cases / AI Warnings
- **CHURN_RISK_STYLES and CHURN_ACTION_STATUS_STYLES** — must always be imported from `churn_constants.ts`; never inline badge color classes.
- **Risk score bar color** — derived inline from `riskScore` value (≥80 = danger, ≥60 = warning, else success); this is the only acceptable inline conditional class in this module.
- **`MOCK_CHURN_ALERTS` is a dev fallback** — gate with `process.env.NODE_ENV === 'development'` before production.
- **Action update is pessimistic** — only update local state after confirmed `onConfirm` callback; never optimistically mutate before modal confirmation.
- **Email/phone links** — use `mailto:` and `tel:` native links; never open a custom compose modal for these quick actions.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `SuperadminChurn*` prefix on all files
- [x] Rule 3B: Centralized data — all style maps and mock data in `churn_constants.ts`
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind arbitrary values
- [x] Rule 7: Type Isolation — all types in `churn_types.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: URL Config — `SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE` in API client
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `churn_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable `alert.id` used
- [x] Rule 73: `import type` for all type-only imports
