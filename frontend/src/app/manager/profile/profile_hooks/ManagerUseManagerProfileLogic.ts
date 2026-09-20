// DATA FLOW: managerProfileApi → TanStack Query → ManagerProfileMain; form submit → mutation → cache invalidation
// RESPONSIBILITY: Orchestrates profile query state and profile/password mutations. Form drafts remain local to the RHF-owned view layer.
'use client';
/** Coordinates the Manager / feature. */
import { useState } from 'react';
import { useManagerProfileMutations } from '@/app/manager/profile/profile_hooks/ManagerUseManagerProfileMutations';
import { useManagerProfileQuery } from '@/app/manager/profile/profile_hooks/ManagerUseManagerProfileQueries';
import type { ManagerProfileTab } from '@/app/manager/profile/profile_types/ManagerProfileTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
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
