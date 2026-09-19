// DATA FLOW: MSW/Backend → fetchFeatureRolloutInsights() → TanStack Query → Feature Rollouts & Release History UI
// RESPONSIBILITY: Owns query orchestration for Feature Rollouts & Release History. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchFeatureRolloutInsights } from '@/app/superadmin/features/features_api/SuperadminFeaturesRolloutInsightsApi';
/**
 * Purpose: Owns query orchestration for Feature Rollouts & Release History. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminFeaturesV1() {
    return useQuery({ queryKey: ['superadmin', 'features_rollout_insights'], queryFn: fetchFeatureRolloutInsights });
}
