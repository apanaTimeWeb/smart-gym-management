// RESPONSIBILITY: CLI DataSource for the seeded default tenant database migrations.
// FLOW: CLI → environment tenant DB → TypeORM DataSource → tenant migrations.

import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CoreTenantEntityRegistry } from '@/core/database/core-tenant-entity-registry';

export default new DataSource({
  type: 'postgres',
  host: process.env.TENANT_DB_HOST ?? 'localhost',
  port: Number(process.env.TENANT_DB_PORT ?? 5432),
  username: process.env.TENANT_DB_USER ?? 'postgres',
  password: process.env.TENANT_DB_PASSWORD ?? '',
  database: process.env.TENANT_DB_FALLBACK ?? 'buildronix_tenant_default',
  entities: CoreTenantEntityRegistry,
  migrations: ['src/core/database/migrations/tenant/*.ts'],
  synchronize: false,
  extra: { max: 20, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000, statement_timeout: 3000 },
});
