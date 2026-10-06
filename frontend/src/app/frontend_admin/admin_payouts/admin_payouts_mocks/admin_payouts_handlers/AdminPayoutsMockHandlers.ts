import { PAYOUT_STATUS_VALUES } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';
// RESPONSIBILITY: Owns MSW handlers for the Admin payouts feature.
// DATA FLOW: payouts API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

import type { AdminPayoutsJsonObject } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsMockHandlerTypes';
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
function asRecord(value: unknown): AdminPayoutsJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminPayoutsJsonObject : {};
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

import { MOCK_PAYOUTS, MOCK_PNL } from '@/app/frontend_admin/admin_payouts/admin_payouts_mocks/admin_payouts_fixtures/AdminPayoutsMockFixtures';

export const adminPayoutsMockHandlers = [
  http.get('*/admin/payouts', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month'); const gymId = url.searchParams.get('gymId'); const status = url.searchParams.get('status');
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1); const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const sortKey = url.searchParams.get('sortKey') || 'month'; const sortDir = url.searchParams.get('sortDir') || 'desc';
    const filtered = MOCK_PAYOUTS.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId) && (!status || status === 'all' || p.payoutStatus === status));
    const sorted = [...filtered].sort((a,b) => { const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if (typeof av === 'number' && typeof bv === 'number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1); });
    const start = (page - 1) * limit; const data = sorted.slice(start, start + limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total: sorted.length, page, limit, totalPages: Math.max(1, Math.ceil(sorted.length / limit)), hasNextPage: page < Math.max(1, Math.ceil(sorted.length / limit)), hasPrevPage: page > 1 } });
  }),
  http.get('*/admin/payouts/pnl', ({ request }) => { const url = new URL(request.url); const month=url.searchParams.get('month'); const gymId=url.searchParams.get('gymId'); const sortKey=url.searchParams.get('sortKey')||'netProfit'; const sortDir=url.searchParams.get('sortDir')||'desc'; const filtered=MOCK_PNL.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId)); const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if(typeof av==='number'&&typeof bv==='number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1);}); return ok(sorted); }),
  http.get('*/admin/payouts/kpis', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const gymId = url.searchParams.get('gymId');
    const filtered = MOCK_PAYOUTS.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId));
    return ok({
      totalNetProfit: filtered.reduce((sum, item) => sum + item.netProfit, 0),
      totalGrossRevenue: filtered.reduce((sum, item) => sum + item.grossRevenue, 0),
      totalExpenses: filtered.reduce((sum, item) => sum + item.staffPayroll + item.operationalExpenses + item.platformFee, 0),
      pendingPayouts: filtered.filter(item => item.payoutStatus === PAYOUT_STATUS_VALUES.PENDING).length,
    });
  })
];
