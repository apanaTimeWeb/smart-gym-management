// RESPONSIBILITY: Provides API access for the Superadmin offboarding feature. Demo behavior is supplied by module-owned MSW handlers.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminOffboardingUrlConfig } from '@/app/superadmin/offboarding/superadmin_offboarding_url_config';
import { SuperadminOffboardingResponseSchema } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
import type { SuperadminOffboardingResponse } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
export async function fetchOffboardingData(): Promise<ApiResponse<SuperadminOffboardingResponse>> {
    return apiFetch<ApiResponse<SuperadminOffboardingResponse>>(SuperadminOffboardingUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminOffboardingResponseSchema });
}
