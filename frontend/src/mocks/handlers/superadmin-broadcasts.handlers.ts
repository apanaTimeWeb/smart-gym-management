import { http, HttpResponse, delay } from 'msw';
import { SuperadminBroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';

export const superadminBroadcastsHandlers = [
  http.post(SuperadminBroadcastsUrlConfig.BACKEND_API.BROADCASTS_BASE, async () => {
    await delay(500);
    return HttpResponse.json({ success: true, message: 'Broadcast sent successfully' });
  }),
  http.get(`${SuperadminBroadcastsUrlConfig.BACKEND_API.BROADCASTS_BASE}/recipient-count`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: { count: 12 } });
  }),
];
