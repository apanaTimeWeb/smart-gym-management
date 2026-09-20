// DATA FLOW: Inputs enter useSuperadminBackupsActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Backup trigger, restore, and download actions; UI components consume feature-local actions only.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBackupSnapshot, restoreBackupSnapshot, fetchBackupDownloadUrl } from '@/app/superadmin/system-ops/backups/backups_api/SuperadminBackupsApi';

/**
 * Purpose: Owns asynchronous backup actions and Query cache reconciliation.
 * Inputs: feature-owned backup identifiers.
 * Output: mutation actions and pending/error state.
 * Side effects: refreshes the backups list after trigger/restore success.
 * Invariant: components never call the backup API directly.
 */
export function useSuperadminBackupsActions() {
  const queryClient = useQueryClient();
  const refreshBackups = async () => {
    await queryClient.invalidateQueries({ queryKey: ['superadmin', 'backups'] });
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
