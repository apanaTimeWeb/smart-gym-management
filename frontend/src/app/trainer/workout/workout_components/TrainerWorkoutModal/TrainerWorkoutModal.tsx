// RESPONSIBILITY: Form modal for creating or editing a workout plan in the Workout Library module.
'use client';
import { useEffect, useRef } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import TrainerWorkoutExerciseFields from '@/app/trainer/workout/workout_components/TrainerWorkoutModal/TrainerWorkoutExerciseFields';
import { TRAINER_WORKOUT_LEVEL_OPTIONS } from '@/app/trainer/workout/workout_utils/TrainerWorkoutFormConstants';
import { CreateWorkoutPlanSchema, type CreateWorkoutFormValues, EMPTY_WORKOUT_FORM } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';

export default function TrainerWorkoutModal() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showWkModal, setShowWkModal, editWk } = useTrainerWorkoutStore();
  const { createWorkout, updateWorkout } = useTrainerWorkoutMutations();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm<CreateWorkoutFormValues>({
    resolver: zodResolver(CreateWorkoutPlanSchema),
    defaultValues: EMPTY_WORKOUT_FORM
  });

  const actionKeys = useTrainerIdempotencyKey();
  const { showSuccess, showError } = useTrainerFeedback();

  useEffect(() => {
    if (showWkModal) {
      if (editWk) {
        reset({
          name: editWk.name,
          level: editWk.level,
          days: editWk.days,
          exercises: editWk.exercises,
          focus: editWk.focus,
          duration: editWk.duration,
          tags: editWk.tags.join(', '),
          goal: editWk.goal ?? '',
          startDate: editWk.startDate ?? '',
          endDate: editWk.endDate ?? '',
          instructions: editWk.instructions ?? '',
          assignedMemberId: editWk.assignedMemberId ?? '',
          workoutExercises: editWk.workoutExercises ?? []
        });
      } else {
        reset(EMPTY_WORKOUT_FORM);
      }
    }
  }, [showWkModal, editWk, reset]);

  const isSaving = createWorkout.isPending || updateWorkout.isPending;

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty && !isSaving);
  useTrainerDialogFocusTrap({ isOpen: showWkModal, dialogRef, onEscape: () => void guardNavigation(() => setShowWkModal(false)) });

  const onSubmit = async (data: CreateWorkoutFormValues) => {
    const dto = CreateWorkoutPlanSchema.parse(data);
    const actionId = editWk ? `update-workout-${editWk.id}` : 'create-workout';
    const key = actionKeys.begin(actionId);
    try {
      const response = editWk
        ? await updateWorkout.mutateAsync({ id: editWk.id, dto, idempotencyKey: key })
        : await createWorkout.mutateAsync({ dto, idempotencyKey: key });
      showSuccess(response.message, actionId);
      reset(dto);
      actionKeys.clear(actionId);
      setShowWkModal(false);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (!showWkModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="presentation">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trainer-workout-modal-title">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 id="trainer-workout-modal-title" className="font-bold text-lg text-primary">
            {editWk ? 'Edit Workout Plan' : 'Add Workout Plan'}
          </h3>
          <button 
            type="button"
            onClick={() => void guardNavigation(() => setShowWkModal(false))} 
            className="text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Plan Name *</label>
            <input 
              type="text" 
              {...register('name')}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.name ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
              } bg-input text-primary`} 
            />
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-secondary mb-1">Level</label>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <TrainerSearchableDropdown
                  options={[...TRAINER_WORKOUT_LEVEL_OPTIONS]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Level..."
                />
              )}
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Days per week</label>
              <input 
                type="number" 
                min="1" 
                max="7" 
                {...register('days', { valueAsNumber: true })}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.days ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary`} 
              />
              {errors.days && <p className="text-danger text-xs mt-1">{errors.days.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Focus Area</label>
              <input 
                type="text" 
                placeholder="e.g. Hypertrophy" 
                {...register('focus')}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.focus ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary`} 
              />
              {errors.focus && <p className="text-danger text-xs mt-1">{errors.focus.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Duration</label>
              <input 
                type="text" 
                placeholder="e.g. 60 min" 
                {...register('duration')}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.duration ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary`} 
              />
              {errors.duration && <p className="text-danger text-xs mt-1">{errors.duration.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Goal</label>
              <input 
                type="text" 
                placeholder="e.g. Weight Loss" 
                {...register('goal')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Assigned To (Member ID)</label>
              <input 
                type="text" 
                placeholder="Leave blank for global plan" 
                {...register('assignedMemberId')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Start Date</label>
              <input 
                type="date" 
                {...register('startDate')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">End Date</label>
              <input 
                type="date" 
                {...register('endDate')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Instructions / Notes</label>
            <textarea 
              rows={2}
              placeholder="e.g. Warm up properly before starting..." 
              {...register('instructions')}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary custom-scrollbar" 
            />
          </div>

          <TrainerWorkoutExerciseFields control={control} register={register} />
          
          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => void guardNavigation(() => setShowWkModal(false))} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center gap-2 hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70"
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-primary border-t-primary rounded-full motion-safe:animate-spin" /> : <><Save size={18} /> Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

