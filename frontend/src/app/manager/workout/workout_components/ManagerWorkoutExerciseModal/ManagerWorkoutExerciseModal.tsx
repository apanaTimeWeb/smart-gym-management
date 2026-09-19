'use client';
// RESPONSIBILITY: Renders the Exercise editor modal; form state and mutation orchestration are delegated to the feature form hook.
import { Controller } from 'react-hook-form';
import { X, Save, Loader2 } from 'lucide-react';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';
import { useManagerWorkoutExerciseForm } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutExerciseForm';

export default function ManagerWorkoutExerciseModal() {
  const { form, showExModal, editExId, saving, handleClose, submit } = useManagerWorkoutExerciseForm();
  const { register, control, formState: { errors } } = form;
  if (!showExModal) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="manager-workout-exercise-title">
        <div className="flex justify-between items-center p-5 border-b border-border"><h3 id="manager-workout-exercise-title" className="font-bold text-lg text-primary">{editExId ? 'Edit Exercise' : 'Add Exercise'}</h3><button type="button" aria-label="Close exercise form" onClick={handleClose} className="text-secondary hover:text-primary hover:bg-primary-subtle p-2 rounded-md motion-safe:transition-colors"><X size={18} aria-hidden="true" /></button></div>
        <form onSubmit={submit} className="p-5 space-y-4">
          <div><label htmlFor="manager-workout-exercise-name" className="block text-sm font-medium text-secondary mb-1">Exercise Name *</label><input id="manager-workout-exercise-name" type="text" {...register('name')} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-primary`} />{errors.name && <p role="alert" className="text-danger text-xs mt-1">{String(errors.name.message ?? '')}</p>}</div>
          <div><label htmlFor="manager-workout-exercise-muscle" className="block text-sm font-medium text-secondary mb-1">Primary Muscle *</label><input id="manager-workout-exercise-muscle" type="text" placeholder="e.g. Chest, Quadriceps" {...register('muscle')} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.muscle ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-primary`} />{errors.muscle && <p role="alert" className="text-danger text-xs mt-1">{String(errors.muscle.message ?? '')}</p>}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-secondary mb-1">Equipment</label><Controller name="equipment" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={EQUIPMENT_OPTIONS.map((value) => ({ label: value, value }))} />} /></div><div><label className="block text-sm font-medium text-secondary mb-1">Difficulty</label><Controller name="difficulty" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={EXERCISE_DIFFICULTY_OPTIONS.map((value) => ({ label: value, value }))} />} /></div></div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2"><button type="button" onClick={handleClose} className="flex-1 min-h-10 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors">Cancel</button><button type="submit" disabled={saving} className="min-w-32 flex-1 min-h-10 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors">{saving ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}<span>{saving ? 'Saving…' : editExId ? 'Update' : 'Save'}</span></button></div>
        </form>
      </div>
    </div>
  );
}
