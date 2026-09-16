// RESPONSIBILITY: Owns MSW handlers for the Admin plans feature.
// DATA FLOW: plans API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_ADMIN_PLANS, MOCK_ADMIN_PLAN_REVENUE } from '@/app/admin/plans/plans_mocks/fixtures/AdminPlansMockFixtures';

export const adminPlansMockHandlers = [
  http.get('*/admin/plans/fetchAllPlans', ({ request }) => { const url = new URL(request.url); const status = url.searchParams.get('status'); const search = (url.searchParams.get('search') ?? '').toLowerCase(); const data = MOCK_ADMIN_PLANS.filter(p => (!search || p.name.toLowerCase().includes(search)) && (!status || status === 'all' || (status === 'active' ? p.isActive : !p.isActive))); return ok(data); }),
  http.get('*/admin/plans/fetchPlanById', () => ok(MOCK_ADMIN_PLANS[0]!)),
  http.post('*/admin/plans/createPlan', () => ok(MOCK_ADMIN_PLANS[0]!, 'Plan created')),
  http.post('*/admin/plans/updatePlan', () => ok(MOCK_ADMIN_PLANS[0]!, 'Plan updated')),
  http.delete('*/admin/plans/deletePlan', () => ok(null, 'Plan deleted')),
  http.get('*/admin/plans/fetchPlanRevenue', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')||'').toLowerCase(); const sortKey=url.searchParams.get('sortKey')||'totalRevenue'; const sortDir=url.searchParams.get('sortDir')||'desc'; const page=Math.max(1,Number(url.searchParams.get('page'))||1); const limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const filtered=MOCK_ADMIN_PLAN_REVENUE.filter(r=>!search||`${r.planName} ${r.tier}`.toLowerCase().includes(search)); const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if(typeof av==='number'&&typeof bv==='number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1);}); return paged(sorted,page,limit); })
];
