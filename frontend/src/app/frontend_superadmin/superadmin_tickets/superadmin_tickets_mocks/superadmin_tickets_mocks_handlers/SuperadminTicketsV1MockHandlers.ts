// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_mocks/superadmin_tickets_mocks_fixtures/SuperadminTicketsV1MockFixtures';
import { SuperadminTicketsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';

export const superadminTicketsV1Handlers = [
    http.get('*' + SuperadminTicketsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE })),
];
