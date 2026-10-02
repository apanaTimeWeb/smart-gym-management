'use client';
// RESPONSIBILITY: Owns the Superadmin two-factor-authentication toggle mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileApi';
import { SUPERADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileQueryKeys';

import type { Toggle2FAPayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_profile view components.
/**
 * Purpose: Dedicated mutation boundary for enabling/disabling two-factor authentication.
 * Inputs: validated toggle payload plus one idempotency key per confirmed user intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: two-factor update request and backend-message toast.
 * Invariant: the profile query is reconciled by the owning page hook after success.
 */
/**
 * @description Toggles two-factor authentication through the profile API and updates the authoritative profile cache.
 * @dependencies Uses the profile API, idempotency-key lifecycle, and query-key registry.
 * @edge-case Keeps failed attempts retryable and avoids optimistic security-state changes.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminProfileToggleTwoFactorMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile toggle two factor mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminProfileToggleTwoFactorMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_profile');
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: Toggle2FAPayload; idempotencyKey: string }) => superadminProfileApi.updateTwoFactor(payload, idempotencyKey),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PROFILE_QUERY_KEYS.all });
        toast.success(response.message, { id: 'superadmin-profile-2fa-success' });
      }
      else toast.error(response.message, { id: 'superadmin-profile-2fa-error' });
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-2fa-error' });
    },
  });
}
