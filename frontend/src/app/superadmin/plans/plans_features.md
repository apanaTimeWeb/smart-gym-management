# Superadmin Plans — Feature Map

## Module Purpose
The Superadmin Plans module manages the SaaS subscription plan catalog — the tiers that
gym tenants subscribe to (e.g. Starter, Pro, Enterprise). Superadmins define plan names,
pricing, feature limits (max branches, max members, enabled modules), and billing cycles.
This is distinct from the Manager/Admin "membership plans" module which manages gym member
subscriptions. Superadmin plans are platform-level SaaS products, not gym membership products.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Plan card grid skeleton |
| `error.tsx` | Error boundary with retry |
| `plans_components/SuperadminPlansClient.tsx` | Root Client Component — grid + actions |
| `plans_components/SuperadminPlansGrid.tsx` | Card grid of all SaaS plans |
| `plans_components/SuperadminPlanCard.tsx` | Single plan card — name, price, limits, subscriber count |
| `plans_components/SuperadminPlansCreateModal.tsx` | Create new SaaS plan |
| `plans_components/SuperadminPlansEditModal.tsx` | Edit plan — pricing, limits, features |
| `plans_components/SuperadminPlansFeatureToggleList.tsx` | Toggle which modules are included in a plan |
| `plans_types/SuperadminPlansTypes.ts` | `SaasPlan`, `PlanFeatureLimit`, `CreateSaasPlanDto`, `UpdateSaasPlanDto` |
| `plans_utils/SuperadminPlansConstants.ts` | `BILLING_CYCLE_OPTIONS`, `MODULE_LIST`, `PLAN_TIER_STYLES` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Plan List | `/superadmin/plans` | All SaaS subscription plans | `GET /superadmin/plans` | ✅ Live |
| Create Plan | `/superadmin/plans` | New SaaS tier with pricing + limits | `POST /superadmin/plans` | ✅ Live |
| Edit Plan | `/superadmin/plans` | Update pricing, limits, feature toggles | `PATCH /superadmin/plans/:id` | ✅ Live |
| Archive Plan | `/superadmin/plans` | Soft-delete — existing subscribers unaffected | `PATCH /superadmin/plans/:id/archive` | ✅ Live |
| View Subscribers | `/superadmin/plans` | Count of gyms on each plan (read-only) | — (included in plan list response) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'plans']`, `['superadmin', 'plans', planId]`
- Mutations: `useCreateSaasPlan`, `useUpdateSaasPlan`, `useArchiveSaasPlan`
- Zustand stores: None
- Context providers: None

## User Flows
1. Superadmin opens `/superadmin/plans` → plan grid loads with subscriber counts
2. Superadmin clicks "Create Plan" → `SuperadminPlansCreateModal` → RHF + Zod → `POST` → grid invalidated
3. Superadmin clicks "Edit" on plan card → `SuperadminPlansEditModal` pre-filled → `PATCH` on submit
4. Superadmin clicks "Archive" → `useConfirm()` with warning "Existing subscribers keep access until renewal" → `PATCH /archive`

## Component Responsibility Map
- `SuperadminPlansClient` — layout + modal open state. MUST NOT contain form logic.
- `SuperadminPlanCard` — display only. MUST NOT call mutations directly.
- `SuperadminPlansFeatureToggleList` — toggle list inside edit modal. MUST NOT fetch plan data independently.
- `SuperadminPlansCreateModal` / `SuperadminPlansEditModal` — form only. MUST use RHF + Zod.

## Permissions and Security
| Action | Required Role |
|---|---|
| View SaaS plans | `SUPERADMIN` |
| Create SaaS plan | `SUPERADMIN` |
| Edit SaaS plan | `SUPERADMIN` |
| Archive SaaS plan | `SUPERADMIN` |
| ❌ Delete plan with active subscribers | Forbidden — archive only |
| ❌ Manage gym membership plans | Manager role — different module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 plan card skeletons in a grid
- **Empty:** "No plans configured — create your first SaaS plan" with CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Archive vs Delete** — plans with active subscribers MUST be archived, not deleted. Backend enforces this; frontend must show archive option only, not delete.
- **Price change impact** — editing price on an active plan does not retroactively change existing subscriptions; show a warning in the edit modal.
- **MODULE_LIST** — the list of toggleable modules must live in `SuperadminPlansConstants.ts`, not hardcoded in the toggle component.
- **Billing cycle** — `BILLING_CYCLE_OPTIONS` (`MONTHLY | ANNUAL`) must come from constants.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminPlans*`
- [x] Rule 7: Type isolation — all types in `SuperadminPlansTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 26: Archive uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable plan IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
