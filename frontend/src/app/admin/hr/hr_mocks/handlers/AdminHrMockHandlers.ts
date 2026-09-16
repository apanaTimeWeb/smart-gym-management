// RESPONSIBILITY: Owns MSW handlers for the Admin hr feature.
// DATA FLOW: hr API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_ADMIN_HR_SUMMARY, MOCK_ADMIN_LEDGER, MOCK_ADMIN_PAYROLLS, MOCK_ADMIN_PAYROLLS_EXPANDED, MOCK_ADMIN_STAFF, MOCK_ADMIN_STAFF_EXPANDED, MOCK_ADMIN_STAFF_PERFORMANCE } from '@/app/admin/hr/hr_mocks/fixtures/AdminHrMockFixtures';

export const adminHrMockHandlers = [
  // --- HR ---
  http.get('*/admin/hr/staff', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const all=MOCK_ADMIN_STAFF_EXPANDED.filter(s => !search || `${s.name} ${s.employeeId} ${s.role}`.toLowerCase().includes(search)); return ok({ staff: all, total: all.length }); }),
  http.get('*/admin/hr/staff/:id', () => ok(MOCK_ADMIN_STAFF[0])),
  http.post('*/admin/hr/staff', () => ok(MOCK_ADMIN_STAFF[0])),
  http.patch('*/admin/hr/staff/:id', () => ok(MOCK_ADMIN_STAFF[0])),
  http.delete('*/admin/hr/staff/:id', () => ok(null)),
  http.post('*/admin/hr/staff/bulk-deactivate', () => ok(null)),
  http.get('*/admin/hr/payrolls', ({ request }) => { const url=new URL(request.url); const month=url.searchParams.get('month'); const status=url.searchParams.get('status'); const all=MOCK_ADMIN_PAYROLLS_EXPANDED.filter(p => (!month || p.month===month) && (!status || status==='all' || p.status===status)); return ok({ payrolls: all, total: all.length }); }),
  http.post('*/admin/hr/payrolls', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.patch('*/admin/hr/payrolls/:id', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.patch('*/admin/hr/payrolls/:id/status', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.get('*/admin/hr/summary', () => ok(MOCK_ADMIN_HR_SUMMARY)),
  http.get('*/admin/hr/staff/:id/ledger', () => ok(MOCK_ADMIN_LEDGER)),
  http.post('*/admin/hr/advances', () => ok(null)),
  http.post('*/admin/hr/dues/pay', () => ok(null)),
  http.get('*/admin/hr/performance', () => ok(MOCK_ADMIN_STAFF_PERFORMANCE))
];
