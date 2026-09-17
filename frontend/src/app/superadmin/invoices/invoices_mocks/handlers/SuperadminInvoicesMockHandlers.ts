import { SUPERADMIN_INVOICES_MOCK_TENANTS } from '@/app/superadmin/invoices/invoices_mocks/fixtures/SuperadminInvoicesMockFixtures';
import { http, HttpResponse, delay } from 'msw';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import type { CreateManualPaymentDto } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import type { ApiResponse } from '@/lib/api';


const BASE_URL = '*/api/v1/superadmin/invoices';

let mockInvoices: SaaSInvoice[] = [
  { id: 'inv1', tenantId: 't1', tenantName: 'Iron Paradise', amount: 1999, currency: 'INR', status: 'PAID', issuedAt: '2026-09-01', dueDate: '2026-09-07', paidAt: '2026-09-05', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
  { id: 'inv2', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 4999, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-01', dueDate: '2026-08-07', invoiceType: 'RECURRING', planName: 'Enterprise' },
  { id: 'inv3', tenantId: 't3', tenantName: 'CrossFit Box', amount: 9999, currency: 'INR', status: 'PENDING', issuedAt: '2026-09-15', dueDate: '2026-09-22', invoiceType: 'SETUP_FEE', planName: 'Enterprise' },
  { id: 'inv4', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 2999, currency: 'INR', status: 'FAILED', issuedAt: '2026-09-13', dueDate: '2026-09-20', invoiceType: 'RECURRING', planName: 'Pro' },
  { id: 'inv5', tenantId: 't5', tenantName: 'Pulse Fitness', amount: 3999, currency: 'INR', status: 'PAID', issuedAt: '2026-09-10', dueDate: '2026-09-17', paidAt: '2026-09-11', paymentMethod: 'UPI', invoiceType: 'RECURRING', planName: 'Pro' },
  { id: 'inv6', tenantId: 't6', tenantName: 'Urban Strength', amount: 7999, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-20', dueDate: '2026-08-27', invoiceType: 'RECURRING', planName: 'Enterprise' },
  { id: 'inv7', tenantId: 't7', tenantName: 'Core Studio', amount: 1499, currency: 'INR', status: 'PENDING', issuedAt: '2026-09-08', dueDate: '2026-09-15', invoiceType: 'ONE_TIME', planName: 'Basic' },
  { id: 'inv8', tenantId: 't8', tenantName: 'Zen Athletics', amount: 2499, currency: 'INR', status: 'FAILED', issuedAt: '2026-08-28', dueDate: '2026-09-04', invoiceType: 'RECURRING', planName: 'Basic' },
  { id: 'inv9', tenantId: 't1', tenantName: 'Iron Paradise', amount: 2199, currency: 'INR', status: 'PAID', issuedAt: '2026-08-15', dueDate: '2026-08-22', paidAt: '2026-08-20', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
  { id: 'inv10', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 5099, currency: 'INR', status: 'PENDING', issuedAt: '2026-08-12', dueDate: '2026-08-19', invoiceType: 'RECURRING', planName: 'Basic' },
  { id: 'inv11', tenantId: 't3', tenantName: 'CrossFit Box', amount: 10499, currency: 'INR', status: 'PAID', issuedAt: '2026-08-10', dueDate: '2026-08-17', paidAt: '2026-08-12', paymentMethod: 'Bank Transfer', invoiceType: 'RECURRING', planName: 'Enterprise' },
  { id: 'inv12', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 3199, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-08-05', dueDate: '2026-08-12', invoiceType: 'RECURRING', planName: 'Pro' },
];


export const superadminInvoicesHandlers = [
  http.get('*/api/v1/api/gyms', async () => HttpResponse.json({ success: true, message: 'Success', data: SUPERADMIN_INVOICES_MOCK_TENANTS })),
  http.get(BASE_URL, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status');

    let filtered = [...mockInvoices];

    if (search) {
      filtered = filtered.filter(
        i => i.tenantName?.toLowerCase().includes(search) ||
             i.id?.toLowerCase().includes(search)
      );
    }
    if (status && status !== 'ALL') {
      filtered = filtered.filter(i => i.status === status);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return HttpResponse.json<ApiResponse<SaaSInvoice[]>>({
      success: true,
      message: 'Success',
      data: paginated,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
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
