// RESPONSIBILITY: Validates and normalizes process configuration before application startup.
// FLOW: Environment → buildValidatedConfig → ConfigModule → consumers.
import { registerAs } from '@nestjs/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function integer(name: string, fallback: string): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer.`);
  return value;
}

export const buildValidatedConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: integer('PORT', '3000'),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  apiVersion: process.env.API_VERSION ?? '1',
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(',').map((value) => value.trim()),
  masterDb: {
    host: required('MASTER_DB_HOST'),
    port: integer('MASTER_DB_PORT', '5432'),
    database: required('MASTER_DB_NAME'),
    username: required('MASTER_DB_USER'),
    password: required('MASTER_DB_PASSWORD'),
  },
  redis: {
    url: required('REDIS_URL'),
    connectTimeoutMs: integer('REDIS_CONNECT_TIMEOUT_MS', '10000'),
  },
  publicTenantId: required('PUBLIC_TENANT_ID'),
  publicTenantSlug: required('PUBLIC_TENANT_SLUG'),
  publicTenantName: required('PUBLIC_TENANT_NAME'),
  healthDeepToken: required('HEALTH_DEEP_TOKEN'),
  e2eBootstrapToken: (process.env.NODE_ENV ?? 'development') === 'test' ? required('E2E_BOOTSTRAP_TOKEN') : undefined,
}));
