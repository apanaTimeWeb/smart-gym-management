'use client';
// RESPONSIBILITY: Owns the Superadmin password-change mutation and backend feedback.
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileApi';

import type { UpdateSuperadminPasswordPayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';

// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_profile view components.
/**
 * Purpose: Dedicated mutation boundary for password changes.
 * Inputs: validated password payload plus one idempotency key per confirmed user intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: credential update request and backend-message toast.
 * Invariant: password data is never persisted to browser storage.
 */
/**
 * @description Submits password changes through the profile API and reconciles only the mutation result.
 * @dependencies Uses the profile API, Zod-validated password form contract, idempotency, and safe toast handling.
 * @edge-case Never exposes backend exception text and keeps failed submissions retryable.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminProfileUpdatePasswordMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile update password mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminProfileUpdatePasswordMutation() {
  const t = useTranslations('superadmin_profile');
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateSuperadminPasswordPayload; idempotencyKey: string }) => superadminProfileApi.updatePassword(payload, idempotencyKey),
    onSuccess: (response) => {
      if (response.success) toast.success(response.message, { id: 'superadmin-profile-password-success' });
      else toast.error(response.message, { id: 'superadmin-profile-password-error' });
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-password-error' });
    },
  });
}
