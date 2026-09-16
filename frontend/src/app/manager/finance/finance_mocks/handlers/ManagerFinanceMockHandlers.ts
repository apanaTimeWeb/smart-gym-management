import { http, HttpResponse } from 'msw';
import { MOCK_PAYMENTS, MOCK_FINANCE_SUMMARY } from '@/app/manager/finance/finance_fixtures/ManagerFinanceMockData';
import type { Payment } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';

let mockPayments = [...MOCK_PAYMENTS];

export const managerFinanceHandlers = [
  http.get('http://localhost:5000/api/v1/manager/finance/payments', () => {
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: { payments: mockPayments, total: mockPayments.length }
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/finance/payments', async ({ request }) => {
    const body = await request.json() as Partial<Payment>;
    const newPayment = { ...mockPayments[0], ...body, id: `pay-${Date.now()}` } as Payment;
    mockPayments = [newPayment, ...mockPayments];
    return HttpResponse.json({ success: true, message: 'Success', data: newPayment });
  }),

  http.get('http://localhost:5000/api/v1/manager/finance/summary', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_FINANCE_SUMMARY });
  }),

  http.get('http://localhost:5000/api/v1/manager/finance/payments/member/:memberId', ({ params }) => {
    const filtered = mockPayments.filter(p => p.memberId === params.memberId);
    return HttpResponse.json({ success: true, message: 'Success', data: filtered });
  }),
];
