// RESPONSIBILITY: Owns MSW transport for the Admin Dashboard. Branch identity is resolved against module-owned fixtures before response generation.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { getAdminDashboardFixture, type AdminDashboardRange } from '@/app/admin/dashboard/dashboard_mocks/fixtures/AdminDashboardMockFixtures';

export const adminDashboardMockHandlers = [
  http.get('*/admin/dashboard/fetchDashboardStats', ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId') || undefined;
    const range = (url.searchParams.get('range') || 'this_month') as AdminDashboardRange;
    const data = getAdminDashboardFixture(branchId, range);
    if (branchId && data === null) {
      return HttpResponse.json({ success: false, message: 'Dashboard branch not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    }
    return HttpResponse.json({
      success: true,
      message: 'Dashboard data loaded',
      data,
      meta: { total: 1, page: 1, limit: 1, totalPages: 1 },
    });
  }),
];
