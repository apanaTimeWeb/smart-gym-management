// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminBranchesV1UrlConfig } from '@/app/superadmin/branches/superadmin_branches_comparison_url_config';
import { SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/branches/branches_mocks/fixtures/SuperadminBranchesV1MockFixtures';
export const superadminBranchesV1Handlers = [
    http.get(SuperadminBranchesV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE })),
];
