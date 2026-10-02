import { http, HttpResponse, delay } from 'msw';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockFixtures';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureUptimeMockFixtures';
import { MOCK_REDIS_TELEMETRY, MOCK_INFRASTRUCTURE_NODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockData';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureMockHandlers owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockData, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureUptimeMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';



export const superadminInfrastructureHandlers = [
    http.get(`*${MODULE_URLS.BACKEND_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS })),
    http.get('*' + MODULE_URLS.BACKEND_API.BASE, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const statusFilter = url.searchParams.get('statusFilter');
        let filtered = [...MOCK_INFRASTRUCTURE_NODES];
        if (statusFilter && statusFilter !== 'ALL') {
            filtered = filtered.filter(n => n.status === statusFilter);
        }
        return HttpResponse.json({ success: true, message: 'Success', data: filtered });
    }),
    http.get('*' + `${MODULE_URLS.BACKEND_API.BASE}/uptime-history`, async () => {
        await delay(250);
        return HttpResponse.json({ success: true, message: 'Historical uptime loaded', data: MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME });
    }),
    http.get('*' + MODULE_URLS.BACKEND_API.REDIS_TELEMETRY, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REDIS_TELEMETRY });
    }),
    http.post('*' + MODULE_URLS.BACKEND_API.REDIS_FLUSH_GLOBAL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Global cache flushed' });
    }),
    http.post('*' + MODULE_URLS.BACKEND_API.REDIS_FLUSH_TENANT, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Tenant cache flushed' });
    }),
];
