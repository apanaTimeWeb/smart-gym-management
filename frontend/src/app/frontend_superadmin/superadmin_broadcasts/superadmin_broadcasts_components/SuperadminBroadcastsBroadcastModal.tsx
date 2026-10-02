'use client';
import { useTranslations } from 'next-intl';
// RESPONSIBILITY: Renders and composes SuperadminBroadcastsBroadcastModal for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import React, { useMemo } from 'react';

import { X, Loader2, Users } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_BROADCAST_STATUS_OPTIONS, SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';
import { useSuperadminBroadcastsBroadcastModalData } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastModalData';
import { combineSuperadminBroadcastScheduleDateTime, splitSuperadminBroadcastScheduleDateTime } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_utils/SuperadminBroadcastsBroadcastScheduleUtils';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { SuperadminBroadcastsBroadcastModalProps } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastModalTypes';


/** @description Renders the broadcast create/edit form modal and delegates mutation orchestration to the owning hook. @dependencies Consumes React Hook Form state, feature translation strings, and mutation callbacks. @edge-case Preserves form values after failed submission and disables duplicate submission while pending. */
export const SuperadminBroadcastsBroadcastModal: React.FC<SuperadminBroadcastsBroadcastModalProps> = ({ isOpen, onClose, form, onSubmit, isEditMode = false, isMutating = false, }) => {
  const t = useTranslations('superadmin_broadcasts');
    const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = form;
    useSuperadminLayoutUnsavedChangesGuard(isOpen && isDirty);
    const status = watch('status');
    const targetGymIds = watch('targetGymIds') || [];
    const scheduledDateValue = watch('scheduledDate');
    const scheduleInput = React.useMemo(() => splitSuperadminBroadcastScheduleDateTime(scheduledDateValue), [scheduledDateValue]);
    const { gyms, isPendingGyms, recipientCount } = useSuperadminBroadcastsBroadcastModalData(isOpen, status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT);
    const allGymIds = gyms.map(g => g.id) || [];
    const isAllSelected = allGymIds.length > 0 && targetGymIds.length === allGymIds.length;
    // Recipient count: use API value if available, else fall back to selected gym count
    const previewRecipientCount = recipientCount ?? targetGymIds.length;
    if (!isOpen)
        return null;
    const handleSelectAll = () => {
        if (isAllSelected) {
            setValue('targetGymIds', [], { shouldValidate: true });
        }
        else {
            setValue('targetGymIds', allGymIds, { shouldValidate: true });
        }
    };
    const handleToggleGym = (id: string) => {
        if (targetGymIds?.includes(id)) {
            setValue('targetGymIds', targetGymIds.filter((g: string) => g !== id), { shouldValidate: true });
        }
        else {
            setValue('targetGymIds', [...targetGymIds, id], { shouldValidate: true });
        }
    };
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="superadmin_broadcasts-broadcast-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-primary">{isEditMode ? t('ui.edit_broadcast_4c7d1a2e') : t('ui.new_broadcast_6b2e9d1c')}</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area" data-testid="superadmin_broadcasts-superadminbroadcastsbroadcastmodal-form-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">{t('ui.broadcast_title_4c0bf8cd')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input {...register('title')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" placeholder={t('ui.e_g_scheduled_maintenance_3d4859c4')} data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-input"/>
            {errors.title && <span className="text-xs text-danger">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">{t('ui.message_content_ceb7e7c3')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <textarea {...register('content')} rows={4} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" placeholder={t('ui.write_your_announcement_here_90bb9df2')} data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-textarea"/>
            {errors.content && <span className="text-xs text-danger">{errors.content.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-secondary">{t('ui.select_target_gyms_711a5b59')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <button type="button" onClick={handleSelectAll} className="text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-broadcast-modal-select-all">
                  {isAllSelected ? t('ui.deselect_all_7d3a1b2e') : t('ui.select_all_gyms_8f2c4d1a')}
                </button>
              </div>
              <div className="bg-input border border-border rounded-xl max-h-40 overflow-y-auto custom-scrollbar p-2 grid grid-cols-2 gap-2">
                {isPendingGyms ? (<div className="col-span-2 flex justify-center py-4 text-primary"><Loader2 size={18} className="motion-safe:animate-spin"/></div>) : gyms?.map(gym => (<label key={gym.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-overlay rounded-lg motion-safe:transition-colors border border-transparent hover:border-border">
                    <input type="checkbox" checked={targetGymIds?.includes(gym.id)} onChange={() => handleToggleGym(gym.id)} className="w-4 h-4 rounded text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page accent-primary" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-checkbox"/>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-primary truncate">{gym.name}</span>
                      <span className="text-xs text-secondary truncate">{gym.ownerName}</span>
                    </div>
                  </label>))}
              </div>
              {errors.targetGymIds && <span className="text-xs text-danger">{errors.targetGymIds.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-sm font-bold text-secondary">{t('ui.status_ec53a8c4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <Controller name="status" control={form.control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_BROADCAST_STATUS_OPTIONS} data-testid="superadmin_broadcasts-broadcast-modal-status-dropdown"/>)} data-testid="superadmin_broadcasts-broadcast-modal-status-field"/>
              {errors.status && <span className="text-xs text-danger">{errors.status.message}</span>}
            </div>
          </div>

          {status === SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED && (<div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.scheduled_date_time_f8b67970')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <div className="flex gap-4">
                <input id="bcast-date" type="date" aria-label={t('ui.scheduled_date')} value={scheduleInput.date} onChange={(e) => {
                const date = e.target.value;
                const time = scheduleInput.time || '00:00';
                if (date) setValue('scheduledDate', combineSuperadminBroadcastScheduleDateTime(date, time), { shouldValidate: true });
            }} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-date"/>
                <input id="bcast-time" type="time" aria-label={t('ui.scheduled_time')} value={scheduleInput.time} onChange={(e) => {
                const time = e.target.value;
                const date = scheduleInput.date;
                if (date && time) setValue('scheduledDate', combineSuperadminBroadcastScheduleDateTime(date, time), { shouldValidate: true });
            }} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-broadcast-modal-bcast-time"/>
              </div>
              <input type="hidden" {...register('scheduledDate')} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-hidden"/>
              {errors.scheduledDate && <span className="text-xs text-danger">{errors.scheduledDate.message}</span>}
            </div>)}

          {status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && (<div className="space-y-3">
              {/* Bug #21 fix: Recipient count preview */}
              <div className="bg-primary-subtle border border-border rounded-lg p-4 flex items-center gap-3">
                <Users size={18} className="text-primary shrink-0"/>
                <p className="text-sm text-primary">
                  {t('ui.this_broadcast_will_reach_892b0968')}{' '}
                  <strong className="text-primary">{previewRecipientCount} {t('ui.active_gym_320951ed')}{previewRecipientCount !== 1 ? 's' : ''}</strong>{t('ui.text_5058f1af')}</p>
              </div>
              <div className="bg-warning-bg border border-border rounded-lg p-4">
                <p className="text-sm text-warning font-medium">
                  {t('ui.you_are_about_to_send_this_broadcast_immedia_6b535125')}<strong>{targetGymIds.length}</strong> {targetGymIds.length === 1 ? 'gym' : 'gyms'}{t('ui.this_action_cannot_be_undone_09403ebb')}</p>
              </div>
            </div>)}

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={isMutating} className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 flex items-center justify-center min-w-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-submit">
              {isMutating ? <Loader2 size={18} className="motion-safe:animate-spin"/> : status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT ? `Send to ${targetGymIds.length} Gyms` : 'Save Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
