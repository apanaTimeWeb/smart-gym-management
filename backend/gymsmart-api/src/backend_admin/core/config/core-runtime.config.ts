// RESPONSIBILITY: Provides validated runtime configuration to infrastructure and application boundaries without raw environment reads in business logic.
// FLOW: ConfigModule validation â†’ CoreRuntimeConfig â†’ infra providers/controllers.

import { registerAs } from '@nestjs/config';

export const CoreRuntimeConfig = registerAs('runtime', () => ({
  port: Number(process.env.PORT ?? 3000),
  apiPrefix: 'api/v1',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsAllowedOrigins: (process.env.CORS_ALLOWED_ORIGINS ?? '').split(',').map((value) => value.trim()).filter(Boolean),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
  dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY ?? '',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  tenantHost: process.env.TENANT_DB_HOST ?? process.env.MASTER_DB_HOST ?? 'localhost',
  tenantPort: Number(process.env.TENANT_DB_PORT ?? process.env.MASTER_DB_PORT ?? 5432),
  tenantUser: process.env.TENANT_DB_USER ?? process.env.MASTER_DB_USER ?? 'postgres',
  tenantPassword: process.env.TENANT_DB_PASSWORD ?? process.env.MASTER_DB_PASSWORD ?? '',
  tenantPoolMax: Number(process.env.TENANT_DB_POOL_MAX ?? 5),
}));
