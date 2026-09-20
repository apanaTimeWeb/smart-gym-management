// RESPONSIBILITY: Renders the Create/Edit Broadcast modal form. Receives form state via props and server-state preview data from useSuperadminBroadcastModalData.
'use client';
import React from 'react';
import { X, Loader2, Users } from 'lucide-react';
import { Controller } from 'react-hook-form';
import type { SuperadminBroadcastModalProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastModalTypes';
import { useSuperadminBroadcastModalData } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastModalData';
import { SUPERADMIN_BROADCAST_STATUS_OPTIONS } from '@/app/superadmin/broadcasts/broadcasts_utils/SuperadminBroadcastConstants';
import { combineSuperadminBroadcastScheduleDateTime, splitSuperadminBroadcastScheduleDateTime } from '@/app/superadmin/broadcasts/broadcasts_utils/SuperadminBroadcastScheduleUtils';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
export const SuperadminBroadcastModal: React.FC<SuperadminBroadcastModalProps> = ({ isOpen, onClose, form, onSubmit, isEditMode = false, isMutating = false, }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = form;
    useUnsavedChangesGuard(isOpen && isDirty);
    const status = watch('status');
    const targetGymIds = watch('targetGymIds') || [];
    const scheduledDateValue = watch('scheduledDate');
    const scheduleInput = React.useMemo(() => splitSuperadminBroadcastScheduleDateTime(scheduledDateValue), [scheduledDateValue]);
    const { gyms, isPendingGyms, recipientCount } = useSuperadminBroadcastModalData(isOpen, status === 'SENT');
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
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-primary">{isEditMode ? 'Edit Broadcast' : 'New Broadcast'}</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary motion-safe:transition-colors">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Broadcast Title <span className="text-danger">*</span></label>
            <input {...register('title')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary motion-safe:transition-colors" placeholder="e.g. Scheduled Maintenance"/>
            {errors.title && <span className="text-xs text-danger">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Message Content <span className="text-danger">*</span></label>
            <textarea {...register('content')} rows={4} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary motion-safe:transition-colors resize-none" placeholder="Write your announcement here..."/>
            {errors.content && <span className="text-xs text-danger">{errors.content.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-secondary">Select Target Gyms <span className="text-danger">*</span></label>
                <button type="button" onClick={handleSelectAll} className="text-xs font-semibold text-primary hover:underline">
                  {isAllSelected ? 'Deselect All' : 'Select All Gyms'}
                </button>
              </div>
              <div className="bg-input border border-border rounded-xl max-h-40 overflow-y-auto custom-scrollbar p-2 grid grid-cols-2 gap-2">
                {isPendingGyms ? (<div className="col-span-2 flex justify-center py-4 text-primary"><Loader2 size={18} className="w-5 motion-safe:animate-spin"/></div>) : gyms?.map(gym => (<label key={gym.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-overlay rounded-lg motion-safe:transition-colors border border-transparent hover:border-border">
                    <input type="checkbox" checked={targetGymIds?.includes(gym.id)} onChange={() => handleToggleGym(gym.id)} className="w-4 h-4 rounded text-primary focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page accent-primary"/>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-primary truncate">{gym.name}</span>
                      <span className="text-xs text-secondary truncate">{gym.ownerName}</span>
                    </div>
                  </label>))}
              </div>
              {errors.targetGymIds && <span className="text-xs text-danger">{errors.targetGymIds.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-sm font-bold text-secondary">Status <span className="text-danger">*</span></label>
              <Controller name="status" control={form.control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_BROADCAST_STATUS_OPTIONS}/>)}/>
              {errors.status && <span className="text-xs text-danger">{errors.status.message}</span>}
            </div>
          </div>

          {status === 'SCHEDULED' && (<div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">Scheduled Date & Time <span className="text-danger">*</span></label>
              <div className="flex gap-4">
                <input type="date" value={scheduleInput.date} onChange={(e) => {
                const date = e.target.value;
                const time = scheduleInput.time || '00:00';
                if (date) setValue('scheduledDate', combineSuperadminBroadcastScheduleDateTime(date, time), { shouldValidate: true });
            }} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary motion-safe:transition-colors"/>
                <input id="bcast-time" type="time" value={scheduleInput.time} onChange={(e) => {
                const time = e.target.value;
                const date = scheduleInput.date;
                if (date && time) setValue('scheduledDate', combineSuperadminBroadcastScheduleDateTime(date, time), { shouldValidate: true });
            }} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary motion-safe:transition-colors"/>
              </div>
              <input type="hidden" {...register('scheduledDate')}/>
              {errors.scheduledDate && <span className="text-xs text-danger">{errors.scheduledDate.message}</span>}
            </div>)}

          {status === 'SENT' && (<div className="space-y-3">
              {/* Bug #21 fix: Recipient count preview */}
              <div className="bg-primary-subtle border border-border rounded-lg p-4 flex items-center gap-3">
                <Users size={18} className="w-5 text-primary shrink-0"/>
                <p className="text-sm text-primary">
                  This broadcast will reach{' '}
                  <strong className="text-primary">{previewRecipientCount} active gym{previewRecipientCount !== 1 ? 's' : ''}</strong>.
                </p>
              </div>
              <div className="bg-warning-bg border border-border rounded-lg p-4">
                <p className="text-sm text-warning font-medium">
                  ⚠️ You are about to send this broadcast immediately to <strong>{targetGymIds.length}</strong> {targetGymIds.length === 1 ? 'gym' : 'gyms'}. This action cannot be undone.
                </p>
              </div>
            </div>)}

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-border text-primary font-medium rounded-lg motion-safe:transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isMutating} className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 flex items-center justify-center min-w-32">
              {isMutating ? <Loader2 size={18} className="w-4 motion-safe:animate-spin"/> : status === 'SENT' ? `Send to ${targetGymIds.length} Gyms` : 'Save Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
