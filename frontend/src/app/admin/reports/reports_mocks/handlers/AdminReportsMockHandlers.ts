// RESPONSIBILITY: Owns MSW handlers for the Admin reports feature.
// DATA FLOW: reports API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
import { ADMIN_REPORTS_DEMO_PDF_URL, ADMIN_REPORTS_DEMO_XLSX_URL, getAdminReportsFixture } from '@/app/admin/reports/reports_mocks/fixtures/AdminReportsMockFixtures';
import type { AdminReportsExportFormat, ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

export const adminReportsMockHandlers = [
  http.get('*/admin/reports/fetchReportData', ({ request }) => {
    const url = new URL(request.url);
    return ok(getAdminReportsFixture({
      gymId: url.searchParams.get('gymId') ?? 'all',
      dateRange: (url.searchParams.get('dateRange') as ReportDateRange) ?? 'this_month',
    }));
  }),
  http.post('*/admin/reports/exportReport', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const format = body.format === 'excel' ? 'excel' : 'pdf' as AdminReportsExportFormat;
    return ok({
      fileName: format === 'excel' ? 'admin-report.xlsx' : 'admin-report.pdf',
      url: format === 'excel' ? ADMIN_REPORTS_DEMO_XLSX_URL : ADMIN_REPORTS_DEMO_PDF_URL,
    }, 'Report export ready');
  }),
];
