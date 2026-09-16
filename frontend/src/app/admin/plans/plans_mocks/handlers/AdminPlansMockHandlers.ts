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

type PlanRecord = typeof MOCK_ADMIN_PLANS[number];

function toNumber(value: unknown, fallback = 0): number { const n = Number(value); return Number.isFinite(n) ? n : fallback; }

function buildPlanRecord(input: JsonObject): PlanRecord {
  return {
    id: `p${Date.now()}`,
    name: String(input.name ?? 'New Plan'),
    tier: String(input.tier ?? 'Bronze'),
    price1Month: toNumber(input.price1Month),
    price3Month: toNumber(input.price3Month),
    price6Month: toNumber(input.price6Month),
    price12Month: toNumber(input.price12Month),
    features: Array.isArray(input.features) ? (input.features as string[]) : [],
    isActive: input.isActive === undefined ? true : Boolean(input.isActive),
    freezeAllowed: input.freezeAllowed === undefined ? false : Boolean(input.freezeAllowed),
    joiningFee: input.joiningFee !== undefined ? toNumber(input.joiningFee) : undefined,
    ptSessionsIncluded: input.ptSessionsIncluded !== undefined ? toNumber(input.ptSessionsIncluded) : undefined,
    taxRate: input.taxRate !== undefined ? toNumber(input.taxRate) : undefined,
  };
}

function applyPlanUpdate(record: PlanRecord, input: JsonObject): PlanRecord {
  return {
    ...record,
    name: input.name !== undefined ? String(input.name) : record.name,
    tier: input.tier !== undefined ? String(input.tier) : record.tier,
    price1Month: input.price1Month !== undefined ? toNumber(input.price1Month, record.price1Month) : record.price1Month,
    price3Month: input.price3Month !== undefined ? toNumber(input.price3Month, record.price3Month) : record.price3Month,
    price6Month: input.price6Month !== undefined ? toNumber(input.price6Month, record.price6Month) : record.price6Month,
    price12Month: input.price12Month !== undefined ? toNumber(input.price12Month, record.price12Month) : record.price12Month,
    features: Array.isArray(input.features) ? (input.features as string[]) : record.features,
    isActive: input.isActive !== undefined ? Boolean(input.isActive) : record.isActive,
    freezeAllowed: input.freezeAllowed !== undefined ? Boolean(input.freezeAllowed) : record.freezeAllowed,
    joiningFee: input.joiningFee !== undefined ? toNumber(input.joiningFee) : record.joiningFee,
    ptSessionsIncluded: input.ptSessionsIncluded !== undefined ? toNumber(input.ptSessionsIncluded) : record.ptSessionsIncluded,
    taxRate: input.taxRate !== undefined ? toNumber(input.taxRate) : record.taxRate,
  };
}

export const adminPlansMockHandlers = [
  http.get('*/admin/plans/fetchAllPlans', ({ request }) => { const url = new URL(request.url); const status = url.searchParams.get('status'); const search = (url.searchParams.get('search') ?? '').toLowerCase(); const data = MOCK_ADMIN_PLANS.filter(p => (!search || p.name.toLowerCase().includes(search)) && (!status || status === 'all' || (status === 'active' ? p.isActive : !p.isActive))); return ok(data); }),
  http.get('*/admin/plans/fetchPlanById', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = MOCK_ADMIN_PLANS.find((p) => p.id === String(body.id)) ?? MOCK_ADMIN_PLANS[0];
    return ok(record!);
  }),
  http.post('*/admin/plans/createPlan', async ({ request }) => {
    const record = buildPlanRecord(asRecord(await parseRequestBody(request)));
    MOCK_ADMIN_PLANS.push(record);
    return ok(record, 'Plan created');
  }),
  http.post('*/admin/plans/updatePlan', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = MOCK_ADMIN_PLANS.findIndex((p) => p.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Plan not found' }, { status: 404 });
    const updated = applyPlanUpdate(MOCK_ADMIN_PLANS[index]!, body);
    MOCK_ADMIN_PLANS[index] = updated;
    return ok(updated, 'Plan updated');
  }),
  http.delete('*/admin/plans/deletePlan', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = MOCK_ADMIN_PLANS.findIndex((p) => p.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Plan not found' }, { status: 404 });
    MOCK_ADMIN_PLANS.splice(index, 1);
    return ok(null, 'Plan deleted');
  }),
  http.get('*/admin/plans/fetchPlanRevenue', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')||'').toLowerCase(); const sortKey=url.searchParams.get('sortKey')||'totalRevenue'; const sortDir=url.searchParams.get('sortDir')||'desc'; const page=Math.max(1,Number(url.searchParams.get('page'))||1); const limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const filtered=MOCK_ADMIN_PLAN_REVENUE.filter(r=>!search||`${r.planName} ${r.tier}`.toLowerCase().includes(search)); const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey as keyof typeof a]; const bv=b[sortKey as keyof typeof b]; if(typeof av==='number'&&typeof bv==='number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1);}); return paged(sorted,page,limit); })
];
