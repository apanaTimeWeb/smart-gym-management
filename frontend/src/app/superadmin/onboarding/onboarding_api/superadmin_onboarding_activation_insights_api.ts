// RESPONSIBILITY: Provides API access for the Trial Activation & Conversion feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminOnboardingV1UrlConfig } from '@/app/superadmin/onboarding/superadmin_onboarding_activation_insights_url_config';
import { SuperadminOnboardingV1DataSchema, type SuperadminOnboardingV1Data } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types';
export async function fetchOnboardingActivationInsights(): Promise<ApiResponse<SuperadminOnboardingV1Data>> {
    return apiFetch<ApiResponse<SuperadminOnboardingV1Data>>(SuperadminOnboardingV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminOnboardingV1DataSchema });
}
