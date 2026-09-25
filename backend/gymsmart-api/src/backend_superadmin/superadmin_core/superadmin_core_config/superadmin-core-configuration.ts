// RESPONSIBILITY: Validates and exposes strongly typed application configuration.
// FLOW: process.env -> Zod schema -> ConfigService -> infrastructure consumers.
import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import { SuperadminCoreConfigurationException } from '@/backend_superadmin/superadmin_core/superadmin-core.exceptions';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  DEFAULT_CURRENCY: z.string().regex(/^[A-Z]{3}$/).default('INR'),
  LOG_LEVEL: z.string().default('info'),
  DATABASE_POOL_MAX: z.coerce.number().int().positive().max(100).default(20),
  DATABASE_ACQUIRE_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  DATABASE_IDLE_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  DATABASE_STATEMENT_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  TENANT_POOL_BUDGET: z.coerce.number().int().positive().max(100).default(10),
  TENANT_POOL_MAX_PER_DATABASE: z.coerce.number().int().positive().max(10).default(1),
  MASTER_DATABASE_NAME: z.string().default('gymsmart_master'),
  TENANT_DATABASE_PREFIX: z.string().default('tenant_db_'),
  ENCRYPTION_KEY_BASE64: z.string().min(44),
  SEED_SUPERADMIN_EMAIL: z.string().email().optional(),
  SEED_SUPERADMIN_PASSWORD: z.string().min(16).optional(),
  EXPORT_STORAGE_PATH: z.string().default('/tmp/gymsmart-exports'),
  EXPORT_DOWNLOAD_TTL_HOURS: z.coerce.number().int().min(24).max(48).default(24),
  EXPORT_DOWNLOAD_SECRET: z.string().min(32).optional(),
  EXPORT_EMAIL_WEBHOOK_URL: z.string().url().optional(),
  EXPORT_WHATSAPP_WEBHOOK_URL: z.string().url().optional(),
  INVOICE_EMAIL_WEBHOOK_URL: z.string().url().optional(),
  BACKUP_STORAGE_PATH: z.string().default('/tmp/gymsmart-backups'),
  BACKUP_DOWNLOAD_TTL_HOURS: z.coerce.number().int().min(24).max(48).default(24),
  PG_DUMP_BIN: z.string().default('pg_dump'),
  PG_RESTORE_BIN: z.string().default('pg_restore'),
});

export function validateEnvironment(config: Record<string, unknown>): Record<string, unknown> {
  const parsed = environmentSchema.parse(config);
  if (parsed.NODE_ENV === 'production' && parsed.SEED_SUPERADMIN_PASSWORD) {
    throw new SuperadminCoreConfigurationException('SEED_SUPERADMIN_PASSWORD must not be configured in production. Provision admin access through the approved secret-management flow.');
  }
  if (parsed.NODE_ENV !== 'production' && !parsed.SEED_SUPERADMIN_PASSWORD) {
    throw new SuperadminCoreConfigurationException('SEED_SUPERADMIN_PASSWORD is required for development/test seed operations.');
  }
  return parsed;
}

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  redisUrl: process.env.REDIS_URL ?? '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL ?? '7d',
  defaultCurrency: (process.env.DEFAULT_CURRENCY ?? 'INR').toUpperCase(),
  corsOrigins: (process.env.CORS_ORIGINS ?? '').split(',').map((value: string) => value.trim()).filter((value: string) => value.length > 0),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  databasePoolMax: Number(process.env.DATABASE_POOL_MAX ?? 20),
  databaseAcquireTimeoutMs: Number(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? 30000),
  databaseIdleTimeoutMs: Number(process.env.DATABASE_IDLE_TIMEOUT_MS ?? 10000),
  databaseStatementTimeoutMs: Number(process.env.DATABASE_STATEMENT_TIMEOUT_MS ?? 30000),
  tenantPoolBudget: Number(process.env.TENANT_POOL_BUDGET ?? 10),
  tenantPoolMaxPerDatabase: Number(process.env.TENANT_POOL_MAX_PER_DATABASE ?? 1),
  masterDatabaseName: process.env.MASTER_DATABASE_NAME ?? 'gymsmart_master',
  tenantDatabasePrefix: process.env.TENANT_DATABASE_PREFIX ?? 'tenant_db_',
  encryptionKeyBase64: process.env.ENCRYPTION_KEY_BASE64 ?? '',
  seedSuperadminEmail: process.env.SEED_SUPERADMIN_EMAIL ?? 'admin@gymsmart.local',
  seedSuperadminPassword: process.env.SEED_SUPERADMIN_PASSWORD ?? '',
  exportStoragePath: process.env.EXPORT_STORAGE_PATH ?? '/tmp/gymsmart-exports',
  exportDownloadTtlHours: Number(process.env.EXPORT_DOWNLOAD_TTL_HOURS ?? 24),
  exportDownloadSecret: process.env.EXPORT_DOWNLOAD_SECRET ?? '',
  exportEmailWebhookUrl: process.env.EXPORT_EMAIL_WEBHOOK_URL ?? '',
  exportWhatsappWebhookUrl: process.env.EXPORT_WHATSAPP_WEBHOOK_URL ?? '',
  invoiceEmailWebhookUrl: process.env.INVOICE_EMAIL_WEBHOOK_URL ?? process.env.EXPORT_EMAIL_WEBHOOK_URL ?? '',
  backupStoragePath: process.env.BACKUP_STORAGE_PATH ?? '/tmp/gymsmart-backups',
  backupDownloadTtlHours: Number(process.env.BACKUP_DOWNLOAD_TTL_HOURS ?? 24),
  pgDumpBin: process.env.PG_DUMP_BIN ?? 'pg_dump',
  pgRestoreBin: process.env.PG_RESTORE_BIN ?? 'pg_restore',
}));
