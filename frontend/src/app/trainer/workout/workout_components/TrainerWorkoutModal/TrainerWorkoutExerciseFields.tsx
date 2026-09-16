'use client';
// RESPONSIBILITY: Renders the repeatable exercise rows inside the Trainer workout form; owns no API calls.
// DATA FLOW: React Hook Form field array → TrainerWorkoutExerciseFields → form inputs.
import { Plus, Trash2, Dumbbell } from 'lucide-react';
import type { Control, UseFormRegister, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { TRAINER_DEFAULT_EXERCISE } from '@/app/trainer/workout/workout_utils/TrainerWorkoutFormConstants';
import type { CreateWorkoutFormValues } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

interface TrainerWorkoutExerciseFieldsProps {
  control: Control<CreateWorkoutFormValues>;
  register: UseFormRegister<CreateWorkoutFormValues>;
}

export default function TrainerWorkoutExerciseFields({ control, register }: TrainerWorkoutExerciseFieldsProps) {
  const { fields, append, remove } = useFieldArray({ control, name: 'workoutExercises' });
  const { confirm } = useConfirm();
  const handleAppend = () => append({ ...TRAINER_DEFAULT_EXERCISE, sortOrder: fields.length });
  const handleRemove = async (index: number) => {
    const approved = await confirm({ title: 'Remove Exercise', message: 'Are you sure you want to remove this exercise from the plan?', type: 'danger', confirmText: 'Remove' });
    if (approved) remove(index);
  };
  return <div className="pt-2 border-t border-border mt-4"><div className="flex items-center justify-between mb-3"><label className="block text-sm font-bold text-foreground">Workout Exercises</label><button type="button" onClick={handleAppend} className="text-xs font-semibold text-primary bg-primary-subtle px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-primary/20 motion-safe:transition-colors"><Plus size={14} />Add Exercise</button></div><div className="space-y-3">{fields.map((field, index) => <div key={field.id} className="bg-input/50 border border-border rounded-xl p-3 flex flex-col sm:flex-row gap-3"><div className="flex-1"><label className="block text-[10px] uppercase font-bold text-secondary mb-1">Exercise Name</label><input type="text" {...register(`workoutExercises.${index}.name`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-foreground" /></div><div className="w-20"><label className="block text-[10px] uppercase font-bold text-secondary mb-1">Sets</label><input type="number" min="1" max="20" step="1" {...register(`workoutExercises.${index}.sets`, { valueAsNumber: true })} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-foreground" /></div><div className="w-20"><label className="block text-[10px] uppercase font-bold text-secondary mb-1">Reps</label><input type="number" min="1" max="100" step="1" {...register(`workoutExercises.${index}.reps`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-foreground" /></div><div className="flex-1"><label className="block text-[10px] uppercase font-bold text-secondary mb-1">Weight</label><input type="text" {...register(`workoutExercises.${index}.weight`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-foreground" /></div><div className="flex-1"><label className="block text-[10px] uppercase font-bold text-secondary mb-1">Rest</label><input type="text" {...register(`workoutExercises.${index}.restTime`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-foreground" /></div><div className="flex items-end pb-0.5"><button type="button" aria-label="Remove exercise" onClick={() => void handleRemove(index)} className="p-2 text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors"><Trash2 size={16} /></button></div></div>)}{fields.length === 0 && <div className="text-center py-6 border border-dashed border-border rounded-xl text-secondary text-sm"><Dumbbell size={24} className="mx-auto mb-2 opacity-50" />No exercises added yet.</div>}</div></div>;
}
