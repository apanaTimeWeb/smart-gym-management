'use client';
// DATA FLOW: MSW/Backend → fetchSettingsGovernance() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchSettingsGovernance } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsGovernanceApi';
import { SUPERADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_constants/SuperadminSettingsQueryKeys';



/**
 * @description Loads Settings governance data through the feature query-key and API boundary.
 * @dependencies TanStack Query, Settings query keys, and the feature API client.
 * @edge-case Missing data remains undefined so the view can render its documented loading/empty states rather than inventing records.
 */
export function useSuperadminSettingsV1() {
  return useQuery({
    queryKey: SUPERADMIN_SETTINGS_QUERY_KEYS.governance,
    queryFn: () => fetchSettingsGovernance(),
  });
}
