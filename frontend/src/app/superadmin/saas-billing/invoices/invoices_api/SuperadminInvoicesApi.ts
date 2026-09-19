// RESPONSIBILITY: Encapsulates functionality for superadmin_invoices_api.ts
import { SaaSInvoiceSchema, SuperadminInvoicesTenantSchema } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { CreateManualPaymentDto, SaaSInvoice, SuperadminInvoicesTenant } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import { z } from "zod";
export const invoicesApi = {
    fetchInvoices: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SaaSInvoice[]>>(`${InvoicesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SaaSInvoiceSchema) });
    },
    createManualPayment: (dto: CreateManualPaymentDto, idempotencyKey?: string) => apiFetch<ApiResponse<SaaSInvoice>>(InvoicesUrlConfig.BACKEND_API.MANUAL_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SaaSInvoiceSchema
    }),
    fetchInvoiceDownloadUrl: (id: string) => apiFetch<ApiResponse<{
        downloadUrl: string;
    }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/download`, { dataSchema: z.object({ downloadUrl: z.string() }) }),
    exportInvoiceReport: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<{
            downloadUrl: string;
        }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.object({ downloadUrl: z.string() }) });
    },
    resendInvoiceEmail: (id: string) => apiFetch<ApiResponse<null>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/resend`, {
        method: 'POST',
        dataSchema: z.null()
    }),
    fetchTenants: () => {
        // Local tenant lookup to avoid cross-module business imports
        return apiFetch<ApiResponse<SuperadminInvoicesTenant[]>>(InvoicesUrlConfig.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminInvoicesTenantSchema) });
    },
};
