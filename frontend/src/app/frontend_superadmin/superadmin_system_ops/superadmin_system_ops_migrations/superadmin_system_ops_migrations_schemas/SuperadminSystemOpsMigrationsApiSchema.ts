import { z } from 'zod';

import { MigrationLogSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsSchema';

export const MigrationTriggerResponseSchema = z.object({
  id: z.string(),
  version: z.string(),
  status: z.string(),
});
export const SuperadminMigrationsListDataSchema = z.array(MigrationLogSchema);
