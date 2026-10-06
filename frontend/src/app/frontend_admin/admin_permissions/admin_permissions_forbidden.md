# Forbidden Patterns — `admin/permissions`

## 1. No Granting Super-Admin Level Permissions
**FORBIDDEN:** Enabling any UI toggle that would assign Superadmin-level permissions to gym staff.
**REASON:** Permission escalation is a critical security vulnerability.

## 2. No Permission Changes Without `useConfirm()`
**FORBIDDEN:** Calling PATCH on permission toggle without a confirmation gate.
**ALLOWED:** Always use `useConfirm()` with message: "Changing this permission will immediately affect what this staff member can do."

## 3. No Suppressing Audit Logs
**FORBIDDEN:** Any client-side workaround that skips permission change logging.

## 4. No Self-Permission Modification
**FORBIDDEN:** Allowing an admin to modify their own permission set from this module.
**ALLOWED:** Read-only display for the authenticated admin's own permissions.

## 5. CODEOWNERS Review Required
Any PR touching this module path requires human reviewer approval (Rule 76).

## 6. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
