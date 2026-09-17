// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminAnalyticsV1UrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_retention_insights_url_config';
import { SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/analytics/analytics_mocks/fixtures/SuperadminAnalyticsV1MockFixtures';
export const superadminAnalyticsV1Handlers = [
    http.get('*' + SuperadminAnalyticsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE })),
];
