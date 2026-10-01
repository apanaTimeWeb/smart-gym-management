'use client';
// DATA FLOW: MSW/Backend → fetchBackups() → TanStack Query → Backup Safety & Restore Readiness UI
// RESPONSIBILITY: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_query_keys/SuperadminSystemOpsBackupsQueryKeys';
import { fetchBackupsHealth } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi';

/**
 * Purpose: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsBackupsV1() {
    return useQuery({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.health, queryFn: () => fetchBackupsHealth() });
}
