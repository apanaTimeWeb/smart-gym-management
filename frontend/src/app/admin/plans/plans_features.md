# Admin Plans — Feature Map

## Module Purpose
The Admin Plans module manages global membership plan definitions — pricing tiers, durations,
features, and active/inactive status. Plans created here are the source of truth consumed by
the Manager module when enrolling members. Deleting a plan that has active subscribers must
be blocked at the API level; the UI must show a clear error from `response.message`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for plans grid |
| `error.tsx` | Error boundary |
| `plans_components/AdminPlansMain.tsx` | Root Client Component, wraps `AdminPlansProvider` |
| `plans_components/AdminPlansGrid.tsx` | Card grid of all membership plans |
| `plans_components/AdminPlansGrid.tsx` | Single plan card with price, duration, features |
| `plans_components/AdminPlansModal.tsx` | Create new plan form modal |
| `plans_components/AdminPlansModal.tsx` | Edit existing plan form modal |
| `plans_components/AdminPlansRevenue/` | Sub-folder for Plan Revenue attribution dashboard components |
| `revenue/page.tsx` | Plan Revenue attribution dashboard server route |
| `plans_types/AdminPlansTypes.ts` | `Plan`, `CreatePlanDto`, `UpdatePlanDto` types |
| `plans_types/AdminPlansRevenueTypes.ts` | `PlanRevenueRecord`, `RevenuePeriod` types |
| `plans_api/AdminPlansApi.ts` | API wrappers |
| `plans_context/useAdminPlansRevenueLogic.ts`| Data fetching hook for Plan Revenue |
| `plans_url_config.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Plans Grid | `/admin/plans` | View all membership plans | `GET /admin/plans` | ✅ Live |
| Add Plan | `/admin/plans` | Create new plan | `POST /admin/plans` | ✅ Live |
| Edit Plan | `/admin/plans` | Update plan details/pricing | `PATCH /admin/plans/:id` | ✅ Live |
| Toggle Active | `/admin/plans` | Activate / deactivate a plan | `PATCH /admin/plans/:id/status` | ✅ Live |
| Delete Plan | `/admin/plans` | Remove unused plan | `DELETE /admin/plans/:id` | ✅ Live |
| Plan Revenue | `/admin/plans/revenue` | View revenue breakdown by plan | `GET /admin/plans/revenue` (Mocked) | ✅ Live |

## Data and State Architecture
- Server-state: TanStack Query in `useAdminPlansLogic` and `useAdminPlansRevenueLogic`
- Zustand stores: `useAdminPlansStore` — modal open/close, selected plan for edit
- Context providers: None for server-state ownership
- Local-storage keys: None
- MSW handler: `admin/plans/plans_mocks/handlers/AdminPlansMockHandlers.ts` (module-owned MSW transport)

## User Flows
1. Admin opens `/admin/plans` → card grid loads with all plans
2. Admin clicks "Add Plan" → `AdminPlansAddModal` opens → submit → `POST` → grid refreshes
3. Admin clicks a plan card → `AdminPlansEditModal` opens with pre-filled data
4. Admin toggles active status → optimistic UI update → `PATCH` → confirm or rollback
5. Admin deletes plan → `useConfirm()` → `DELETE` → if API returns error (active subscribers), toast shows `response.message`

## Component Responsibility Map
- `AdminPlansMain` — layout + provider. MUST NOT contain form logic.
- `AdminPlansGrid` — renders plan cards from context. MUST NOT fetch directly.
- `AdminPlanCard` — pure display. Status badge uses `AdminPlansSharedConstants.ts`.
- `AdminPlansAddModal` / `AdminPlansEditModal` — own form state via React Hook Form + Zod.

## Permissions and Security
| Action | Required Role |
|---|---|
| View plans | `ADMIN` |
| Create / Edit plans | `ADMIN` |
| Delete plan | `ADMIN` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons in a grid
- **Empty:** "No plans created yet" with "Add Plan" CTA
- **Error:** `error.tsx` with retry; delete errors shown as toast from `response.message`

## Edge Cases / AI Warnings
- **Delete blocked by active subscribers** — the API returns a `400` with a descriptive `message`. The UI must surface this message via toast, not a hardcoded string.
- **Price stored as integers** — plan prices arrive and are sent as paise (integers). Always use `formatCurrency()` from `@/lib/formatters` for display.
- **Toggle active is NOT a delete** — deactivating a plan hides it from new enrollments but does not affect existing active subscriptions.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — form logic in modals, display in cards
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — delete error uses `response.message`
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 21: Currency formatted via `@/lib/formatters.ts`
- [x] Rule 71: Delete uses `useConfirm()` double-verification


## User Flows & Interactions
1. Enter the `/admin/plans` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `plans_api/AdminPlansApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/plans/plans_mocks/fixtures/AdminPlansMockFixtures.ts` and `admin/plans/plans_mocks/handlers/AdminPlansMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.
