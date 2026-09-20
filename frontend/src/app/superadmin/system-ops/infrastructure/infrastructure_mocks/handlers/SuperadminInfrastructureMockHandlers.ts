import { http, HttpResponse, delay } from 'msw';
import { InfrastructureUrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_url_config';
import { MOCK_INFRASTRUCTURE_NODES, MOCK_REDIS_TELEMETRY } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/fixtures/SuperadminInfrastructureMockData';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/fixtures/SuperadminInfrastructureMockFixtures';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/fixtures/SuperadminInfrastructureUptimeMockFixtures';
export const superadminInfrastructureHandlers = [
    http.get('*/api/v1/api/gyms', async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS })),
    http.get(InfrastructureUrlConfig.BACKEND_API.BASE, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const statusFilter = url.searchParams.get('statusFilter');
        let filtered = [...MOCK_INFRASTRUCTURE_NODES];
        if (statusFilter && statusFilter !== 'ALL') {
            filtered = filtered.filter(n => n.status === statusFilter);
        }
        return HttpResponse.json({ success: true, message: 'Success', data: filtered });
    }),
    http.get(`${InfrastructureUrlConfig.BACKEND_API.BASE}/uptime-history`, async () => {
        await delay(250);
        return HttpResponse.json({ success: true, message: 'Historical uptime loaded', data: MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME });
    }),
    http.get(InfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REDIS_TELEMETRY });
    }),
    http.post(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Global cache flushed' });
    }),
    http.post(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Tenant cache flushed' });
    }),
];
