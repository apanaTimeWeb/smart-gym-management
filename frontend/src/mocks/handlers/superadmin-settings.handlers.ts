import { http, HttpResponse, delay } from 'msw';
import { SuperadminSettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { MOCK_PLATFORM_SETTINGS } from '@/app/superadmin/settings/settings_utils/SuperadminSettingsConstants';

let mockSettings = [...MOCK_PLATFORM_SETTINGS];

export const superadminSettingsHandlers = [
  http.get(SuperadminSettingsUrlConfig.BACKEND_API.SETTINGS_BASE, async () => {
    await delay(300);
    return HttpResponse.json({ success: true, message: 'Success', data: mockSettings });
  }),
  http.patch(`${SuperadminSettingsUrlConfig.BACKEND_API.SETTINGS_BASE}/:id`, async ({ params, request }) => {
    await delay(400);
    const body = await request.json() as any;
    mockSettings = mockSettings.map(s => s.id === params.id ? { ...s, value: body.value, updatedAt: new Date().toISOString() } : s);
    return HttpResponse.json({ success: true, message: 'Setting updated', data: mockSettings.find(s => s.id === params.id) });
  }),
];
