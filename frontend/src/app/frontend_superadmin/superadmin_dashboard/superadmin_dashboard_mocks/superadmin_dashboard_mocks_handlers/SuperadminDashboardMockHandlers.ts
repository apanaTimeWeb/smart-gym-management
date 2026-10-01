import { http, HttpResponse, delay } from 'msw';

import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardMockFixtures';

const BASE_URL = '*/superadmin/dashboard';
export const superadminDashboardHandlers = [
    http.get(`${BASE_URL}/metrics`, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
    }),
    http.get(BASE_URL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
    }),
];
