'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsBackupsActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Backup trigger, restore, and download actions; UI components consume feature-local actions only.
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_query_keys/SuperadminSystemOpsBackupsQueryKeys';
import { createBackupSnapshot, restoreBackupSnapshot, fetchBackupDownloadUrl } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';

/**
 * Purpose: Owns asynchronous backup actions and Query cache reconciliation.
 * Inputs: feature-owned backup identifiers.
 * Output: mutation actions and pending/error state.
 * Side effects: refreshes the backups list after trigger/restore success.
 * Invariant: components never call the backup API directly.
 
 * @description Owns asynchronous backup actions and Query cache reconciliation.
 * @dependencies feature-owned backup identifiers.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsBackupsActions() {
  const queryClient = useQueryClient();
  const refreshBackups = async () => {
    await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.all });
  };
  const triggerMutation = useMutation({
    mutationFn: (idempotencyKey: string) => createBackupSnapshot(idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success) throw new Error(response.message);
      await refreshBackups();
    },
  });
  const restoreMutation = useMutation({
    mutationFn: ({ backupId, idempotencyKey }: { backupId: string; idempotencyKey: string }) => restoreBackupSnapshot(backupId, idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success) throw new Error(response.message);
      await refreshBackups();
    },
  });
  const downloadBackup = async (backupId: string) => {
    const response = await fetchBackupDownloadUrl(backupId);
    if (!response.success || !response.data?.downloadUrl) throw new Error(response.message);
    window.location.assign(response.data.downloadUrl);
    return response;
  };
  return {
    triggerBackup: (idempotencyKey: string) => triggerMutation.mutateAsync(idempotencyKey),
    isTriggering: triggerMutation.isPending,
    triggerError: triggerMutation.error,
    restoreBackup: (backupId: string, idempotencyKey: string) => restoreMutation.mutateAsync({ backupId, idempotencyKey }),
    isRestoring: restoreMutation.isPending,
    restoreError: restoreMutation.error,
    downloadBackup,
  };
}
