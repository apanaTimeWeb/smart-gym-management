import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import type { CreateManualPaymentDto, SaaSInvoice } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import { CreateManualPaymentDtoSchema } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import type { ApiResponse } from '@/lib/api';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import { MOCK_INVOICE_TENANTS, MOCK_SUPERADMIN_INVOICES } from '@/app/superadmin/saas-billing/invoices/invoices_mocks/fixtures/SuperadminInvoicesMockFixtures';
const BASE_URL = `*${InvoicesUrlConfig.BACKEND_API.BASE}`;
let mockInvoices: SaaSInvoice[] = [...MOCK_SUPERADMIN_INVOICES];

export function resetSuperadminInvoicesMockState(): void {
  mockInvoices = [...MOCK_SUPERADMIN_INVOICES];
}
export const superadminInvoicesHandlers = [
    http.get(`*${InvoicesUrlConfig.BACKEND_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_INVOICE_TENANTS })),
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
        const parsed = CreateManualPaymentDtoSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Invalid manual payment request', data: null }, { status: StatusCodes.BAD_REQUEST });
        const dto: CreateManualPaymentDto = parsed.data;
        const tenant = MOCK_INVOICE_TENANTS.find((item) => item.id === dto.gymId);
        if (!tenant) return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Tenant not found', data: null }, { status: StatusCodes.NOT_FOUND });
        const newInvoice: SaaSInvoice = {
            id: `inv${Date.now()}`,
            tenantId: dto.gymId,
            tenantName: tenant.name,
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
