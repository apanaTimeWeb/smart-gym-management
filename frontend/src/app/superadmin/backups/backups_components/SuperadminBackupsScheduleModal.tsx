'use client';
import { useSuperadminDialogAccessibility } from '@/app/superadmin/superadmin_utils/useSuperadminDialogAccessibility';
// RESPONSIBILITY: Renders and submits the automated backup schedule form. No backend data is invented in the view.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Clock, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import { BackupScheduleSchema, type BackupSchedule } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { useSuperadminUnsavedChangesGuard } from '@/app/superadmin/superadmin_utils/useSuperadminUnsavedChangesGuard';

interface SuperadminBackupsScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuperadminBackupsScheduleModal({ isOpen, onClose }: SuperadminBackupsScheduleModalProps) {
  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting }, reset } = useForm<BackupSchedule>({
    resolver: zodResolver(BackupScheduleSchema),
    defaultValues: { cronExpression: '0 2 * * *', retentionDays: 30 },
  });
  useSuperadminUnsavedChangesGuard(isDirty && isOpen, 'You have unsaved backup schedule changes. Discard?');
  const dialogRef = useSuperadminDialogAccessibility(isOpen, onClose);


  if (!isOpen) return null;

  const handleSave = async (values: BackupSchedule) => {
    try {
      const response = await backupsApi.updateBackupSchedule(values);
      reset(response.data ?? values);
      toast.success(response.message, { id: 'backup-schedule-update' });
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Backup schedule update failed.', { id: 'backup-schedule-update' });
    }
  };

  return (
    <div ref={dialogRef}  className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="backup-schedule-title">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <form onSubmit={handleSubmit(handleSave)} className="p-6">
          <div className="w-12 h-12 rounded-full bg-info/10 text-info flex items-center justify-center mb-4"><Clock size={18} strokeWidth={2} /></div>
          <h2 id="backup-schedule-title" className="text-xl font-bold text-foreground mb-2">Automated Backup Schedule</h2>
          <p className="text-sm text-secondary mb-6">Configure the cron expression and retention period used by the backup scheduler.</p>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="cron-expression" className="block text-sm font-medium text-foreground mb-2">Cron Expression</label>
              <input id="cron-expression" {...register('cronExpression')} aria-invalid={!!errors.cronExpression} aria-describedby="cron-error" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono" placeholder="0 2 * * *" />
              {errors.cronExpression && <p id="cron-error" className="text-xs text-danger mt-1">{errors.cronExpression.message}</p>}
            </div>
            <div>
              <label htmlFor="retention-days" className="block text-sm font-medium text-foreground mb-2">Retention Period (Days)</label>
              <input id="retention-days" type="number" min={1} max={365} step={1} {...register('retentionDays', { valueAsNumber: true })} aria-invalid={!!errors.retentionDays} aria-describedby="retention-error" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {errors.retentionDays && <p id="retention-error" className="text-xs text-danger mt-1">{errors.retentionDays.message}</p>}
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="min-w-36 px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 motion-safe:transition-all motion-safe:duration-200 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {isSubmitting ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" /> Saving...</> : <><Check size={18} strokeWidth={2} /> Save Schedule</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
