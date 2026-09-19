import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { ManagerFinanceUrlConfig } from '@/app/manager/finance/finance_url_config';
import { MOCK_PAYMENTS, MOCK_FINANCE_SUMMARY } from '@/app/manager/finance/finance_fixtures/ManagerFinanceMockData';
import type { Payment } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';

let mockPayments = [...MOCK_PAYMENTS];

export let mockPaymentIdCounter = 1000;
export const managerFinanceHandlers = [
  http.get(managerMockApiUrl(ManagerFinanceUrlConfig.BACKEND_API.EXPORT), ({ request }) => {
    const format = new URL(request.url).searchParams.get('format') || 'csv';
    const csv = 'date,member,amount\n2026-09-19,Demo Member,1000';
    const exportUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(format === 'pdf' ? `Mock Finance PDF Export\n\n${csv}` : csv)}`;
    return HttpResponse.json({ success: true, message: 'Export prepared', data: { url: exportUrl } });
  }),
  http.get(managerMockApiUrl(ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const method = (url.searchParams.get('method') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockPayments.filter((payment) => {
      const text = [payment.invoiceNumber, payment.member?.name, payment.method].filter(Boolean).join(' ').toLowerCase();
      return (!search || text.includes(search)) && (!status || status === 'ALL' || payment.status === status) && (!method || method === 'all' || payment.method.toLowerCase() === method);
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { payments: filtered.slice(start, start + limit), total: filtered.length } });
  }),

  http.post(managerMockApiUrl(ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Payment>;
    const newPayment = { ...mockPayments[0], ...body, id: `pay-${mockPaymentIdCounter++}` } as Payment;
    mockPayments = [newPayment, ...mockPayments];
    return HttpResponse.json({ success: true, message: 'Success', data: newPayment });
  }),

  http.get(managerMockApiUrl(ManagerFinanceUrlConfig.BACKEND_API.SUMMARY), () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_FINANCE_SUMMARY });
  }),

  http.get(managerMockApiUrl(ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BY_MEMBER(':memberId')), ({ params }) => {
    const filtered = mockPayments.filter(p => p.memberId === params.memberId);
    return HttpResponse.json({ success: true, message: 'Success', data: filtered });
  }),
];
