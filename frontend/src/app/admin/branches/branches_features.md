# Admin Branches — Feature Map

## Module Purpose
The Branches module gives gym admins a read-only overview of all branch locations managed
under their gym account. Because an admin is a viewer (not a manager), this module shows
branch KPIs (revenue, members, staff count, status) and allows drilling into a branch detail
drawer for deeper inspection. Admins cannot create, suspend, or delete branches — those
operations belong to the Manager or Superadmin role. This module's primary purpose is
cross-branch visibility and performance comparison.

---

## Directory Structure

| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point. Renders toolbar + branch cards + detail drawer. | — |
| `loading.tsx` | Skeleton UI mimicking branch cards grid | — |
| `error.tsx` | Module-level error boundary with `reset()` retry | — |
| `branches_components/AdminBranchesToolbar/` | Search input + status filter for branch list | `AdminBranchesToolbar.tsx` |
| `branches_components/AdminBranchCard/` | Card component displaying KPIs for a single branch | `AdminBranchCard.tsx` |
| `branches_components/AdminBranchDetailDrawer/` | Slide-in drawer showing full branch profile (staff, revenue, members) | `AdminBranchDetailDrawer.tsx` |
| `branches_api/` | API client for fetching branch data | `AdminBranchesApi.ts` |
| `branches_types/` | TypeScript types: `AdminBranch`, `BranchStatus`, `BranchesFetchState` | `AdminBranchesTypes.ts` |
| `branches_utils/` | Constants: `ADMIN_BRANCH_STATUS_STYLES`, `ADMIN_BRANCHES_PAGE_SIZE` | `AdminBranchesSharedConstants.ts` |
| `branches_context/` | React Context bridging store state to deeply nested components | — |
| `branches_store/` | Zustand store for selected branch, drawer state, filter values | — |

---

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Branch List | `/admin/branches` | View all gym branches as cards with status, member count, staff count, MRR | `AdminBranchCard` | `GET /admin/branches` | ✅ Live |
| Branch Search & Filter | `/admin/branches` | Filter branches by name and status (ACTIVE / INACTIVE / SUSPENDED) | `AdminBranchesToolbar` | — (client-side filter) | ✅ Live |
| Branch Detail | `/admin/branches` (inline) | Drill into a branch — staff list, recent revenue, expense breakdown | `AdminBranchDetailDrawer` | `GET /admin/branches/:id` | ✅ Live |

---

## Permissions and Security

- **Required role:** `ADMIN` — read-only access
- **Strictly forbidden:** Creating, suspending, or deleting branches from this module
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`
- All branch data is scoped to the admin's tenant via the `x-tenant-id` header in `apiFetch`

---

## Edge Cases and AI Warnings

- **Admins are read-only.** Never add create/edit/delete buttons or API calls to this module. Those belong in the Manager role.
- **`AdminBranch` type differs from `Branch` in `useAdminGlobalStore.ts`** — the store uses a simplified `Branch` interface for cross-module branch switching. `AdminBranchesTypes.ts` defines the full `AdminBranch` for this module's API responses. Do not mix them.
- **`ADMIN_BRANCH_STATUS_STYLES`** is the single source of truth for status badge colors. Never inline status badge classes.
- **`branches_api/AdminBranchesApi.ts` uses `unknown[]` as data type** — wire to `AdminBranch[]` from `AdminBranchesTypes.ts` when the backend contract is finalized.

---

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — subfolders with module prefix
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `AdminBranches*` prefix
- [x] Rule 7: Type Isolation — `AdminBranchesTypes.ts` in `branches_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` is Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: Centralized URL Config — `AdminBranchesUrlConfig` in `branches_url_config.ts`
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `branches_forbidden.md` present
- [ ] Rule 15B: Forms — no forms present (read-only module); N/A
- [ ] Rule 75: MSW handler not yet configured
