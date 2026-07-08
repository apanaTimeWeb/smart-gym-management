"use client";

import { X, Save } from 'lucide-react';
import { useLibraryContext } from '../../library_context/LibraryContext';
import { GOALS } from '../../library_utils/LibrarySharedConstants';

export default function DietModal() {
 const { 
 showDietModal, setShowDietModal, 
 editDietId, dietForm, setDietForm, 
 saving, saveDietPlan 
 } = useLibraryContext();

 if (!showDietModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--library-bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-[var(--library-bg-card)] px-6 py-4 border-b border-[var(--library-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--library-text-primary)]">
 {editDietId ? 'Edit Diet Plan' : 'Create Diet Plan'}
 </h3>
 <button 
 onClick={() => setShowDietModal(false)} 
 className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--library-text-secondary)] transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={saveDietPlan} className="p-6 space-y-4">
 <div>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">Plan Name</label>
 <input 
 required 
 type="text" 
 value={dietForm.name} 
 onChange={e => setDietForm({ ...dietForm, name: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]" 
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">Goal</label>
 <select 
 value={dietForm.goal} 
 onChange={e => setDietForm({ ...dietForm, goal: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]"
 >
 {GOALS.map(g => <option key={g}>{g}</option>)}
 </select>
 </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { label: 'Calories (kcal)', key: 'calories' }, 
 { label: 'Protein (g)', key: 'protein' }, 
 { label: 'Carbs (g)', key: 'carbs' }, 
 { label: 'Fats (g)', key: 'fats' }
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">{f.label}</label>
 <input 
 type="number" 
 value={(dietForm as Record<string, string>)[f.key]} 
 onChange={e => setDietForm({ ...dietForm, [f.key]: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]" 
 />
 </div>
 ))}
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">Meals (one per line)</label>
 <textarea 
 rows={4} 
 value={dietForm.meals} 
 onChange={e => setDietForm({ ...dietForm, meals: e.target.value })} 
 placeholder="Oats + Eggs (Breakfast)&#10;Chicken Salad (Lunch)&#10;Protein Shake (Snack)&#10;Grilled Fish (Dinner)" 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] resize-none bg-[var(--library-bg-input)] text-[var(--library-text-primary)]" 
 />
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowDietModal(false)} 
 className="flex-1 py-2.5 border border-[var(--library-border)] rounded-xl text-sm font-medium text-[var(--library-text-primary)] hover:bg-[var(--primary-subtle)] transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--library-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editDietId ? 'Update' : 'Create'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
