'use client';
// RESPONSIBILITY: Owns the Superadmin personal-profile mutation and backend feedback.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileApi';
import { SUPERADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileQueryKeys';

import type { UpdateSuperadminProfilePayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_profile view components.
/**
 * Purpose: Dedicated mutation boundary for updating Superadmin personal profile data.
 * Inputs: validated profile payload plus one idempotency key generated for the user intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: network mutation and backend-message toast.
 * Invariant: query/cache ownership remains with the page orchestration hook.
 */
/**
 * @description Updates the authenticated Superadmin profile and reconciles the profile query.
 * @dependencies Uses the profile API, validated form contract, idempotency lifecycle, and TanStack Query.
 * @edge-case Preserves server response values rather than maintaining a conflicting local copy.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminProfileUpdateProfileMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile update profile mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminProfileUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_profile');
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateSuperadminProfilePayload; idempotencyKey: string }) => superadminProfileApi.updateProfile(payload, idempotencyKey),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PROFILE_QUERY_KEYS.all });
        toast.success(response.message, { id: 'superadmin-profile-update-success' });
      }
      else toast.error(response.message, { id: 'superadmin-profile-update-error' });
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-update-error' });
    },
  });
}
