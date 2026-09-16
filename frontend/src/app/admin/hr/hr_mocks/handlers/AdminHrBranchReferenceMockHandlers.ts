// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin hr.
// DATA FLOW: AdminHrBranchReferenceApi → module-owned handler → module-owned fixture.
import { http, HttpResponse } from 'msw';
import { MOCK_HR_BRANCH_REFERENCES } from '@/app/admin/hr/hr_mocks/fixtures/AdminHrBranchReferenceMockFixtures';
export const adminHrBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'hr') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_HR_BRANCH_REFERENCES, meta: { total: MOCK_HR_BRANCH_REFERENCES.length, page: 1, limit: 50, totalPages: 1 } });
  }),
];
