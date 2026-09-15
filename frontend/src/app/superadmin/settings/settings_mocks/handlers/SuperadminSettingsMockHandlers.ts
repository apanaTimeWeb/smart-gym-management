import { http, HttpResponse, delay } from 'msw';
import { MOCK_PLATFORM_SETTINGS } from '@/app/superadmin/settings/settings_utils/SuperadminSettingsConstants';
const BASE_URL = '*/superadmin/settings';

let mockSettings = [...MOCK_PLATFORM_SETTINGS];

export const superadminSettingsHandlers = [
  http.get(BASE_URL, async () => {
    await delay(300);
    return HttpResponse.json({ success: true, message: 'Success', data: mockSettings });
  }),
  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(400);
    const body = await request.json() as unknown;
    mockSettings = mockSettings.map(s => s.id === params.id ? { ...s, value: body.value, updatedAt: new Date().toISOString() } : s);
    return HttpResponse.json({ success: true, message: 'Setting updated', data: mockSettings.find(s => s.id === params.id) });
  }),
];
