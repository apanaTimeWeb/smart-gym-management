'use client';
// DATA FLOW: Profile route → page hook → profile query + dedicated mutation hooks → view components.
// RESPONSIBILITY: Orchestrates profile server state, tab state, mutation intents, and cache reconciliation.
import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileApi';
import { SUPERADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileQueryKeys';
import { useSuperadminProfileDataExportMutation } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileDataExportMutation';
import { useSuperadminProfileToggleTwoFactorMutation } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileToggleTwoFactorMutation';
import { useSuperadminProfileUpdatePasswordMutation } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileUpdatePasswordMutation';
import { useSuperadminProfileUpdateProfileMutation } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileUpdateProfileMutation';

import type { ProfileTab, Toggle2FAPayload, UpdateSuperadminPasswordPayload, UpdateSuperadminProfilePayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';



/**
 * Purpose: Owns profile route server state and composes dedicated mutation boundaries.
 * Inputs: UI tab changes and validated mutation payloads.
 * Output: profile data, mutation status, and intent-specific action handlers for view components.
 * Side effects: queries, mutations, and intentional profile-query invalidation.
 * Invariant: the view never receives or invokes raw TanStack mutation objects.
 */
/**
 * @description Owns profile server-state loading and feature-local form coordination for the profile page.
 * @dependencies Uses profile queries, mutation hooks, form validation, and unsaved-change infrastructure.
 * @edge-case Preserves recoverable loading/error states and guards dirty forms from accidental navigation.
 */

export function useSuperadminProfilePage() {
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = (scope: string) => idempotencyKeysRef.current.get(scope) ?? (() => { const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, key); return key; })();
  const clearIntentKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');

  const { data: profileRes, isPending: profileLoading } = useQuery({
    queryKey: SUPERADMIN_PROFILE_QUERY_KEYS.all,
    queryFn: () => superadminProfileApi.fetchProfile(),
  });
  const profile = profileRes?.data ?? null;

  const updateProfileMutation = useSuperadminProfileUpdateProfileMutation();
  const updatePasswordMutation = useSuperadminProfileUpdatePasswordMutation();
  const toggleTwoFactorMutation = useSuperadminProfileToggleTwoFactorMutation();
  const dataExportMutation = useSuperadminProfileDataExportMutation();

  const updatePersonalProfile = async (payload: UpdateSuperadminProfilePayload) => {
    const idempotencyKey = getIntentKey('profile');
    const response = await updateProfileMutation.mutateAsync({ payload, idempotencyKey });
    if (!response.success) throw new Error(response.message);
    clearIntentKey('profile');
  };

  const updatePassword = async (payload: UpdateSuperadminPasswordPayload) => {
    const idempotencyKey = getIntentKey('password');
    const response = await updatePasswordMutation.mutateAsync({ payload, idempotencyKey });
    if (!response.success) throw new Error(response.message);
    clearIntentKey('password');
  };

  const toggleTwoFactor = async (payload: Toggle2FAPayload) => {
    const idempotencyKey = getIntentKey('two-factor');
    const response = await toggleTwoFactorMutation.mutateAsync({ payload, idempotencyKey });
    if (!response.success) throw new Error(response.message);
    clearIntentKey('two-factor');
  };

  return {
    activeTab,
    setActiveTab,
    profile,
    profileLoading,
    personalState: updateProfileMutation.isPending ? 'loading' : 'idle',
    passwordState: updatePasswordMutation.isPending ? 'loading' : 'idle',
    twoFAState: toggleTwoFactorMutation.isPending ? 'loading' : 'idle',
    updatePersonalProfile,
    updatePassword,
    toggleTwoFactor,
    requestFullDataExport: dataExportMutation.requestExport,
    isRequestingDataExport: dataExportMutation.isRequesting,
    dataExportCompletionState: dataExportMutation.completionState,
  };
}
