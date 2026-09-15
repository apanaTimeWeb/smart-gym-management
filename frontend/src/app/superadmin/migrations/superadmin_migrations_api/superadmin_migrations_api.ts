import { MigrationLogSchema } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
// RESPONSIBILITY: Modularized API client for the Migrations module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { MigrationsUrlConfig } from '@/app/superadmin/migrations/superadmin_migrations_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
import { z } from "zod";

export const migrationsApi = {
  fetchMigrations: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<MigrationLog[]>>(`${MigrationsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(MigrationLogSchema) });
  },
  startMigration: (tenantId: string) => {
    return apiFetch<ApiResponse<void>>(`${MigrationsUrlConfig.BACKEND_API.BASE}/trigger`, {
      method: 'POST',
      body: JSON.stringify({ tenantId }),
        dataSchema: z.object({}).passthrough()
    });
  },
};
