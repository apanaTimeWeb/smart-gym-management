import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { MigrationsPageData } from '@/app/superadmin/migrations/migrations_types/migrations_types';

export const migrationsApi = {
  getAll: () => apiFetch<ApiResponse<MigrationsPageData>>(SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE),
};
