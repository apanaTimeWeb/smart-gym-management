import { http, HttpResponse, delay } from 'msw';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import type { CreateManualPaymentDto } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/invoices';

let mockInvoices: SaaSInvoice[] = [
  {
    id: 'inv1', tenantId: 't1', tenantName: 'Iron Paradise', amount: 1999, currency: 'INR',
    status: 'PAID', issuedAt: '2023-11-01', dueDate: '2023-11-07', paidAt: '2023-11-05',
    paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro'
  },
  {
    id: 'inv2', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 4999, currency: 'INR',
    status: 'OVERDUE', issuedAt: '2023-10-01', dueDate: '2023-10-07',
    invoiceType: 'RECURRING', planName: 'Enterprise'
  },
  {
    id: 'inv3', tenantId: 't3', tenantName: 'CrossFit Box', amount: 9999, currency: 'INR',
    status: 'PENDING', issuedAt: '2023-11-15', dueDate: '2023-11-22',
    invoiceType: 'SETUP_FEE', planName: 'Enterprise'
  }
];

export const superadminInvoicesHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<SaaSInvoice[]>>({
      success: true,
      message: 'Success',
      data: mockInvoices,
    });
  }),
  
  http.post(`${BASE_URL}/manual-payment`, async ({ request }) => {
    await delay(500);
    const dto = await request.json() as CreateManualPaymentDto;
    const newInvoice: SaaSInvoice = {
      id: `inv${Date.now()}`,
      tenantId: dto.gymId,
      tenantName: 'Mock Gym', // Simplified
      amount: dto.amount,
      currency: dto.currency || 'INR',
      status: 'PAID',
      issuedAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      paymentMethod: 'Manual',
      invoiceType: 'ONE_TIME',
      planName: dto.planName
    };
    mockInvoices = [newInvoice, ...mockInvoices];
    return HttpResponse.json<ApiResponse<SaaSInvoice>>({
      success: true,
      message: 'Created',
      data: newInvoice,
    });
  }),

  http.get(`${BASE_URL}/:id/download`, async () => {
    await delay(300);
    return HttpResponse.json<ApiResponse<{ downloadUrl: string }>>({
      success: true,
      message: 'Success',
      data: { downloadUrl: '/mock-invoice.pdf' },
    });
  }),

  http.get(`${BASE_URL}/export`, async () => {
    await delay(600);
    return HttpResponse.json<ApiResponse<{ downloadUrl: string }>>({
      success: true,
      message: 'Success',
      data: { downloadUrl: '/mock-invoices.csv' },
    });
  }),

  http.post(`${BASE_URL}/:id/resend`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Email resent',
      data: null,
    });
  }),
];
