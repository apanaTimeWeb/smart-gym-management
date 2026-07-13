"use client";

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useLibraryContext } from '@/app/erp/library/library_context/LibraryContext';
import { CATEGORIES, DIFFICULTIES, ExerciseSchema, type ExerciseFormValues, EMPTY_EXERCISE_FORM } from '@/app/erp/library/library_utils/LibrarySharedConstants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ExerciseModal() {
 const { 
 showExModal, setShowExModal, 
 editExId, editExData, 
 saving, saveExercise 
 } = useLibraryContext();

 const { 
   register, 
   handleSubmit, 
   reset,
   formState: { errors } 
 } = useForm({
   resolver: zodResolver(ExerciseSchema),
   defaultValues: (editExData as ExerciseFormValues) || (EMPTY_EXERCISE_FORM as unknown as ExerciseFormValues)
 });

 useEffect(() => {
   if (showExModal && editExData) {
     reset(editExData);
   }
 }, [showExModal, editExData, reset]);

 if (!showExModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
 <h3 className="text-lg font-bold text-foreground">
 {editExId ? 'Edit Exercise' : 'Add Exercise'}
 </h3>
 <button 
 onClick={() => setShowExModal(false)} 
 className="p-2 rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit(saveExercise as any)} className="p-6 space-y-4">
 {[
 { label: 'Exercise Name', key: 'name', type: 'text' }, 
 { label: 'Muscle Groups (comma separated)', key: 'muscleGroup', type: 'text', placeholder: 'Chest, Triceps' }, 
 { label: 'Sets', key: 'sets', type: 'number' }, 
 { label: 'Reps', key: 'reps', type: 'number', placeholder: '12' }, 
 { label: 'Duration (mins)', key: 'duration', type: 'number', placeholder: '30' }, 
 { label: 'Video URL (optional)', key: 'videoUrl', type: 'url' }, 
 { label: 'Description', key: 'description', type: 'text' }
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-secondary mb-1">
 {f.label}
 </label>
 <input 
 type={f.type} 
 placeholder={f.placeholder} 
 {...register(f.key as keyof ExerciseFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
   errors[f.key as keyof ExerciseFormValues] ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
 } bg-input text-foreground`}
 />
 {errors[f.key as keyof ExerciseFormValues] && (
   <p className="text-destructive text-xs mt-1">{errors[f.key as keyof ExerciseFormValues]?.message}</p>
 )}
 </div>
 ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-secondary mb-1">Category</label>
 <select 
 {...register('category')}
 className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground"
 >
 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-secondary mb-1">Difficulty</label>
 <select 
 {...register('difficulty')}
 className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground"
 >
 {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
 </select>
 </div>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowExModal(false)} 
 className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-primary-subtle transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--library-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editExId ? 'Update' : 'Add'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
