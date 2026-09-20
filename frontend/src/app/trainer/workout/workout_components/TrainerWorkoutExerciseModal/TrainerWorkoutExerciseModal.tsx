// RESPONSIBILITY: Form modal for creating or editing a single exercise entry in the Workout Library module.
'use client';
import { useEffect, useRef } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSharedConstants';
import { CreateExerciseSchema, type CreateExerciseFormValues, EMPTY_EXERCISE_FORM } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutMutations';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';

export default function TrainerWorkoutExerciseModal() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showExModal, setShowExModal, editEx } = useTrainerWorkoutStore();
  const { createExercise, updateExercise } = useTrainerWorkoutMutations();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm<CreateExerciseFormValues>({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: EMPTY_EXERCISE_FORM
  });

  const actionKeys = useTrainerIdempotencyKey();
  const { showSuccess, showError } = useTrainerFeedback();

  useEffect(() => {
    if (showExModal) {
      if (editEx) {
        reset({
          name: editEx.name,
          muscle: editEx.muscleGroup?.[0] ?? '',
          equipment: editEx.equipment ?? 'Bodyweight',
          difficulty: editEx.difficulty,
          instructions: editEx.instructions ?? '',
          videoUrl: editEx.videoUrl ?? ''
        });
      } else {
        reset(EMPTY_EXERCISE_FORM);
      }
    }
  }, [showExModal, editEx, reset]);

  const isSaving = createExercise.isPending || updateExercise.isPending;

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty && !isSaving);
  useTrainerDialogFocusTrap({ isOpen: showExModal, dialogRef, onEscape: () => void guardNavigation(() => setShowExModal(false)) });

  const onSubmit = async (data: CreateExerciseFormValues) => {
    const dto = CreateExerciseSchema.parse(data);
    const actionId = editEx ? `update-exercise-${editEx.id}` : 'create-exercise';
    const key = actionKeys.begin(actionId);
    try {
      const response = editEx
        ? await updateExercise.mutateAsync({ id: editEx.id, dto, idempotencyKey: key })
        : await createExercise.mutateAsync({ dto, idempotencyKey: key });
      showSuccess(response.message, actionId);
      reset(dto);
      actionKeys.clear(actionId);
      setShowExModal(false);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (!showExModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="presentation">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trainer-workout-exercise-modal-title">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 id="trainer-workout-exercise-modal-title" className="font-bold text-lg text-primary">
            {editEx ? 'Edit Exercise' : 'Add Exercise'}
          </h3>
          <button 
            type="button"
            onClick={() => void guardNavigation(() => setShowExModal(false))} 
            className="text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Exercise Name *</label>
            <input 
              type="text" 
              {...register('name')}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.name ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
              } bg-input text-primary`} 
            />
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Primary Muscle *</label>
            <input 
              type="text" 
              placeholder="e.g. Chest, Quadriceps" 
              {...register('muscle')}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.muscle ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
              } bg-input text-primary`} 
            />
            {errors.muscle && <p className="text-danger text-xs mt-1">{errors.muscle.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Equipment</label>
              <Controller
                name="equipment"
                control={control}
                render={({ field }) => (
                  <TrainerSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={EQUIPMENT_OPTIONS.map(eq => ({ label: eq, value: eq }))}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Difficulty</label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <TrainerSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={EXERCISE_DIFFICULTY_OPTIONS.map(d => ({ label: d, value: d }))}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Video / Image URL</label>
            <input 
              type="text" 
              placeholder="e.g. https://youtube.com/..." 
              {...register('videoUrl')}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Instructions / Sets / Reps</label>
            <textarea 
              rows={2}
              placeholder="e.g. 3 sets of 10-12 reps. Keep back straight." 
              {...register('instructions')}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary custom-scrollbar" 
            />
          </div>
          
          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => void guardNavigation(() => setShowExModal(false))} 
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

