import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';
import { OnboardingUrlConfig } from '@/app/superadmin/onboarding/onboarding_url_config';
import { z } from "zod";

export const onboardingApi = {
  fetchOnboardings: () =>
    apiFetch<ApiResponse<TenantOnboarding[]>>(OnboardingUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() }),
  resendVerification: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/resend-verification`, {
      method: 'POST',
        dataSchema: z.any()
    }),
  markVerified: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/mark-verified`, {
      method: 'POST',
        dataSchema: z.any()
    }),
  extendTrial: (id: string, days: number) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/extend-trial`, {
      method: 'POST',
      body: JSON.stringify({ days }),
        dataSchema: z.any()
    }),
  convertToPaid: (id: string) =>
    apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/convert-to-paid`, {
      method: 'POST',
        dataSchema: z.any()
    }),
};
