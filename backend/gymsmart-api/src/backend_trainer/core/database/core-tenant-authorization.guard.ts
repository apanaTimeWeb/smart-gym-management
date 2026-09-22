// RESPONSIBILITY: Verifies tenant access in the master database before any tenant DataSource is selected.
// FLOW: Authenticated actor + x-tenant-id → master membership → trusted tenant context.


import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { Repository, IsNull } from 'typeorm';
import type { Request } from 'express';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreTenantMembershipEntity } from '@/backend_trainer/core/database/core-tenant-membership.entity';
import { CORE_PUBLIC_KEY } from '@/backend_trainer/core/security/core-public.decorator';

@Injectable()
export class CoreTenantAuthorizationGuard implements CanActivate {
  constructor(@InjectRepository(CoreTenantMembershipEntity, 'master') private readonly memberships: Repository<CoreTenantMembershipEntity>, private readonly reflector: Reflector) {}
  /** Validates tenant membership and stores the trusted tenant identifier. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(CORE_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const tenantId = request.header('x-tenant-id');
    const userId = CoreRequestContext.get().userId;
    if (!tenantId || !userId) throw new UnauthorizedException('TENANT.CONTEXT.ACCESSOR_REQUIRED');
    const membership = await this.memberships.findOneBy({ tenantId, userId, deletedAt: IsNull() });
    if (!membership) throw new ForbiddenException('TENANT.ACCESS.MEMBERSHIP_FORBIDDEN');
    CoreRequestContext.get().tenantId = tenantId;
    CoreRequestContext.get().role = membership.role;
    return true;
  }
}
