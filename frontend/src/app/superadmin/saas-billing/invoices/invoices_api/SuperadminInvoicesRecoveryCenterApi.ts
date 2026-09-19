// RESPONSIBILITY: Provides API access for the Payment Recovery & Billing Adjustments feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminInvoicesV1UrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_recovery_center_url_config';
import { SuperadminInvoicesV1DataSchema, type SuperadminInvoicesV1Data } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesV1Types';
export async function fetchInvoiceRecoveryCenter(): Promise<ApiResponse<SuperadminInvoicesV1Data>> {
    return apiFetch<ApiResponse<SuperadminInvoicesV1Data>>(SuperadminInvoicesV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminInvoicesV1DataSchema });
}
