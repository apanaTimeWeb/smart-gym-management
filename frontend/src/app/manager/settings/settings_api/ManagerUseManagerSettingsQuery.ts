'use client';
// RESPONSIBILITY: Owns TanStack Query server-state loading and mutation cache reconciliation for Manager Settings.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';

export const MANAGER_SETTINGS_QUERY_KEY = ['manager', 'settings'] as const;

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
