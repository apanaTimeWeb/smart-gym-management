// RESPONSIBILITY: Provides API access for the Superadmin Gym 360 workspace.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGymDetailUrlConfig } from '@/app/superadmin/gyms/superadmin_gym_detail_business_overview_url_config';
import { SuperadminGymDetailDataSchema, type SuperadminGymDetailData } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailTypes';

export async function fetchGymDetailBusinessOverview(gymId: string): Promise<ApiResponse<SuperadminGymDetailData>> {
    return apiFetch<ApiResponse<SuperadminGymDetailData>>(SuperadminGymDetailUrlConfig.BACKEND_API.BY_GYM(gymId), {
        dataSchema: SuperadminGymDetailDataSchema,
    });
}
