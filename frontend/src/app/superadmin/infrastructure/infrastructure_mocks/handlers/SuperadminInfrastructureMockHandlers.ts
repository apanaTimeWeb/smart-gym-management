import { http, HttpResponse, delay } from 'msw';
import { InfrastructureUrlConfig } from '@/app/superadmin/infrastructure/superadmin_infrastructure_url_config';
import { MOCK_INFRASTRUCTURE_NODES, MOCK_REDIS_TELEMETRY } from '@/app/superadmin/infrastructure/infrastructure_utils/SuperadminInfrastructureConstants';

export const superadminInfrastructureHandlers = [
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
