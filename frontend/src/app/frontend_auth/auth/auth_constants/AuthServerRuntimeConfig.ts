/**
 * RESPONSIBILITY: Encapsulates server-only Auth runtime configuration and validates private environment values before use.
 * DATA FLOW: Server environment -> Zod validation -> AuthServerRuntimeConfig -> secure Auth route behavior.
 * @edge-case Missing optional demo configuration safely defaults to disabled; malformed configured values fail validation instead of being silently accepted.
 */
import { z } from 'zod';
import { env } from '@/config/env';

const AuthServerRuntimeEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  AUTH_DEMO_MODE: z.boolean().default(false),
});

function readAuthServerRuntimeEnv() {
  return AuthServerRuntimeEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    AUTH_DEMO_MODE: env.NEXT_PUBLIC_DEMO_MODE,
  });
}

export const AuthServerRuntimeConfig = {
  isProduction(): boolean {
    return readAuthServerRuntimeEnv().NODE_ENV === 'production';
  },

  isLoginDemoEnabled(): boolean {
    const env = readAuthServerRuntimeEnv();
    return env.NODE_ENV !== 'production' && env.AUTH_DEMO_MODE === true;
  },
} as const;
