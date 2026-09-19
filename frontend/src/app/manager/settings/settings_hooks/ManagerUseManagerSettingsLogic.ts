'use client';
// RESPONSIBILITY: Provides the Settings server-state facade used by the form view; no presentation is owned here.
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
    error: query.error,
    errorMessage: query.error instanceof Error ? query.error.message : '',
    saveSettings,
    retry: query.refetch,
    saving: query.isSaving,
  };
}
