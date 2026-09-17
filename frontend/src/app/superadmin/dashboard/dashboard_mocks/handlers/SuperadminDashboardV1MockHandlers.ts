// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminDashboardV1UrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_business_overview_url_config';
import { SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/superadmin/dashboard/dashboard_mocks/fixtures/SuperadminDashboardV1MockFixtures';
export const superadminDashboardV1Handlers = [
    http.get('*' + SuperadminDashboardV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE })),
];
