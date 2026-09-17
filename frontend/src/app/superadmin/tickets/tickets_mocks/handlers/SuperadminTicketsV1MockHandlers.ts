// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminTicketsV1UrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_service_insights_url_config';
import { SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/tickets/tickets_mocks/fixtures/SuperadminTicketsV1MockFixtures';
export const superadminTicketsV1Handlers = [
    http.get(SuperadminTicketsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE })),
];
