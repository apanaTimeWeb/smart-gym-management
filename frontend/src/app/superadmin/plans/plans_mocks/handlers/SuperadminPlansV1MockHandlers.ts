// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminPlansV1UrlConfig } from '@/app/superadmin/plans/superadmin_plans_business_controls_url_config';
import { SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/superadmin/plans/plans_mocks/fixtures/SuperadminPlansV1MockFixtures';
export const superadminPlansV1Handlers = [
    http.get(SuperadminPlansV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE })),
];
