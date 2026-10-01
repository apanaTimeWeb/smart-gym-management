// RESPONSIBILITY: Provides API access for the Platform API Health feature within Superadmin only.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminInfrastructureV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';
import { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureV1Schema';

import type { SuperadminInfrastructureV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchInfrastructureApiHealth(): Promise<ApiResponse<SuperadminInfrastructureV1Data>> {
    return apiFetch<ApiResponse<SuperadminInfrastructureV1Data>>(SuperadminInfrastructureV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminInfrastructureV1DataSchema });
}
