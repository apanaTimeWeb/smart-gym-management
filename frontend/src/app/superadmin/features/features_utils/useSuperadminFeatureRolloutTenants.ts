'use client';
// RESPONSIBILITY: Fetches tenant choices for the feature-rollout selector without exposing API orchestration in the modal.
// DATA FLOW: featuresApi.fetchTenants → useSuperadminFeatureRolloutTenants → SuperadminFeatureRolloutModal
import { useQuery } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';

export function useSuperadminFeatureRolloutTenants(enabled: boolean) {
  const query = useQuery({
    queryKey: ['superadmin', 'features', 'tenants'],
    queryFn: () => featuresApi.fetchTenants(),
    enabled,
  });
  return { tenants: query.data?.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}
