/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// RESPONSIBILITY: Orchestrates profile query state and profile/password mutations. Form drafts remain local to the RHF-owned view layer.
// DATA FLOW: ManagerProfileApi → TanStack Query → ManagerProfileMain; form submit → mutation → cache invalidation
/** Coordinates the Manager / feature. */
import { useState } from 'react';
import { useManagerProfileMutations } from '@/app/frontend_manager/manager_profile/manager_profile_hooks/useManagerProfileMutations';
import { useManagerProfileQuery } from '@/app/frontend_manager/manager_profile/manager_profile_hooks/useManagerProfileQueries';
import type { ManagerProfileTab } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileLogic.
 * @dependencies Uses useManagerProfileMutations, useManagerProfileQueries, ManagerProfileTypes.
 * @edge-case preserves explicit loading state until the query or mutation settles.
 */
export function useManagerProfileLogic() {
  const [activeTab, setActiveTab] = useState<ManagerProfileTab>('personal');
  const profileQuery = useManagerProfileQuery();
  const { profileMutation, passwordMutation } = useManagerProfileMutations();
  const user = profileQuery.data?.data ?? null;
  const displayInitial = (user?.avatarInitial || user?.name || 'M').charAt(0).toUpperCase();

  return {
    activeTab, setActiveTab, user, displayInitial,
    profileQuery, profileMutation, passwordMutation,
    saving: profileMutation.isPending || passwordMutation.isPending };
}
