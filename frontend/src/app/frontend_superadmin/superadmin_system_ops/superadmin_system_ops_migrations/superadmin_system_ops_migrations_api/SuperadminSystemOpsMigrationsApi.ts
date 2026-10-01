import { MigrationTriggerResponseSchema, SuperadminMigrationsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsApiSchema';
// RESPONSIBILITY: Owns all Superadmin migration API calls and validates every response at the API boundary.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminSystemOpsMigrationsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config';
import { MigrationLogSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsSchema';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';
import type { ApiResponse } from '@/lib/api';
export const migrationsApi = {
    fetchMigrations: (params?: Record<string, string>) => {
        const search = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<ApiResponse<MigrationLog[]>>(`${SuperadminSystemOpsMigrationsUrlConfig.BACKEND_API.BASE}${search}`, { dataSchema: SuperadminMigrationsListDataSchema });
    },
    startMigration: (targetVersion: string, idempotencyKey: string) => apiFetch<ApiResponse<{ id: string; version: string; status: string }>>(SuperadminSystemOpsMigrationsUrlConfig.BACKEND_API.TRIGGER, {
        method: 'POST',
        body: JSON.stringify({ targetVersion }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: MigrationTriggerResponseSchema,
    }),
};
