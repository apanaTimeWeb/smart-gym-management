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

import { MOCK_BLACKLIST_EXPANDED } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockFixtures';

type BlacklistRecord = typeof MOCK_BLACKLIST_EXPANDED[number];
const gymNameByGymId: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };

function gymNamesFor(ids: string[]): { ids: string[]; names: string[] } {
  const mapped = ids.map((id) => ({ id, name: id === 'all' ? 'All Gyms' : (gymNameByGymId[id] ?? id) }));
  return { ids: mapped.map((g) => g.id), names: mapped.map((g) => g.name) };
}

function buildBlacklistRecord(input: JsonObject): BlacklistRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : ['all'];
  const names = gymNamesFor(gyms);
  return {
    id: `bl${Date.now()}`,
    memberId: String(input.memberId ?? `M${Date.now()}`),
    memberName: String(input.memberName ?? 'Unknown member'),
    memberPhone: String(input.memberPhone ?? ''),
    memberEmail: String(input.memberEmail ?? ''),
    reason: String(input.reason ?? 'Policy violation'),
    blacklistedBy: 'Admin',
    blacklistedAt: new Date().toISOString().slice(0, 10),
    scope: input.scope === 'specific' ? 'specific' : 'global',
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    isActive: true,
  };
}

export const adminBlacklistMockHandlers = [
  http.get('*/admin/blacklist/fetchBlacklist', ({ request }) => { const url = new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const active=url.searchParams.get('isActive'); const all=MOCK_BLACKLIST_EXPANDED.filter(x => (!search || `${x.memberName} ${x.memberEmail} ${x.memberId}`.toLowerCase().includes(search)) && (!active || active === 'all' || String(x.isActive) === active)); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.get('*/admin/blacklist/fetchKPIs', () => ok({
    totalBlacklisted: MOCK_BLACKLIST_EXPANDED.filter((entry) => entry.isActive).length,
    globalBans: MOCK_BLACKLIST_EXPANDED.filter((entry) => entry.isActive && entry.scope === 'global').length,
    gymSpecificBans: MOCK_BLACKLIST_EXPANDED.filter((entry) => entry.isActive && entry.scope === 'specific').length,
    addedThisMonth: MOCK_BLACKLIST_EXPANDED.filter((entry) => entry.blacklistedAt.startsWith(new Date().toISOString().slice(0, 7))).length,
  })),
  http.post('*/admin/blacklist/addToBlacklist', async ({ request }) => {
    const record = buildBlacklistRecord(asRecord(await parseRequestBody(request)));
    MOCK_BLACKLIST_EXPANDED.unshift(record);
    return ok(record, 'Member added to blacklist');
  }),
  http.delete('*/admin/blacklist/removeFromBlacklist', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = MOCK_BLACKLIST_EXPANDED.findIndex((entry) => entry.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: 404 });
    MOCK_BLACKLIST_EXPANDED.splice(index, 1);
    return ok(null, 'Member removed from blacklist');
  }),
  http.post('*/admin/blacklist/toggleBlacklist', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = MOCK_BLACKLIST_EXPANDED.find((entry) => entry.id === String(body.id));
    if (!record) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: 404 });
    record.isActive = !record.isActive;
    return ok(record, 'Blacklist status updated');
  }),
  http.post('*/admin/blacklist/propagateToAllBranches', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = MOCK_BLACKLIST_EXPANDED.find((entry) => entry.id === String(body.id));
    if (!record) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: 404 });
    record.scope = 'global';
    record.assignedGyms = ['all'];
    record.assignedGymNames = ['All Gyms'];
    return ok(record, 'Blacklist propagated');
  })
];
