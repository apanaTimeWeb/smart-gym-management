// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin members.
// DATA FLOW: AdminMembersBranchReferenceApi → module-owned handler → module-owned fixture.
import { http, HttpResponse } from 'msw';
import { MOCK_MEMBERS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_members/admin_members_mocks/admin_members_fixtures/AdminMembersBranchReferenceMockFixtures';
export const adminMembersBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'members') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_MEMBERS_BRANCH_REFERENCES });
  }),
];
