'use client';
// DATA FLOW: Inputs enter useSuperadminFeaturesFeatureHistory, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns server-state loading for feature-flag change history and exposes query state to the history view.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';

/**
 * Purpose: Load one feature flag's audit history from the owning feature API boundary.
 * Inputs: feature flag identifier.
 * Output: TanStack Query state containing history entries.
 * Side effects: network/cache activity only; no fixture access in the component.
 * Invariant: the requested flag id is the only resource key used for the history query.
 
 * @description Load one feature flag's audit history from the owning feature API boundary.
 * @dependencies feature flag identifier.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminFeaturesFeatureHistory(flagId: string | null) {
  return useQuery({
    queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.history(flagId ?? ''),
    queryFn: () => featuresApi.fetchFeatureFlagHistory(flagId as string),
    enabled: Boolean(flagId),
  });
}
