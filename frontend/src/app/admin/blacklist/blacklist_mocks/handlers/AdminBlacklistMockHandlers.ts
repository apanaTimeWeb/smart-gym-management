// RESPONSIBILITY: Owns MSW handlers for the Admin blacklist feature.
// DATA FLOW: blacklist API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_BLACKLIST_EXPANDED, MOCK_BLACKLIST_KPI } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockFixtures';

export const adminBlacklistMockHandlers = [
  http.get('*/admin/blacklist/fetchBlacklist', ({ request }) => { const url = new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const active=url.searchParams.get('isActive'); const all=MOCK_BLACKLIST_EXPANDED.filter(x => (!search || `${x.memberName} ${x.memberEmail} ${x.memberId}`.toLowerCase().includes(search)) && (!active || active === 'all' || String(x.isActive) === active)); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.get('*/admin/blacklist/fetchKPIs', () => ok(MOCK_BLACKLIST_KPI)),
  http.post('*/admin/blacklist/addToBlacklist', () => ok(null, 'Member added to blacklist')),
  http.delete('*/admin/blacklist/removeFromBlacklist', () => ok(null, 'Member removed from blacklist')),
  http.post('*/admin/blacklist/toggleBlacklist', () => ok(null, 'Blacklist status updated')),
  http.post('*/admin/blacklist/propagateToAllBranches', () => ok(null, 'Blacklist propagated'))
];
