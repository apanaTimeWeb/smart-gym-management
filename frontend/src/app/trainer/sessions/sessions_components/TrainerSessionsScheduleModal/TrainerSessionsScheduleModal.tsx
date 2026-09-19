'use client';
// RESPONSIBILITY: Renders the TrainerSessionsScheduleModal UI for the owning Trainer feature; data access remains in the feature API/query layer.
import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTrainerScheduleForm } from '@/app/trainer/sessions/sessions_components/TrainerSessionsScheduleModal/useTrainerScheduleForm';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { DURATION_OPTIONS } from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import type { SessionType } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import type { TrainerSessionsScheduleModalProps } from '@/app/trainer/sessions/sessions_components/TrainerSessionsScheduleModal/TrainerSessionsScheduleModalTypes';

export default function TrainerSessionsScheduleModal({
  onClose,
  onSubmit,
  memberOptions,
  isSubmitting,
}: TrainerSessionsScheduleModalProps) {
  const { form, handleSubmit } = useTrainerScheduleForm(onSubmit);
  const { register, watch, setValue, formState: { errors, isDirty } } = form;

  const durationOptions = DURATION_OPTIONS.map(d => ({ value: d.value, label: d.label }));
  const selectedType = watch('type');
  const selectedMemberId = watch('memberId');
  const selectedDuration = watch('duration');

  useTrainerUnsavedChangesGuard(isDirty && !isSubmitting);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-md rounded-2xl shadow-dialog border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-primary">Schedule PT Session</h3>
          <button type="button"
            onClick={onClose}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-1 rounded-lg motion-safe:transition-colors motion-safe:duration-base"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Session Type</label>
            <TrainerSearchableDropdown
              options={[{value: 'PT', label: 'Personal Training'}, {value: 'Group', label: 'Group Class'}]}
              value={selectedType}
              onChange={(val: string | number) => setValue('type', val as SessionType, { shouldValidate: true })}
              placeholder="-- Choose Type --"
            />
            {errors.type && <p className="text-xs text-danger mt-1">{errors.type.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Select Member (Optional for Group)</label>
            <TrainerSearchableDropdown
              options={memberOptions}
              value={selectedMemberId || ''}
              onChange={(val: string | number) => setValue('memberId', String(val), { shouldValidate: true })}
              placeholder="-- Choose Member --"
            />
            {errors.memberId && <p className="text-xs text-danger mt-1">{errors.memberId.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Date</label>
              <input
                type="date"
                {...register('date')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.date && <p className="text-xs text-danger mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Time</label>
              <input
                type="time"
                {...register('time')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.time && <p className="text-xs text-danger mt-1">{errors.time.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Duration</label>
            <TrainerSearchableDropdown
              options={durationOptions}
              value={selectedDuration}
              onChange={(val: string | number) => setValue('duration', String(val), { shouldValidate: true })}
              placeholder="Select duration"
            />
            {errors.duration && <p className="text-xs text-danger mt-1">{errors.duration.message}</p>}
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <button
              type="button"
              onClick={onClose}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors motion-safe:duration-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70"
            >
              {isSubmitting && <Loader2 size={16} className="motion-safe:animate-spin" />}
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
