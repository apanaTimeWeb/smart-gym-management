// RESPONSIBILITY: Encapsulates functionality for superadmin_invoices_api.ts
import { SaaSInvoiceSchema } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import { InvoicesUrlConfig } from '@/app/superadmin/invoices/superadmin_invoices_url_config';
import { z } from "zod";

export interface CreateManualPaymentDto {
  gymId: string;
  amount: number;
  planName: string;
  currency?: string;
}

export const invoicesApi = {
  fetchInvoices: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SaaSInvoice[]>>(`${InvoicesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SaaSInvoiceSchema) });
  },
  createManualPayment: (dto: CreateManualPaymentDto) =>
    apiFetch<ApiResponse<SaaSInvoice>>(InvoicesUrlConfig.BACKEND_API.MANUAL_PAYMENT, {
      method: 'POST',
      body: JSON.stringify(dto),
        dataSchema: SaaSInvoiceSchema
    }),
  fetchInvoiceDownloadUrl: (id: string) =>
    apiFetch<ApiResponse<{ downloadUrl: string }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/download`, { dataSchema: z.object({ downloadUrl: z.string() }) }),
  exportInvoicesCSV: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.object({ downloadUrl: z.string() }) });
  },
  resendInvoiceEmail: (id: string) =>
    apiFetch<ApiResponse<null>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/resend`, {
      method: 'POST',
        dataSchema: z.null()
    }),
  fetchTenants: () => {
    // Local tenant lookup to avoid cross-module business imports
    return apiFetch<ApiResponse<any[]>>('/superadmin/gyms-list');
  },
};

