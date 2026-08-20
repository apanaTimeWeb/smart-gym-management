// RESPONSIBILITY: Modularized API client for the Invoices module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/invoices_types';

export const invoicesApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SaaSInvoice[]>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}${q}`);
  },
};
