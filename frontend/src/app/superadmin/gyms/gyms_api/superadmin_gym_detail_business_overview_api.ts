// RESPONSIBILITY: Provides API access for the Superadmin Gym 360 workspace.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGymDetailV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gym_detail_business_overview_url_config';
import { SuperadminGymDetailV1DataSchema, type SuperadminGymDetailV1Data } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailV1Types';

export async function fetchGymDetailBusinessOverview(gymId: string): Promise<ApiResponse<SuperadminGymDetailV1Data>> {
    return apiFetch<ApiResponse<SuperadminGymDetailV1Data>>(SuperadminGymDetailV1UrlConfig.BACKEND_API.BY_GYM(gymId), {
        dataSchema: SuperadminGymDetailV1DataSchema,
    });
}
