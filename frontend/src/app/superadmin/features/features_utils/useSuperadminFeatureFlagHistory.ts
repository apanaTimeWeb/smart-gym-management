'use client';
// RESPONSIBILITY: Fetches the selected feature flag's API-backed change history for the history drawer.
// DATA FLOW: featuresApi.fetchFeatureFlagHistory → useSuperadminFeatureFlagHistory → SuperadminFeatureHistoryModal
import { useQuery } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';
import type { FeatureFlagHistory } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

export function useSuperadminFeatureFlagHistory(flagId: string | null) {
  const query = useQuery({
    queryKey: ['superadmin', 'features', 'history', flagId],
    queryFn: async () => {
      const response = await featuresApi.fetchFeatureFlagHistory(flagId ?? '');
      return (response.data ?? []) as FeatureFlagHistory[];
    },
    enabled: Boolean(flagId),
  });
  return { history: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}
