// RESPONSIBILITY: Provides validated HTTP application runtime configuration consumed by bootstrap.
// FLOW: Centralized environment reader -> ConfigModule validation -> app namespace -> bootstrap.
import { registerAs } from '@nestjs/config';

import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment.js';

/**
 * @description Registers HTTP process settings for the Admin application.
 * @returns Nest Config registration for the `app` namespace.
 * @remarks The values are configuration-only and are never used for business decisions.
 */
export const AdminCoreAppConfig = registerAs('app', () => {
  const env = readAdminCoreEnvironment();
  return { port: Number(env.PORT ?? 3000), nodeEnv: env.NODE_ENV ?? 'development' };
});
