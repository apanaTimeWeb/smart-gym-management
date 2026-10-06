import { z } from 'zod';

import { env } from '@/config/env';



const AuthServerRuntimeEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  AUTH_DEMO_MODE: z.enum(['true', 'false']).default('false'),
});

/**
 * Reads the server Auth runtime environment through the approved central environment contract.
 * @description Applies the Auth-specific Zod constraints before server-only behavior consumes the values.
 * @dependencies Central `env` configuration and Zod.
 * @edge-case Missing demo configuration defaults to disabled; malformed values fail validation.
 */
function readAuthServerRuntimeEnv() {
  return AuthServerRuntimeEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV || 'development',
    AUTH_DEMO_MODE: (env as any).NEXT_PUBLIC_DEMO_MODE ? 'true' : 'false',
  });
}

export const AuthServerRuntimeConfig = {
  isProduction(): boolean {
    return readAuthServerRuntimeEnv().NODE_ENV === 'production';
  },

  isLoginDemoEnabled(): boolean {
    const env = readAuthServerRuntimeEnv();
    return env.AUTH_DEMO_MODE === 'true';
  },
} as const;
