'use client';// DATA FLOW: Backups schedule form → dedicated mutation → API → query reconciliation → refreshed schedule.
// RESPONSIBILITY: Owns the Backups schedule update mutation and idempotency-key lifecycle.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchBackupSchedule, updateBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys';
import { SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema';

import type { SuperadminBackupsScheduleInput } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes';



/** @description Persists a validated backup schedule and reconciles the canonical query cache. */
export function useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  return useMutation({
    mutationFn: async (input: SuperadminBackupsScheduleInput) => {
      const validated = SuperadminBackupsScheduleInputSchema.parse(input);
      idempotencyKeyRef.current ??= crypto.randomUUID();
      return updateBackupSchedule(validated, idempotencyKeyRef.current);
    },
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      idempotencyKeyRef.current = null;
      queryClient.setQueryData(SUPERADMIN_BACKUPS_QUERY_KEYS.schedule, response);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.schedule });
    },
  });
}
