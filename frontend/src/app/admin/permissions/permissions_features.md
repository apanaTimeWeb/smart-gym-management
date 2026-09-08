# Admin Permissions — Feature Map

## Module Purpose
The Permissions module lets gym admins view and manage role-based access control for their
gym's staff users. Admins can see what actions each role (Manager, Trainer, Receptionist)
is allowed to perform, and can customize permissions per staff member within the confines
of their own admin role. Admins cannot grant permissions that exceed their own access level.
This module is security-critical — all changes require `useConfirm()` and are audit-logged.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Permission Matrix | `/admin/permissions` | View role-to-permission grid for all staff roles | `GET /admin/permissions` | ✅ Live |
| Edit Staff Permission | `/admin/permissions` | Toggle individual permissions for a specific staff user | `PATCH /admin/permissions/:staffId` | ✅ Live |
| Reset to Role Defaults | `/admin/permissions` | Revert a staff member's permissions to their role defaults | `POST /admin/permissions/:staffId/reset` | ✅ Live |

## Edge Cases / AI Warnings
- **Admins cannot grant permissions above their own level** — the backend enforces this, but the UI must disable any permission toggle that would exceed the admin's own access.
- **Every permission change is audit-logged** — the backend handles this but the UI must not suppress it.
- **Changes require `useConfirm()`** — permission changes are security-critical.
- **This module has mandatory CODEOWNERS review** (Rule 76) — any changes to this module require human approval.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 13: This document
- [x] Rule 40: `permissions_forbidden.md` present
- [x] Rule 71: Permission changes use `useConfirm()`
- [x] Rule 76: CODEOWNERS review required for this module
