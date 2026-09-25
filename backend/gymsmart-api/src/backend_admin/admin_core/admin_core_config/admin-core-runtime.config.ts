// RESPONSIBILITY: Provides validated application runtime configuration behind ConfigService.
// FLOW: Centralized environment reader -> ConfigModule -> runtime namespace -> core infrastructure/services.
import { registerAs } from '@nestjs/config';

import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment'

/**
 * @description Registers runtime configuration values used by the Admin application.
 * @returns Nest Config registration for the `runtime` namespace.
 * @remarks Raw environment access is centralized in the environment adapter so business code never reads operating-system variables directly.
 */
export const AdminCoreRuntimeConfig = registerAs('runtime', () => {
  const env = readAdminCoreEnvironment();
  return {
    port: Number(env.PORT ?? 3000),
    apiPrefix: 'api/v1',
    nodeEnv: env.NODE_ENV ?? 'development',
    corsAllowedOrigins: (env.CORS_ALLOWED_ORIGINS ?? '').split(',').map((value) => value.trim()).filter(Boolean),
    jwtAccessSecret: env.JWT_ACCESS_SECRET ?? '',
    jwtRefreshSecret: env.JWT_REFRESH_SECRET ?? '',
    dataEncryptionKey: env.DATA_ENCRYPTION_KEY ?? '',
    redisUrl: env.REDIS_URL ?? 'redis://localhost:6379',
    tenantHost: env.TENANT_DB_HOST ?? env.MASTER_DB_HOST ?? 'localhost',
    tenantPort: Number(env.TENANT_DB_PORT ?? env.MASTER_DB_PORT ?? 5432),
    tenantUser: env.TENANT_DB_USER ?? env.MASTER_DB_USER ?? 'postgres',
    tenantPassword: env.TENANT_DB_PASSWORD ?? env.MASTER_DB_PASSWORD ?? '',
    tenantPoolMax: Number(env.TENANT_DB_POOL_MAX ?? 5),
    tenantPoolBudget: Number(env.TENANT_DB_POOL_BUDGET ?? 20),
    objectStorageRoot: env.STORAGE_ROOT ?? 'storage/objects',
  };
});
