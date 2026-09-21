// RESPONSIBILITY: Provides the validated HTTP application runtime configuration consumed by bootstrap.
// FLOW: CoreRuntimeConfig → ConfigModule → bootstrap.

import { registerAs } from '@nestjs/config';
export const CoreAppConfig = registerAs('app', () => ({
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
}));
