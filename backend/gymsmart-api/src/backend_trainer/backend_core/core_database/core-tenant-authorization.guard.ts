// RESPONSIBILITY: Verifies tenant membership in the master database before any tenant DataSource is selected.
// FLOW: Authenticated actor + optional x-tenant-id → master membership repository → trusted tenant context; ambiguous multi-tenant actors fail closed.

import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';
import { CORE_PUBLIC_KEY } from '@/backend_trainer/backend_core/core_security/core-public.decorator';


/**
 * Intent: Defines the CoreTenantAuthorizationGuard boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTenantAuthorizationGuard implements CanActivate {
  constructor(
    private readonly memberships: CoreTenantMembershipAuthorizationRepository,
    private readonly reflector: Reflector,
  ) {}

  /** Validates tenant membership and stores only the trusted tenant identifier. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(CORE_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const requestedTenantId = request.header('x-tenant-id')?.trim();
    const userId = CoreRequestContext.get().userId;
    if (!userId) throw new UnauthorizedException('TENANT.CONTEXT.ACCESSOR_REQUIRED');
    const membership = requestedTenantId
      ? await this.memberships.findActiveMembership(userId, requestedTenantId)
      : await this.memberships.findSingleActiveMembership(userId);
    if (!membership) throw new ForbiddenException('TENANT.ACCESS.MEMBERSHIP_FORBIDDEN');
    CoreRequestContext.get().tenantId = membership.tenantId;
    CoreRequestContext.get().role = membership.role;
    return true;
  }
}
