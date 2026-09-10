import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTrainerScheduleForm } from './useTrainerScheduleForm';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';
import { DURATION_OPTIONS } from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import type { CreateSessionDto } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';

interface TrainerSessionsScheduleModalProps {
  onClose: () => void;
  onSubmit: (dto: CreateSessionDto) => Promise<void>;
  memberOptions: { value: string; label: string }[];
  isSubmitting: boolean;
}

export default function TrainerSessionsScheduleModal({
  onClose,
  onSubmit,
  memberOptions,
  isSubmitting,
}: TrainerSessionsScheduleModalProps) {
  const { form, handleSubmit } = useTrainerScheduleForm(onSubmit);
  const { register, watch, setValue, formState: { errors } } = form;

  const durationOptions = DURATION_OPTIONS.map(d => ({ value: d.value, label: d.label }));
  const selectedType = watch('type');
  const selectedMemberId = watch('memberId');
  const selectedDuration = watch('duration');

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Schedule PT Session</h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg motion-safe:transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Session Type</label>
            <SearchableDropdown
              options={[{value: 'PT', label: 'Personal Training'}, {value: 'Group', label: 'Group Class'}]}
              value={selectedType}
              onChange={(val) => setValue('type', val as 'PT' | 'Group', { shouldValidate: true })}
              placeholder="-- Choose Type --"
            />
            {errors.type && <p className="text-xs text-danger mt-1">{errors.type.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Select Member (Optional for Group)</label>
            <SearchableDropdown
              options={memberOptions}
              value={selectedMemberId || ''}
              onChange={(val) => setValue('memberId', String(val), { shouldValidate: true })}
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
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.date && <p className="text-xs text-danger mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Time</label>
              <input
                type="time"
                {...register('time')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.time && <p className="text-xs text-danger mt-1">{errors.time.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Duration</label>
            <SearchableDropdown
              options={durationOptions}
              value={selectedDuration}
              onChange={(val) => setValue('duration', String(val), { shouldValidate: true })}
              placeholder="Select duration"
            />
            {errors.duration && <p className="text-xs text-danger mt-1">{errors.duration.message}</p>}
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-70"
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
