import { http, HttpResponse, delay } from 'msw';

import { SuperadminSystemOpsInfrastructureUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';
import { MOCK_INFRASTRUCTURE_NODES, MOCK_REDIS_TELEMETRY } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockData';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockFixtures';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureUptimeMockFixtures';

export const superadminInfrastructureHandlers = [
    http.get(`*${SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS })),
    http.get(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.BASE, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const statusFilter = url.searchParams.get('statusFilter');
        let filtered = [...MOCK_INFRASTRUCTURE_NODES];
        if (statusFilter && statusFilter !== 'ALL') {
            filtered = filtered.filter(n => n.status === statusFilter);
        }
        return HttpResponse.json({ success: true, message: 'Success', data: filtered });
    }),
    http.get(`${SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.BASE}/uptime-history`, async () => {
        await delay(250);
        return HttpResponse.json({ success: true, message: 'Historical uptime loaded', data: MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME });
    }),
    http.get(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REDIS_TELEMETRY });
    }),
    http.post(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Global cache flushed' });
    }),
    http.post(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Tenant cache flushed' });
    }),
];
