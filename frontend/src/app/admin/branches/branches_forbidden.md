# Forbidden Patterns — `admin/branches`

## 1. No Create / Edit / Delete Operations
**FORBIDDEN:** Adding any button, form, or API call that creates, modifies, or deletes a branch.
**REASON:** Admins are read-only viewers of branch data. All write operations belong to the Manager role.
**ALLOWED:** Only `GET /admin/branches` and `GET /admin/branches/:id` are permitted from this module.

## 2. No Inline Status Badge Colors
**FORBIDDEN:** `className={status === 'ACTIVE' ? 'bg-green-500 text-white' : '...'}`
**REASON:** Status badge styles live in `AdminBranchesSharedConstants.ts` → `ADMIN_BRANCH_STATUS_STYLES`.
**ALLOWED:** `className={ADMIN_BRANCH_STATUS_STYLES[branch.status] ?? ADMIN_BRANCH_STATUS_STYLES.DEFAULT}`

## 3. No Cross-Role Imports
**FORBIDDEN:** Importing anything from `/manager`, `/trainer`, or `/superadmin` modules.
**REASON:** Total role isolation (Rule 2) — branches are scoped to the admin module only.

## 4. No Relative Imports
**FORBIDDEN:** `import { AdminBranch } from '../../branches_types/...'`
**ALLOWED:** `import type { AdminBranch } from '@/app/admin/branches/branches_types/AdminBranchesTypes'`

## 5. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly inside `.tsx` component files.
**ALLOWED:** All API calls must go through `adminBranchesApi` in `branches_api/AdminBranchesApi.ts`.

## 6. No Barrel Files
**FORBIDDEN:** Creating `index.ts` re-export files.
**ALLOWED:** Import directly from the named file.

## 7. No Mixing `AdminBranch` with the Global `Branch` type
**FORBIDDEN:** Using `Branch` from `useAdminGlobalStore.ts` inside this module for API response typing.
**REASON:** The global store `Branch` is a simplified interface for the branch switcher. `AdminBranch` in `branches_types/AdminBranchesTypes.ts` is the canonical type for this module's API data.
