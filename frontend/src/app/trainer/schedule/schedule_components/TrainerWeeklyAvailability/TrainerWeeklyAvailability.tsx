// RESPONSIBILITY: Renders the Trainer weekly availability editor and keeps form, dirty-state, and mutation concerns out of JSX orchestration.
'use client';
// DATA FLOW: TanStack Query schedule data -> React Hook Form -> availability mutation -> authoritative response -> form reset/query invalidation.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { useTrainerScheduleQuery } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleQuery';
import { useTrainerScheduleMutations } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleMutations';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import {
  TrainerWeeklyAvailabilityFormSchema,
  type TrainerWeeklyAvailabilityFormValues,
} from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { TRAINER_DEFAULT_AVAILABILITY_TIMES } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';

export default function TrainerWeeklyAvailability() {
  const { data, isPending, isError, refetch } = useTrainerScheduleQuery();
  const { updateAvailability } = useTrainerScheduleMutations();
  const { showSuccess, showError } = useTrainerFeedback();
  const actionKeys = useTrainerIdempotencyKey();
  const form = useForm<TrainerWeeklyAvailabilityFormValues>({
    resolver: zodResolver(TrainerWeeklyAvailabilityFormSchema),
    defaultValues: { days: [] },
    mode: 'onTouched',
  });
  const { register, handleSubmit, reset, getValues, watch, formState } = form;
  const guardNavigation = useTrainerUnsavedChangesGuard(formState.isDirty && !updateAvailability.isPending);

  /* Hydrates the form from the server only after the query has produced authoritative availability; the dependency is intentionally tied to the query result. */
  useEffect(() => {
    if (data?.availability) reset({ days: data.availability });
  }, [data?.availability, reset]);

  const handleToggle = (index: number) => {
    const current = getValues(`days.${index}`);
    if (!current) return;
    const nextAvailable = !current.isAvailable;
    form.setValue(`days.${index}`, {
      ...current,
      isAvailable: nextAvailable,
      startTime: nextAvailable && current.startTime === '00:00' ? TRAINER_DEFAULT_AVAILABILITY_TIMES.startTime : current.startTime,
      endTime: nextAvailable && current.endTime === '00:00' ? TRAINER_DEFAULT_AVAILABILITY_TIMES.endTime : current.endTime,
    }, { shouldDirty: true, shouldValidate: true });
    if (!nextAvailable) {
      form.setValue(`days.${index}.startTime`, '00:00', { shouldDirty: true, shouldValidate: true });
      form.setValue(`days.${index}.endTime`, '00:00', { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleDiscard = async () => {
    const approved = await guardNavigation(() => reset({ days: data?.availability ?? [] }));
    if (approved) actionKeys.clear('schedule-availability-update');
  };

  const handleSave = async (values: TrainerWeeklyAvailabilityFormValues) => {
    const actionId = 'schedule-availability-update';
    try {
      const response = await updateAvailability.mutateAsync({
        data: values.days,
        idempotencyKey: actionKeys.begin(actionId),
      });
      reset({ days: response.data });
      actionKeys.clear(actionId);
      showSuccess(response.message, actionId);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (isPending) {
    return (
      <div className="p-6 space-y-4" aria-label="Loading availability">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={`availability-skeleton-${index + 1}`} className="h-16 rounded-xl bg-skeleton-base border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-danger-bg border border-danger rounded-xl" role="alert">
        <p className="text-sm text-danger">Unable to load your weekly availability.</p>
        <button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 px-4 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
      </div>
    );
  }

  const days = watch('days');

  return (
    <form onSubmit={handleSubmit(handleSave)} className="p-6 space-y-6" noValidate>
      <div>
        <h2 className="text-xl font-bold text-primary">Standard Availability</h2>
        <p className="text-sm text-secondary mt-1">Set your recurring weekly working hours. Your manager will use this for client assignment.</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {days.map((day, index) => (
          <div key={day.day} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${day.isAvailable ? 'border-primary bg-surface-highlight' : 'border-border bg-input'}`}>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register(`days.${index}.isAvailable`)}
                  onChange={() => handleToggle(index)}
                  className="sr-only peer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                />
                <span className="w-11 h-6 bg-border peer-focus-visible:ring-2 peer-focus-visible:ring-primary rounded-full motion-safe:transition-colors motion-safe:duration-base peer-checked:bg-primary-subtle" aria-hidden="true" />
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-border bg-card motion-safe:transition-transform peer-checked:translate-x-5" aria-hidden="true" />
                <span className="sr-only">Toggle {day.day} availability</span>
              </label>
              <span className={`font-semibold w-24 ${day.isAvailable ? 'text-primary' : 'text-secondary line-through'}`}>{day.day}</span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 w-full sm:w-auto">
              <div>
                <label htmlFor={`trainer-schedule-${day.day}-start`} className="sr-only">{day.day} start time</label>
                <input
                  id={`trainer-schedule-${day.day}-start`}
                  type="time"
                  disabled={!day.isAvailable}
                  {...register(`days.${index}.startTime`)}
                  className="w-full sm:w-32 min-h-11 bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                />
              </div>
              <span className="text-secondary font-medium text-sm text-center">to</span>
              <div>
                <label htmlFor={`trainer-schedule-${day.day}-end`} className="sr-only">{day.day} end time</label>
                <input
                  id={`trainer-schedule-${day.day}-end`}
                  type="time"
                  disabled={!day.isAvailable}
                  {...register(`days.${index}.endTime`)}
                  className="w-full sm:w-32 min-h-11 bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
        <button type="button" onClick={() => void handleDiscard()} disabled={!formState.isDirty || updateAvailability.isPending} className="min-h-11 px-5 rounded-xl border border-border text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Discard Changes</button>
        <button type="submit" disabled={updateAvailability.isPending || !formState.isDirty} className="min-h-11 min-w-40 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {updateAvailability.isPending && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />}
          {updateAvailability.isPending ? 'Saving Availability…' : 'Save Availability'}
        </button>
      </div>
    </form>
  );
}
