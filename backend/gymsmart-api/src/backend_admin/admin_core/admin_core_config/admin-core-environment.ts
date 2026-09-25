// RESPONSIBILITY: Reads process environment exactly once at the infrastructure boundary and exposes typed configuration inputs to CLI/bootstrap code.
// FLOW: Process environment -> readAdminCoreEnvironment() -> Nest Config/DataSource/seed/OpenTelemetry bootstrap consumers.

export interface AdminCoreEnvironmentValues {
  PORT?: string;
  NODE_ENV?: string;
  CORS_ALLOWED_ORIGINS?: string;
  JWT_ACCESS_SECRET?: string;
  JWT_REFRESH_SECRET?: string;
  DATA_ENCRYPTION_KEY?: string;
  REDIS_URL?: string;
  MASTER_DB_HOST?: string;
  MASTER_DB_PORT?: string;
  MASTER_DB_USER?: string;
  MASTER_DB_PASSWORD?: string;
  MASTER_DB_NAME?: string;
  TENANT_DB_HOST?: string;
  TENANT_DB_PORT?: string;
  TENANT_DB_USER?: string;
  TENANT_DB_PASSWORD?: string;
  TENANT_DB_FALLBACK?: string;
  TENANT_DB_POOL_MAX?: string;
  TENANT_DB_POOL_BUDGET?: string;
  TENANT_DB_ADMIN_DATABASE?: string;
  STORAGE_ROOT?: string;
  OTEL_SERVICE_NAME?: string;
  OTEL_EXPORTER_OTLP_ENDPOINT?: string;
  SEED_TENANT_ID?: string;
  SEED_TENANT_NAME?: string;
  SEED_TENANT_SLUG?: string;
  SEED_TENANT_DATABASE?: string;
  SEED_ADMIN_EMAIL?: string;
  SEED_ADMIN_PASSWORD?: string;
}

/**
 * @description Returns the raw environment values needed by Admin infrastructure and CLI bootstrap code.
 * @returns A readonly-shaped environment value object for centralized configuration consumers.
 * @remarks This is the only authored Admin source that reads process.env directly; business modules consume Nest ConfigService instead.
 */
export function readAdminCoreEnvironment(): AdminCoreEnvironmentValues {
  return {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    DATA_ENCRYPTION_KEY: process.env.DATA_ENCRYPTION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    MASTER_DB_HOST: process.env.MASTER_DB_HOST,
    MASTER_DB_PORT: process.env.MASTER_DB_PORT,
    MASTER_DB_USER: process.env.MASTER_DB_USER,
    MASTER_DB_PASSWORD: process.env.MASTER_DB_PASSWORD,
    MASTER_DB_NAME: process.env.MASTER_DB_NAME,
    TENANT_DB_HOST: process.env.TENANT_DB_HOST,
    TENANT_DB_PORT: process.env.TENANT_DB_PORT,
    TENANT_DB_USER: process.env.TENANT_DB_USER,
    TENANT_DB_PASSWORD: process.env.TENANT_DB_PASSWORD,
    TENANT_DB_FALLBACK: process.env.TENANT_DB_FALLBACK,
    TENANT_DB_POOL_MAX: process.env.TENANT_DB_POOL_MAX,
    TENANT_DB_POOL_BUDGET: process.env.TENANT_DB_POOL_BUDGET,
    TENANT_DB_ADMIN_DATABASE: process.env.TENANT_DB_ADMIN_DATABASE,
    STORAGE_ROOT: process.env.STORAGE_ROOT,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    SEED_TENANT_ID: process.env.SEED_TENANT_ID,
    SEED_TENANT_NAME: process.env.SEED_TENANT_NAME,
    SEED_TENANT_SLUG: process.env.SEED_TENANT_SLUG,
    SEED_TENANT_DATABASE: process.env.SEED_TENANT_DATABASE,
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  };
}
