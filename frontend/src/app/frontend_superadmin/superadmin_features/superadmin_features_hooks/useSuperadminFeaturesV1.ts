'use client';
// DATA FLOW: MSW/Backend → fetchFeatureRolloutInsights() → TanStack Query → Feature Rollouts & Release History UI
// RESPONSIBILITY: Owns query orchestration for Feature Rollouts & Release History. No JSX.
import { useQuery } from '@tanstack/react-query';

import { featuresApi } from "@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi";
import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesQueryKeys';



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
/**
 * @description Owns the useSuperadminFeaturesV1 responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminFeaturesV1() {
    return useQuery({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.rolloutInsights, queryFn: () => featuresApi.fetchFeatures() });
}
