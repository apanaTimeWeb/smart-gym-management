import { SuperadminInvoicesV1DataSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config';

import type { SuperadminInvoicesV1Data } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesV1Types';
import type { ApiResponse } from '@/lib/api';


export async function fetchInvoiceRecoveryCenter(): Promise<ApiResponse<SuperadminInvoicesV1Data>> {
    return apiFetch<ApiResponse<SuperadminInvoicesV1Data>>(MODULE_URLS.RECOVERY_CENTER.BACKEND_API.BASE, { dataSchema: SuperadminInvoicesV1DataSchema });
}
