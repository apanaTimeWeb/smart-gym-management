// RESPONSIBILITY: Owns feature-flag enable/disable mutation and feature-list cache reconciliation.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';

import type { SuperadminFeatureFlagStatusMutationInput } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesMutationTypes';

// DATA FLOW: API / URL state / module client state → useMutation → superadmin_features view components.
/** Dedicated mutation boundary for toggling a global feature flag. */
/**
 * @description Wraps feature-flag enable/disable mutations with confirmation-safe query reconciliation.
 * @dependencies Uses the feature API facade, TanStack Query cache, and mutation contract supplied by the feature.
 * @edge-case Reuses a single idempotency key through retries and avoids clearing authoritative server state on failed requests.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminFeaturesFeatureFlagStatusMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features feature flag status mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminFeaturesFeatureFlagStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SuperadminFeatureFlagStatusMutationInput) => featuresApi.toggleFeatureFlag(input.id, input.idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.all });
    },
  });
}
