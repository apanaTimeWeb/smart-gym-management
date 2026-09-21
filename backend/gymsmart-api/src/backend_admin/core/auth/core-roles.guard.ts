// RESPONSIBILITY: Enforces declarative controller-level role requirements after authentication and tenant authorization.
// FLOW: Controller metadata → CoreRolesGuard → trusted request actor → allow/reject.

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CORE_ROLES_KEY } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';

@Injectable()
export class CoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<CoreAdminRole[]>(CORE_ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!roles?.length) return true;
    const request = context.switchToHttp().getRequest<{ user?: { role?: CoreAdminRole } }>();
    const role = request.user?.role;
    if (!role || !roles.includes(role)) throw new ForbiddenException('Insufficient permissions.');
    return true;
  }
}
