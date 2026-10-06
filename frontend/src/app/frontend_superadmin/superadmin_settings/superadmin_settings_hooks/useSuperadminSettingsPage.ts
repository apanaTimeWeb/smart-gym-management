'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminSettingsPage → consuming feature component.
import { useQuery } from '@tanstack/react-query';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi';
import { SUPERADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_constants/SuperadminSettingsQueryKeys';
import { useSuperadminSettingsUpdateMutation } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsUpdateMutation';



/**
 * @description Owns platform settings query state and delegates persistence to the dedicated mutation hook.
 * @dependencies Uses the module query-key registry, API read contract, and module-owned update mutation.
 * @edge-case Keeps server state in TanStack Query and reuses a single idempotency key across retries for one save intent.
 */
export function useSuperadminSettingsPage() {
  const query = useQuery({ queryKey: SUPERADMIN_SETTINGS_QUERY_KEYS.all, queryFn: settingsApi.fetchSettings });
  const { updateSetting, isUpdating, updateError, variables } = useSuperadminSettingsUpdateMutation();
  return { query, updateSetting, isUpdating, updateError, variables };
}
