'use client';
// RESPONSIBILITY: Orchestrates profile query state and profile/password mutations. Form drafts remain local to the RHF-owned view layer.
// DATA FLOW: managerProfileApi → TanStack Query → ManagerProfileMain; form submit → mutation → cache invalidation
import { useState } from 'react';
import { useManagerProfileQuery } from '@/app/manager/profile/profile_api/ManagerUseManagerProfileQueries';
import { useManagerProfileMutations } from '@/app/manager/profile/profile_api/ManagerUseManagerProfileMutations';
import type { ManagerProfileTab } from '@/app/manager/profile/profile_types/ManagerProfileTypes';

export function useManagerProfileLogic() {
  const [activeTab, setActiveTab] = useState<ManagerProfileTab>('personal');
  const profileQuery = useManagerProfileQuery();
  const { profileMutation, passwordMutation } = useManagerProfileMutations();
  const user = profileQuery.data?.data ?? null;
  const displayInitial = (user?.avatarInitial || user?.name || 'M').charAt(0).toUpperCase();

  return {
    activeTab, setActiveTab, user, displayInitial,
    profileQuery, profileMutation, passwordMutation,
    saving: profileMutation.isPending || passwordMutation.isPending,
  };
}
