'use client';
// RESPONSIBILITY: Owns feature-flag update mutation and feature-list cache reconciliation.
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';
import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesQueryKeys';

import type { SuperadminFeatureFlagUpdateMutationInput } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesMutationTypes';



// DATA FLOW: API / URL state / module client state → useMutation → superadmin_features view components.
/** Dedicated mutation boundary for updating feature-flag rollout data. */
/**
 * @description Wraps feature-flag update mutations with feature-owned cache reconciliation and idempotent retry behavior.
 * @dependencies Uses the feature API facade, TanStack Query cache, and caller-provided mutation input.
 * @edge-case Reuses the same idempotency key for retries of one intent and invalidates only the affected feature queries.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminFeaturesFeatureFlagUpdateMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features feature flag update mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminFeaturesFeatureFlagUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SuperadminFeatureFlagUpdateMutationInput) => featuresApi.updateFeatureFlag(input.id, input.body, input.idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.all });
    },
  });
}
