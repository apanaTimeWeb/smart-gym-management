// RESPONSIBILITY: Builds tenant PostgreSQL TypeORM options from trusted tenant database identity and validated connection configuration.
// FLOW: Trusted tenant registry -> LandingTenantDataSourceManager -> Tenant DataSource.
import { join } from 'node:path';

import { LandingIdempotencyRecordEntity } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.entity';

import { LandingBookingEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-booking.entity';
import { LandingContactEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-contact.entity';
import { LandingAuditLogEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-audit-log.entity';

import type { LandingDatabasePoolConfig } from '@/backend_landing/landing_core/landing_config/landing-database.config';
import type { DataSourceOptions } from 'typeorm';

/**
 * Intent: Keep dynamic tenant connection routing isolated from business services while ensuring every tenant uses the same schema/migration set.
 * Edge Cases: The database name is taken only from the trusted master tenant registry and is never accepted directly from a client.
 * Side Effects: None; DataSource creation is performed by the manager.
 * AI Notes: Keep synchronize=false and never add row-level tenant filtering to compensate for database-per-tenant isolation.
 */
export function buildTenantDataSourceOptions(
  databaseName: string,
  masterDb: { host: string; port: number; username: string; password: string },
  pool: LandingDatabasePoolConfig,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: masterDb.host,
    port: masterDb.port,
    username: masterDb.username,
    password: masterDb.password,
    database: databaseName,
    entities: [LandingBookingEntity, LandingContactEntity, LandingAuditLogEntity, LandingIdempotencyRecordEntity],
    migrations: [join(__dirname, 'landing_migrations/landing_migrations_tenant/*.{js,ts}')],
    synchronize: false,
    logging: false,
    extra: {
      max: pool.tenantMax,
      connectionTimeoutMillis: pool.tenantAcquireTimeoutMs,
      idleTimeoutMillis: pool.tenantIdleTimeoutMs,
      statement_timeout: pool.tenantAcquireTimeoutMs,
    },
  };
}
