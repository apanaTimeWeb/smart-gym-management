// RESPONSIBILITY: Builds master PostgreSQL TypeORM options from validated application configuration.
// FLOW: ConfigService -> LandingMasterDataSourceOptions -> TypeORM master DataSource.
import { join } from 'node:path';

import { LandingMasterTenantEntity } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.entity';

import type { LandingDatabasePoolConfig } from '@/backend_landing/landing_core/landing_config/landing-database.config';
import type { DataSourceOptions } from 'typeorm';

/**
 * Intent: Define the only master-database DataSource options used by the role-scoped application bootstrap and tenant provisioning utilities.
 * Edge Cases: synchronize is permanently disabled; migrations are the sole schema change mechanism.
 * Side Effects: None.
 * AI Notes: Never add a second ORM or read raw environment variables here.
 */
export function buildMasterDataSourceOptions(
  masterDb: { host: string; port: number; database: string; username: string; password: string },
  pool: LandingDatabasePoolConfig,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: masterDb.host,
    port: masterDb.port,
    username: masterDb.username,
    password: masterDb.password,
    database: masterDb.database,
    entities: [LandingMasterTenantEntity],
    migrations: [join(__dirname, 'landing_migrations/landing_migrations_master/*.{js,ts}')],
    synchronize: false,
    logging: false,
    extra: {
      max: pool.masterMax,
      connectionTimeoutMillis: pool.masterAcquireTimeoutMs,
      idleTimeoutMillis: pool.masterIdleTimeoutMs,
      statement_timeout: pool.masterAcquireTimeoutMs,
    },
  };
}
