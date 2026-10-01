// DATA FLOW: Inputs enter useSuperadminFeaturesFeatureRolloutData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns tenant-list server state for the Feature Flag canary rollout modal.
'use client';
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';

import type { SuperadminFeaturesTenant } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';

/**
 * Purpose: Provides tenant data for canary rollout selection.
 * Inputs: modal open state.
 * Output: tenant list, loading and error state.
 * Side effects: TanStack Query cache only.
 * Invariant: rollout UI never calls the feature API directly.
 
 * @description Provides tenant data for canary rollout selection.
 * @dependencies modal open state.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminFeaturesFeatureRolloutData(isOpen: boolean) {
  const query = useQuery({
    queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.tenants,
    queryFn: () => featuresApi.fetchTenants(),
    enabled: isOpen,
  });
  return {
    tenants: (query.data?.data as SuperadminFeaturesTenant[] | undefined) ?? [],
    isPending: query.isPending,
    error: query.error,
  };
}
