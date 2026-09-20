// DATA FLOW: MSW/Backend → fetchBackupsHealth() → TanStack Query → Backup Safety & Restore Readiness UI
// RESPONSIBILITY: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBackupsHealth } from '@/app/superadmin/system-ops/backups/backups_api/SuperadminBackupsHealthApi';
/**
 * Purpose: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminBackupsV1() {
    return useQuery({ queryKey: ['superadmin', 'backups_health'], queryFn: fetchBackupsHealth });
}
