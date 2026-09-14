import { http, HttpResponse, delay } from 'msw';
import { SuperadminSystemUrlConfig } from '@/app/superadmin/system/superadmin_system_url_config';

export const superadminSystemHandlers = [
  http.get(SuperadminSystemUrlConfig.BACKEND_API.SYSTEM_BASE, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: { uptime: '99.99%', load: '1.2' } });
  }),
  http.get(`${SuperadminSystemUrlConfig.BACKEND_API.SYSTEM_BASE}/health`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: { status: 'healthy' } });
  }),
];
