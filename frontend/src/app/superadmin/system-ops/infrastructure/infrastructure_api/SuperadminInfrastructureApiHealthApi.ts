// RESPONSIBILITY: Provides API access for the Platform API Health feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminInfrastructureV1UrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_api_health_url_config';
import { SuperadminInfrastructureV1DataSchema, type SuperadminInfrastructureV1Data } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureV1Types';
export async function fetchInfrastructureApiHealth(): Promise<ApiResponse<SuperadminInfrastructureV1Data>> {
    return apiFetch<ApiResponse<SuperadminInfrastructureV1Data>>(SuperadminInfrastructureV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminInfrastructureV1DataSchema });
}
