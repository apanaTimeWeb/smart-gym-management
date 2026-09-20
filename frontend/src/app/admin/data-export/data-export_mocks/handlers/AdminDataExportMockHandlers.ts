import { StatusCodes } from 'http-status-codes';
// RESPONSIBILITY: Owns MSW handlers for the Admin data-export feature.
// DATA FLOW: data-export API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};

import { MOCK_DATA_EXPORT_KPI, MOCK_EXPORT_JOBS_EXPANDED } from '@/app/admin/data-export/data-export_mocks/fixtures/AdminDataExportMockFixtures';
import type { ExportJob } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';
let exportJobsState: ExportJob[] = structuredClone(MOCK_EXPORT_JOBS_EXPANDED);

export const adminDataExportMockHandlers = [
  http.get('*/admin/data-export/fetchJobs', ({ request }) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const status = url.searchParams.get('status');
    const sortKey = url.searchParams.get('sortKey') || 'createdAt';
    const sortDir = url.searchParams.get('sortDir') || 'desc';
    const filtered = exportJobsState.filter((job) => !status || status === 'all' || job.status === status);
    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof typeof a];
      const bv = b[sortKey as keyof typeof b];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true }) * (sortDir === 'asc' ? 1 : -1);
    });
    return paged(sorted, page, limit);
  }),
  http.get('*/admin/data-export/fetchKPIs', () => ok(MOCK_DATA_EXPORT_KPI)),
  http.post('*/admin/data-export/createExport', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const job: ExportJob = { id: `exp-demo-${Date.now()}`, dataType: String(body.dataType ?? 'members') as ExportJob['dataType'], format: String(body.format ?? 'csv') as ExportJob['format'], gymIds: Array.isArray(body.gymIds) ? body.gymIds.map(String) : ['all'], gymNames: Array.isArray(body.gymNames) ? body.gymNames.map(String) : ['All Gyms'], dateFrom: String(body.dateFrom ?? new Date().toISOString().slice(0, 10)), dateTo: String(body.dateTo ?? new Date().toISOString().slice(0, 10)), status: 'processing', createdAt: new Date().toISOString(), createdBy: 'Admin' }; exportJobsState.unshift(job); return ok(job, 'Export started'); }),
  http.delete('*/admin/data-export/deleteJob', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const index = exportJobsState.findIndex((job) => job.id === String(body.id)); if (index < 0) return HttpResponse.json({ success: false, message: 'Export job not found', data: null }, { status: StatusCodes.NOT_FOUND }); exportJobsState.splice(index, 1); return ok(null, 'Export deleted'); })
];
