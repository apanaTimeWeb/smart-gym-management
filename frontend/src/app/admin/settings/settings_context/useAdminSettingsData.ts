"use client";
// RESPONSIBILITY: Owns the Admin Settings server-state query and exposes only query results to the Settings view layer.
// DATA FLOW: Settings URL tab → TanStack Query → AdminSettingsApi → typed validated settings response → AdminSettingsContent.

import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/app/admin/settings/settings_api/AdminSettingsApi';

export function useAdminSettingsData() {
  return useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: settingsApi.fetchSettings,
    staleTime: 300_000,
  });
}
