// RESPONSIBILITY: Establishes trusted tenant context for anonymous public requests without trusting arbitrary tenant IDs.
// FLOW: HTTP request → x-tenant-id / configured public tenant → master registry → RequestContext.
import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '@nestjs/common';
import { MasterTenantRepository } from '@/core/tenant/master-tenant.repository';
import { RequestContextService } from '@/core/context/request-context.service';

/** @description Resolves the public or explicitly supplied tenant against the master registry. @param request - Express request. @param _response - Express response. @param next - Downstream callback. @returns Resolves after tenant context is established or an error is passed to Nest. */
export const TenantResolutionMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const requestContext = request.app.get(RequestContextService);
  if (/\/(?:health\/(?:live|ready)|metrics|docs(?:\/|$))$/.test(request.path)) {
    next();
    return;
  }
  const tenantRepository = request.app.get(MasterTenantRepository);
  const suppliedTenant = request.header('x-tenant-id');
  const candidate = suppliedTenant ?? process.env.PUBLIC_TENANT_ID;
  const tenant = candidate ? await tenantRepository.findActiveById(candidate) : null;
  if (!tenant) {
    next(new ForbiddenException('Tenant access is not authorized.'));
    return;
  }
  requestContext.setTenantId(tenant.id);
  next();
};
