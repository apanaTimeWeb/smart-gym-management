import { z } from 'zod';
import { TenantSchema } from '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types';
export const SchemaMigrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  appliedAt: z.string().nullable(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
});
export type SchemaMigration = z.infer<typeof SchemaMigrationSchema>;

export const MigrationsPageDataSchema = z.object({
  migrations: z.array(SchemaMigrationSchema),
  tenants: z.array(TenantSchema),
});
export type MigrationsPageData = z.infer<typeof MigrationsPageDataSchema>;
