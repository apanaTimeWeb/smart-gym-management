// RESPONSIBILITY: Provides deterministic MSW scenarios for the Superadmin migrations API contract.
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants';
import { delay, http, HttpResponse } from 'msw';

import { SuperadminSystemOpsMigrationsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_url_config';
import { MOCK_MIGRATIONS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_fixtures/SuperadminSystemOpsMigrationsMockData';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';
import type { ApiResponse } from '@/lib/api';

const migrationLogs: MigrationLog[] = [...MOCK_MIGRATIONS];
export const superadminMigrationsHandlers = [
    http.get(SuperadminSystemOpsMigrationsUrlConfig.BACKEND_API.BASE, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<MigrationLog[]>>({
            success: true,
            message: 'Success',
            data: migrationLogs,
        });
    }),
    http.post(SuperadminSystemOpsMigrationsUrlConfig.BACKEND_API.TRIGGER, async ({ request }) => {
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
