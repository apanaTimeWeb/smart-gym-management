// RESPONSIBILITY: Owns MSW handlers for the Admin sales feature.
// DATA FLOW: sales API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_SALES_REFERRALS } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockFixtures';

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

import { MOCK_ADMIN_ALL_MEMBERSHIPS, MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS, MOCK_ADMIN_PENDING_PAYMENTS, MOCK_ADMIN_SALES_OVERVIEW } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockFixtures';

// Endpoints are owned by SalesUrlConfig.BACKEND_API.
// Response payloads are wrapped in the exact shapes AdminSalesApi validates:
// overview -> { monthlyRevenue }, membership-report -> { report, totals },
// pending-payments/all-memberships -> { members, total }.
function queryOf(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
  const search = (url.searchParams.get('search') ?? '').toLowerCase();
  return { page, limit, search };
}

function matchesSearch(values: unknown[], search: string): boolean {
  if (!search) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(search));
}

function slicePayload<T>(rows: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return { rows: rows.slice(start, start + limit), total: rows.length };
}

export const adminSalesMockHandlers = [
  http.get('*/admin/sales/referral-sources', () => ok(MOCK_ADMIN_SALES_REFERRALS)),
  http.get('*/admin/sales/overview', () => ok({ monthlyRevenue: MOCK_ADMIN_SALES_OVERVIEW })),
  http.get('*/admin/sales/membership-report', () => ok({ report: MOCK_ADMIN_MEMBERSHIP_REPORT, totals: MOCK_ADMIN_MEMBERSHIP_TOTALS })),
  http.get('*/admin/sales/pending-payments', ({ request }) => {
    const { page, limit, search } = queryOf(request);
    const filtered = MOCK_ADMIN_PENDING_PAYMENTS.filter((member) => matchesSearch([member.name, member.email, member.phone, member.plan], search));
    const { rows, total } = slicePayload(filtered, page, limit);
    return ok({ members: rows, total }, 'Sales pending payments fetched');
  }),
  http.get('*/admin/sales/all-memberships', ({ request }) => {
    const { page, limit, search } = queryOf(request);
    const filtered = MOCK_ADMIN_ALL_MEMBERSHIPS.filter((member) => matchesSearch([member.name, member.email, member.phone, member.plan?.name], search));
    const { rows, total } = slicePayload(filtered, page, limit);
    return ok({ members: rows, total }, 'Sales all memberships fetched');
  })
];
