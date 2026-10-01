'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';

import { SUPERADMIN_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_query_keys/SuperadminFeaturesQueryKeys';
import type { SuperadminFeatureRolloutModalProps } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';

/** Owns the feature-local canary rollout mutation so UI components remain view-only. */
/**
 * @description Owns the tenant-scoped canary rollout mutation lifecycle for a selected feature flag.
 * @dependencies Uses the feature rollout API contract, selected tenant IDs, and caller-owned success callback.
 * @edge-case Reuses the same idempotency key for one rollout intent and keeps the draft recoverable after a failed mutation.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminFeaturesFeatureRolloutMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features feature rollout mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminFeaturesFeatureRolloutMutation(onSaveRollout: SuperadminFeatureRolloutModalProps['onSaveRollout'], selectedTenantIds: string[], idempotencyKeyRef: MutableRefObject<string | null>, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      return onSaveRollout(selectedTenantIds, idempotencyKeyRef.current);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.tenants });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_FEATURES_QUERY_KEYS.rolloutInsights });
      onSuccess();
    },
  });
}
