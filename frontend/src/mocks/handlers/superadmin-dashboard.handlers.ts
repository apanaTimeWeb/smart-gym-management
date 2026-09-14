import { http, HttpResponse, delay } from 'msw';
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardMockData';
import { SuperadminDashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardUrlConfig';

export const superadminDashboardHandlers = [
  http.get(SuperadminDashboardUrlConfig.BACKEND_API.DASHBOARD_DATA, async () => {
    await delay(800);
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
  }),
  http.get(`${SuperadminDashboardUrlConfig.BACKEND_API.DASHBOARD_DATA}/refresh`, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
  })
];
