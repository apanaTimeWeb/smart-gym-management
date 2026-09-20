// DATA FLOW: Inputs enter useSuperadminFeatureRolloutData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns tenant-list server state for the Feature Flag canary rollout modal.
'use client';
import { useQuery } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/features_api/SuperadminFeaturesApi';
import type { SuperadminFeaturesTenant } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
/**
 * Purpose: Provides tenant data for canary rollout selection.
 * Inputs: modal open state.
 * Output: tenant list, loading and error state.
 * Side effects: TanStack Query cache only.
 * Invariant: rollout UI never calls the feature API directly.
 */
export function useSuperadminFeatureRolloutData(isOpen: boolean) {
  const query = useQuery({
    queryKey: ['superadmin', 'features', 'tenants'],
    queryFn: () => featuresApi.fetchTenants(),
    enabled: isOpen,
  });
  return {
    tenants: (query.data?.data as SuperadminFeaturesTenant[] | undefined) ?? [],
    isPending: query.isPending,
    error: query.error,
  };
}
