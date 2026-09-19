// RESPONSIBILITY: Provides API access for the Superadmin compliance feature. Demo behavior is supplied by module-owned MSW handlers.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminComplianceUrlConfig } from '@/app/superadmin/compliance/superadmin_compliance_url_config';
import { SuperadminComplianceResponseSchema } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
import type { SuperadminComplianceResponse } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export async function fetchComplianceOverview(): Promise<ApiResponse<SuperadminComplianceResponse>> {
    return apiFetch<ApiResponse<SuperadminComplianceResponse>>(SuperadminComplianceUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminComplianceResponseSchema });
}
