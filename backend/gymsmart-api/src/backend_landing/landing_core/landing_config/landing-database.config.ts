// RESPONSIBILITY: Defines validated PostgreSQL pool settings consumed by master and tenant DataSource factories.
// FLOW: ConfigService -> LandingDatabaseConfig -> TypeORM DataSource options.
import type { ConfigService } from '@nestjs/config';

export interface LandingDatabasePoolConfig {
  readonly masterMax: number;
  readonly tenantMax: number;
  readonly masterAcquireTimeoutMs: number;
  readonly tenantAcquireTimeoutMs: number;
  readonly masterIdleTimeoutMs: number;
  readonly tenantIdleTimeoutMs: number;
  readonly totalTenantMax: number;
}

/**
 * Intent: Centralize all database-pool limits so the master and tenant connection factories share one validated policy.
 * Edge Cases: Invalid or missing numeric configuration is rejected by the application configuration validator before this function is used.
 * Side Effects: None; this function only reads ConfigService state.
 * AI Notes: Do not bypass ConfigService here. DataSource factories must receive validated configuration explicitly.
 */
export function getLandingDatabasePoolConfig(config: ConfigService): LandingDatabasePoolConfig {
  return {
    masterMax: config.getOrThrow<number>('landing.database.masterMax'),
    tenantMax: config.getOrThrow<number>('landing.database.tenantMax'),
    masterAcquireTimeoutMs: config.getOrThrow<number>('landing.database.masterAcquireTimeoutMs'),
    tenantAcquireTimeoutMs: config.getOrThrow<number>('landing.database.tenantAcquireTimeoutMs'),
    masterIdleTimeoutMs: config.getOrThrow<number>('landing.database.masterIdleTimeoutMs'),
    tenantIdleTimeoutMs: config.getOrThrow<number>('landing.database.tenantIdleTimeoutMs'),
    totalTenantMax: config.getOrThrow<number>('landing.database.totalTenantMax'),
  };
}
