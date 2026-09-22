// RESPONSIBILITY: Blocks feature access until the authenticated actor has a trusted tenant context.
// FLOW: HTTP header -> CoreJwtGuard actor -> master tenant authorization -> trusted tenant context.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { CoreTenantAuthorizationService } from '@/core/tenant/core-tenant-authorization.service';

@Injectable()
export class CoreTenantGuard implements CanActivate {
  constructor(private readonly reflector:Reflector,private readonly authorization:CoreTenantAuthorizationService,private readonly context:CoreRequestContextService) {}
  /** @description Verifies tenant membership before feature execution. @param executionContext - Current HTTP execution context. @returns True after trusted tenant context. @throws ForbiddenException when tenant context cannot be established. */
  async canActivate(executionContext:ExecutionContext):Promise<boolean> { if(this.reflector.getAllAndOverride<boolean>('core_public',[executionContext.getHandler(),executionContext.getClass()])) return true; const request=executionContext.switchToHttp().getRequest<Request>(); const tenantId=String(request.headers['x-tenant-id'] ?? ''); if(!tenantId) throw new ForbiddenException({errorCode:'TENANT.HEADER.MISSING'}); await this.authorization.authorize(tenantId); if(!this.context.get().tenantDatabaseName) throw new ForbiddenException({errorCode:'TENANT.DATABASE.MISSING'}); return true; }
}
