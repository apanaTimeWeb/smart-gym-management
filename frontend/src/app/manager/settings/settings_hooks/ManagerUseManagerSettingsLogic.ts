// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
// RESPONSIBILITY: Provides the Settings server-state facade used by the form view; no presentation is owned here.
'use client';
import { useCallback } from 'react';
import { useManagerSettingsQuery } from '@/app/manager/settings/settings_hooks/ManagerUseManagerSettingsQuery';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerSettingsLogic() {
  const query = useManagerSettingsQuery();
  const saveSettings = useCallback((draft: ManagerAllSettings) => query.updateSettings(draft), [query.updateSettings]);
  return {
    settings: query.data?.data ?? null,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error instanceof Error ? query.error.message : '',
    saveSettings,
    retry: query.refetch,
    saving: query.isSaving,
  };
}
