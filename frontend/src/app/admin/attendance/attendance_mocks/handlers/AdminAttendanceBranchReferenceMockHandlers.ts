// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin attendance.
// DATA FLOW: AdminAttendanceBranchReferenceApi → module-owned handler → module-owned fixture.
import { http, HttpResponse } from 'msw';
import { MOCK_ATTENDANCE_BRANCH_REFERENCES } from '@/app/admin/attendance/attendance_mocks/fixtures/AdminAttendanceBranchReferenceMockFixtures';
export const adminAttendanceBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'attendance') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ATTENDANCE_BRANCH_REFERENCES, meta: { total: MOCK_ATTENDANCE_BRANCH_REFERENCES.length, page: 1, limit: 50, totalPages: 1 } });
  }),
];
