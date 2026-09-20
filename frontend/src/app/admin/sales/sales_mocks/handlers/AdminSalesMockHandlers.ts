// RESPONSIBILITY: Owns MSW handlers for the Admin sales feature.
// DATA FLOW: sales API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_SALES_REFERRALS, MOCK_ADMIN_SALES_OVERVIEW, MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS, MOCK_ADMIN_ALL_MEMBERSHIPS, MOCK_ADMIN_PENDING_PAYMENTS, MOCK_ADMIN_STORE_ORDERS, MOCK_ADMIN_STORE_PRODUCTS } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockFixtures';
import { SALES_MOCK_RANGE_MULTIPLIERS, SALES_MOCK_SINGLE_BRANCH_MULTIPLIER } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockConstants';
import { filterAdminSalesMembershipReportRows } from '@/app/admin/sales/sales_utils/AdminSalesFilterMembershipReportRows';

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};


// Endpoints are owned by SalesUrlConfig.BACKEND_API.
// Response payloads are wrapped in the exact shapes AdminSalesApi validates:
// overview -> { monthlyRevenue }, membership-report -> { report, totals },
// pending-payments/all-memberships -> { members, total }.
function queryOf(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
  const search = (url.searchParams.get('search') ?? '').toLowerCase();
  const branchId = url.searchParams.get('branchId') ?? undefined;
  const range = url.searchParams.get('range') ?? 'this_month';
  return { page, limit, search, branchId, range };
}

function matchesSearch(values: unknown[], search: string): boolean {
  if (!search) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(search));
}

function slicePayload<T>(rows: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return { rows: rows.slice(start, start + limit), total: rows.length };
}

function getSalesMultiplier(branchId: string | undefined, range: string): number {
  const rangeMultiplier = SALES_MOCK_RANGE_MULTIPLIERS[range as keyof typeof SALES_MOCK_RANGE_MULTIPLIERS] ?? SALES_MOCK_RANGE_MULTIPLIERS.this_month;
  return rangeMultiplier * (branchId ? SALES_MOCK_SINGLE_BRANCH_MULTIPLIER : 1);
}

function scaleOverview(range: string, branchId?: string) {
  const multiplier = getSalesMultiplier(branchId, range);
  return MOCK_ADMIN_SALES_OVERVIEW.map((point) => ({ ...point, revenue: Math.round(point.revenue * multiplier), newMembers: Math.round(point.newMembers * multiplier) }));
}

function scaleMembershipReport(range: string, branchId?: string) {
  const multiplier = getSalesMultiplier(branchId, range);
  const report = MOCK_ADMIN_MEMBERSHIP_REPORT.map((row) => ({
    ...row,
    totalMembers: Math.round((row.totalMembers ?? 0) * multiplier),
    activeMembers: Math.round((row.activeMembers ?? 0) * multiplier),
    revenue: Math.round((row.revenue ?? 0) * multiplier),
    receivable: Math.round((row.receivable ?? 0) * multiplier),
    received: Math.round((row.received ?? 0) * multiplier),
    remaining: Math.round((row.remaining ?? 0) * multiplier),
  }));
  const totals = {
    ...MOCK_ADMIN_MEMBERSHIP_TOTALS,
    activeCount: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.activeCount ?? 0) * multiplier),
    revenue: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.revenue ?? 0) * multiplier),
    totalReceivable: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.totalReceivable ?? 0) * multiplier),
    totalReceived: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.totalReceived ?? 0) * multiplier),
    remaining: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.remaining ?? 0) * multiplier),
    refunds: Math.round((MOCK_ADMIN_MEMBERSHIP_TOTALS.refunds ?? 0) * multiplier),
  };
  return { report, totals };
}

export const adminSalesMockHandlers = [
  http.get('*/admin/sales/referral-sources', ({ request }) => { const { branchId, range } = queryOf(request); const multiplier = getSalesMultiplier(branchId, range); return ok(MOCK_ADMIN_SALES_REFERRALS.map((item) => ({ ...item, revenue: Math.round(item.revenue * multiplier) }))); }),
  http.get('*/admin/sales/overview', ({ request }) => { const { branchId, range } = queryOf(request); return ok({ monthlyRevenue: scaleOverview(range, branchId) }); }),
  http.get('*/admin/sales/membership-report', ({ request }) => {
    const { branchId, range, search } = queryOf(request);
    const payload = scaleMembershipReport(range, branchId);
    const filteredReport = filterAdminSalesMembershipReportRows(payload.report, search);
    return ok({ ...payload, report: filteredReport }, 'Sales membership report fetched');
  }),
  http.get('*/admin/sales/pending-payments', ({ request }) => {
    const { page, limit, search } = queryOf(request);
    const filtered = MOCK_ADMIN_PENDING_PAYMENTS.filter((member) => matchesSearch([member.name, member.email, member.phone, member.plan], search));
    const { rows, total } = slicePayload(filtered, page, limit);
    return ok({ members: rows, total }, 'Sales pending payments fetched');
  }),

  http.get('*/admin/sales/store-orders', ({ request }) => {
    const { page, limit, search, branchId } = queryOf(request);
    const filtered = MOCK_ADMIN_STORE_ORDERS.filter((order) => matchesSearch([order.id, order.method, order.status, ...(order.items ?? []).map((item) => item.product.name)], search));
    const branchFiltered = branchId && branchId !== 'all' ? filtered.filter((_, index) => index % 2 === 0) : filtered;
    const { rows, total } = slicePayload(branchFiltered, page, limit);
    return ok({ orders: rows, total }, 'Sales store orders fetched');
  }),
  http.get('*/admin/sales/store-summary', ({ request }) => {
    const { branchId } = queryOf(request);
    const scopedOrders = branchId && branchId !== 'all' ? MOCK_ADMIN_STORE_ORDERS.filter((_, index) => index % 2 === 0) : MOCK_ADMIN_STORE_ORDERS;
    const totalRevenue = scopedOrders.reduce((sum, order) => sum + order.total, 0);
    return ok({ summary: { totalProducts: MOCK_ADMIN_STORE_PRODUCTS.length, totalOrders: scopedOrders.length, totalRevenue, lowStockProducts: MOCK_ADMIN_STORE_PRODUCTS.filter((product) => product.stock <= 10) } }, 'Sales store summary fetched');
  }),
  http.get('*/admin/sales/all-memberships', ({ request }) => {
    const { page, limit, search } = queryOf(request);
    const filtered = MOCK_ADMIN_ALL_MEMBERSHIPS.filter((member) => matchesSearch([member.name, member.email, member.phone, member.plan?.name], search));
    const { rows, total } = slicePayload(filtered, page, limit);
    return ok({ members: rows, total }, 'Sales all memberships fetched');
  })
];
