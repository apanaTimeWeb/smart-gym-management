// RESPONSIBILITY: Provides explicit PostgreSQL connection-pool settings.
// FLOW: ConfigService → CoreDatabaseConfig → TypeORM DataSource options.

import { registerAs } from '@nestjs/config';

export const CoreDatabaseConfig = registerAs('database', () => ({
  host: process.env.MASTER_DB_HOST ?? 'localhost',
  port: Number(process.env.MASTER_DB_PORT ?? 5432),
  user: process.env.MASTER_DB_USER ?? 'postgres',
  masterDatabase: process.env.MASTER_DB_NAME ?? 'buildronix_master',
  masterPassword: process.env.MASTER_DB_PASSWORD ?? '',
  tenantHost: process.env.TENANT_DB_HOST ?? process.env.MASTER_DB_HOST ?? 'localhost',
  tenantPort: Number(process.env.TENANT_DB_PORT ?? process.env.MASTER_DB_PORT ?? 5432),
  tenantUser: process.env.TENANT_DB_USER ?? process.env.MASTER_DB_USER ?? 'postgres',
  tenantPassword: process.env.TENANT_DB_PASSWORD ?? process.env.MASTER_DB_PASSWORD ?? '',
  poolMax: 20,
  acquireTimeoutMs: 30_000,
  idleTimeoutMs: 10_000,
}));
