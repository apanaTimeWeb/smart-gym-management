'use client';
// RESPONSIBILITY: Retrieves authoritative backup data and server pagination metadata.
import { useQuery } from '@tanstack/react-query';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
export function useSuperadminBackupsData(params?: Record<string, string>) {
  const query = useQuery({ queryKey: ['superadmin','backups',params], queryFn: async () => { const res = await backupsApi.fetchBackups(params); if (!res.success || !res.data) throw new Error(res.message); return res; } });
  return { data: query.data?.data as BackupRecord[] | undefined, total: query.data?.meta?.total ?? query.data?.data?.length ?? 0, totalPages: query.data?.meta?.totalPages ?? 1, isLoading: query.isLoading, isError: query.isError, error: query.error };
}
