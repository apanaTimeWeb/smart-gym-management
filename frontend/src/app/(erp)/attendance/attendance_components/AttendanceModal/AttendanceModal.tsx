"use client";

import { X } from 'lucide-react';
import { useAttendanceContext } from '../../attendance_context/AttendanceContext';

export default function AttendanceModal() {
 const { 
 showModal, setShowModal, 
 form, setForm, 
 members, staff, 
 saving, markAttendance 
 } = useAttendanceContext();

 if (!showModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--attendance-bg-card)] rounded-2xl shadow-xl w-full max-w-md">
 <div className="px-6 py-4 border-b border-[var(--attendance-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--attendance-text-primary)]">Mark Attendance</h3>
 <button 
 onClick={() => setShowModal(false)} 
 className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--attendance-text-secondary)] transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={markAttendance} className="p-6 space-y-4">
 <div>
 <label className="block text-sm font-medium text-[var(--attendance-text-secondary)] mb-1">Type</label>
 <select 
 value={form.type} 
 onChange={e => setForm({ ...form, type: e.target.value, memberId: '', staffId: '' })}
 className="w-full border border-[var(--attendance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--attendance-bg-input)] text-[var(--attendance-text-primary)]"
 >
 <option value="MEMBER">Member</option>
 <option value="STAFF">Staff</option>
 </select>
 </div>
 {form.type === 'MEMBER' ? (
 <div>
 <label className="block text-sm font-medium text-[var(--attendance-text-secondary)] mb-1">Member</label>
 <select 
 required 
 value={form.memberId} 
 onChange={e => setForm({ ...form, memberId: e.target.value })}
 className="w-full border border-[var(--attendance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--attendance-bg-input)] text-[var(--attendance-text-primary)]"
 >
 <option value="">Select member...</option>
 {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
 </select>
 </div>
 ) : (
 <div>
 <label className="block text-sm font-medium text-[var(--attendance-text-secondary)] mb-1">Staff</label>
 <select 
 required 
 value={form.staffId} 
 onChange={e => setForm({ ...form, staffId: e.target.value })}
 className="w-full border border-[var(--attendance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--attendance-bg-input)] text-[var(--attendance-text-primary)]"
 >
 <option value="">Select staff...</option>
 {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
 </select>
 </div>
 )}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--attendance-text-secondary)] mb-1">Date</label>
 <input 
 required 
 type="date" 
 value={form.date} 
 onChange={e => setForm({ ...form, date: e.target.value })}
 className="w-full border border-[var(--attendance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--attendance-bg-input)] text-[var(--attendance-text-primary)]" 
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--attendance-text-secondary)] mb-1">Check In Time</label>
 <input 
 required 
 type="time" 
 value={form.checkIn} 
 onChange={e => setForm({ ...form, checkIn: e.target.value })}
 className="w-full border border-[var(--attendance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--attendance-bg-input)] text-[var(--attendance-text-primary)]" 
 />
 </div>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="flex-1 py-2.5 border border-[var(--attendance-border)] rounded-xl text-sm font-medium text-[var(--attendance-text-primary)] hover:bg-[var(--primary-subtle)] transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--attendance-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Mark Attendance'}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
