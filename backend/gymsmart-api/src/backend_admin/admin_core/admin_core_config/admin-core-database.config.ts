// RESPONSIBILITY: Provides explicit PostgreSQL connection-pool settings for the master and tenant database boundaries.
// FLOW: Centralized environment reader -> AdminCoreDatabaseConfig -> TypeORM DataSource options.
import { registerAs } from '@nestjs/config';

import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment';

/**
 * @description Registers PostgreSQL connection and pool settings for master and tenant infrastructure.
 * @returns Nest Config registration for the `database` namespace.
 * @remarks Pool settings are bounded globally by tenant DataSource management.
 */
export const AdminCoreDatabaseConfig = registerAs('database', () => {
  const env = readAdminCoreEnvironment();
  return {
    host: env.MASTER_DB_HOST ?? 'localhost',
    port: Number(env.MASTER_DB_PORT ?? 5432),
    user: env.MASTER_DB_USER ?? 'postgres',
    masterDatabase: env.MASTER_DB_NAME ?? 'buildronix_master',
    masterPassword: env.MASTER_DB_PASSWORD ?? '',
    tenantHost: env.TENANT_DB_HOST ?? env.MASTER_DB_HOST ?? 'localhost',
    tenantPort: Number(env.TENANT_DB_PORT ?? env.MASTER_DB_PORT ?? 5432),
    tenantUser: env.TENANT_DB_USER ?? env.MASTER_DB_USER ?? 'postgres',
    tenantPassword: env.TENANT_DB_PASSWORD ?? env.MASTER_DB_PASSWORD ?? '',
    poolMax: 20,
    acquireTimeoutMs: 30_000,
    idleTimeoutMs: 10_000,
  };
});
