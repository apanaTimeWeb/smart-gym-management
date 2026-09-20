// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin reports.
// DATA FLOW: AdminReportsBranchReferenceApi → module-owned handler → module-owned fixture.
import { http, HttpResponse } from 'msw';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/admin/reports/reports_mocks/fixtures/AdminReportsBranchReferenceMockFixtures';
export const adminReportsBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'reports') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REPORTS_BRANCH_REFERENCES });
  }),
];
