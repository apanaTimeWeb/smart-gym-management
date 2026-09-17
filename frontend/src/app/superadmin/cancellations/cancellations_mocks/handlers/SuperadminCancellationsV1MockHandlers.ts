// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminCancellationsV1UrlConfig } from '@/app/superadmin/cancellations/superadmin_cancellations_reason_insights_url_config';
import { SUPERADMIN_CANCELLATIONS_REASON_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/cancellations/cancellations_mocks/fixtures/SuperadminCancellationsV1MockFixtures';
export const superadminCancellationsV1Handlers = [
    http.get('*' + SuperadminCancellationsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_CANCELLATIONS_REASON_INSIGHTS_MOCK_FIXTURE })),
];
