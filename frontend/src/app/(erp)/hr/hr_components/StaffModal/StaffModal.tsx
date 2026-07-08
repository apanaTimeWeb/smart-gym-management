"use client";

import { useHrContext } from '@/app/(erp)/hr/hr_context/HrContext';
import { STAFF_MODAL_FIELDS, GENDER_OPTIONS, BRANCH_OPTIONS } from '@/app/(erp)/hr/hr_utils/HrSharedConstants';
import { X, Save } from 'lucide-react';

export default function StaffModal() {
 const { showModal, setShowModal, editId, form, setForm, saveStaff, saving } = useHrContext();

 if (!showModal) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 hr-module" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
 <div className="rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--hr-bg-card)' }}>
 <div className="sticky top-0 px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--hr-bg-card)', borderColor: 'var(--hr-border)' }}>
 <h3 className="text-lg font-bold" style={{ color: 'var(--hr-text-primary)' }}>{editId ? 'Edit Staff' : 'Add Staff Member'}</h3>
 <button 
 onClick={() => setShowModal(false)} 
 className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ color: 'var(--hr-text-secondary)' }}
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={saveStaff} className="p-6 space-y-4">
 {STAFF_MODAL_FIELDS.map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>{f.label}</label>
 <input 
 required 
 type={f.type} 
 placeholder={f.placeholder} 
 value={(form as any)[f.key]} 
 onChange={e => setForm({ ...form, [f.key]: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hr-highlight)]" 
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 />
 </div>
 ))}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>Gender</label>
 <select 
 value={form.gender} 
 onChange={e => setForm({ ...form, gender: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hr-highlight)]"
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 >
 {GENDER_OPTIONS.map(g => (
 <option key={g.value} value={g.value}>{g.label}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>Branch</label>
 <select 
 value={form.branch} 
 onChange={e => setForm({ ...form, branch: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hr-highlight)]"
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 >
 {BRANCH_OPTIONS.map(b => <option key={b}>{b}</option>)}
 </select>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>Join Date</label>
 <input 
 type="date" 
 value={form.joinDate} 
 onChange={e => setForm({ ...form, joinDate: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hr-highlight)]" 
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 />
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="flex-1 py-2.5 border rounded-xl text-sm font-medium transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity" 
 style={{ backgroundColor: 'var(--hr-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editId ? 'Update' : 'Add Staff'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
