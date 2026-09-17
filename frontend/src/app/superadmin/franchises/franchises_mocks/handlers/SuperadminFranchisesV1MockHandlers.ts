// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminFranchisesV1UrlConfig } from '@/app/superadmin/franchises/superadmin_franchises_360_url_config';
import { SUPERADMIN_FRANCHISES_360_MOCK_FIXTURE } from '@/app/superadmin/franchises/franchises_mocks/fixtures/SuperadminFranchisesV1MockFixtures';
export const superadminFranchisesV1Handlers = [
    http.get('*' + SuperadminFranchisesV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_FRANCHISES_360_MOCK_FIXTURE })),
];
