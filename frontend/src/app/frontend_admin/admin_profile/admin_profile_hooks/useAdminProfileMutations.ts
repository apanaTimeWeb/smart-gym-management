"use client";

// DATA FLOW: Profile/password form → mutation hook → AdminProfileApi → TanStack Query invalidation → Profile UI and backend feedback.
// RESPONSIBILITY: Owns Admin profile and password mutation transport, feedback, and query invalidation.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_admin/admin_profile/admin_profile_constants/AdminProfileQueryKeys';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/admin_profile_api/AdminProfileApi';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';
/**
 * @description useAdminProfileMutations: Owns Admin profile and password mutation transport, feedback, and query invalidation.
 * @dependencies Consumes AdminProfileQueryKeys, AdminProfileApi, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore, AdminProfileTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminProfileMutations() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const profileMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateAdminProfilePayload; idempotencyKey: string }) => AdminProfileApi.updateProfile(payload, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey('profile-update');
      await queryClient.invalidateQueries({ queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail') });
      adminToast.success(response.message, 'admin_profile-save');
    },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin_profile-save'); },
  });

  const passwordMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateAdminPasswordPayload; idempotencyKey: string }) => AdminProfileApi.updatePassword(payload, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey('password-change');
      await queryClient.invalidateQueries({ queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail') });
      adminToast.success(response.message, 'admin_profile-password');
    },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin_profile-password'); },
  });

  const updateProfile = useCallback((payload: UpdateAdminProfilePayload) => {
    const intentId = 'profile-update';
    return profileMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId) });
  }, [getIntentKey, profileMutation]);

  const updatePassword = useCallback((payload: UpdateAdminPasswordPayload) => {
    const intentId = 'password-change';
    return passwordMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId) });
  }, [getIntentKey, passwordMutation]);

  return { profileMutation, passwordMutation, updateProfile, updatePassword };
}
