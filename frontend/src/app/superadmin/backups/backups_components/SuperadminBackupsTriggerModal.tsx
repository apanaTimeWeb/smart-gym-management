// RESPONSIBILITY: Renders the Backups Trigger Modal component and its associated UI logic.
'use client';
import { DatabaseBackup } from 'lucide-react';
import toast from 'react-hot-toast';
import * as backupsApi from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
interface SuperadminBackupsTriggerModalProps {
    isOpen: boolean;
    onClose: () => void;
    isTriggering: boolean;
    setIsTriggering: (val: boolean) => void;
}
export default function SuperadminBackupsTriggerModal({ isOpen, onClose, isTriggering, setIsTriggering }: SuperadminBackupsTriggerModalProps) {
    if (!isOpen)
        return null;
    const handlecreateBackupSnapshot = async () => {
        onClose();
        setIsTriggering(true);
        const loadingToast = toast.loading('Initiating global pg_dump snapshot...', { id: 'superadmin-toast-6898fe4497' });
        try {
            const response = await backupsApi.createBackupSnapshot();
            toast.success(response.message, { id: loadingToast });
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : '', { id: loadingToast });
        }
        finally {
            setIsTriggering(false);
        }
    };
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            <DatabaseBackup className="w-6 h-6"/>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Trigger Global Backup</h2>
          <p className="text-sm text-secondary mb-6">
            Are you sure you want to trigger a manual pg_dump snapshot for all tenant databases? This process is resource-intensive and may take a few minutes.
          </p>
          <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-colors">
              Cancel
            </button>
            <button onClick={handlecreateBackupSnapshot} className="px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary-hover text-white motion-safe:transition-colors">
              Yes, Start Backup
            </button>
          </div>
        </div>
      </div>
    </div>);
}
