// DATA FLOW: MSW/Backend → fetchFeatureRolloutInsights() → TanStack Query → Feature Rollouts & Release History UI
// RESPONSIBILITY: Owns query orchestration for Feature Rollouts & Release History. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import { fetchFeatureRolloutInsights } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';

/**
 * Purpose: Owns query orchestration for Feature Rollouts & Release History. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Feature Rollouts & Release History. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminFeaturesV1() {
    return useQuery({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.rolloutInsights, queryFn: fetchFeatureRolloutInsights });
}
