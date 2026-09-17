// DATA FLOW: MSW/Backend → fetchOnboardingActivationInsights() → TanStack Query → Trial Activation & Conversion UI
// RESPONSIBILITY: Owns query orchestration for Trial Activation & Conversion. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchOnboardingActivationInsights } from '@/app/superadmin/onboarding/onboarding_api/superadmin_onboarding_activation_insights_api';
export function useSuperadminOnboardingV1() {
    return useQuery({ queryKey: ['superadmin', 'onboarding_activation_insights'], queryFn: fetchOnboardingActivationInsights });
}
