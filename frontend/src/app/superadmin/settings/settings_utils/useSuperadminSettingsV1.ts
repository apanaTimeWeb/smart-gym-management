// DATA FLOW: MSW/Backend → fetchSettingsGovernance() → TanStack Query → Platform Governance UI
// RESPONSIBILITY: Owns query orchestration for Platform Governance. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSettingsGovernance } from '@/app/superadmin/settings/settings_api/superadmin_settings_governance_api';
export function useSuperadminSettingsV1() {
    return useQuery({ queryKey: ['superadmin', 'settings_governance'], queryFn: fetchSettingsGovernance });
}
