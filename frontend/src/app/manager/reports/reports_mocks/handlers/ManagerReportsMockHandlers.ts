import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { ManagerReportsUrlConfig } from '@/app/manager/reports/reports_url_config';
import { MOCK_REPORT_SUMMARY } from '@/app/manager/reports/reports_fixtures/ManagerReportsMockData';

export const managerReportsHandlers = [
  http.get(managerMockApiUrl(ManagerReportsUrlConfig.BACKEND_API.SUMMARY), () => {
    return HttpResponse.json({
      success: true,
      message: 'Report summary fetched',
      data: MOCK_REPORT_SUMMARY
    });
  }),

  http.get(managerMockApiUrl(ManagerReportsUrlConfig.BACKEND_API.EXPORT), async () => {
    // Return a mock CSV blob
    return new HttpResponse('Mock CSV content', {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="report.csv"'
      }
    });
  })
];
