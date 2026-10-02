'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsBackupsActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Backup trigger, restore, and download actions; UI components consume feature-local actions only.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createBackupSnapshot, restoreBackupSnapshot, fetchBackupDownloadUrl } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys';



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
/**
 * @description Owns the useSuperadminSystemOpsBackupsActions responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsBackupsActions() {
  const queryClient = useQueryClient();
  const triggerIdempotencyKeyRef = useRef<string | null>(null);
  const restoreIdempotencyKeysRef = useRef(new Map<string, string>());
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
  const triggerBackup = async () => {
    triggerIdempotencyKeyRef.current ??= crypto.randomUUID();
    try {
      const response = await triggerMutation.mutateAsync(triggerIdempotencyKeyRef.current);
      triggerIdempotencyKeyRef.current = null;
      return response;
    } catch (error) {
      throw error;
    }
  };
  const restoreBackup = async (backupId: string) => {
    const key = restoreIdempotencyKeysRef.current.get(backupId) ?? crypto.randomUUID();
    restoreIdempotencyKeysRef.current.set(backupId, key);
    try {
      const response = await restoreMutation.mutateAsync({ backupId, idempotencyKey: key });
      restoreIdempotencyKeysRef.current.delete(backupId);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const clearRestoreIntent = (backupId: string) => {
    restoreIdempotencyKeysRef.current.delete(backupId);
  };
  const downloadBackup = async (backupId: string) => {
    const response = await fetchBackupDownloadUrl(backupId);
    if (!response.success || !response.data?.downloadUrl) throw new Error(response.message);
    window.location.assign(response.data.downloadUrl);
    return response;
  };
  return {
    triggerBackup,
    isTriggering: triggerMutation.isPending,
    triggerError: triggerMutation.error,
    restoreBackup,
    isRestoring: restoreMutation.isPending,
    restoreError: restoreMutation.error,
    clearRestoreIntent,
    downloadBackup,
  };
}
