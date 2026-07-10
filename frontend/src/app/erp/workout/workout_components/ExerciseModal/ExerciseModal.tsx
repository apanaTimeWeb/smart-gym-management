"use client";

import { X, Save } from 'lucide-react';
import { useWorkoutContext } from '@/app/erp/workout/workout_context/WorkoutContext';
import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS } from '@/app/erp/workout/workout_utils/WorkoutSharedConstants';

export default function ExerciseModal() {
 const { 
 showExModal, setShowExModal, 
 editExId, exForm, setExForm, 
 saveEx 
 } = useWorkoutContext();

 if (!showExModal) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
 <div className="bg-[var(--workout-bg-card)] rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
 <div className="flex justify-between items-center p-5 border-b border-[var(--workout-border)]">
 <h3 className="font-bold text-lg text-[var(--workout-text-primary)]">
 {editExId ? 'Edit Exercise' : 'Add Exercise'}
 </h3>
 <button 
 onClick={() => setShowExModal(false)} 
 className="text-[var(--workout-text-secondary)] hover:text-[var(--workout-text-primary)] hover:bg-[var(--primary-subtle)] p-1 rounded-md transition-colors"
 >
 <X size={20} />
 </button>
 </div>
 <form onSubmit={saveEx} className="p-5 space-y-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Exercise Name *</label>
 <input 
 required 
 type="text" 
 value={exForm.name} 
 onChange={e => setExForm({ ...exForm, name: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Primary Muscle *</label>
 <input 
 required 
 type="text" 
 placeholder="e.g. Chest, Quadriceps" 
 value={exForm.muscle} 
 onChange={e => setExForm({ ...exForm, muscle: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]" 
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Equipment</label>
 <select 
 value={exForm.equipment} 
 onChange={e => setExForm({ ...exForm, equipment: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]"
 >
 {EQUIPMENT_OPTIONS.map(eq => <option key={eq}>{eq}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--workout-text-secondary)] mb-1">Difficulty</label>
 <select 
 value={exForm.difficulty} 
 onChange={e => setExForm({ ...exForm, difficulty: e.target.value })} 
 className="w-full px-3 py-2 border border-[var(--workout-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--workout-bg-input)] text-[var(--workout-text-primary)]"
 >
 {EXERCISE_DIFFICULTY_OPTIONS.map(d => <option key={d}>{d}</option>)}
 </select>
 </div>
 </div>
 
 <div className="pt-2 flex justify-end gap-3">
 <button 
 type="button" 
 onClick={() => setShowExModal(false)} 
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
