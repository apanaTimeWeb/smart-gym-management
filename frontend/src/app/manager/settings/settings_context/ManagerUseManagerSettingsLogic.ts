'use client';
// DATA FLOW: Manager Settings API → TanStack Query → form draft → Manager Settings mutation → cache.
/** Manages UseSettingsLogic for the Manager module. */
import { useCallback } from 'react';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { useManagerSettingsQuery } from '@/app/manager/settings/settings_api/ManagerUseManagerSettingsQuery';

export function useManagerSettingsLogic() {
  const query = useManagerSettingsQuery();
  const saveSettings = useCallback((draft: ManagerAllSettings) => query.updateSettings(draft), [query.updateSettings]);
  return {
    settings: query.data?.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    saveSettings,
    saving: query.isSaving,
  };
}
