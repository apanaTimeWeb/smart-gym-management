// RESPONSIBILITY: Builds tenant-specific PostgreSQL TypeORM options without exposing ORM details to business services.
// FLOW: Trusted Tenant → TenantDataSourceManager → TypeORM DataSource.
import { join } from 'node:path';
import type { DataSourceOptions } from 'typeorm';
import { DATABASE_CONFIG } from '@/core/config/database.config';
import { LandingBookingEntity } from '@/modules/landing/entities/landing-booking.entity';
import { LandingContactEntity } from '@/modules/landing/entities/landing-contact.entity';
import { LandingAuditLogEntity } from '@/modules/landing/entities/landing-audit-log.entity';

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
