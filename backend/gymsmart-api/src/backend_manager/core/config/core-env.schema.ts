// RESPONSIBILITY: Fail-fast startup configuration schema for Manager backend infrastructure.
// FLOW: Environment -> Zod schema -> ConfigModule -> CoreConfigService.
import { z } from 'zod';

export const CoreEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  MASTER_DATABASE_URL: z.string().url(),
  TENANT_DB_HOST: z.string().min(1),
  TENANT_DB_PORT: z.coerce.number().int().min(1).max(65535),
  TENANT_DB_USER: z.string().min(1),
  TENANT_DB_PASSWORD: z.string().min(1),
  TENANT_DB_PREFIX: z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/).default('tenant_manager_'),
  TENANT_DB_MAX_CACHED: z.coerce.number().int().min(1).max(200).default(25),
  TENANT_DB_POOL_BUDGET: z.coerce.number().int().min(1).max(500).default(100),
  TENANT_DB_IDLE_TIMEOUT_MS: z.coerce.number().int().min(1000).max(600000).default(30000),
  TENANT_DB_ACQUIRE_TIMEOUT_MS: z.coerce.number().int().min(1000).max(60000).default(3000),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  TRUSTED_FRONTEND_ORIGINS: z.string().min(1),
  DATA_ENCRYPTION_KEY_BASE64: z.string().base64().length(44),
});
