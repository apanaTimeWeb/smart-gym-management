// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminGymsV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_business_controls_url_config';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsV1MockFixtures';
export const superadminGymsV1Handlers = [
    http.get(SuperadminGymsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE })),
];
