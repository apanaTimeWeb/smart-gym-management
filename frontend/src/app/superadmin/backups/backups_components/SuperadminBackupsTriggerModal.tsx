// RESPONSIBILITY: Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook.
'use client';
import { DatabaseBackup, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSuperadminBackupsActions } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsActions';
import type { SuperadminBackupsTriggerModalProps } from '@/app/superadmin/backups/backups_types/SuperadminBackupsTriggerModalTypes';



export default function SuperadminBackupsTriggerModal({ isOpen, onClose }: SuperadminBackupsTriggerModalProps) {
  const { triggerBackup, isTriggering } = useSuperadminBackupsActions();
  if (!isOpen) return null;
  const handleCreateBackup = async () => {
    if (isTriggering) return;
    try {
      const response = await triggerBackup(crypto.randomUUID());
      toast.success(response.message, { id: 'superadmin-backups-trigger-result' });
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-backups-trigger-error' });
    }
  };
  return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-trigger-title">
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in">
      <div className="p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-subtle text-primary" aria-hidden="true"><DatabaseBackup size={18} strokeWidth={2} /></div>
        <h2 id="superadmin-backups-trigger-title" className="mb-2 text-lg font-bold text-primary">Trigger Global Backup</h2>
        <p className="mb-6 text-sm text-secondary">Are you sure you want to trigger a manual snapshot for all tenant databases? This process is resource-intensive and may take a few minutes.</p>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isTriggering} className="rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
          <button type="button" onClick={() => void handleCreateBackup()} disabled={isTriggering} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{isTriggering ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" />Creating...</> : 'Yes, Start Backup'}</button>
        </div>
      </div>
    </div>
  </div>);
}

export type { SuperadminBackupsTriggerModalProps } from '@/app/superadmin/backups/backups_types/SuperadminBackupsTriggerModalTypes';
