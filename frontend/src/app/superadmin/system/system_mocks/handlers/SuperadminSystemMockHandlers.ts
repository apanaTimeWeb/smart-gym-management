import { http, HttpResponse, delay } from 'msw';
const BASE_URL = '*/superadmin/system-health';

export const superadminSystemHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: { uptime: '99.99%', load: '1.2' } });
  }),
  http.get(`${BASE_URL}/health`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: { status: 'healthy' } });
  }),
];
