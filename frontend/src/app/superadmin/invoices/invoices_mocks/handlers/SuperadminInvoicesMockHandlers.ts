import { http, HttpResponse, delay } from 'msw';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import type { CreateManualPaymentDto } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import type { ApiResponse } from '@/lib/api';
import { MOCK_INVOICE_TENANTS, MOCK_SUPERADMIN_INVOICES } from '@/app/superadmin/invoices/invoices_mocks/fixtures/SuperadminInvoicesMockFixtures';
const BASE_URL = '*/api/v1/superadmin/invoices';
let mockInvoices: SaaSInvoice[] = [...MOCK_SUPERADMIN_INVOICES];
export const superadminInvoicesHandlers = [
    http.get('*/api/v1/api/gyms', async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_INVOICE_TENANTS })),
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status');
        let filtered = [...mockInvoices];
        if (search) {
            filtered = filtered.filter(i => i.tenantName?.toLowerCase().includes(search) ||
                i.id?.toLowerCase().includes(search));
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
        return HttpResponse.json<ApiResponse<{
            downloadUrl: string;
        }>>({
            success: true,
            message: 'Success',
            data: { downloadUrl: '/mock-invoice.pdf' },
        });
    }),
    http.get(`${BASE_URL}/export`, async () => {
        await delay(600);
        return HttpResponse.json<ApiResponse<{
            downloadUrl: string;
        }>>({
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
