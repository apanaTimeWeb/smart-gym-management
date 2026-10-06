import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_REPORT_SUMMARY } from '@/app/frontend_manager/manager_reports/manager_reports_mocks/manager_reports_mocks_fixtures/ManagerReportsMockData';
import { ManagerReportsUrlConfig } from '@/app/frontend_manager/manager_reports/manager_reports_url_config';

/**
 * @description Provides the Manager Reports summary MSW handler for frontend-first testing.
 * @dependencies ManagerMockApiUrl, ManagerReportsMockData, ManagerReportsUrlConfig.
 * @edge-case Keeps the handler aligned with the summary-only Manager Reports API contract.
 */
export const managerReportsHandlers = [
  http.get(managerMockApiUrl(ManagerReportsUrlConfig.BACKEND_API.SUMMARY), () => HttpResponse.json({
    success: true,
    message: 'Report summary fetched',
    data: MOCK_REPORT_SUMMARY,
  })),
];
