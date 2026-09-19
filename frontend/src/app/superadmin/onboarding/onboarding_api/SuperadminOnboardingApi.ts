// RESPONSIBILITY: Encapsulates functionality for superadmin_onboarding_api.ts
import { TenantOnboardingSchema } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingTypes';
import { OnboardingUrlConfig } from '@/app/superadmin/onboarding/superadmin_onboarding_url_config';
import { z } from "zod";
export const onboardingApi = {
    fetchOnboardings: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<TenantOnboarding[]>>(`${OnboardingUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(TenantOnboardingSchema) });
    },
    resendVerification: (id: string) => apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/resend-verification`, {
        method: 'POST',
        dataSchema: TenantOnboardingSchema
    }),
    markVerified: (id: string) => apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/mark-verified`, {
        method: 'POST',
        dataSchema: TenantOnboardingSchema
    }),
    extendTrial: (id: string, days: number) => apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/extend-trial`, {
        method: 'POST',
        body: JSON.stringify({ days }),
        dataSchema: TenantOnboardingSchema
    }),
    convertToPaid: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<TenantOnboarding>>(`${OnboardingUrlConfig.BACKEND_API.BASE}/${id}/convert-to-paid`, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: TenantOnboardingSchema
    }),
};
