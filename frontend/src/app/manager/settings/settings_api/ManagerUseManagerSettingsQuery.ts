'use client';
// DATA FLOW: Manager Settings API → TanStack Query cache → ManagerSettingsMain form.
/** Manages UseSettingsQuery for the Manager module. */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';

export const MANAGER_SETTINGS_QUERY_KEY = ['manager', 'settings'] as const;

/** Loads all Manager settings and exposes an authoritative mutation path for updates. */
export function useManagerSettingsQuery() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: MANAGER_SETTINGS_QUERY_KEY, queryFn: managerSettingsApi.fetchSettings });
  const updateMutation = useMutation({
    mutationFn: managerSettingsApi.updateSettings,
    onSuccess: (response) => {
      if (response.data) queryClient.setQueryData(MANAGER_SETTINGS_QUERY_KEY, response.data);
    },
  });
  return { ...query, updateSettings: updateMutation.mutateAsync, isSaving: updateMutation.isPending };
}
