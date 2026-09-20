// RESPONSIBILITY: Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook.
'use client';
import { formatDateTime } from '@/lib/formatters';
import { Loader2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSuperadminBackupsActions } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsActions';
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
import type { SuperadminBackupsRestoreModalProps } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsRestoreModalTypes';



export default function SuperadminBackupsRestoreModal({ isOpen, onClose, selectedBackup, restoreConfirmText, setRestoreConfirmText }: SuperadminBackupsRestoreModalProps) {
  const { restoreBackup, isRestoring } = useSuperadminBackupsActions();
  if (!isOpen || !selectedBackup) return null;

  const confirmRestore = async () => {
    if (restoreConfirmText !== 'RESTORE' || isRestoring) return;
    try {
      const response = await restoreBackup(selectedBackup.id, crypto.randomUUID());
      toast.success(response.message, { id: 'superadmin-backups-restore-result' });
      setRestoreConfirmText('');
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-backups-restore-error' });
    }
  };

  return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-restore-title">
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in">
      <div className="p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-danger-bg text-on-danger" aria-hidden="true"><RotateCcw size={18} strokeWidth={2} /></div>
        <h2 id="superadmin-backups-restore-title" className="mb-2 text-lg font-bold text-primary">Restore Database Snapshot</h2>
        <p className="mb-4 text-sm text-secondary">Are you absolutely sure you want to restore the <strong className="text-primary">{selectedBackup.databaseName}</strong> database using snapshot <strong className="font-mono text-primary">{selectedBackup.id}</strong>?</p>
        <div className="mb-6 rounded-lg border border-warning-bg bg-warning-bg p-3"><p className="text-xs font-medium text-warning">⚠️ WARNING: This will immediately overwrite the live production database for <strong>{selectedBackup.tenantName}</strong>. Any data created after {formatDateTime(selectedBackup.timestamp)} will be permanently lost!</p></div>
        <div className="mb-6">
          <label htmlFor="superadmin-backups-restore-confirm" className="mb-2 block text-sm font-medium text-primary">Type <span className="font-mono font-bold text-danger">RESTORE</span> to confirm</label>
          <input id="superadmin-backups-restore-confirm" type="text" value={restoreConfirmText} onChange={(event) => setRestoreConfirmText(event.target.value)} disabled={isRestoring} aria-describedby="superadmin-backups-restore-help" className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" placeholder="RESTORE" autoFocus />
          <p id="superadmin-backups-restore-help" className="mt-1 text-xs text-secondary">The restore action cannot start until the exact confirmation phrase is entered.</p>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { onClose(); setRestoreConfirmText(''); }} disabled={isRestoring} className="rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
          <button type="button" onClick={() => void confirmRestore()} disabled={restoreConfirmText !== 'RESTORE' || isRestoring} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-danger px-4 py-2 font-medium text-on-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">{isRestoring ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" />Restoring...</> : 'Yes, Restore Snapshot'}</button>
        </div>
      </div>
    </div>
  </div>);
}

export type { SuperadminBackupsRestoreModalProps } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsRestoreModalTypes';
