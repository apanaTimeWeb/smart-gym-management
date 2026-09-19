// DATA FLOW: MSW/Backend → fetchOnboardingActivationInsights() → TanStack Query → Trial Activation & Conversion UI
// RESPONSIBILITY: Owns query orchestration for Trial Activation & Conversion. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchOnboardingActivationInsights } from '@/app/superadmin/onboarding/onboarding_api/SuperadminOnboardingActivationInsightsApi';
/**
 * Purpose: Owns query orchestration for Trial Activation & Conversion. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminOnboardingV1() {
    return useQuery({ queryKey: ['superadmin', 'onboarding_activation_insights'], queryFn: fetchOnboardingActivationInsights });
}
