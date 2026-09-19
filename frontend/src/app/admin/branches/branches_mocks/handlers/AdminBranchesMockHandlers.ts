// RESPONSIBILITY: Owns MSW handlers for the Admin branches feature.
// DATA FLOW: Admin Branches API → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_BRANCHES } from '@/app/admin/branches/branches_mocks/fixtures/AdminBranchesMockFixtures';
export const adminBranchesMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.has('consumer')) return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_BRANCHES });
  }),
];
