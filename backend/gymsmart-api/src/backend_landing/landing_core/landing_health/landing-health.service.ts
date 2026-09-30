// RESPONSIBILITY: Checks process, master PostgreSQL, Redis, and configured tenant dependency health.
// FLOW: LandingHealthController â†’ LandingHealthService â†’ master DB/Redis/tenant DataSource.
import { Injectable } from '@nestjs/common';

import { LandingRedisService } from '@/backend_landing/landing_core/landing_redis/landing-redis.service';
import { LandingTenantContextService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-context.service';

import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

/**
 * Intent: Defines the LandingHealthService class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing health service boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingHealthService {
  
  /**
   * Intent: Preserve the single responsibility of landing-health.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    @InjectDataSource() private readonly masterDataSource: DataSource,
    private readonly redis: LandingRedisService,
    private readonly tenantContext: LandingTenantContextService,
  ) {}

  /** @description Reports process liveness without touching dependencies. @returns Liveness status. */
  
  /**
   * Intent: Preserve the single responsibility of landing-health.service.checkLive at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
checkLive(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /** @description Verifies master PostgreSQL and Redis readiness. @returns Readiness status. */
  
  /**
   * Intent: Preserve the single responsibility of landing-health.service.checkReady at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async checkReady(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up' }> {
    await this.masterDataSource.query('SELECT 1');
    await this.redis.ping();
    return { status: 'ok', postgres: 'up', redis: 'up' };
  }

  /** @description Verifies master dependencies and the configured tenant database. @returns Deep dependency status. */
  
  /**
   * Intent: Preserve the single responsibility of landing-health.service.checkDeep at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async checkDeep(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up'; tenantDatabase: 'up' }> {
    await this.checkReady();
    const tenantDataSource = await this.tenantContext.resolveTenantDataSource();
    await tenantDataSource.query('SELECT 1');
    return { status: 'ok', postgres: 'up', redis: 'up', tenantDatabase: 'up' };
  }
}
