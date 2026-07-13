"use client";

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useLibraryContext } from '@/app/erp/library/library_context/LibraryContext';
import { GOALS, DietSchema, type DietFormValues, EMPTY_DIET_FORM } from '@/app/erp/library/library_utils/LibrarySharedConstants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function DietModal() {
 const { 
 showDietModal, setShowDietModal, 
 editDietId, editDietData, 
 saving, saveDietPlan 
 } = useLibraryContext();

 const { 
   register, 
   handleSubmit, 
   reset,
   formState: { errors } 
 } = useForm({
   resolver: zodResolver(DietSchema),
   defaultValues: (editDietData as DietFormValues) || (EMPTY_DIET_FORM as unknown as DietFormValues)
 });

 useEffect(() => {
   if (showDietModal && editDietData) {
     reset(editDietData);
   }
 }, [showDietModal, editDietData, reset]);

 if (!showDietModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
 <h3 className="text-lg font-bold text-foreground">
 {editDietId ? 'Edit Diet Plan' : 'Add Diet Plan'}
 </h3>
 <button 
 onClick={() => setShowDietModal(false)} 
 className="p-2 rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit(saveDietPlan as any)} className="p-6 space-y-4">
 {[
 { label: 'Plan Name', key: 'name', type: 'text' }, 
 { label: 'Calories', key: 'calories', type: 'number', placeholder: '2500' }, 
 { label: 'Protein (g)', key: 'protein', type: 'number', placeholder: '150' }, 
 { label: 'Carbs (g)', key: 'carbs', type: 'number', placeholder: '300' }, 
 { label: 'Fats (g)', key: 'fats', type: 'number', placeholder: '70' }, 
 { label: 'Description', key: 'description', type: 'text' }
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-secondary mb-1">
 {f.label}
 </label>
 <input 
 type={f.type} 
 placeholder={f.placeholder} 
 {...register(f.key as keyof DietFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
   errors[f.key as keyof DietFormValues] ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
 } bg-input text-foreground`}
 />
 {errors[f.key as keyof DietFormValues] && (
   <p className="text-destructive text-xs mt-1">{errors[f.key as keyof DietFormValues]?.message}</p>
 )}
 </div>
 ))}
        <div className="grid grid-cols-1 gap-4">
 <div>
 <label className="block text-sm font-medium text-secondary mb-1">Goal</label>
 <select 
 {...register('goal')}
 className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground"
 >
 {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
 </select>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-secondary mb-1">Meals (one per line)</label>
 <textarea 
 {...register('meals')}
 className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground h-32 resize-none"
 placeholder="Meal 1: Oats and eggs&#10;Meal 2: Chicken and rice"
 />
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowDietModal(false)} 
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
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editDietId ? 'Update' : 'Add'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
