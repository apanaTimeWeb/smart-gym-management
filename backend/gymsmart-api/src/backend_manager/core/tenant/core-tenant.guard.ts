// RESPONSIBILITY: Owns backend core authorization/security guard.
// FLOW: Request context → authentication/authorization decision → allow or reject.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreTenantAuthorizationService } from '@/backend_manager/core/tenant/core-tenant-authorization.service';

import type { Request } from 'express';

@Injectable()
export class CoreTenantGuard implements CanActivate {
  constructor(private readonly reflector:Reflector,private readonly authorization:CoreTenantAuthorizationService,private readonly context:CoreRequestContextService) {}
  /** @description Verifies tenant membership before feature execution. @param executionContext - Current HTTP execution context. @returns True after trusted tenant context. @throws ForbiddenException when tenant context cannot be established. */
  async canActivate(executionContext:ExecutionContext):Promise<boolean> { if(this.reflector.getAllAndOverride<boolean>('core_public',[executionContext.getHandler(),executionContext.getClass()])) return true; const request=executionContext.switchToHttp().getRequest<Request>(); const tenantId=String(request.headers['x-tenant-id'] ?? ''); if(!tenantId) throw new ForbiddenException({errorCode:'TENANT.HEADER.MISSING'}); await this.authorization.authorize(tenantId); if(!this.context.get().tenantDatabaseName) throw new ForbiddenException({errorCode:'TENANT.DATABASE.MISSING'}); return true; }
}
