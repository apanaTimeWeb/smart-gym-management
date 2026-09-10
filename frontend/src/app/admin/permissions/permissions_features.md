# Admin Permissions — Feature Map

## Module Purpose
The Permissions module lets gym admins view and manage role-based access control for their
gym's staff users. Admins can see what actions each role (Manager, Trainer, Receptionist) is
allowed to perform, and can customize permissions per staff member within the confines of their
own admin role. Admins cannot grant permissions that exceed their own access level — the backend
enforces this hard boundary. This module is security-critical: all permission changes require
`useConfirm()` double-verification and are automatically audit-logged by the backend.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `permissions_components/AdminPermissionsMain/` | Root client orchestrator — renders toolbar, role cards, and permission matrix | `AdminPermissionsMain.tsx` |
| `permissions_components/AdminPermissionsToolbar/` | Role filter + staff search | `AdminPermissionsToolbar.tsx` |
| `permissions_components/AdminPermissionsRoleCard/` | Card showing a role's permission summary with edit CTA | `AdminPermissionsRoleCard.tsx` |
| `permissions_components/AdminPermissionsMatrix/` | Full permission grid — rows = actions, columns = roles, toggles per cell | `AdminPermissionsMatrix.tsx` |
| `permissions_components/AdminPermissionsGymOverride/` | Per-staff permission overrides view | `AdminPermissionsGymOverride.tsx` |
| `permissions_api/` | API client for permission endpoints | `permissions_api.ts` |
| `permissions_context/` | Data logic hook — fetches permissions, handles toggle/reset mutations | `useAdminPermissionsLogic.ts` |
| `permissions_store/` | Zustand store — activeRole, staffSearch, editingStaffId | `useAdminPermissionsStore.ts` |
| `permissions_types/` | TypeScript types: Permission, RolePermissions, StaffOverride | `permissions_types.ts` |
| `permissions_utils/` | Constants: role options, permission category labels | `AdminPermissionsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Permission Matrix | `/admin/permissions` | View role-to-permission grid for all staff roles | `AdminPermissionsMatrix` | `GET /admin/permissions` | ✅ Live |
| Edit Staff Permission | `/admin/permissions` | Toggle individual permissions for a specific staff user — requires `useConfirm()` | `AdminPermissionsMatrix` | `PATCH /admin/permissions/:staffId` | ✅ Live |
| Reset to Role Defaults | `/admin/permissions` | Revert a staff member's permissions to their role defaults — requires `useConfirm()` | `AdminPermissionsGymOverride` | `POST /admin/permissions/:staffId/reset` | ✅ Live |
| Per-Staff Overrides | `/admin/permissions` | View which staff members have custom overrides vs role defaults | `AdminPermissionsGymOverride` | `GET /admin/permissions/overrides` | ✅ Live |

## User Flows & Interactions

### Flow 1: Toggle a Permission
1. Admin finds the staff member in the matrix or override view
2. Clicks a permission toggle cell
3. `useAdminConfirm()` dialog: "Change [permission] for [staff name]? This will take effect immediately."
4. On confirm: `permissionsApi.updateStaffPermission(staffId, payload)` called
5. On success: matrix cell updates, toast shows backend message, backend auto-logs to audit trail

### Flow 2: Reset to Role Defaults
1. Admin clicks "Reset to Defaults" on a staff member's override row
2. `useAdminConfirm()` dialog: "Reset [name]'s permissions to [role] defaults? All custom overrides will be lost."
3. On confirm: `permissionsApi.resetToDefaults(staffId)` called
4. On success: override row disappears, matrix reflects role defaults

## Data and State Architecture

- **State pattern:** Zustand for UI state + TanStack Query for server state
- **Zustand store:** `useAdminPermissionsStore.ts` — holds: `activeRole`, `staffSearch`, `editingStaffId`
- **Query keys:** `['adminPermissions']`, `['adminPermissionsOverrides']`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `permissionsApi` in `permissions_api/permissions_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPermissions()` | GET | `/admin/permissions` | — | `RolePermissions[]` |
| `fetchOverrides()` | GET | `/admin/permissions/overrides` | — | `StaffOverride[]` |
| `updateStaffPermission(staffId, dto)` | PATCH | `/admin/permissions/:staffId` | `{ permission: string, enabled: boolean }` | `StaffOverride` |
| `resetToDefaults(staffId)` | POST | `/admin/permissions/:staffId/reset` | — | `null` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Privilege escalation prevention:** Admins cannot grant permissions above their own level. The backend enforces this — the UI must also disable any toggle that would exceed the admin's own access.
- **All changes are audit-logged:** The backend handles this automatically. Never suppress or bypass the audit trail.
- **Destructive actions:** Both toggle and reset use `useAdminConfirm()` — never `window.confirm()`
- **CODEOWNERS:** This module requires human review for any changes (Rule 76)
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: toolbar + role cards + matrix grid | N/A | `error.tsx` — module-branded with Retry |
| Permission matrix | Skeleton grid cells while loading | Inline "No permissions configured" | Inline via TanStack Query `isError` |
| Overrides view | Skeleton rows | Inline "No custom overrides — all staff using role defaults" | Inline error |

## Edge Cases and AI Warnings

- **Admins cannot grant permissions above their own level** — the UI must disable any toggle that would exceed the admin's own access. The backend will reject it anyway, but the UI must not allow the attempt.
- **Every permission change is audit-logged** — the backend handles this automatically. Never add client-side audit logging or suppress the backend audit.
- **Both toggle and reset require `useConfirm()`** — permission changes are security-critical. Never allow single-click permission changes.
- **This module has mandatory CODEOWNERS review (Rule 76)** — any code changes to this module require human approval before merge.
- **`activeRole` filter only affects the matrix view** — the override view always shows all staff with custom overrides regardless of the role filter.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminPermissionsMain.tsx` | Root orchestrator. Renders toolbar, role cards, matrix, and override view. |
| `AdminPermissionsToolbar.tsx` | Role filter + staff search. Writes to store. |
| `AdminPermissionsRoleCard.tsx` | Summary card per role. Shows permission count. |
| `AdminPermissionsMatrix.tsx` | Full permission grid. Toggle cells call `useAdminConfirm` before mutation. |
| `AdminPermissionsGymOverride.tsx` | Per-staff override list. Reset CTA calls `useAdminConfirm`. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useAdminPermissionsLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `permissions_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `permissions_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `permissions_forbidden.md` present
- [x] Rule 71: Toggle and reset both use `useAdminConfirm()`
- [x] Rule 76: CODEOWNERS review required
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured
