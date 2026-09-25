// RESPONSIBILITY: Enforces declarative controller-level role requirements after authentication and tenant authorization.
// FLOW: Controller metadata â†’ AdminCoreRolesGuard â†’ trusted request actor â†’ allow/reject.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CORE_ROLES_KEY } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

@Injectable()
/**
 * @description Defines the AdminCoreRolesGuard boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<AdminCoreAdminRole[]>(CORE_ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!roles?.length) return true;
    const request = context.switchToHttp().getRequest<{ user?: { role?: AdminCoreAdminRole } }>();
    const role = request.user?.role;
    if (!role || !roles.includes(role as AdminCoreAdminRole)) {
      console.log('RolesGuard failed. role:', role, 'expected roles:', roles, 'user:', request.user);
      throw new ForbiddenException({ message: 'Insufficient permissions.', errorCode: 'CORE.CORE.FORBIDDEN' });
    }
    return true;
  }
}
