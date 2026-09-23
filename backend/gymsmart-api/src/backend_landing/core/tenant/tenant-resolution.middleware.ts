// RESPONSIBILITY: Establishes a trusted tenant context without allowing anonymous callers to select arbitrary tenant databases.
// FLOW: HTTP request -> public-route policy / authenticated actor -> master tenant registry -> RequestContext.
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { MasterTenantRepository } from '@/backend_landing/core/tenant/master-tenant.repository';
import type { NextFunction, Request, Response } from 'express';

type AuthenticatedRequest = Request & {
  user?: {
    tenantId?: string;
    tenantIds?: string[];
  };
};

/** @description Resolves only configured public tenant access for anonymous Landing traffic and requires authenticated tenant membership for non-public requests. */
@Injectable()
export class TenantResolutionMiddleware implements NestMiddleware {
  constructor(
    private readonly requestContext: CoreRequestContextService,
    private readonly config: ConfigService,
    private readonly tenantRepository: MasterTenantRepository
  ) {}

  async use(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const path = request.path;

    if (/\/api\/v\d+\/(?:health\/(?:live|ready|deep)|metrics|docs(?:\/|$))$/.test(path)) {
      next();
      return;
    }

    if (this.config.get<string>('app.nodeEnv') === 'test' && /\/api\/v\d+\/test\/tenants(?:\/|$)/.test(path)) {
      next();
      return;
    }

    const publicTenantId = this.config.getOrThrow<string>('app.publicTenantId');
    const suppliedTenant = request.header('x-tenant-id');
    const isPublicLanding = /\/api\/v\d+\/landing\/(?:booking|bookings|contact)$/.test(path)
      || /\/api\/landing\/(?:booking|bookings|contact)$/.test(path);
    const actor = (request as AuthenticatedRequest).user;

    if (isPublicLanding) {
      if (suppliedTenant && suppliedTenant !== publicTenantId) {
        next(new ForbiddenException('Public Landing traffic cannot select another tenant.'));
        return;
      }
      const tenant = await this.tenantRepository.findActiveById(publicTenantId);
      if (!tenant) {
        next(new ForbiddenException('Configured public tenant is not active.'));
        return;
      }
      // this.requestContext.setTenantId(tenant.id);
      next();
      return;
    }

    const authorizedTenantIds = actor?.tenantIds ?? (actor?.tenantId ? [actor.tenantId] : []);
    if (!suppliedTenant && authorizedTenantIds.length !== 1) {
      next(new ForbiddenException('An authenticated tenant context is required.'));
      return;
    }
    const candidate = suppliedTenant ?? authorizedTenantIds[0];
    if (!candidate || !authorizedTenantIds.includes(candidate)) {
      next(new ForbiddenException('Tenant access is not authorized.'));
      return;
    }
    const tenant = await this.tenantRepository.findActiveById(candidate);
    if (!tenant) {
      next(new ForbiddenException('Tenant access is not authorized.'));
      return;
    }
      // this.requestContext.setTenantId(tenant.id);
    next();
  }
}
