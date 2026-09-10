# Manager Members — Feature Map

## Module Purpose
The Manager Members module is the most complex sub-module in the Manager role. It provides
full member lifecycle management: registration, profile viewing, membership renewal, payment
recording, diet/workout plan assignment, and soft-deletion (mark exit). Phone numbers are
masked in list view; full values visible only in profile detail. All destructive actions
require `useConfirm()` double-verification.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton |
| `error.tsx` | Error boundary |
| `members_components/ManagerMembersMain.tsx` | Root Client Component, wraps `MembersProvider` |
| `members_components/ManagerMembersTable.tsx` | Paginated member list, clickable rows |
| `members_components/ManagerMembersFilters.tsx` | Search, status, plan, date filters |
| `members_components/ManagerMembersModal/ManagerMembersModal.tsx` | New member registration form (Replaced add modal) |
| `members_components/MemberProfile/ManagerMemberProfile.tsx` | Full member profile view |
| `members_components/ManagerRenewModal.tsx` | Membership renewal form |
| `members_components/ManagerPaymentModal.tsx` | Record payment form |
| `members_api/useManagerMembersQueries.ts` | TanStack Query hooks for backend fetching |
| `members_context/useManagerMembersMutations.ts` | TanStack Mutation hooks for write operations |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Member List | `/manager/members` | Paginated, filterable member table | `GET /manager/members` | ✅ Live |
| Add Member | `/manager/members` | Register new member | `POST /manager/members` | ✅ Live |
| View Profile | `/manager/members` | Full member detail drawer | `GET /manager/members/:id` | ✅ Live |
| Renew Membership | `/manager/members` | Extend membership plan | `POST /manager/members/:id/renew` | ✅ Live |
| Record Payment | `/manager/members` | Log a payment against member | `POST /manager/members/:id/payments` | ✅ Live |
| Mark Exit | `/manager/members` | Soft-delete / deactivate member | `PATCH /manager/members/:id/exit` | ✅ Live |
| Assign Diet Plan | `/manager/members` | Link diet plan to member | `PATCH /manager/members/:id/diet` | ✅ Live |
| Assign Workout | `/manager/members` | Link workout plan to member | `PATCH /manager/members/:id/workout` | ✅ Live |

## Data and State Architecture
- Server-state: `TanStack Query` (`useManagerMembersQueries`, `useManagerMembersMutations`)
- Zustand stores: `useManagerMembersStore` — strictly transient UI state (e.g. selected IDs)
- Context providers: `ManagerMembersContext` — coordinates UI interactions and modal states
- Local-storage keys: None
- MSW handler: `manager-members.handlers.ts`

## User Flows
1. Manager opens `/manager/members` → table loads with paginated member list
2. Manager clicks "Add Member" → `ManagerMembersAddModal` opens (3 tabs: Personal, Plan, Payment) → submit → `POST` → table refreshes
3. Manager clicks a member row → `ManagerMembersProfileModal` opens with full profile
4. Inside profile → Manager clicks "Renew" → `ManagerMembersRenewalModal` opens → submit → `POST /renew`
5. Manager clicks "Mark Exit" → `useConfirm()` → on confirm → `PATCH /exit` → member status updates to Exited

## Component Responsibility Map
- `ManagerMembersMain` — layout + provider wrapper. MUST NOT contain table logic.
- `ManagerMembersTable` — display only, receives member array as props. Row click dispatches to store.
- `ManagerMembersAddModal` — 3-tab form, owns React Hook Form state. MUST NOT call API directly — dispatches to context.
- `ManagerMembersProfileModal` — full-height drawer. Fetches single member on open via `GET /members/:id`.
- `ManagerMembersFilters` — owns filter state, dispatches to `MembersProvider`.

## Permissions and Security
| Action | Required Role |
|---|---|
| View member list | `MANAGER` |
| Add / Edit member | `MANAGER` |
| Mark Exit | `MANAGER` — requires `useConfirm()` |
| Record payment | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8-row table skeleton with column widths matching real table
- **Empty:** `ManagerMembersEmptyState.tsx` — "No members found" with "Add Member" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Phone masking in list** — `ManagerMembersTable` must display masked phone (`98****2310`) using `maskSensitiveData()` from `@/lib/formatters`. Full number visible only in `ManagerMembersProfileModal`.
- **Mark Exit is NOT hard delete** — sets `status: 'EXITED'` via PATCH. Never call a DELETE endpoint for members.
- **3-tab add form** — all 3 tabs share one React Hook Form instance. Do not split into separate forms — the entire payload is submitted together on the final tab.
- **Renewal vs new membership** — renewal uses `POST /renew`, not `POST /members`. Never reuse the add-member API for renewals.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form logic in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — all toasts use `response.message`
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 17: Server-side pagination + filtering
- [x] Rule 43: Phone numbers masked in list view
- [x] Rule 71: Mark Exit uses `useConfirm()` double-verification
