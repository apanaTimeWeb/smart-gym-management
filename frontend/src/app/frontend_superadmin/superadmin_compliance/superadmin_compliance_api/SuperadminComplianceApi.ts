import { SuperadminComplianceResponseSchema } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_schemas/SuperadminComplianceContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { SUPERADMIN_COMPLIANCE_API } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_url_config';

import type { SuperadminComplianceResponse } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';
import type { ApiResponse } from '@/lib/api';


export async function fetchComplianceOverview(): Promise<ApiResponse<SuperadminComplianceResponse>> {
    return apiFetch<ApiResponse<SuperadminComplianceResponse>>(SUPERADMIN_COMPLIANCE_API.BASE, { dataSchema: SuperadminComplianceResponseSchema });
}
