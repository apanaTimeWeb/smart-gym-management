// RESPONSIBILITY: View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule.
'use client';
import { Clock, Check, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { SuperadminBackupsScheduleInputSchema, type SuperadminBackupsScheduleInput } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsScheduleTypes';
import { SUPERADMIN_BACKUPS_DEFAULT_CRON, SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS, SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS } from '@/app/superadmin/system-ops/backups/backups_utils/SuperadminBackupsScheduleConstants';
import { useSuperadminBackupsSchedule } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsSchedule';
import type { SuperadminBackupsScheduleModalProps } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsScheduleModalTypes';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';



export default function SuperadminBackupsScheduleModal({ isOpen, onClose }: SuperadminBackupsScheduleModalProps) {
  const { schedule, isPending, queryError, saveSchedule, isSaving } = useSuperadminBackupsSchedule(isOpen);
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SuperadminBackupsScheduleInput>({
    resolver: zodResolver(SuperadminBackupsScheduleInputSchema),
    defaultValues: { cronExpression: SUPERADMIN_BACKUPS_DEFAULT_CRON, retentionDays: 30 },
  });

// EFFECT INTENT: synchronizes derived/form state with incoming values; dependencies identify exactly when the sync is required.
  useEffect(() => {
    if (!isOpen || !schedule) return;
    reset({ cronExpression: schedule.cronExpression, retentionDays: schedule.retentionDays });
  }, [isOpen, reset, schedule]);

  useUnsavedChangesGuard(isOpen && isDirty && !isSaving, 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost?');

  if (!isOpen) return null;

  const handleSave = async (input: SuperadminBackupsScheduleInput) => {
    try {
      const response = await saveSchedule(input);
      toast.success(response.message, { id: 'superadmin-backups-schedule-save' });
      reset({ cronExpression: response.data?.cronExpression ?? input.cronExpression, retentionDays: response.data?.retentionDays ?? input.retentionDays });
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-backups-schedule-save' });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-schedule-title">
      <div className="bg-overlay w-full max-w-md rounded-xl shadow-dialog overflow-hidden border border-border">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-info-bg flex items-center justify-center mb-4" aria-hidden="true">
            <Clock size={18} strokeWidth={2} className="text-info"/>
          </div>
          <h2 id="superadmin-backups-schedule-title" className="text-lg font-bold text-primary mb-2">Automated Backup Schedule</h2>
          <p className="text-sm text-secondary mb-6">Configure when automated global database snapshots run and how long they are retained.</p>

          {isPending ? <div className="space-y-4" aria-live="polite"><div className="h-10 rounded-md bg-skeleton-base motion-safe:animate-pulse"/><div className="h-10 rounded-md bg-skeleton-base motion-safe:animate-pulse"/></div> : (
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
              <div>
                <label htmlFor="superadmin-backups-cron" className="block text-sm font-medium text-secondary mb-2">Cron Expression</label>
                <input id="superadmin-backups-cron" type="text" {...register('cronExpression')} aria-invalid={Boolean(errors.cronExpression)} aria-describedby="superadmin-backups-cron-help superadmin-backups-cron-error" className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder="0 2 * * *" />
                <p id="superadmin-backups-cron-help" className="text-xs text-secondary mt-1">Example: `0 2 * * *` runs every day at 02:00.</p>
                {errors.cronExpression && <p id="superadmin-backups-cron-error" className="text-xs text-danger mt-1">{errors.cronExpression.message}</p>}
              </div>
              <div>
                <label htmlFor="superadmin-backups-retention" className="block text-sm font-medium text-secondary mb-2">Retention Period (Days)</label>
                <input id="superadmin-backups-retention" type="number" min={SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS} max={SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS} step={1} {...register('retentionDays', { valueAsNumber: true })} aria-invalid={Boolean(errors.retentionDays)} aria-describedby="superadmin-backups-retention-error" className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                {errors.retentionDays && <p id="superadmin-backups-retention-error" className="text-xs text-danger mt-1">{errors.retentionDays.message}</p>}
              </div>
              {queryError && <p className="text-xs text-danger" role="alert">{queryError instanceof Error ? queryError.message : ''}</p>}
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 rounded-md font-medium border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
                <button type="submit" disabled={isSaving || !isDirty} className="min-w-32 px-4 py-2 rounded-md font-medium bg-primary text-on-primary hover:bg-primary-hover flex items-center justify-center gap-2 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {isSaving ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>Saving...</> : <><Check size={18} strokeWidth={2}/>Save Schedule</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export type { SuperadminBackupsScheduleModalProps } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsScheduleModalTypes';
