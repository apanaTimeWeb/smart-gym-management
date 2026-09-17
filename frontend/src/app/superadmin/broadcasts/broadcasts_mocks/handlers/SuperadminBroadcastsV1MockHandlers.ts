// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminBroadcastsV1UrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_audience_insights_url_config';
import { SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsV1MockFixtures';
export const superadminBroadcastsV1Handlers = [
    http.get('*' + SuperadminBroadcastsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE })),
];
