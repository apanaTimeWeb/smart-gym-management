// RESPONSIBILITY: Establishes a trusted tenant context without allowing anonymous callers to select arbitrary tenant databases.
// FLOW: HTTP request â†’ public-route policy / authenticated actor â†’ master tenant registry â†’ RequestContext.
import { ForbiddenException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { RequestContextService } from '@/backend_landing/core/context/request-context.service';

import { MasterTenantRepository } from '@/backend_landing/core/tenant/master-tenant.repository';

import type { NextFunction, Request, Response } from 'express';


type AuthenticatedRequest = Request & {
  user?: {
    tenantId?: string;
    tenantIds?: string[];
  };
};

/** @description Resolves only configured public tenant access for anonymous Landing traffic and requires authenticated tenant membership for non-public requests. @param request - Express request. @param _response - Express response. @param next - Downstream callback. @returns Resolves after trusted tenant context is established or passes the error to Nest. */
export const TenantResolutionMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const requestContext = request.app.get(RequestContextService);
  const config = request.app.get(ConfigService);
  const tenantRepository = request.app.get(MasterTenantRepository);
  const path = request.path;

  if (/\/api\/v\d+\/(?:health\/(?:live|ready|deep)|metrics|docs(?:\/|$))$/.test(path)) {
    next();
    return;
  }

  if (config.get<string>('app.nodeEnv') === 'test' && /\/api\/v\d+\/test\/tenants(?:\/|$)/.test(path)) {
    next();
    return;
  }

  const publicTenantId = config.getOrThrow<string>('app.publicTenantId');
  const suppliedTenant = request.header('x-tenant-id');
  const isPublicLanding = /\/api\/v\d+\/landing\/(?:booking|bookings|contact)$/.test(path)
    || /\/api\/landing\/(?:booking|bookings|contact)$/.test(path);
  const actor = (request as AuthenticatedRequest).user;

  if (isPublicLanding) {
    if (suppliedTenant && suppliedTenant !== publicTenantId) {
      next(new ForbiddenException('Public Landing traffic cannot select another tenant.'));
      return;
    }
    const tenant = await tenantRepository.findActiveById(publicTenantId);
    if (!tenant) {
      next(new ForbiddenException('Configured public tenant is not active.'));
      return;
    }
    requestContext.setTenantId(tenant.id);
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
  const tenant = await tenantRepository.findActiveById(candidate);
  if (!tenant) {
    next(new ForbiddenException('Tenant access is not authorized.'));
    return;
  }
  requestContext.setTenantId(tenant.id);
  next();
};
