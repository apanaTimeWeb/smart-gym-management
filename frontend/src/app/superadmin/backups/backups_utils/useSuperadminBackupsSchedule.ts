// DATA FLOW: Backup schedule API → TanStack Query → schedule form state → validated mutation → query reconciliation → visible schedule.
/**
 * Owns server-state loading and schedule mutation for the Backups Schedule modal.
 * It accepts validated form input, exposes the authoritative schedule, and invalidates the
 * same feature-owned query after a successful update so reopening the modal reads saved state.
 */
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBackupSchedule, updateBackupSchedule } from '@/app/superadmin/backups/backups_api/SuperadminBackupsApi';
import { SuperadminBackupsScheduleInputSchema, type SuperadminBackupsScheduleInput } from '@/app/superadmin/backups/backups_types/SuperadminBackupsScheduleTypes';
import { SUPERADMIN_BACKUPS_SCHEDULE_QUERY_KEY } from '@/app/superadmin/backups/backups_utils/SuperadminBackupsScheduleConstants';

/** Owns the Backups schedule query and validates schedule mutations before cache reconciliation. */
export function useSuperadminBackupsSchedule(enabled: boolean) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: SUPERADMIN_BACKUPS_SCHEDULE_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchBackupSchedule();
      if (!response.success || !response.data) throw new Error(response.message);
      return response;
    },
    enabled,
  });
  const mutation = useMutation({
    mutationFn: async (input: SuperadminBackupsScheduleInput) => updateBackupSchedule(SuperadminBackupsScheduleInputSchema.parse(input)),
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      queryClient.setQueryData(SUPERADMIN_BACKUPS_SCHEDULE_QUERY_KEY, response);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BACKUPS_SCHEDULE_QUERY_KEY });
    },
  });
  return {
    schedule: query.data?.data,
    isPending: query.isPending,
    isError: query.isError,
    queryError: query.error,
    saveSchedule: mutation.mutateAsync,
    isSaving: mutation.isPending,
    saveError: mutation.error,
  };
}
