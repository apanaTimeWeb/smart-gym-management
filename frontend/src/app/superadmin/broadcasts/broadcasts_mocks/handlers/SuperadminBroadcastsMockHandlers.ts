import { http, HttpResponse, delay } from 'msw';
const BASE_URL = '*/superadmin/broadcasts';

export const superadminBroadcastsHandlers = [
  http.post(BASE_URL, async () => {
    await delay(500);
    return HttpResponse.json({ success: true, message: 'Broadcast sent successfully' });
  }),
  http.get(`${BASE_URL}/recipient-count`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: { count: 12 } });
  }),
];
