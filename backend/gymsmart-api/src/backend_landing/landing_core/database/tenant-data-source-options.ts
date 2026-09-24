// RESPONSIBILITY: Builds tenant-specific PostgreSQL TypeORM options without exposing ORM details to business services.
// FLOW: Trusted Tenant â†’ TenantDataSourceManager â†’ TypeORM DataSource.
import { join } from 'node:path';

import { DATABASE_CONFIG } from '@/backend_landing/landing_core/config/database.config';

import { CoreIdempotencyRecordEntity } from '@/backend_landing/landing_core/landing_idempotency/core-idempotency-record.entity';

import { LandingBookingEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-booking.entity';

import { LandingContactEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-contact.entity';

import { LandingAuditLogEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-audit-log.entity';

import { DataSourceOptions } from 'typeorm';


/** @description Builds tenant-specific PostgreSQL TypeORM options for one trusted database. @param databaseName - Tenant database name from the master registry. @returns Tenant DataSource configuration. */
export function buildTenantDataSourceOptions(databaseName: string): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.MASTER_DB_HOST ?? 'localhost',
    port: Number(process.env.MASTER_DB_PORT ?? 5432),
    username: process.env.MASTER_DB_USER ?? 'postgres',
    password: process.env.MASTER_DB_PASSWORD ?? 'postgres',
    database: databaseName,
    entities: [
      LandingBookingEntity,
      LandingContactEntity,
      LandingAuditLogEntity,
      CoreIdempotencyRecordEntity,
    ],
    migrations: [join(__dirname, 'migrations/tenant/*.{js,ts}')],
    synchronize: false,
    logging: false,
    extra: {
      max: DATABASE_CONFIG.tenant.max,
      connectionTimeoutMillis: DATABASE_CONFIG.tenant.acquireTimeoutMs,
      idleTimeoutMillis: DATABASE_CONFIG.tenant.idleTimeoutMs,
      statement_timeout: DATABASE_CONFIG.tenant.acquireTimeoutMs,
    },
  };
}
