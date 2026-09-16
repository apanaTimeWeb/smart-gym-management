// RESPONSIBILITY: Owns all Superadmin migration API calls and validates every response at the API boundary.
import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { MigrationsUrlConfig } from '@/app/superadmin/migrations/superadmin_migrations_url_config';
import { MigrationLogSchema, type MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';

const MigrationTriggerResponseSchema = z.object({
  id: z.string(),
  version: z.string(),
  status: z.string(),
});

export const migrationsApi = {
  fetchMigrations: (params?: Record<string, string>) => {
    const search = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<ApiResponse<MigrationLog[]>>(
      `${MigrationsUrlConfig.BACKEND_API.BASE}${search}`,
      { dataSchema: z.array(MigrationLogSchema) },
    );
  },
  triggerMigration: (targetVersion: string) =>
    apiFetch<ApiResponse<z.infer<typeof MigrationTriggerResponseSchema>>>(
      MigrationsUrlConfig.BACKEND_API.TRIGGER,
      {
        method: 'POST',
        body: JSON.stringify({ targetVersion }),
        dataSchema: MigrationTriggerResponseSchema,
      },
    ),
};
