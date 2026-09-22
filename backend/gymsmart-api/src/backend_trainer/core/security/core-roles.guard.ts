// RESPONSIBILITY: Enforces typed RBAC at controller boundaries and never inside business services.
// FLOW: CoreRoles metadata + authenticated role → allow/deny.


import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CORE_ROLES_KEY } from '@/backend_trainer/core/security/core-roles.decorator';
import type { CoreRole } from '@/backend_trainer/core/types/core-auth.types';

@Injectable()
export class CoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<CoreRole[]>(CORE_ROLES_KEY, [context.getHandler(), context.getClass()]) ?? [];
    if (roles.length === 0) return true;
    const actorRole = CoreRequestContext.get().role;
    if (!actorRole || !roles.includes(actorRole)) throw new ForbiddenException('AUTH.ROLE.FORBIDDEN');
    return true;
  }
}
