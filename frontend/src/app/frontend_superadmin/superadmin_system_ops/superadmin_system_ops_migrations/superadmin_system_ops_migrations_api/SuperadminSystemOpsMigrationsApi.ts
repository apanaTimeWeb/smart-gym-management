import { MigrationTriggerResponseSchema, SuperadminMigrationsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsApi owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_schemas/SuperadminSystemOpsMigrationsSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns all Superadmin migration API calls and validates every response at the API boundary.
import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';
import type { ApiResponse } from '@/lib/api';


export const migrationsApi = {
    fetchMigrations: (params?: Record<string, string>) => {
        const search = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<ApiResponse<MigrationLog[]>>(`${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE}${search}`, { dataSchema: SuperadminMigrationsListDataSchema });
    },
    startMigration: (targetVersion: string, idempotencyKey: string) => apiFetch<ApiResponse<{ id: string; version: string; status: string }>>(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.TRIGGER, {
        method: 'POST',
        body: JSON.stringify({ targetVersion }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: MigrationTriggerResponseSchema,
    }),
};
