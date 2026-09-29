// RESPONSIBILITY: Resolves the active request tenant into its isolated PostgreSQL DataSource.
// FLOW: Trusted request context -> master tenant registry -> tenant DataSource manager.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';
import { LandingMasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.repository';
import { LandingTenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-data-source-manager.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

import type { DataSource } from 'typeorm';

/**
 * Intent: Convert trusted tenant identity into the only tenant database connection permitted for the current request.
 * Edge Cases: Missing or inactive tenants fail closed before any tenant query is executed.
 * Side Effects: May initialize a bounded tenant DataSource through the manager.
 * AI Notes: Business services must never construct DataSource instances directly.
 */
@Injectable()
export class LandingTenantContextService {
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-context.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly requestContext: LandingRequestContextService,
    private readonly tenantRepository: LandingMasterTenantRepository,
    private readonly dataSourceManager: LandingTenantDataSourceManagerService,
  ) {}

  /**
   * Intent: Resolve the request's trusted tenant database for transactional work.
   * Edge Cases: No tenant context or an inactive tenant produces 403 rather than falling back to any database.
   * Side Effects: The DataSource manager may create a bounded connection pool.
   * AI Notes: Do not accept a client-supplied database name.
   */
  async resolveTenantDataSource(): Promise<DataSource> {
    const tenantId = this.requestContext.get().tenantId;
    if (!tenantId) {
      throw new ForbiddenException({
        message: CORE_ERROR_MESSAGES.TENANT_CONTEXT_REQUIRED,
        error: 'TENANT_CONTEXT_REQUIRED',
        errorCode: 'CORE.TENANT.CONTEXT_REQUIRED',
      });
    }
    const tenant = await this.tenantRepository.findActiveById(tenantId);
    if (!tenant) {
      throw new ForbiddenException({
        message: CORE_ERROR_MESSAGES.TENANT_ACCESS_DENIED,
        error: 'TENANT_ACCESS_DENIED',
        errorCode: 'CORE.TENANT.ACCESS_DENIED',
      });
    }
    return this.dataSourceManager.getOrCreate(tenant);
  }
}
