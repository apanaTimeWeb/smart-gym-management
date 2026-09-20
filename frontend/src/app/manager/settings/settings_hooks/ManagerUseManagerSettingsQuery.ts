// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
// RESPONSIBILITY: Owns TanStack Query server-state loading and mutation cache reconciliation for Manager Settings.
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';


export const MANAGER_SETTINGS_QUERY_KEY = ['manager', 'settings'] as const;

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerSettingsQuery() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: MANAGER_SETTINGS_QUERY_KEY, queryFn: managerSettingsApi.fetchSettings });
  const updateMutation = useMutation({
    mutationFn: managerSettingsApi.updateSettings,
    onSuccess: (response) => {
      queryClient.setQueryData(MANAGER_SETTINGS_QUERY_KEY, response);
    },
  });
  return { ...query, updateSettings: updateMutation.mutateAsync, isSaving: updateMutation.isPending };
}
