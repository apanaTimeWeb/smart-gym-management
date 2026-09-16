// RESPONSIBILITY: Owns MSW handlers for the Admin payouts feature.
// DATA FLOW: payouts API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_PAYOUTS, MOCK_PNL } from '@/app/admin/payouts/payouts_mocks/fixtures/AdminPayoutsMockFixtures';

export const adminPayoutsMockHandlers = [
  http.get('*/admin/payouts/fetchPayouts', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month'); const gymId = url.searchParams.get('gymId'); const status = url.searchParams.get('status');
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1); const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const sortKey = url.searchParams.get('sortKey') || 'month'; const sortDir = url.searchParams.get('sortDir') || 'desc';
    const filtered = MOCK_PAYOUTS.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId) && (!status || p.payoutStatus === status));
    const sorted = [...filtered].sort((a,b) => { const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if (typeof av === 'number' && typeof bv === 'number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1); });
    const start = (page - 1) * limit; const data = sorted.slice(start, start + limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total: sorted.length, page, limit, totalPages: Math.max(1, Math.ceil(sorted.length / limit)) } });
  }),
  http.get('*/admin/payouts/fetchPnL', ({ request }) => { const url = new URL(request.url); const month=url.searchParams.get('month'); const gymId=url.searchParams.get('gymId'); const sortKey=url.searchParams.get('sortKey')||'netProfit'; const sortDir=url.searchParams.get('sortDir')||'desc'; const filtered=MOCK_PNL.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId)); const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if(typeof av==='number'&&typeof bv==='number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1);}); return ok(sorted); }),
  http.get('*/admin/payouts/fetchKPIs', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const gymId = url.searchParams.get('gymId');
    const filtered = MOCK_PAYOUTS.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId));
    return ok({
      totalNetProfit: filtered.reduce((sum, item) => sum + item.netProfit, 0),
      totalGrossRevenue: filtered.reduce((sum, item) => sum + item.grossRevenue, 0),
      totalExpenses: filtered.reduce((sum, item) => sum + item.staffPayroll + item.operationalExpenses + item.platformFee, 0),
      pendingPayouts: filtered.filter(item => item.payoutStatus === 'pending').length,
    });
  })
];
