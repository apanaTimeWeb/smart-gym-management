import { http, HttpResponse, delay } from 'msw';
import { MOCK_MIGRATIONS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_fixtures/SuperadminSystemOpsMigrationsMockData';
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsMockHandlers owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants, msw, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_fixtures/SuperadminSystemOpsMigrationsMockData, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides deterministic MSW scenarios for the Superadmin migrations API contract.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';
import type { ApiResponse } from '@/lib/api';



const migrationLogs: MigrationLog[] = [...MOCK_MIGRATIONS];
export const superadminMigrationsHandlers = [
    http.get(MODULE_URLS.BACKEND_API.BASE, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<MigrationLog[]>>({
            success: true,
            message: 'Success',
            data: migrationLogs,
        });
    }),
    http.post(MODULE_URLS.BACKEND_API.TRIGGER, async ({ request }) => {
        await delay(600);
        const body = (await request.json()) as {
            targetVersion?: unknown;
        };
        const targetVersion = typeof body.targetVersion === 'string' ? body.targetVersion : '';
        const newMigration: MigrationLog = {
            id: `migration-${Date.now()}`,
            version: targetVersion,
            description: 'Manual schema rollout',
            appliedAt: null,
            status: SUPERADMIN_MIGRATION_STATUS_CODES.IN_PROGRESS,
            targetTenants: 'ALL',
            durationMs: null,
            errorLog: null,
        };
        migrationLogs.unshift(newMigration);
        return HttpResponse.json<ApiResponse<MigrationLog>>({
            success: true,
            message: 'Migration triggered',
            data: newMigration,
        });
    }),
];
