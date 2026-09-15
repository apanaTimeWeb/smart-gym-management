import { http, HttpResponse, delay } from 'msw';
import { MigrationsUrlConfig } from '@/app/superadmin/migrations/superadmin_migrations_url_config';

import { MOCK_MIGRATIONS } from '@/app/superadmin/migrations/migrations_utils/SuperadminMigrationsConstants';

let mockMigrationsList = [...MOCK_MIGRATIONS];

export const superadminMigrationsHandlers = [
  http.get(MigrationsUrlConfig.BACKEND_API.BASE, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockMigrationsList });
  }),
  http.post(`${MigrationsUrlConfig.BACKEND_API.BASE}/trigger`, async ({ request }) => {
    await delay(600);
    const body = await request.json() as Record<string, any>;
    const tenantId = body?.tenantId || 'unknown';
    const newMig = { id: `mig-${Date.now()}`, version: tenantId, description: 'Manual trigger', appliedAt: null, status: 'IN_PROGRESS', targetTenants: 'ALL', durationMs: null, errorLog: null };
    mockMigrationsList = [newMig as any, ...mockMigrationsList];
    return HttpResponse.json({ success: true, message: 'Migration triggered' });
  }),
];
