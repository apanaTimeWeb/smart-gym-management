import { http, HttpResponse } from 'msw';
import { MOCK_DASHBOARD_STATS } from '@/app/manager/dashboard/dashboard_fixtures/ManagerDashboardMockData';

export const managerDashboardHandlers = [
  http.get('http://localhost:5000/api/v1/manager/dashboard/stats', () => {
    return HttpResponse.json({
      success: true,
      message: 'Stats fetched successfully',
      data: MOCK_DASHBOARD_STATS
    });
  })
];
