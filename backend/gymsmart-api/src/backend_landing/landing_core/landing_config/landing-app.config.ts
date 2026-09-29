// RESPONSIBILITY: Validates and normalizes process configuration before application startup.
// FLOW: Environment -> ConfigModule validation -> buildValidatedConfig -> ConfigService consumers.
import { registerAs } from '@nestjs/config';

/**
 * @description Reads one required environment variable at the configuration boundary.
 * @param name - Environment variable name.
 * @returns Non-empty environment value.
 * @throws Error when the value is missing or empty.
 */

  /**
   * Intent: Preserve the single responsibility of landing-app.config.required at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/**
 * @description Converts one environment numeric setting into a strictly positive integer.
 * @param name - Environment variable name.
 * @param fallback - Default string value when the variable is absent.
 * @returns Positive integer configuration value.
 * @throws Error when the resulting value is not a positive integer.
 */

  /**
   * Intent: Preserve the single responsibility of landing-app.config.integer at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
function integer(name: string, fallback: string): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer.`);
  return value;
}

/**
 * @description Validates all environment variables required by the supplied Landing role before module startup.
 * @param env - Raw Nest configuration environment map.
 * @returns The same environment map after validation.
 * @throws Error when a required variable or numeric setting is invalid.
 */

  /**
   * Intent: Preserve the single responsibility of landing-app.config.validateLandingEnvironment at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
export function validateLandingEnvironment(env: Record<string, unknown>): Record<string, unknown> {
  const requiredNames = [
    'MASTER_DB_HOST', 'MASTER_DB_NAME', 'MASTER_DB_USER', 'MASTER_DB_PASSWORD',
    'REDIS_URL', 'PUBLIC_TENANT_ID', 'PUBLIC_TENANT_SLUG', 'PUBLIC_TENANT_NAME', 'HEALTH_DEEP_TOKEN',
  ];
  if (String(env.NODE_ENV ?? 'development') === 'test') requiredNames.push('E2E_BOOTSTRAP_TOKEN');
  for (const name of requiredNames) required(name);
  for (const name of ['PORT', 'MASTER_DB_PORT', 'REDIS_CONNECT_TIMEOUT_MS', 'DB_POOL_MAX', 'DB_ACQUIRE_TIMEOUT_MS', 'DB_IDLE_TIMEOUT_MS', 'DB_TOTAL_TENANT_POOL_MAX']) {
    if (env[name] !== undefined) {
      const value = Number(env[name]);
      if (!Number.isInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer.`);
    }
  }
  return env;
}

export const buildValidatedConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: integer('PORT', '3000'),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  apiVersion: process.env.API_VERSION ?? '1',
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(',').map((value) => value.trim()).filter(Boolean),
  rateLimit: {
    enabled: (process.env.DEFAULT_RATE_LIMIT_ENABLED ?? 'true') !== 'false',
  },
  database: {
    masterMax: integer('DB_POOL_MAX', '10'),
    tenantMax: integer('DB_TENANT_POOL_MAX', '5'),
    masterAcquireTimeoutMs: integer('DB_ACQUIRE_TIMEOUT_MS', '30000'),
    tenantAcquireTimeoutMs: integer('DB_TENANT_ACQUIRE_TIMEOUT_MS', process.env.DB_ACQUIRE_TIMEOUT_MS ?? '30000'),
    masterIdleTimeoutMs: integer('DB_IDLE_TIMEOUT_MS', '10000'),
    tenantIdleTimeoutMs: integer('DB_TENANT_IDLE_TIMEOUT_MS', process.env.DB_IDLE_TIMEOUT_MS ?? '10000'),
    totalTenantMax: integer('DB_TOTAL_TENANT_POOL_MAX', '40'),
  },
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
