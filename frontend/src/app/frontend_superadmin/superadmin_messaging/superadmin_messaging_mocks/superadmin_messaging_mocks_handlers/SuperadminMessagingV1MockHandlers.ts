// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingV1MockFixtures';
import { SuperadminMessagingV1UrlConfig } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

export const superadminMessagingV1Handlers = [
    http.get('*' + SuperadminMessagingV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE })),
];
