// RESPONSIBILITY: Enforces controller-layer RBAC using typed role metadata.
// FLOW: @Roles metadata -> SuperadminCoreRolesGuard -> request.user.role -> allow/deny.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
import { IS_PUBLIC_KEY } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-public.decorator';
/**
 * Primary Intent: Defines SuperadminCoreRolesGuard as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /**
 * Primary Intent: Executes the canActivate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    const roles = this.reflector.getAllAndOverride<SuperadminRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) ?? [];
    if (roles.length === 0) return true;
    const request = context.switchToHttp().getRequest<Request & { user?: SuperadminAuthenticatedUser }>();
    if (!request.user || !roles.includes(request.user.role)) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'AUTH.ROLE.FORBIDDEN', message: { key: 'core.ERRORS.FORBIDDEN' } });
    return true;
  }
}
