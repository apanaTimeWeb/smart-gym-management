// RESPONSIBILITY: Data hook for the Superadmin Backups page.
// DATA FLOW: backupsApi.fetchBackups() → useSuperadminBackupsData → SuperadminBackupsClient
import { useQuery } from '@tanstack/react-query';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

export function useSuperadminBackupsData(params?: Record<string, string>) {
  const query = useQuery({
    queryKey: ['superadmin', 'backups', params],
    queryFn: async () => {
      const res = await backupsApi.fetchBackups(params);
      if (!res.data) throw new Error(res.message);
      return res.data;
    }
  });

  return {
    data: query.data as BackupRecord[] | undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  };
}
