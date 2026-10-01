// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardV1MockFixtures';
import { SuperadminDashboardV1UrlConfig } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';

export const superadminDashboardV1Handlers = [
    http.get('*' + SuperadminDashboardV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE })),
];
