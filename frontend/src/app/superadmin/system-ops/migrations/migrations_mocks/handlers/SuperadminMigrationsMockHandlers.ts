// RESPONSIBILITY: Provides deterministic MSW scenarios for the Superadmin migrations API contract.
import { delay, http, HttpResponse } from 'msw';
import type { ApiResponse } from '@/lib/api';
import { MigrationsUrlConfig } from '@/app/superadmin/system-ops/migrations/superadmin_migrations_url_config';
import { MOCK_MIGRATIONS } from '@/app/superadmin/system-ops/migrations/migrations_mocks/fixtures/SuperadminMigrationsMockData';
import type { MigrationLog } from '@/app/superadmin/system-ops/migrations/migrations_types/SuperadminMigrationsTypes';
const migrationLogs: MigrationLog[] = [...MOCK_MIGRATIONS];
export const superadminMigrationsHandlers = [
    http.get(MigrationsUrlConfig.BACKEND_API.BASE, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<MigrationLog[]>>({
            success: true,
            message: 'Success',
            data: migrationLogs,
        });
    }),
    http.post(MigrationsUrlConfig.BACKEND_API.TRIGGER, async ({ request }) => {
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
            status: 'IN_PROGRESS',
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
