// DATA FLOW: backups API → useSuperadminBackupsData → TanStack Query cache → Superadmin backups UI
'use client';
// RESPONSIBILITY: Retrieves authoritative backup data and server pagination metadata.
import { useQuery } from '@tanstack/react-query';
import * as backupsApi from '@/app/superadmin/system-ops/backups/backups_api/SuperadminBackupsApi';
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
/**
 * Purpose: Retrieves authoritative backup data and server pagination metadata.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminBackupsData(params?: Record<string, string>) {
    const query = useQuery({ queryKey: ['superadmin', 'backups', params], queryFn: async () => { const res = await backupsApi.fetchBackups(params); if (!res.success || !res.data)
            throw new Error(res.message); return res; } });
    return { data: query.data?.data as BackupRecord[] | undefined, total: query.data?.meta?.total ?? query.data?.data?.length ?? 0, totalPages: query.data?.meta?.totalPages ?? 1, isPending: query.isPending, isError: query.isError, error: query.error };
}
