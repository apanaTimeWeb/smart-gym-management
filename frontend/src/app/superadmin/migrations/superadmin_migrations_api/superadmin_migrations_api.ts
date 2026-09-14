// RESPONSIBILITY: Modularized API client for the Migrations module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminMigrationsUrlConfig } from '@/app/superadmin/migrations/superadmin_migrations_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';

export const migrationsApi = {
  fetchMigrations: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<MigrationLog[]>>(`${SuperadminMigrationsUrlConfig.BACKEND_API.MIGRATIONS_BASE}${q}`);
  },
  triggerMigration: (tenantId: string) => {
    return apiFetch<ApiResponse<void>>(`${SuperadminMigrationsUrlConfig.BACKEND_API.MIGRATIONS_BASE}/trigger`, {
      method: 'POST',
      body: JSON.stringify({ tenantId })
    });
  },
};
