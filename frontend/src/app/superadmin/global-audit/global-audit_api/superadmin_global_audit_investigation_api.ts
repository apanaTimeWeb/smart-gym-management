// RESPONSIBILITY: Provides API access for the Audit Investigation feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGlobalAuditV1UrlConfig } from '@/app/superadmin/global-audit/superadmin_global_audit_investigation_url_config';
import { SuperadminGlobalAuditV1DataSchema, type SuperadminGlobalAuditV1Data } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditV1Types';
export async function fetchGlobalAuditInvestigation(): Promise<ApiResponse<SuperadminGlobalAuditV1Data>> {
    return apiFetch<ApiResponse<SuperadminGlobalAuditV1Data>>(SuperadminGlobalAuditV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminGlobalAuditV1DataSchema });
}
