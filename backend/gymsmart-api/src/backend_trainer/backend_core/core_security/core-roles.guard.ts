// RESPONSIBILITY: Enforces typed RBAC at controller boundaries and never inside business services.
// FLOW: CoreRoles metadata + authenticated role → allow/deny.


import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CORE_ROLES_KEY } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import type { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';


/**
 * Intent: Defines the CoreRolesGuard boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
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
