import { StatusCodes } from 'http-status-codes';
// RESPONSIBILITY: Owns MSW handlers for the Admin coupons feature.
// DATA FLOW: coupons API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { getAdminCouponsMockState } from '@/app/admin/coupons/coupons_mocks/fixtures/AdminCouponsMockState';

type CouponRecord = ReturnType<typeof getAdminCouponsMockState>[number];
const gymNameById: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };
const b = { 1: 'Andheri East', 2: 'Bandra West', 3: 'Powai', 4: 'Thane' } as Record<string, string>;

function toNumber(value: unknown, fallback = 0): number { const n = Number(value); return Number.isFinite(n) ? n : fallback; }

function gymNamesFor(ids: string[]): { ids: string[]; names: string[] } {
  const mapped = ids.map((id) => ({ id, name: id === 'all' ? 'All Gyms' : (gymNameById[id] ?? b[id.replace(/^b/, '')] ?? id) }));
  return { ids: mapped.map((g) => g.id), names: mapped.map((g) => g.name) };
}

function buildCouponRecord(input: JsonObject): CouponRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : ['all'];
  const names = gymNamesFor(gyms);
  return {
    id: `c${Date.now()}`,
    code: String(input.code ?? 'NEWCODE'),
    description: String(input.description ?? ''),
    type: input.type === 'flat' ? 'flat' : 'percentage',
    value: toNumber(input.value),
    minOrderAmount: toNumber(input.minOrderAmount),
    maxDiscount: toNumber(input.maxDiscount),
    usageLimit: toNumber(input.usageLimit),
    usedCount: 0,
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    validFrom: String(input.validFrom ?? '2026-01-01'),
    validUntil: String(input.validUntil ?? '2026-12-31'),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
}

function applyCouponUpdate(record: CouponRecord, input: JsonObject): CouponRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : record.assignedGyms;
  const names = gymNamesFor(gyms);
  return {
    ...record,
    code: input.code !== undefined ? String(input.code) : record.code,
    description: input.description !== undefined ? String(input.description) : record.description,
    type: input.type === 'flat' ? 'flat' : input.type === 'percentage' ? 'percentage' : record.type,
    value: input.value !== undefined ? toNumber(input.value, record.value) : record.value,
    minOrderAmount: input.minOrderAmount !== undefined ? toNumber(input.minOrderAmount, record.minOrderAmount) : record.minOrderAmount,
    maxDiscount: input.maxDiscount !== undefined ? toNumber(input.maxDiscount, record.maxDiscount) : record.maxDiscount,
    usageLimit: input.usageLimit !== undefined ? toNumber(input.usageLimit, record.usageLimit) : record.usageLimit,
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    validFrom: input.validFrom !== undefined ? String(input.validFrom) : record.validFrom,
    validUntil: input.validUntil !== undefined ? String(input.validUntil) : record.validUntil,
  };
}

export const adminCouponsMockHandlers = [
  http.get('*/admin/coupons/fetchCoupons', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const status=url.searchParams.get('status'); const dateRange=url.searchParams.get('dateRange'); const all=getAdminCouponsMockState().filter(c => (!search || `${c.code} ${c.description}`.toLowerCase().includes(search)) && (!status || status === 'all' || c.status===status) && (!dateRange || dateRange==='all_time' || (dateRange==='today' && c.validFrom <= '2026-09-16' && c.validUntil >= '2026-09-16') || (dateRange==='this_month' && c.validFrom.startsWith('2026-09')) || (dateRange==='this_week' && c.validFrom >= '2026-09-10'))); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.post('*/admin/coupons/createCoupon', async ({ request }) => {
    const record = buildCouponRecord(asRecord(await parseRequestBody(request)));
    getAdminCouponsMockState().unshift(record);
    return ok(record, 'Coupon created');
  }),
  http.post('*/admin/coupons/updateCoupon', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = getAdminCouponsMockState().findIndex((c) => c.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = applyCouponUpdate(getAdminCouponsMockState()[index]!, body);
    getAdminCouponsMockState()[index] = updated;
    return ok(updated, 'Coupon updated');
  }),
  http.delete('*/admin/coupons/deleteCoupon', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = getAdminCouponsMockState().findIndex((c) => c.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    getAdminCouponsMockState().splice(index, 1);
    return ok(null, 'Coupon deleted');
  }),
  http.post('*/admin/coupons/toggleCoupon', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = getAdminCouponsMockState().find((c) => c.id === String(body.id));
    if (!record) return HttpResponse.json({ success: false, message: 'Coupon not found' }, { status: StatusCodes.NOT_FOUND });
    record.status = record.status === 'active' ? 'inactive' : 'active';
    return ok(record, 'Coupon status updated');
  })
];
