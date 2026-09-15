# Superadmin Cancellations Alerts — Feature Map

## Module Purpose
The Cancellations Alerts module gives superadmins early warning when gym tenants are at risk of
cancelling their SaaS subscription. The system flags tenants based on signals like inactivity
(days since last login), member count drops, payment failures, and days until renewal. Each
alert has a risk level (CRITICAL / HIGH / MEDIUM / LOW) and an action status that the
superadmin updates as they work through retention outreach. This module is the primary
retention tool for the platform operator — acting on CRITICAL alerts before renewal day
is the single most impactful cancellations-reduction workflow.

## Directory Structure
| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point | — |
| `loading.tsx` | 4 KPI card skeletons + 6 table row skeletons | — |
| `error.tsx` | Module-level error boundary with retry | — |
| `cancellations_forbidden.md` | Anti-pattern rules for this module | — |
| `cancellations_types/cancellations_types.ts` | `CancellationsAlert`, `CancellationsRiskLevel`, `CancellationsActionStatus`, `CancellationsKpiData`, `CancellationsActionPayload`, `CancellationsFilterStatus` | — |
| `cancellations_utils/cancellations_constants.ts` | `CANCELLATIONS_RISK_STYLES`, `CANCELLATIONS_ACTION_STATUS_STYLES`, `KPI_CARD_GRADIENT`, `MOCK_CANCELLATIONS_ALERTS`, `MOCK_CANCELLATIONS_KPI` | — |
| `cancellations_api/superadmin_cancellations_api.ts` | API client — fetch alerts, fetch KPIs, update action, dismiss alert | — |
| `cancellations_components/SuperadminCancellationsMain/` | Root client orchestrator — owns filter + modal state | `SuperadminCancellationsMain.tsx` |
| `cancellations_components/SuperadminCancellationsKPIs/` | 4 KPI stat cards (total at risk, critical, high, MRR at risk) | `SuperadminCancellationsKPIs.tsx` |
| `cancellations_components/SuperadminCancellationsFilters/` | Search input + risk/status filter pill buttons | `SuperadminCancellationsFilters.tsx` |
| `cancellations_components/SuperadminCancellationsTable/` | Paginated alerts table with inline email/call/action buttons | `SuperadminCancellationsTable.tsx` |
| `cancellations_components/SuperadminCancellationsEmptyState/` | Empty state for zero results | `SuperadminCancellationsEmptyState.tsx` |
| `cancellations_components/SuperadminCancellationsActionModal/` | Update action status + notes modal | `SuperadminCancellationsActionModal.tsx` |

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Cancellations Alert List | `/superadmin/cancellations` | View all at-risk tenants with risk level, score, last login, member drop, MRR | `SuperadminCancellationsMain`, `SuperadminCancellationsTable` | `GET /superadmin/cancellations` | ✅ Live (mock) |
| KPI Summary | `/superadmin/cancellations` | See total at-risk count, critical count, high count, MRR at risk | `SuperadminCancellationsKPIs` | `GET /superadmin/cancellations/kpis` | ✅ Live (mock) |
| Filter & Search | `/superadmin/cancellations` | Filter by risk level or action status; search by gym/owner name | `SuperadminCancellationsFilters` | — (client-side) | ✅ Live |
| Update Action | `/superadmin/cancellations` | Set action status (PENDING/CONTACTED/RESOLVED/CANCELLED) + add notes | `SuperadminCancellationsActionModal` | `PATCH /superadmin/cancellations/:id/action` | ✅ Live (mock) |
| Email / Call | `/superadmin/cancellations` | Quick mailto/tel links on each row | `SuperadminCancellationsTable` | — (native links) | ✅ Live |

## Data and State Architecture
- **State pattern:** TanStack Query (`useQuery` / `useMutation`) via `useCancellationsAlertsPage.ts` — this is the single source of truth for all server data. Local `useState` is used only for UI-only state (search, filter, modal, pagination).
- **TanStack Query keys:** `['superadmin', 'cancellations']`, `['superadmin', 'cancellations-kpis']`
- **Mutations:** `updateActionMutation` (PATCH action), `bulkOutreachMutation` — both in `useCancellationsAlertsPage.ts`
- **Zustand stores:** None
- **Mock data:** `MOCK_CANCELLATIONS_ALERTS` + `MOCK_CANCELLATIONS_KPI` in `cancellations_constants.ts` — gated with `process.env.NODE_ENV === 'development'`

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `cancellationsAlertsApi.fetchAlerts()` | GET | `/superadmin/cancellations` | — | `CancellationsAlert[]` |
| `cancellationsAlertsApi.fetchKpis()` | GET | `/superadmin/cancellations/kpis` | — | `CancellationsKpiData` |
| `cancellationsAlertsApi.updateAction(payload)` | PATCH | `/superadmin/cancellations/:id/action` | `{ status, notes }` | `CancellationsAlert` |
| `cancellationsAlertsApi.dismissAlert(id)` | DELETE | `/superadmin/cancellations/:id` | — | `void` |

## Edge Cases / AI Warnings
- **CANCELLATIONS_RISK_STYLES and CANCELLATIONS_ACTION_STATUS_STYLES** — must always be imported from `cancellations_constants.ts`; never inline badge color classes.
- **Risk score bar color** — derived inline from `riskScore` value (≥80 = danger, ≥60 = warning, else success); this is the only acceptable inline conditional class in this module.
- **`MOCK_CANCELLATIONS_ALERTS` is a dev fallback** — gate with `process.env.NODE_ENV === 'development'` before production.
- **Action update is pessimistic** — only update local state after confirmed `onConfirm` callback; never optimistically mutate before modal confirmation.
- **Email/phone links** — use `mailto:` and `tel:` native links; never open a custom compose modal for these quick actions.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `SuperadminCancellations*` prefix on all files
- [x] Rule 3B: Centralized data — all style maps and mock data in `cancellations_constants.ts`
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind arbitrary values
- [x] Rule 7: Type Isolation — all types in `cancellations_types.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: URL Config — `SuperadminUrlConfig.BACKEND_API.CANCELLATIONS_ALERTS_BASE` in API client
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `cancellations_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable `alert.id` used
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Cancellations alert is permanent and irreversible:** Never use `window.confirm()` for Cancellations alert deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Cancellations alerts Table Row Clicks:** The `Cancellations alerts` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Cancellations alerts:** Do not allow a single failed API fetch in Cancellations alerts to unmount the entire page. Major components (like the Cancellations alerts data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Cancellations alerts Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Cancellations alerts.
- **No Client-Side Pagination for Cancellations alerts:** If the dataset grows large, do not fetch all Cancellations alerts and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.
