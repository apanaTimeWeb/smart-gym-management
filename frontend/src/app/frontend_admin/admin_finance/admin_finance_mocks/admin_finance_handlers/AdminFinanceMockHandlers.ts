// RESPONSIBILITY: Owns MSW handlers for the Admin finance feature.
import { FINANCE_RECORD_STATUSES, FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
// DATA FLOW: finance API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/admin_finance_url_config';

const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data });

import { MOCK_ADMIN_EXPENSES, MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS_EXPANDED } from '@/app/frontend_admin/admin_finance/admin_finance_mocks/admin_finance_fixtures/AdminFinanceMockFixtures';
import { getAdminFinancePnlFixtureByPeriod } from '@/app/frontend_admin/admin_finance/admin_finance_mocks/admin_finance_fixtures/AdminFinancePnlFixtureByPeriod';
import type { Payment } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';


const financePaymentsState: Payment[] = structuredClone(MOCK_ADMIN_PAYMENTS_EXPANDED);

export const adminFinanceMockHandlers = [
  http.get(`*${ADMIN_FINANCE_API.payments}`, ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const method=(url.searchParams.get('method')??'').toLowerCase().replaceAll('_',''); const status=(url.searchParams.get('status')??'').toLowerCase(); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const filtered=financePaymentsState.filter(p => (!search || `${p.member?.name || ''} ${p.invoiceNo || ''}`.toLowerCase().includes(search)) && (!method || method==='all' || p.method.toLowerCase().replaceAll(' ','')===method || (p.paymentMode || '').toLowerCase().replaceAll('_','')===method) && (!status || status==='all' || (status==='due' ? p.status===FINANCE_RECORD_STATUSES.PENDING : p.status.toLowerCase()===status))); const start=(page-1)*limit; return HttpResponse.json({ success:true,message:'Success',data:{payments:filtered.slice(start,start+limit),total:filtered.length},meta:{total:filtered.length,page,limit,totalPages:Math.max(1,Math.ceil(filtered.length/limit)),hasNextPage:page<Math.max(1,Math.ceil(filtered.length/limit)),hasPrevPage:page>1}}); }),
  http.get(`*${ADMIN_FINANCE_API.summary}`, () => ok(MOCK_ADMIN_FINANCE_SUMMARY)),
  // Endpoint is owned by ADMIN_FINANCE_API.pnlComparison ('/admin/finance/pnl').
  http.get(`*${ADMIN_FINANCE_API.pnlComparison}`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') ?? 'THIS_MONTH';
    const status = url.searchParams.get('status');
    const sortKey = url.searchParams.get('sortKey') ?? 'netProfit';
    const sortDir = url.searchParams.get('sortDir') ?? 'desc';
    const data = getAdminFinancePnlFixtureByPeriod(period as Parameters<typeof getAdminFinancePnlFixtureByPeriod>[0]);
    const filtered = status && status !== 'ALL' ? data.filter((branch) => branch.status === status) : data;
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortKey as keyof typeof a];
      const bValue = b[sortKey as keyof typeof b];
      if (typeof aValue === 'number' && typeof bValue === 'number') return sortDir === 'asc' ? aValue - bValue : bValue - aValue;
      return String(aValue ?? '').localeCompare(String(bValue ?? '')) * (sortDir === 'asc' ? 1 : -1);
    });
    return ok(sorted);
  }),
  http.get(`*${ADMIN_FINANCE_API.expenses}`, ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId');
    const category = url.searchParams.get('category');
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 8);
    const filtered = MOCK_ADMIN_EXPENSES.filter((expense) =>
      (!branchId || branchId === 'all' || expense.branchId === branchId) &&
      (!category || category === 'All' || expense.category === category),
    );
    const totalAmount = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    const start = (page - 1) * limit;
    const pageData = filtered.slice(start, start + limit);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    return HttpResponse.json({ success: true, message: 'Success', data: { expenses: pageData, total: filtered.length, totalAmount }, meta: { total: filtered.length, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 } });
  })
];
