// RESPONSIBILITY: Encapsulates functionality for superadmin_onboarding_api.ts
import { TenantOnboardingSchema } from '@/app/superadmin/onboarding/onboarding_types/superadmin_onboarding_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/superadmin_onboarding_types';
import { OnboardingUrlConfig } from '@/app/superadmin/onboarding/superadmin_onboarding_url_config';
import { z } from "zod";

export const onboardingApi = {
  fetchOnboardings: () =>
    apiFetch<ApiResponse<TenantOnboarding[]>>(OnboardingUrlConfig.BACKEND_API.BASE, { dataSchema: z.array(TenantOnboardingSchema) }),
  resendVerification: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/resend-verification`, {
      method: 'POST',
        dataSchema: TenantOnboardingSchema
    }),
  markVerified: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/mark-verified`, {
      method: 'POST',
        dataSchema: TenantOnboardingSchema
    }),
  extendTrial: (id: string, days: number) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/extend-trial`, {
      method: 'POST',
      body: JSON.stringify({ days }),
        dataSchema: TenantOnboardingSchema
    }),
  convertToPaid: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/convert-to-paid`, {
      method: 'POST',
        dataSchema: TenantOnboardingSchema
    }),
};

