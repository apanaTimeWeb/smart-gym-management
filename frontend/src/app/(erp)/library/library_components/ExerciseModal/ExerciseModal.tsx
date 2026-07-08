"use client";

import { X, Save } from 'lucide-react';
import { useLibraryContext } from '../../library_context/LibraryContext';
import { CATEGORIES, DIFFICULTIES } from '../../library_utils/LibrarySharedConstants';

export default function ExerciseModal() {
 const { 
 showExModal, setShowExModal, 
 editExId, exForm, setExForm, 
 saving, saveExercise 
 } = useLibraryContext();

 if (!showExModal) return null;

 return (
 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--library-bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-[var(--library-bg-card)] px-6 py-4 border-b border-[var(--library-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--library-text-primary)]">
 {editExId ? 'Edit Exercise' : 'Add Exercise'}
 </h3>
 <button 
 onClick={() => setShowExModal(false)} 
 className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--library-text-secondary)] transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={saveExercise} className="p-6 space-y-4">
 {[
 { label: 'Exercise Name', key: 'name', type: 'text' }, 
 { label: 'Muscle Groups (comma separated)', key: 'muscleGroup', type: 'text', placeholder: 'Chest, Triceps' }, 
 { label: 'Sets', key: 'sets', type: 'number', req: false }, 
 { label: 'Reps', key: 'reps', type: 'text', req: false, placeholder: '8-12' }, 
 { label: 'Duration', key: 'duration', type: 'text', req: false, placeholder: '30 min' }, 
 { label: 'Video URL (optional)', key: 'videoUrl', type: 'url', req: false }, 
 { label: 'Description', key: 'description', type: 'text', req: false }
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">
 {f.label}
 </label>
 <input 
 required={f.req !== false} 
 type={f.type} 
 placeholder={f.placeholder} 
 value={(exForm as Record<string, string>)[f.key]} 
 onChange={e => setExForm({ ...exForm, [f.key]: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]" 
 />
 </div>
 ))}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">Category</label>
 <select 
 value={exForm.category} 
 onChange={e => setExForm({ ...exForm, category: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]"
 >
 {CATEGORIES.map(c => <option key={c}>{c}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--library-text-secondary)] mb-1">Difficulty</label>
 <select 
 value={exForm.difficulty} 
 onChange={e => setExForm({ ...exForm, difficulty: e.target.value })} 
 className="w-full border border-[var(--library-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--library-bg-input)] text-[var(--library-text-primary)]"
 >
 {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
 </select>
 </div>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowExModal(false)} 
 className="flex-1 py-2.5 border border-[var(--library-border)] rounded-xl text-sm font-medium text-[var(--library-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
