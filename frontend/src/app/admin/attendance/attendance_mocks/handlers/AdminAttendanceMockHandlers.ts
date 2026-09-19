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
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};

import { MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED, MOCK_ADMIN_ATTENDANCE_SUMMARY, MOCK_ADMIN_ATTENDANCE_TREND } from '@/app/admin/attendance/attendance_mocks/fixtures/AdminAttendanceMockFixtures';

export const adminAttendanceMockHandlers = [
  // --- Attendance ---
  http.get('*/admin/attendance', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const status = (url.searchParams.get('status') ?? '').toLowerCase();
    const branchId = url.searchParams.get('branchId');
    const dateRange = url.searchParams.get('dateRange') ?? 'today';
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const now = new Date('2026-09-19T12:00:00Z');
    const start = new Date(now);
    const end = new Date(now);
    if (dateRange === 'yesterday') { start.setUTCDate(start.getUTCDate() - 1); end.setUTCDate(end.getUTCDate() - 1); }
    else if (dateRange === 'this_week') { start.setUTCDate(start.getUTCDate() - 6); }
    else if (dateRange === 'this_month') { start.setUTCDate(1); }
    else if (dateRange === 'last_month') { start.setUTCMonth(start.getUTCMonth() - 1, 1); end.setUTCDate(0); }
    const filtered = MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.filter((a) => {
      const matchesText = !search || `${a.memberName} ${a.memberPhone}`.toLowerCase().includes(search);
      const matchesBranch = !branchId || branchId === 'all' || a.branchId === branchId;
      const matchesStatus = !status || status === 'all' || a.status.toLowerCase() === status;
      const day = new Date(`${a.date}T12:00:00Z`);
      const matchesDate = dateRange === 'today' ? a.date === now.toISOString().slice(0, 10) : day >= start && day <= end;
      return matchesText && matchesBranch && matchesStatus && matchesDate;
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/attendance/summary', () => ok(MOCK_ADMIN_ATTENDANCE_SUMMARY)),
  http.get('*/admin/attendance/trend', ({ request }) => { const branchId = new URL(request.url).searchParams.get('branchId'); return ok(branchId && branchId !== 'all' ? MOCK_ADMIN_ATTENDANCE_TREND.map((point) => ({ ...point, count: Math.round(point.count * 0.75) })) : MOCK_ADMIN_ATTENDANCE_TREND); })
];
