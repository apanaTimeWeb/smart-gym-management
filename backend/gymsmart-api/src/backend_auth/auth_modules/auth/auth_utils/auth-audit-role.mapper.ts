// RESPONSIBILITY: Converts Auth roles into the finite audit actor-role enum without coupling core audit infrastructure to the Auth module.
// FLOW: AuthRole -> AuthAuditRoleMapper -> CoreAuditLogInput.actorRole -> audit_logs enum.

import { CoreAuditActorRole } from '@/backend_auth/auth_core/audit/core-audit.constants';
import { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';

const AUTH_TO_AUDIT_ROLE: Record<AuthRole, CoreAuditActorRole> = {
  [AuthRole.SUPERADMIN]: CoreAuditActorRole.SUPERADMIN,
  [AuthRole.ADMIN]: CoreAuditActorRole.ADMIN,
  [AuthRole.MANAGER]: CoreAuditActorRole.MANAGER,
  [AuthRole.TRAINER]: CoreAuditActorRole.TRAINER,
};

/**
 * @description Converts an Auth role to the role enum accepted by the core audit persistence boundary.
 * @param role - Auth role from the authenticated domain user.
 * @returns Corresponding core audit actor role.
 */
export function AuthAuditRoleMapper(role: AuthRole): CoreAuditActorRole {
  return AUTH_TO_AUDIT_ROLE[role];
}
