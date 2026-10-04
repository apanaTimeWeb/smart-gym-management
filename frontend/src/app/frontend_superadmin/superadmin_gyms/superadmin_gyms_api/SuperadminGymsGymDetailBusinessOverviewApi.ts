import { SuperadminGymDetailDataSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsGymDetailContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { SUPERADMIN_GYMS_GYM_DETAIL } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { SuperadminGymDetailData } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymDetailTypes';
import type { ApiResponse } from '@/lib/api';



export async function fetchGymDetailBusinessOverview(gymId: string): Promise<ApiResponse<SuperadminGymDetailData>> {
    return apiFetch<ApiResponse<SuperadminGymDetailData>>(SUPERADMIN_GYMS_GYM_DETAIL.BACKEND_API.BY_GYM(gymId), {
        dataSchema: SuperadminGymDetailDataSchema,
    });
}
