// RESPONSIBILITY: Owns MSW handlers for the Admin reports feature.
// DATA FLOW: reports API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
import { getAdminReportsFixture } from '@/app/admin/reports/reports_mocks/fixtures/AdminReportsMockFixtures';
import type { AdminReportsExportFormat, ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const DEMO_PDF_URL = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA1IDAgUiA+PiA+PiAvQ29udGVudHMgNCAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCAxMTggPj4Kc3RyZWFtCkJUCi9GMSAxOCBUZgo3MiA3MjAgVGQKKEFkbWluIFJlcG9ydHMgRGVtbyBFeHBvcnQpIFRqCi9GMSAxMCBUZgowIC0yNCBUZAooR2VuZXJhdGVkIGJ5IGZyb250ZW5kIGRlbW8gdHJhbnNwb3J0KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2NCAwMDAwMCBuIAowMDAwMDAwMTIxIDAwMDAwIG4gCjAwMDAwMDI0NyAwMDAwMDAgbiAKMDAwMDAwMDQxNSAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDYgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjQ4NQolJUVPRgo=';
const DEMO_XLSX_URL = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,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';

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
      url: format === 'excel' ? DEMO_XLSX_URL : DEMO_PDF_URL,
    }, 'Report export ready');
  }),
];
