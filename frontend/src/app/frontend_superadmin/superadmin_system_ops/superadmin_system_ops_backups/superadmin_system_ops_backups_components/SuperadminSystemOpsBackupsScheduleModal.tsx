// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsBackupsScheduleModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminSystemOpsBackupsSchedule.
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';
import { SUPERADMIN_BACKUPS_DEFAULT_CRON, SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS, SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsScheduleConstants';
import { useSuperadminSystemOpsBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsSchedule';
import { SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema';

import type { SuperadminBackupsScheduleModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleModalTypes';
import type { SuperadminBackupsScheduleInput } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes';



/**
 * @description View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminSystemOpsBackupsSchedule.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminSystemOpsBackupsScheduleModal({ isOpen, onClose }: SuperadminBackupsScheduleModalProps) {
  const t = useTranslations('superadmin_system_ops_backups');
  const { schedule, isPending, queryError, saveSchedule, isSaving } = useSuperadminSystemOpsBackupsSchedule(isOpen);
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SuperadminBackupsScheduleInput>({
    resolver: zodResolver(SuperadminBackupsScheduleInputSchema),
    defaultValues: { cronExpression: SUPERADMIN_BACKUPS_DEFAULT_CRON, retentionDays: 30 },
  });
  const dialogRef = useSuperadminLayoutDialogA11y(isOpen, onClose);

// EFFECT INTENT: synchronizes derived/form state with incoming values; dependencies identify exactly when the sync is required.
  useEffect(() => {
    if (!isOpen || !schedule) return;
    reset({ cronExpression: schedule.cronExpression, retentionDays: schedule.retentionDays });
  }, [isOpen, reset, schedule]);

  useSuperadminLayoutUnsavedChangesGuard(isOpen && isDirty && !isSaving, t('ui.unsaved_backup_schedule_changes'));

  if (!isOpen) return null;

  const handleSave = async (input: SuperadminBackupsScheduleInput) => {
    try {
      const response = await saveSchedule(input);
      toast.success(response.message, { id: 'superadmin-backups-schedule-save' });
      reset({ cronExpression: response.data?.cronExpression ?? input.cronExpression, retentionDays: response.data?.retentionDays ?? input.retentionDays });
      onClose();
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-backups-schedule-save' });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-schedule-title" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-backups-schedule-modal-dialog" ref={dialogRef}>
      <div className="bg-overlay w-full max-w-md rounded-xl shadow-dialog overflow-hidden border border-border">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-info-bg flex items-center justify-center mb-4" aria-hidden="true">
            <Clock size={18} strokeWidth={2} className="text-info"/>
          </div>
          <h2 id="superadmin-backups-schedule-title" className="text-lg font-bold text-primary mb-2">{t('ui.automated_backup_schedule_0cb2af4')}</h2>
          <p className="text-sm text-secondary mb-6">{t('ui.configure_when_automated_global_database_snapshots_r_97b4a65')}</p>

          {isPending ? <div className="space-y-4" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-backups-schedule-modal-back" aria-live="polite"><div className="h-10 rounded-md bg-skeleton-base motion-safe:animate-pulse"/><div className="h-10 rounded-md bg-skeleton-base motion-safe:animate-pulse"/></div> : (
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-superadmin_system_ops_backups-superadminbackupsschedulemodal-form-submit">
              <div>
                <label htmlFor="superadmin-backups-cron" className="block text-sm font-medium text-secondary mb-2">{t('ui.cron_expression_fcb4a03')}</label>
                <input id="superadmin-backups-cron" type="text" {...register('cronExpression')} aria-invalid={Boolean(errors.cronExpression)} aria-describedby="superadmin-backups-cron-help superadmin-backups-cron-error" className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={t('ui.0_2_ec5427e')}  data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-schedule-modal-back-2"/>
                <p id="superadmin-backups-cron-help" className="text-xs text-secondary mt-1">{t('ui.example_0_2_runs_every_day_at_02_00_ac76b9f')}</p>
                {errors.cronExpression && <p id="superadmin-backups-cron-error" className="text-xs text-danger mt-1">{errors.cronExpression.message}</p>}
              </div>
              <div>
                <label htmlFor="superadmin-backups-retention" className="block text-sm font-medium text-secondary mb-2">{t('ui.retention_period_days_91be806')}</label>
                <input id="superadmin-backups-retention" type="number" min={SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS} max={SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS} step={1} {...register('retentionDays', { valueAsNumber: true })} aria-invalid={Boolean(errors.retentionDays)} aria-describedby="superadmin-backups-retention-error" className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-schedule-modal-back-3"/>
                {errors.retentionDays && <p id="superadmin-backups-retention-error" className="text-xs text-danger mt-1">{errors.retentionDays.message}</p>}
              </div>
              {queryError && <p className="text-xs text-danger" role="alert" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-backups-schedule-modal-error">{t('ui.schedule_load_error_5d24ef1')}</p>}
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={onClose} disabled={isSaving} className="min-h-11 px-4 py-2 rounded-md font-medium border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-backups-schedule-modal-cancel">{t('ui.cancel_5ded4db')}</button>
                <button type="submit" disabled={isSaving || !isDirty} className="min-h-11 min-w-32 px-4 py-2 rounded-md font-medium bg-primary text-on-primary hover:bg-primary-hover flex items-center justify-center gap-2 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-schedule-modal-back-5">
                  {isSaving ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>{t('ui.saving_6f3b48a')}</> : <><Check size={18} strokeWidth={2}/>{t('ui.save_schedule_b52bdb0')}</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export type { SuperadminBackupsScheduleModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleModalTypes';
