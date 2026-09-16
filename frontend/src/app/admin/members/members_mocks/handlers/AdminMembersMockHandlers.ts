// RESPONSIBILITY: Owns MSW handlers for the Admin members feature.
// DATA FLOW: members API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_ADMIN_MEMBERS, MOCK_ADMIN_MEMBERS_EXPANDED, MOCK_ADMIN_MEMBERS_SUMMARY } from '@/app/admin/members/members_mocks/fixtures/AdminMembersMockFixtures';

export const adminMembersMockHandlers = [
  // --- Members ---
  http.get('*/admin/members', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const status=url.searchParams.get('status'); const branchId=url.searchParams.get('branchId'); const expiry=url.searchParams.get('expiryFilter'); const gender=url.searchParams.get('gender'); const plan=url.searchParams.get('plan'); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const all=MOCK_ADMIN_MEMBERS_EXPANDED.filter(m => (!search || `${m.name} ${m.email} ${m.phone}`.toLowerCase().includes(search)) && (!status || status==='all' || m.status===status) && (!branchId || branchId==='all' || m.branchId===branchId) && (!gender || gender==='all' || m.gender===gender) && (!plan || plan==='all' || m.planName.toLowerCase().includes(plan.toLowerCase().replace('starter','basic').replace('pro','pro'))) && (!expiry || expiry==='all')); return paged(all,page,limit); }),
  http.get('*/admin/members/summary', () => ok(MOCK_ADMIN_MEMBERS_SUMMARY)),
  http.get('*/admin/members/list', ({ request }) => { const url=new URL(request.url); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(MOCK_ADMIN_MEMBERS_EXPANDED,page,limit); }),
  http.post('*/admin/members', () => ok(MOCK_ADMIN_MEMBERS[0])),
  http.patch('*/admin/members/:id', () => ok(MOCK_ADMIN_MEMBERS[0])),
  http.delete('*/admin/members/:id', () => ok(null)),
  http.post('*/admin/members/:id/renew', () => ok(null))
];
