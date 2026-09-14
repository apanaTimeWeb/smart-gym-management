import { http, HttpResponse } from 'msw';
import { MOCK_REPORT_SUMMARY } from '@/app/manager/reports/reports_fixtures/ManagerReportsMockData';

export const managerReportsHandlers = [
  http.get('http://localhost:5000/api/v1/manager/reports/summary', () => {
    return HttpResponse.json({
      success: true,
      message: 'Report summary fetched',
      data: MOCK_REPORT_SUMMARY
    });
  }),

  http.get('http://localhost:5000/api/v1/manager/reports/export', async () => {
    // Return a mock CSV blob
    return new HttpResponse('Mock CSV content', {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="report.csv"'
      }
    });
  })
];
