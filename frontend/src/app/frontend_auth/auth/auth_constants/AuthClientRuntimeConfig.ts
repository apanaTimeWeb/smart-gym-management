/**
 * RESPONSIBILITY: Exposes public Auth runtime configuration required only by client presentation code.
 * DATA FLOW: Public build/runtime environment -> Zod validation -> Login presentation gate.
 * @edge-case Production always disables demo presentation regardless of the public demo flag.
 */
import { z } from 'zod';
import { env } from '@/config/env';

const AuthClientRuntimeEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  NEXT_PUBLIC_AUTH_DEMO_MODE: z.boolean().default(false),
});

function readAuthClientRuntimeEnv() {
  return AuthClientRuntimeEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_AUTH_DEMO_MODE: env.NEXT_PUBLIC_DEMO_MODE,
  });
}

export const AuthClientRuntimeConfig = {
  isLoginDemoEnabled(): boolean {
    const env = readAuthClientRuntimeEnv();
    return env.NODE_ENV !== 'production' && env.NEXT_PUBLIC_AUTH_DEMO_MODE === true;
  },
} as const;
