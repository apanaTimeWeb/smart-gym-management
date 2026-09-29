// RESPONSIBILITY: Establishes a trusted tenant context only after public-route policy or upstream authentication/tenant authorization succeeds.
// FLOW: HTTP request -> public route policy / authenticated actor -> master registry -> trusted AsyncLocalStorage tenant context.
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LandingMasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.repository';
import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';

import type { NextFunction, Request, Response } from 'express';

type AuthenticatedRequest = Request & { user?: { tenantId?: string; tenantIds?: string[] } };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Intent: Prevent arbitrary x-tenant-id selection while allowing the public landing flow to resolve only its configured tenant.
 * Edge Cases: Non-public routes require an already-populated authenticated actor; this middleware does not authenticate JWTs itself.
 * Side Effects: Writes only a tenant UUID that has been verified against the master registry into request context.
 * AI Notes: Never bypass findActiveById and never trust a raw header as a database selector.
 */
@Injectable()
export class LandingTenantResolutionMiddleware implements NestMiddleware {
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-resolution.middleware.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly requestContext: LandingRequestContextService,
    private readonly config: ConfigService,
    private readonly tenantRepository: LandingMasterTenantRepository,
  ) {}

  /**
   * @description Validates UUID syntax before any tenant registry lookup or DataSource selection.
   * @param value - Candidate tenant identifier received from the request boundary.
   * @returns True when the candidate matches the supported UUID representation.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-resolution.middleware.isUuid at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private isUuid(value: string): boolean {
    return UUID_PATTERN.test(value);
  }

  /**
   * @description Resolves the trusted tenant for this request and rejects untrusted tenant selection.
   * @param request - Incoming HTTP request carrying optional tenant/test headers.
   * @param _response - Express response object, unused by the resolver.
   * @param next - Middleware continuation callback.
   * @returns Resolves after tenant context is set or the request is rejected through next.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-resolution.middleware.use at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async use(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const path = request.path;
    if (/\/(?:health\/live|health\/ready|health\/deep|metrics|docs)(?:\/|$)/.test(path)) { next(); return; }
    const nodeEnv = this.config.getOrThrow<string>('app.nodeEnv');
    if (nodeEnv === 'test' && /\/test\/tenants(?:\/|$)/.test(path)) { next(); return; }

    const publicTenantId = this.config.getOrThrow<string>('app.publicTenantId');
    const suppliedTenant = request.header('x-tenant-id')?.trim();
    if (suppliedTenant && !this.isUuid(suppliedTenant)) {
      next(new ForbiddenException('Tenant access is not authorized.'));
      return;
    }

    // Test-only E2E path: the bootstrap token plus a real active tenant ID are required.
    // This branch is unreachable outside NODE_ENV=test and therefore cannot weaken production tenant isolation.
    if (nodeEnv === 'test' && suppliedTenant) {
      const bootstrapToken = request.header('x-test-bootstrap-token')?.trim();
      const expectedBootstrapToken = this.config.get<string>('app.e2eBootstrapToken');
      if (bootstrapToken && expectedBootstrapToken && bootstrapToken === expectedBootstrapToken) {
        const testTenant = await this.tenantRepository.findActiveById(suppliedTenant);
        if (!testTenant) {
          next(new ForbiddenException('Test tenant access is not authorized.'));
          return;
        }
        this.requestContext.setTenantId(testTenant.id);
        next();
        return;
      }
    }
    const isPublicLanding = /\/api(?:\/v\d+)?\/landing\/(?:booking|bookings|contact)$/.test(path);
    const actor = (request as AuthenticatedRequest).user;

    if (isPublicLanding) {
      if (suppliedTenant && suppliedTenant !== publicTenantId) { next(new ForbiddenException('Public Landing traffic cannot select another tenant.')); return; }
      const tenant = await this.tenantRepository.findActiveById(publicTenantId);
      if (!tenant) { next(new ForbiddenException('Configured public tenant is not active.')); return; }
      this.requestContext.setTenantId(tenant.id);
      next();
      return;
    }

    const authorizedTenantIds = actor?.tenantIds ?? (actor?.tenantId ? [actor.tenantId] : []);
    if (!suppliedTenant && authorizedTenantIds.length !== 1) { next(new ForbiddenException('An authenticated tenant context is required.')); return; }
    const candidate = suppliedTenant ?? authorizedTenantIds[0];
    if (!candidate || !authorizedTenantIds.includes(candidate)) { next(new ForbiddenException('Tenant access is not authorized.')); return; }
    const tenant = await this.tenantRepository.findActiveById(candidate);
    if (!tenant) { next(new ForbiddenException('Tenant access is not authorized.')); return; }
    this.requestContext.setTenantId(tenant.id);
    next();
  }
}
