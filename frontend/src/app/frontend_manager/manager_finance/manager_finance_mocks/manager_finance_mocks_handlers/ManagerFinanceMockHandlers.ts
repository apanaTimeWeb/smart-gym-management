import { http, HttpResponse } from 'msw';
import { MANAGER_FINANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceConstants';
import { MOCK_PAYMENTS, MOCK_FINANCE_SUMMARY } from '@/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_fixtures/ManagerFinanceMockData';
import { ManagerFinanceUrlConfig } from '@/app/frontend_manager/manager_finance/manager_finance_url_config';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import type { Payment } from '@/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceTypes';


let mockPayments = [...MOCK_PAYMENTS];

export let mockPaymentIdCounter = 1000;
/**
 * @description Provides the ManagerFinanceMockHandlers implementation for the finance module.
 * @dependencies @/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_fixtures/ManagerFinanceMockData; @/app/frontend_manager/manager_finance/manager_finance_url_config; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerFinanceMockState(): void {
  mockPayments = [...MOCK_PAYMENTS];
  mockPaymentIdCounter = 1000;
}

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
      return (!search || text.includes(search)) && (!status || status === MANAGER_FINANCE_STATUS_VALUES.ALL || payment.status === status) && (!method || method === 'all' || payment.method.toLowerCase() === method);
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
