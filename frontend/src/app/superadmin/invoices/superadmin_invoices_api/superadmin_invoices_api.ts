// RESPONSIBILITY: Modularized API client for the Invoices module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';

export interface CreateManualPaymentDto {
  gymId: string;
  amount: number;
  planName: string;
  currency?: string;
}

export const invoicesApi = {
  /** GET /superadmin/invoices — fetch paginated/filtered invoice list */
  fetchInvoices: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SaaSInvoice[]>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}${q}`);
  },

  /** POST /superadmin/invoices/manual-payment — logs a manual cash/offline payment for a tenant */
  createManualPayment: (dto: CreateManualPaymentDto) =>
    apiFetch<ApiResponse<SaaSInvoice>>(SuperadminUrlConfig.BACKEND_API.INVOICES_MANUAL_PAYMENT, {
      method: 'POST',
      body: JSON.stringify(dto),
    }),

  /** GET /superadmin/invoices/:id/download — returns a signed PDF download URL */
  getDownloadUrl: (id: string) =>
    apiFetch<ApiResponse<{ downloadUrl: string }>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}/${id}/download`),

  /**
   * GET /superadmin/invoices/export — streams a CSV of all invoices matching current filters.
   * Returns a signed download URL from the backend.
   */
  exportInvoicesCSV: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}/export${q}`);
  },

  /**
   * POST /superadmin/invoices/:id/resend — resends the invoice email to the tenant's admin email.
   * Used for OVERDUE and PENDING invoices.
   */
  resendInvoiceEmail: (id: string) =>
    apiFetch<ApiResponse<null>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}/${id}/resend`, {
      method: 'POST',
    }),
};
