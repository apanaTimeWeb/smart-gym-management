// RESPONSIBILITY: Validates runtime environment configuration at startup and exposes strongly typed values.
// FLOW: ConfigModule -> CoreEnvironmentConfig -> core infrastructure and feature modules.

import { registerAs } from '@nestjs/config';
import { z } from 'zod';

import { DATABASE_CONFIG } from '@/backend_auth/auth_core/config/database.config';
import { TIMEOUT_CONFIG } from '@/backend_auth/auth_core/config/timeout.config';
const strictEnvBoolean = z.preprocess((value: unknown) => {
  if (value === undefined) return false;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}, z.boolean());

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  FRONTEND_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_MAX: z.coerce.number().int().positive().max(100).default(DATABASE_CONFIG.POOL_MAX),
  DATABASE_ACQUIRE_TIMEOUT_MS: z.coerce.number().int().positive().default(DATABASE_CONFIG.ACQUIRE_TIMEOUT_MS),
  DATABASE_IDLE_TIMEOUT_MS: z.coerce.number().int().positive().default(DATABASE_CONFIG.IDLE_TIMEOUT_MS),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().positive().default(604800),
  AUTH_LOCKOUT_MAX_ATTEMPTS: z.coerce.number().int().positive().default(5),
  AUTH_LOCKOUT_WINDOW_SECONDS: z.coerce.number().int().positive().default(900),
  RATE_LIMIT_AUTH_LOGIN_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_AUTH_LOGIN_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_AUTH_REFRESH_MAX: z.coerce.number().int().positive().default(20),
  RATE_LIMIT_AUTH_REFRESH_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_AUTH_ME_MAX: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_AUTH_ME_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_AUTH_LOGOUT_MAX: z.coerce.number().int().positive().default(20),
  RATE_LIMIT_AUTH_LOGOUT_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  ALLOW_DETERMINISTIC_SEED_DATA: strictEnvBoolean,
  SEED_SUPERADMIN_PASSWORD: z.string().optional(),
  SEED_ADMIN_PASSWORD: z.string().optional(),
  SEED_MANAGER_PASSWORD: z.string().optional(),
  SEED_TRAINER_PASSWORD: z.string().optional(),
});

export const CoreEnvironmentConfig = registerAs('environment', () => {
  const parsed = EnvironmentSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return {
    ...parsed.data,
    HTTP_FAST_TIMEOUT_MS: TIMEOUT_CONFIG.HTTP_FAST_MS,
    HTTP_STANDARD_TIMEOUT_MS: TIMEOUT_CONFIG.HTTP_STANDARD_MS,
  };
});
