// RESPONSIBILITY: Owns MSW handlers for the Admin finance feature.
// DATA FLOW: finance API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_ADMIN_BRANCH_PNL, MOCK_ADMIN_EXPENSES, MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS_EXPANDED } from '@/app/admin/finance/finance_mocks/fixtures/AdminFinanceMockFixtures';
import type { Payment } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

const financePaymentsState: Payment[] = structuredClone(MOCK_ADMIN_PAYMENTS_EXPANDED);

export const adminFinanceMockHandlers = [
  http.get('*/admin/finance/payments/fetchPayments', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const method=(url.searchParams.get('method')??'').toLowerCase().replaceAll('_',''); const status=(url.searchParams.get('status')??'').toLowerCase(); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const filtered=financePaymentsState.filter(p => (!search || `${p.member?.name || ''} ${p.invoiceNo || ''}`.toLowerCase().includes(search)) && (!method || method==='all' || p.method.toLowerCase().replaceAll(' ','')===method || (p.paymentMode || '').toLowerCase().replaceAll('_','')===method) && (!status || status==='all' || (status==='due' ? p.status==='PENDING' : p.status.toLowerCase()===status))); const start=(page-1)*limit; return HttpResponse.json({ success:true,message:'Success',data:{payments:filtered.slice(start,start+limit),total:filtered.length},meta:{total:filtered.length,page,limit,totalPages:Math.max(1,Math.ceil(filtered.length/limit))}}); }),
  http.post('*/admin/finance/payments/createPayment', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const payment: Payment = {
      id: String(body.id ?? `pay-demo-${Date.now()}`),
      memberId: String(body.memberId ?? ''),
      amount: Number(body.amount ?? 0),
      method: String(body.method ?? 'UPI') as Payment['method'],
      paymentMode: String(body.paymentMode ?? 'UPI') as Payment['paymentMode'],
      status: String(body.status ?? 'COMPLETED') as Payment['status'],
      invoiceNo: String(body.invoiceNo ?? `INV-DEMO-${Date.now()}`),
      paidAt: String(body.paidAt ?? new Date().toISOString()),
      member: typeof body.member === 'object' && body.member !== null ? body.member as Payment['member'] : undefined,
    };
    financePaymentsState.unshift(payment);
    return ok(payment, 'Payment recorded');
  }),
  http.get('*/admin/finance/summary', () => ok(MOCK_ADMIN_FINANCE_SUMMARY)),
  // Endpoint is owned by FinanceUrlConfig.BACKEND_API.PNL_COMPARISON ('/admin/finance/pnl').
  http.get('*/admin/finance/pnl', () => ok(MOCK_ADMIN_BRANCH_PNL)),
  http.get('*/admin/finance/payments/fetchExpenses', () => ok(MOCK_ADMIN_EXPENSES))
];
