"use client";

import { useEffect } from 'react';
import { useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import { STAFF_MODAL_FIELDS, GENDER_OPTIONS, BRANCH_OPTIONS, StaffSchema, type StaffFormValues } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function StaffModal() {
 const { showModal, setShowModal, editId, editData, saveStaff, saving } = useHrContext();

 const { 
   register, 
   handleSubmit, 
   reset,
   formState: { errors }
  } = useForm({
   resolver: zodResolver(StaffSchema),
   defaultValues: editData || {}
 });

 useEffect(() => {
   if (showModal && editData) {
     reset(editData);
   }
 }, [showModal, editData, reset]);

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
 <form onSubmit={handleSubmit(saveStaff as any)} className="p-6 space-y-4">
 {STAFF_MODAL_FIELDS.map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>{f.label}</label>
 <input 
 type={f.type} 
 placeholder={f.placeholder} 
 {...register(f.key as keyof StaffFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
   errors[f.key as keyof StaffFormValues] ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'focus:ring-[var(--hr-highlight)]'
 }`}
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: errors[f.key as keyof StaffFormValues] ? 'var(--danger)' : 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 />
 {errors[f.key as keyof StaffFormValues] && (
   <p className="text-[var(--danger)] text-xs mt-1">{errors[f.key as keyof StaffFormValues]?.message as string}</p>
 )}
 </div>
 ))}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>Gender</label>
 <select 
 {...register('gender')}
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
 {...register('branch')}
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hr-highlight)]"
 style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
 >
 {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
 </select>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--hr-text-secondary)' }}>Join Date</label>
 <input 
 type="date" 
 {...register('joinDate')}
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
