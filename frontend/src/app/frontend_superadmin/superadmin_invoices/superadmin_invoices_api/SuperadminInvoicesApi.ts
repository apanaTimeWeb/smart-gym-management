import { z } from 'zod';
import { SuperadminInvoicesDownloadResponseSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesApiSchemas';
import { SuperadminInvoicesTenantSchema, SaaSInvoiceSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminInvoicesApi owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config, zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_invoices_api.ts
import { SUPERADMIN_INVOICES_API } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config';

import type { CreateManualPaymentDto, SaaSInvoice, SuperadminInvoicesTenant } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes';
import type { ApiResponse } from '@/lib/api';


export const invoicesApi = {
    fetchInvoices: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SaaSInvoice[]>>(`${SUPERADMIN_INVOICES_API.BASE}${q}`, { dataSchema: z.array(SaaSInvoiceSchema) });
    },
    createManualPayment: (dto: CreateManualPaymentDto, idempotencyKey: string) => apiFetch<ApiResponse<SaaSInvoice>>(SUPERADMIN_INVOICES_API.MANUAL_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SaaSInvoiceSchema
    }),
    fetchInvoiceDownloadUrl: (id: string) => apiFetch<ApiResponse<{
        downloadUrl: string;
    }>>(`${SUPERADMIN_INVOICES_API.BASE}/${id}/download`, { dataSchema: SuperadminInvoicesDownloadResponseSchema }),
    exportInvoiceReport: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<{
            downloadUrl: string;
        }>>(`${SUPERADMIN_INVOICES_API.BASE}/export${q}`, { dataSchema: SuperadminInvoicesDownloadResponseSchema });
    },
    resendInvoiceEmail: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${SUPERADMIN_INVOICES_API.BASE}/${id}/resend`, {
        method: 'POST',
        dataSchema: z.null(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    fetchTenants: () => {
        // Local tenant lookup to avoid cross-module business imports
        return apiFetch<ApiResponse<SuperadminInvoicesTenant[]>>(SUPERADMIN_INVOICES_API.TENANTS, { dataSchema: z.array(SuperadminInvoicesTenantSchema) });
    },
};
