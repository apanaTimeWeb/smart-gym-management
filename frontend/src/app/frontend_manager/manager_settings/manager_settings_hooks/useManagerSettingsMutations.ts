'use client';
// DATA FLOW: Settings save intent → dedicated mutation hook → ManagerSettingsApi → TanStack Query authoritative cache → settings UI.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerSettingsApi } from '@/app/frontend_manager/manager_settings/manager_settings_api/ManagerSettingsApi';
import { ManagerSettingsQueryKeys } from '@/app/frontend_manager/manager_settings/manager_settings_constants/ManagerSettingsQueryKeys';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';

/**
 * @description Owns Manager settings persistence and reconciles the response into the canonical settings query cache.
 * @dependencies Uses ManagerSettingsApi, ManagerSettingsQueryKeys, and the module settings payload type.
 * @edge-case Cache is only updated from the authoritative mutation response; failed saves retain the user's unsaved form state for the caller to recover.
 */
export function useManagerSettingsMutations() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ draft, idempotencyKey }: { draft: ManagerAllSettings; idempotencyKey: string }) => ManagerSettingsApi.updateSettings(draft, idempotencyKey),
    onSuccess: (response) => {
      queryClient.setQueryData(ManagerSettingsQueryKeys.current(), response);
      void queryClient.invalidateQueries({ queryKey: ManagerSettingsQueryKeys.current() });
    },
  });
}
