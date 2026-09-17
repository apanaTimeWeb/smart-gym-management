// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminMessagingV1UrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_template_insights_url_config';
import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_mocks/fixtures/SuperadminMessagingV1MockFixtures';
export const superadminMessagingV1Handlers = [
    http.get(SuperadminMessagingV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE })),
];
