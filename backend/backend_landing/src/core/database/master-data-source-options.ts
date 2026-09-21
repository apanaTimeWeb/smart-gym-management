// RESPONSIBILITY: Builds the master PostgreSQL TypeORM DataSource options and explicit pool policy.
// FLOW: Environment → master DataSource options → TypeORM.
import { join } from 'node:path';
import type { DataSourceOptions } from 'typeorm';
import { DATABASE_CONFIG } from '@/core/config/database.config';
import { MasterTenantEntity } from '@/core/tenant/master-tenant.entity';

/** @description Builds the master PostgreSQL TypeORM options from validated process configuration. @returns Master DataSource configuration. */
export function buildMasterDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.MASTER_DB_HOST ?? 'localhost',
    port: Number(process.env.MASTER_DB_PORT ?? 5432),
    username: process.env.MASTER_DB_USER ?? 'postgres',
    password: process.env.MASTER_DB_PASSWORD ?? 'postgres',
    database: process.env.MASTER_DB_NAME ?? 'gym_smart_master',
    entities: [MasterTenantEntity],
    migrations: [join(__dirname, 'migrations/master/*.{js,ts}')],
    synchronize: false,
    logging: false,
    extra: {
      max: DATABASE_CONFIG.master.max,
      connectionTimeoutMillis: DATABASE_CONFIG.master.acquireTimeoutMs,
      idleTimeoutMillis: DATABASE_CONFIG.master.idleTimeoutMs,
      statement_timeout: DATABASE_CONFIG.master.acquireTimeoutMs,
    },
  };
}
