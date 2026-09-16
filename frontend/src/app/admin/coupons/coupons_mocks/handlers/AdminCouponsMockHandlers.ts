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
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_COUPONS_EXPANDED } from '@/app/admin/coupons/coupons_mocks/fixtures/AdminCouponsMockFixtures';

export const adminCouponsMockHandlers = [
  http.get('*/admin/coupons/fetchCoupons', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const status=url.searchParams.get('status'); const dateRange=url.searchParams.get('dateRange'); const all=MOCK_COUPONS_EXPANDED.filter(c => (!search || `${c.code} ${c.description}`.toLowerCase().includes(search)) && (!status || status === 'all' || c.status===status) && (!dateRange || dateRange==='all_time' || (dateRange==='today' && c.validFrom <= '2026-09-16' && c.validUntil >= '2026-09-16') || (dateRange==='this_month' && c.validFrom.startsWith('2026-09')) || (dateRange==='this_week' && c.validFrom >= '2026-09-10'))); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.post('*/admin/coupons/createCoupon', () => ok(null, 'Coupon created')),
  http.post('*/admin/coupons/updateCoupon', () => ok(null, 'Coupon updated')),
  http.delete('*/admin/coupons/deleteCoupon', () => ok(null, 'Coupon deleted')),
  http.post('*/admin/coupons/toggleCoupon', () => ok(null, 'Coupon status updated'))
];
