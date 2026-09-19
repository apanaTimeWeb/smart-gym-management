// DATA FLOW: MSW/Backend → fetchSettingsGovernance() → TanStack Query → Platform Governance UI
// RESPONSIBILITY: Owns query orchestration for Platform Governance. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSettingsGovernance } from '@/app/superadmin/settings/settings_api/SuperadminSettingsGovernanceApi';
/**
 * Purpose: Owns query orchestration for Platform Governance. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminSettingsV1() {
    return useQuery({ queryKey: ['superadmin', 'settings_governance'], queryFn: fetchSettingsGovernance });
}
