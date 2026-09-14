'use client';
// RESPONSIBILITY: Modal for confirming a dangerous database restore from a backup snapshot.
// Requires the user to type "RESTORE" before the action can be committed.

import { RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

interface SuperadminBackupsRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBackup: BackupRecord | null;
  restoreConfirmText: string;
  setRestoreConfirmText: (val: string) => void;
  onSuccess: () => void;
}

export default function SuperadminBackupsRestoreModal({ 
  isOpen, onClose, selectedBackup, restoreConfirmText, setRestoreConfirmText, onSuccess 
}: SuperadminBackupsRestoreModalProps) {
  if (!isOpen || !selectedBackup) return null;

  const confirmRestore = async () => {
    if (restoreConfirmText !== 'RESTORE') return;
    onClose();
    
    const loadingToastId = toast.loading(`Restoring database ${selectedBackup.databaseName} from snapshot...`);
    try {
      await backupsApi.restoreSnapshot(selectedBackup.id);
      toast.success(`Database ${selectedBackup.databaseName} successfully restored!`, { id: loadingToastId });
      onSuccess();
    } catch {
      toast.error('Failed to restore snapshot', { id: loadingToastId });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-danger-bg/10 text-danger flex items-center justify-center mb-4">
            <RotateCcw size={24} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Restore Database Snapshot</h2>
          <p className="text-sm text-secondary mb-4">
            Are you absolutely sure you want to restore the <strong className="text-foreground">{selectedBackup.databaseName}</strong> database using snapshot <strong className="text-foreground font-mono">{selectedBackup.id}</strong>?
          </p>
          <div className="bg-warning/10 border border-warning/20 p-3 rounded-lg mb-6">
            <p className="text-xs text-warning font-medium">
              ⚠️ WARNING: This will immediately overwrite the live production database for <strong>{selectedBackup.tenantName}</strong>. Any data created after {new Date(selectedBackup.timestamp).toLocaleString()} will be permanently lost!
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">Type <span className="font-mono text-danger font-bold">RESTORE</span> to confirm</label>
            <input 
              type="text" 
              value={restoreConfirmText}
              onChange={(e) => setRestoreConfirmText(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-danger"
              placeholder="RESTORE"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button 
              onClick={() => { onClose(); setRestoreConfirmText(''); }}
              className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={confirmRestore}
              disabled={restoreConfirmText !== 'RESTORE'}
              className="px-4 py-2 rounded-lg font-medium bg-danger hover:bg-danger/90 text-white motion-safe:transition-colors disabled:opacity-50"
            >
              Yes, Restore Snapshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
