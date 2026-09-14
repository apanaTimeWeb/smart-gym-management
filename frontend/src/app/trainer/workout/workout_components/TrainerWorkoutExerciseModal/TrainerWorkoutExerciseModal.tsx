'use client';
// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Form modal for creating or editing a single exercise entry in the Workout Library module.
import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';
import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS } from '@/app/trainer/workout/workout_utils/WorkoutSharedConstants';
import { CreateExerciseSchema, type CreateExerciseFormValues, EMPTY_EXERCISE_FORM } from '@/app/trainer/workout/workout_types/workout.schema';
import { useTrainerWorkoutStore } from '@/app/trainer/workout/workout_store/useTrainerWorkoutStore';
import { useTrainerWorkoutMutations } from '@/app/trainer/workout/workout_queries/useWorkoutMutations';
import { useWarnIfUnsavedChanges } from '@/app/trainer/trainer_utils/useWarnIfUnsavedChanges';

export default function ExerciseModal() {
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

  useWarnIfUnsavedChanges(isDirty);

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

  const onSubmit = (data: CreateExerciseFormValues) => {
    const dto = CreateExerciseSchema.parse(data);
    if (editEx) {
      updateExercise.mutate(
        { id: editEx.id, dto },
        { onSuccess: () => setShowExModal(false) }
      );
    } else {
      createExercise.mutate(dto, { onSuccess: () => setShowExModal(false) });
    }
  };

  if (!showExModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 className="font-bold text-lg text-foreground">
            {editEx ? 'Edit Exercise' : 'Add Exercise'}
          </h3>
          <button 
            type="button"
            onClick={() => setShowExModal(false)} 
            className="text-secondary hover:text-foreground hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Exercise Name *</label>
            <input 
              type="text" 
              {...register('name')}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page ${
                errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-warning'
              } bg-input text-foreground`} 
            />
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Primary Muscle *</label>
            <input 
              type="text" 
              placeholder="e.g. Chest, Quadriceps" 
              {...register('muscle')}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page ${
                errors.muscle ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-warning'
              } bg-input text-foreground`} 
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
                  <SearchableDropdown
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
                  <SearchableDropdown
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
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:ring-warning bg-input text-foreground" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Instructions / Sets / Reps</label>
            <textarea 
              rows={2}
              placeholder="e.g. 3 sets of 10-12 reps. Keep back straight." 
              {...register('instructions')}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:ring-warning bg-input text-foreground custom-scrollbar" 
            />
          </div>
          
          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setShowExModal(false)} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-foreground hover:bg-primary-subtle motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 motion-safe:transition-opacity disabled:opacity-70" 
              style={{ background: 'var(--workout-highlight)' }}
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full motion-safe:animate-spin" /> : <><Save size={15} /> Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

