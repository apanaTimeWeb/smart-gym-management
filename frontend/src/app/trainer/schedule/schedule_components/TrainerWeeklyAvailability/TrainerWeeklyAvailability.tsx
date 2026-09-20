'use client';
// RESPONSIBILITY: Renders the toggleable weekly schedule allowing trainers to define their working hours.
import { useState, useEffect } from 'react';
import { useTrainerScheduleQuery } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleQuery';
import { useTrainerScheduleMutations } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleMutations';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import type { WeeklyAvailability, WeeklyAvailabilityTimeField } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { Loader2, Save } from 'lucide-react';
import { TRAINER_DEFAULT_AVAILABILITY_TIMES } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';

export default function TrainerWeeklyAvailability() {
  const { data, isLoading, isError } = useTrainerScheduleQuery();
  const { updateAvailability } = useTrainerScheduleMutations();
  const { showSuccess, showError } = useTrainerFeedback();

  const [localSchedule, setLocalSchedule] = useState<WeeklyAvailability[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Hydrate local state once loaded
  useEffect(() => {
    if (data?.availability) {
      setLocalSchedule(JSON.parse(JSON.stringify(data.availability)));
      setIsDirty(false);
    }
  }, [data?.availability]);

  useTrainerUnsavedChangesGuard(isDirty && !updateAvailability.isPending);

  const handleToggle = (index: number) => {
    const updated = [...localSchedule];
    if (!updated[index]) return;
    updated[index].isAvailable = !updated[index].isAvailable;
    // Reset hours if toggled off
    if (!updated[index].isAvailable) {
      updated[index].startTime = '00:00';
      updated[index].endTime = '00:00';
    } else if (updated[index].startTime === '00:00') {
      updated[index].startTime = TRAINER_DEFAULT_AVAILABILITY_TIMES.startTime;
      updated[index].endTime = TRAINER_DEFAULT_AVAILABILITY_TIMES.endTime;
    }
    setLocalSchedule(updated);
    setIsDirty(true);
  };

  const handleChangeTime = (index: number, field: WeeklyAvailabilityTimeField, value: string) => {
    const updated = [...localSchedule];
    if (!updated[index]) return;
    updated[index][field] = value;
    setLocalSchedule(updated);
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const response = await updateAvailability.mutateAsync({ data: localSchedule, idempotencyKey: crypto.randomUUID() });
      setIsDirty(false);
      showSuccess(response.message, 'trainer-schedule-availability-success');
    } catch (error) {
      showError(error, 'trainer-schedule-availability-error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-danger">Unable to load schedule right now. Please retry.</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Standard Availability</h2>
        <p className="text-sm text-secondary">Set your recurring weekly working hours. Your manager will use this for client assignment.</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {localSchedule.map((day, idx) => (
          <div key={day.day} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${day.isAvailable ? 'border-primary bg-surface-highlight' : 'border-border bg-input'}`}>
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={day.isAvailable}
                  onChange={() => handleToggle(idx)}
                />
                <span className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer-checked:bg-primary motion-safe:transition-colors motion-safe:duration-base" aria-hidden="true" />
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-border bg-card motion-safe:transition-transform peer-checked:translate-x-5" aria-hidden="true" />
              </label>
              <span className={`font-semibold w-24 ${day.isAvailable ? 'text-on-primary' : 'text-secondary line-through'}`}>{day.day}</span>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="time" 
                disabled={!day.isAvailable}
                value={day.startTime}
                onChange={(e) => handleChangeTime(idx, 'startTime', e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-on-primary focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <span className="text-secondary font-medium">to</span>
              <input 
                type="time" 
                disabled={!day.isAvailable}
                value={day.endTime}
                onChange={(e) => handleChangeTime(idx, 'endTime', e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-on-primary focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6 flex justify-end">
        <button type="button" 
          onClick={handleSave}
          disabled={updateAvailability.isPending || !isDirty}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 motion-safe:transition-opacity disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {updateAvailability.isPending ? <Loader2 className="w-4 h-4 motion-safe:animate-spin" /> : <Save size={18} />}
          Save Availability
        </button>
      </div>
    </div>
  );
}
