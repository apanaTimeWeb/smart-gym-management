// DATA FLOW: MSW/Backend → fetchFeatureRolloutInsights() → TanStack Query → Feature Rollouts & Release History UI
// RESPONSIBILITY: Owns query orchestration for Feature Rollouts & Release History. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchFeatureRolloutInsights } from '@/app/superadmin/features/features_api/superadmin_features_rollout_insights_api';
export function useSuperadminFeaturesV1() {
    return useQuery({ queryKey: ['superadmin', 'features_rollout_insights'], queryFn: fetchFeatureRolloutInsights });
}
