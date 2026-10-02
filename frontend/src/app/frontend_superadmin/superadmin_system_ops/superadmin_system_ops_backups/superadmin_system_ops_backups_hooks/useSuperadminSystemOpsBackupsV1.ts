'use client';// DATA FLOW: MSW/Backend → fetchBackups() → TanStack Query → Backup Safety & Restore Readiness UI
// RESPONSIBILITY: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
import { useQuery } from '@tanstack/react-query';

import { fetchBackupsHealth } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys';



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
/**
 * @description Owns the useSuperadminSystemOpsBackupsV1 responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsBackupsV1() {
    return useQuery({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.health, queryFn: () => fetchBackupsHealth() });
}
