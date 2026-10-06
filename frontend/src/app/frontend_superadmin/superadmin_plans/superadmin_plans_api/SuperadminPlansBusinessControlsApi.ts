import { SuperadminPlansV1DataSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { SUPERADMIN_PLANS_BUSINESS_CONTROLS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config';

import type { SuperadminPlansV1Data } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansV1Types';
import type { ApiResponse } from '@/lib/api';


export async function fetchPlansBusinessControls(): Promise<ApiResponse<SuperadminPlansV1Data>> {
    return apiFetch<ApiResponse<SuperadminPlansV1Data>>(SUPERADMIN_PLANS_BUSINESS_CONTROLS.BACKEND_API.BASE, { dataSchema: SuperadminPlansV1DataSchema });
}
