'use client';
// DATA FLOW: Superadmin Features route → feature query + dedicated mutation hooks → UI.
// RESPONSIBILITY: Owns feature flag/release-note server-state query and composes isolated mutation contracts.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';
import { useSuperadminFeaturesFeatureFlagStatusMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureFlagStatusMutation';
import { useSuperadminFeaturesFeatureFlagUpdateMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureFlagUpdateMutation';
import { useSuperadminFeaturesReleaseNoteCreateMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesReleaseNoteCreateMutation';

/**
 * Purpose: Centralizes Features server-state fetching and exposes dedicated mutation contracts.
 * Inputs: none.
 * Output: typed feature/release-note query state plus mutation actions.
 * Side effects: query fetches and mutation cache reconciliation owned by dedicated hooks.
 * Invariant: this data hook never instantiates TanStack mutations directly.
 */
/**
 * @description Owns feature-flag, release-note, tenant, and history server-state queries plus their mutation contracts.
 * @dependencies Uses TanStack Query, the feature API facade, query-key registry, and Zod-validated API responses.
 * @edge-case Keeps cache identity aligned with feature IDs and leaves mutation confirmation to the owning action hook.
 */

export function useSuperadminFeaturesData() {
  const query = useQuery({
    queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.all,
    queryFn: async () => {
      const response = await featuresApi.fetchFeatures();
      if (!response.data) throw new Error(response.message);
      return response.data;
    },
  });
  const statusMutation = useSuperadminFeaturesFeatureFlagStatusMutation();
  const updateMutation = useSuperadminFeaturesFeatureFlagUpdateMutation();
  const releaseNoteMutation = useSuperadminFeaturesReleaseNoteCreateMutation();

  return {
    data: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    updateFeatureFlagStatus: statusMutation.mutateAsync,
    isUpdatingFeatureFlagStatus: statusMutation.isPending,
    publishNote: releaseNoteMutation.mutateAsync,
    isPublishing: releaseNoteMutation.isPending,
    updateFlag: updateMutation.mutateAsync,
    refetch: query.refetch,
  };
}
