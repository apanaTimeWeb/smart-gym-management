'use client';
// DATA FLOW: Backups schedule modal → query registry → schedule API → validated query response.
// RESPONSIBILITY: Owns read-only Backups schedule server state.
import { useQuery } from '@tanstack/react-query';

import { fetchBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys';



/** @description Loads the feature-owned automated backup schedule. */
export function useSuperadminSystemOpsBackupsScheduleQuery(enabled: boolean) {
  const query = useQuery({
    queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.schedule,
    queryFn: async () => {
      const response = await fetchBackupSchedule();
      if (!response.success || !response.data) throw new Error(response.message);
      return response;
    },
    enabled,
  });
  return { schedule: query.data?.data, isPending: query.isPending, isError: query.isError, error: query.error, refetch: query.refetch };
}
