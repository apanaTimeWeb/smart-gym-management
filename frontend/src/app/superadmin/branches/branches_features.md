# Superadmin Branches — Feature Map

## Module Purpose
The Superadmin Branches module provides a cross-tenant view of all gym branches across
the entire platform. Superadmins can inspect branch health, view which manager is assigned,
check member counts, and flag branches for review. Branch creation and deletion is handled
at the gym level — this module is primarily a monitoring and oversight interface. Superadmins
cannot directly manage branch operations; that is the Manager's domain.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 10 row placeholders |
| `error.tsx` | Error boundary with retry |
| `branches_components/SuperadminBranchesClient.tsx` | Root Client Component — table + filter bar |
| `branches_components/SuperadminBranchesTable.tsx` | Paginated table of all branches across all gyms |
| `branches_components/SuperadminBranchesTableRow.tsx` | Single branch row — gym name, branch name, manager, member count, status |
| `branches_components/SuperadminBranchesFilterBar.tsx` | Filter by gym, status (ACTIVE / INACTIVE / FLAGGED) |
| `branches_components/SuperadminBranchesDetailDrawer.tsx` | Branch detail — manager info, member count, recent activity |
| `branches_components/SuperadminBranchesFlagModal.tsx` | Flag branch for review — reason input |
| `branches_types/SuperadminBranchesTypes.ts` | `Branch`, `BranchStatus`, `FlagBranchDto`, `BranchesFilter` |
| `branches_utils/SuperadminBranchesConstants.ts` | `BRANCH_STATUS_STYLES`, `FLAG_REASON_OPTIONS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Branch List | `/superadmin/branches` | All branches across all gyms, paginated | `GET /superadmin/branches?page=&gymId=&status=` | ✅ Live |
| View Branch Detail | `/superadmin/branches` | Branch profile in drawer | `GET /superadmin/branches/:id` | ✅ Live |
| Flag Branch | `/superadmin/branches` | Flag for review with reason | `PATCH /superadmin/branches/:id/flag` | ✅ Live |
| Unflag Branch | `/superadmin/branches` | Remove flag | `PATCH /superadmin/branches/:id/unflag` | ✅ Live |
| Filter by Gym | `/superadmin/branches` | Scope list to a specific gym | — (query param) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'branches', { page, gymId, status }]`, `['superadmin', 'branches', branchId]`
- Mutations: `useFlagBranch`, `useUnflagBranch`
- Zustand stores: None
- Context providers: None
- Local-state: `gymFilter`, `statusFilter`, `page` — local to `SuperadminBranchesClient`

## User Flows
1. Superadmin opens `/superadmin/branches` → full cross-tenant branch list loads
2. Superadmin filters by gym → list scoped to that gym's branches
3. Superadmin clicks branch row → `SuperadminBranchesDetailDrawer` → `GET /superadmin/branches/:id`
4. Superadmin clicks "Flag" → `SuperadminBranchesFlagModal` → reason input → `PATCH /superadmin/branches/:id/flag`
5. Superadmin clicks "Unflag" on flagged branch → `useConfirm()` → `PATCH /superadmin/branches/:id/unflag`

## Component Responsibility Map
- `SuperadminBranchesClient` — filter + pagination state. MUST NOT contain row logic.
- `SuperadminBranchesTable` — renders rows. MUST NOT manage filter state.
- `SuperadminBranchesDetailDrawer` — read-only. MUST NOT allow branch mutations from drawer.
- `SuperadminBranchesFlagModal` — reason form only. MUST validate non-empty reason before submit.

## Permissions and Security
| Action | Required Role |
|---|---|
| View all branches | `SUPERADMIN` |
| Flag branch | `SUPERADMIN` |
| Unflag branch | `SUPERADMIN` |
| ❌ Create / delete branches | Gym-level operation — not from this module |
| ❌ Manage branch operations | Manager role only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 10 table row skeletons
- **Empty (no branches):** "No branches found" — check gym filter
- **Empty (filtered):** "No branches match your filters" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Cross-tenant data** — this module shows branches from ALL gyms; never scope to a single gym by default.
- **BRANCH_STATUS_STYLES** — maps `ACTIVE | INACTIVE | FLAGGED` to badge classes; must live in constants.
- **Flag reason** — `FlagBranchDto.reason` is required; form must validate non-empty before submit.
- **Pagination reset** — page resets to 1 when gym or status filter changes.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminBranches*`
- [x] Rule 7: Type isolation — all types in `SuperadminBranchesTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 26: Unflag uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable branch IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
