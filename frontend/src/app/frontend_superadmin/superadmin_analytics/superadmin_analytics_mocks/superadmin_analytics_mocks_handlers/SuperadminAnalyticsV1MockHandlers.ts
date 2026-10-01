// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsV1MockFixtures';
import { SuperadminAnalyticsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';

export const superadminAnalyticsV1Handlers = [
    http.get('*' + SuperadminAnalyticsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE })),
];
