// RESPONSIBILITY: Owns server-state loading for feature-flag change history and exposes query state to the history view.
'use client';
import { useQuery } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/features_api/SuperadminFeaturesApi';

/**
 * Purpose: Load one feature flag's audit history from the owning feature API boundary.
 * Inputs: feature flag identifier.
 * Output: TanStack Query state containing history entries.
 * Side effects: network/cache activity only; no fixture access in the component.
 * Invariant: the requested flag id is the only resource key used for the history query.
 */
export function useSuperadminFeatureHistory(flagId: string | null) {
  return useQuery({
    queryKey: ['superadmin', 'features', 'history', flagId],
    queryFn: () => featuresApi.fetchFeatureFlagHistory(flagId as string),
    enabled: Boolean(flagId),
  });
}
