"use client";

import { X, Save } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

export default function WorkoutModal() {
 const { 
 showWkModal, setShowWkModal, 
 editWkId, wkForm, setWkForm, 
 saveWk 
 } = useWorkoutContext();

 if (!showWkModal) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
 <div className="bg-[var(--workout-bg-card)] rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
 <div className="flex justify-between items-center p-5 border-b border-[var(--workout-border)]">
 <h3 className="font-bold text-lg text-[var(--workout-text-primary)]">
 {editWkId ? 'Edit Workout Plan' : 'Add Workout Plan'}
 </h3>
 <button 
 onClick={() => setShowWkModal(false)} 
 className="text-[var(--workout-text-secondary)] hover:text-[var(--workout-text-primary)] hover:bg-[var(--primary-subtle)] p-1 rounded-md transition-colors"
 >
 <X size={20} />
 </button>
 </div>
 <form onSubmit={saveWk} className="p-5 space-y-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Plan Name *</label>
 <input 
 required 
 type="text" 
 value={wkForm.name} 
 onChange={e => setWkForm({ ...wkForm, name: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Level</label>
 <select 
 value={wkForm.level} 
 onChange={e => setWkForm({ ...wkForm, level: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]"
 >
 {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l}>{l}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Days per week</label>
 <input 
 required 
 type="number" 
 min="1" 
 max="7" 
 value={wkForm.days} 
 onChange={e => setWkForm({ ...wkForm, days: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Focus Area</label>
 <input 
 required 
 type="text" 
 placeholder="e.g. Hypertrophy" 
 value={wkForm.focus} 
 onChange={e => setWkForm({ ...wkForm, focus: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Duration</label>
 <input 
 required 
 type="text" 
 placeholder="e.g. 60 min" 
 value={wkForm.duration} 
 onChange={e => setWkForm({ ...wkForm, duration: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">No. of Exercises</label>
 <input 
 required 
 type="number" 
 min="1" 
 value={wkForm.exercises} 
 onChange={e => setWkForm({ ...wkForm, exercises: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Tags (comma separated)</label>
 <input 
 type="text" 
 placeholder="e.g. PPL, Classic" 
 value={wkForm.tags} 
 onChange={e => setWkForm({ ...wkForm, tags: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 </div>
 
 <div className="pt-2 flex justify-end gap-3">
 <button 
 type="button" 
 onClick={() => setShowWkModal(false)} 
 className="px-4 py-2 border border-[var(--workout-border)] rounded-lg font-medium text-[var(--workout-text-secondary)] hover:text-[var(--workout-text-primary)] hover:bg-[var(--primary-subtle)] transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--workout-highlight)' }}
 >
 <Save size={15} /> Save
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
