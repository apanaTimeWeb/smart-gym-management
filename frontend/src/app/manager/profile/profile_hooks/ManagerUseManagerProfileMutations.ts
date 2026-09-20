// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerProfileApi } from '@/app/manager/profile/profile_api/ManagerProfileApi';
import type { UpdateManagerPasswordPayload, UpdateManagerProfilePayload } from '@/app/manager/profile/profile_types/ManagerProfileTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerProfileMutations() {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({ mutationFn: (payload: UpdateManagerProfilePayload) => managerProfileApi.updateProfile(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['manager', 'profile', 'current'] }) });
  const passwordMutation = useMutation({ mutationFn: (payload: UpdateManagerPasswordPayload) => managerProfileApi.updatePassword(payload) });
  return { profileMutation, passwordMutation };
}
