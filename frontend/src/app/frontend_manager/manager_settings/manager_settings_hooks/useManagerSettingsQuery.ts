'use client';
// DATA FLOW: Settings page → ManagerSettingsQuery → ManagerSettingsApi → TanStack Query server state → settings UI.
import { useQuery } from '@tanstack/react-query';
import { ManagerSettingsApi } from '@/app/frontend_manager/manager_settings/manager_settings_api/ManagerSettingsApi';
import { ManagerSettingsQueryKeys } from '@/app/frontend_manager/manager_settings/manager_settings_constants/ManagerSettingsQueryKeys';

/**
 * @description Reads the current Manager settings through the module API and TanStack Query server-state boundary.
 * @dependencies Uses ManagerSettingsApi and ManagerSettingsQueryKeys.
 * @edge-case Retains TanStack Query's native pending/error states and never stores API response data in Zustand or local state.
 */
export function useManagerSettingsQuery() {
  return useQuery({
    queryKey: ManagerSettingsQueryKeys.current(),
    queryFn: ManagerSettingsApi.fetchSettings,
  });
}
