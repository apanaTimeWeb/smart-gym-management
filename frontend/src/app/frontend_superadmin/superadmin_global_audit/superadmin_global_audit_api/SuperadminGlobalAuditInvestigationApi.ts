import { SuperadminGlobalAuditV1DataSchema } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config';

import type { SuperadminGlobalAuditV1Data } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditV1Types';
import type { ApiResponse } from '@/lib/api';


export async function fetchGlobalAuditInvestigation(): Promise<ApiResponse<SuperadminGlobalAuditV1Data>> {
    return apiFetch<ApiResponse<SuperadminGlobalAuditV1Data>>(MODULE_URLS.INVESTIGATION.BACKEND_API.BASE, { dataSchema: SuperadminGlobalAuditV1DataSchema });
}
