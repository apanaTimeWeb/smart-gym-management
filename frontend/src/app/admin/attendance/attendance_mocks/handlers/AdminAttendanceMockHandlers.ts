// RESPONSIBILITY: Owns MSW handlers for the Admin attendance feature.
// DATA FLOW: attendance API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED, MOCK_ADMIN_ATTENDANCE_SUMMARY, MOCK_ADMIN_ATTENDANCE_TREND } from '@/app/admin/attendance/attendance_mocks/fixtures/AdminAttendanceMockFixtures';

export const adminAttendanceMockHandlers = [
  // --- Attendance ---
  http.get('*/admin/attendance', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const status=(url.searchParams.get('status')??'').toLowerCase(); const branchId=url.searchParams.get('branchId'); const all=MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.filter(a => (!search || `${a.memberName} ${a.memberPhone}`.toLowerCase().includes(search)) && (!branchId || branchId==='all' || a.branchId===branchId) && (!status || status==='all' || a.status.toLowerCase()===status)); return ok(all); }),
  http.get('*/admin/attendance/summary', () => ok(MOCK_ADMIN_ATTENDANCE_SUMMARY)),
  http.get('*/admin/attendance/trend', () => ok(MOCK_ADMIN_ATTENDANCE_TREND))
];
