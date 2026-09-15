// RESPONSIBILITY: Encapsulates functionality for useSuperadminBackupsData.ts
// DATA FLOW: Component -> useSuperadminBackupsData.ts -> API/Store
import { useQuery } from '@tanstack/react-query';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';



export function useSuperadminBackupsData() {
  const query = useQuery({
    queryKey: ['superadmin', 'backups'],
    queryFn: async () => {
// DATA FLOW: Component -> useSuperadminBackupsData.ts -> API/Store
import { useQuery } from '@tanstack/react-query';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';



export function useSuperadminBackupsData() {
  const query = useQuery({
    queryKey: ['superadmin', 'backups'],
    queryFn: async () => {
      const res = await backupsApi.fetchBackups();
      if (!res.data) throw new Error(res.message || 'Failed to fetch backups data');
      return res.data;
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  };
}
