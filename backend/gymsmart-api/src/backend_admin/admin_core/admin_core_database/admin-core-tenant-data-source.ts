// RESPONSIBILITY: CLI DataSource for the seeded default tenant database migrations.
// FLOW: CLI â†’ environment tenant DB â†’ TypeORM DataSource â†’ tenant migrations.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment'
import { AdminCoreTenantEntityRegistry } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-entity-registry'

const env = readAdminCoreEnvironment();

export default new DataSource({
  type: 'postgres',
  host: env.TENANT_DB_HOST ?? 'localhost',
  port: Number(env.TENANT_DB_PORT ?? 5432),
  username: env.TENANT_DB_USER ?? 'postgres',
  password: env.TENANT_DB_PASSWORD ?? '',
  database: env.TENANT_DB_FALLBACK ?? env.SEED_TENANT_DATABASE ?? 'buildronix_tenant_default',
  entities: AdminCoreTenantEntityRegistry,
  migrations: [join(__dirname, 'admin_core_migrations/admin_core_tenant/*{.js,.ts}')],
  synchronize: true,
  extra: { max: 20, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000, statement_timeout: 3000 },
});
