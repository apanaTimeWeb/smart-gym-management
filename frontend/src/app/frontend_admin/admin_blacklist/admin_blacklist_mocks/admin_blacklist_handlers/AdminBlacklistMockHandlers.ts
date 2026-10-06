// RESPONSIBILITY: Owns MSW handlers for the Admin blacklist feature.
import { StatusCodes } from 'http-status-codes';
// DATA FLOW: blacklist API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

import type { AdminBlacklistJsonObject, BlacklistRecord } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminBlacklistJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminBlacklistJsonObject : {};
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

import type { BlacklistedMember } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
import { getAdminBlacklistMockState } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_mocks/admin_blacklist_fixtures/AdminBlacklistMockState';

const gymNameByGymId: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };

/**
 * gymNamesFor is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function gymNamesFor(ids: string[]): { ids: string[]; names: string[] } {
  const mapped = ids.map((id) => ({ id, name: id === 'all' ? 'All Gyms' : (gymNameByGymId[id] ?? id) }));
  return { ids: mapped.map((g) => g.id), names: mapped.map((g) => g.name) };
}

/**
 * buildBlacklistRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildBlacklistRecord(input: AdminBlacklistJsonObject): BlacklistRecord {
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
  http.get('*/admin/blacklist', ({ request }) => { const url = new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const active=url.searchParams.get('isActive'); const scope=url.searchParams.get('scope'); const gymId=url.searchParams.get('gymId'); const all=getAdminBlacklistMockState().filter(x => (!search || `${x.memberName} ${x.memberEmail} ${x.memberId}`.toLowerCase().includes(search)) && (!active || active === 'all' || String(x.isActive) === active) && (!scope || scope === 'all' || x.scope === scope) && (!gymId || gymId === 'all' || x.assignedGyms.includes(gymId) || x.scope === 'global')); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.get('*/admin/blacklist/kpis', () => ok({
    totalBlacklisted: getAdminBlacklistMockState().filter((entry) => entry.isActive).length,
    globalBans: getAdminBlacklistMockState().filter((entry) => entry.isActive && entry.scope === 'global').length,
    gymSpecificBans: getAdminBlacklistMockState().filter((entry) => entry.isActive && entry.scope === 'specific').length,
    addedThisMonth: getAdminBlacklistMockState().filter((entry) => entry.blacklistedAt.startsWith(new Date().toISOString().slice(0, 7))).length,
  })),
  http.post('*/admin/blacklist', async ({ request }) => {
    const record = buildBlacklistRecord(asRecord(await parseRequestBody(request)));
    getAdminBlacklistMockState().unshift(record);
    return ok(record, 'Member added to blacklist');
  }),
  http.delete('*/admin/blacklist/:id/remove', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const id = new URL(request.url).pathname.split('/').filter(Boolean).slice(-1)[0] ?? '';
    const index = getAdminBlacklistMockState().findIndex((entry) => entry.id === id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    getAdminBlacklistMockState().splice(index, 1);
    return ok(null, 'Member removed from blacklist');
  }),
  http.patch('*/admin/blacklist/:id', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const id = new URL(request.url).pathname.split('/').filter(Boolean).slice(-1)[0] ?? '';
    const record = getAdminBlacklistMockState().find((entry) => entry.id === id);
    if (!record) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    record.isActive = !record.isActive;
    return ok(record, 'Blacklist status updated');
  }),
  http.patch('*/admin/blacklist/:id/propagate', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const id = new URL(request.url).pathname.split('/').filter(Boolean).slice(-1)[0] ?? '';
    const record = getAdminBlacklistMockState().find((entry) => entry.id === id);
    if (!record) return HttpResponse.json({ success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    record.scope = 'global';
    record.assignedGyms = ['all'];
    record.assignedGymNames = ['All Gyms'];
    return ok(record, 'Blacklist propagated');
  })
];
