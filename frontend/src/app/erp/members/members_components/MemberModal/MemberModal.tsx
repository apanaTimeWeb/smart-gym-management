"use client";

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { useMembersContext } from '@/app/erp/members/members_context/MembersContext';
import { MEMBERS_CYCLE_LABELS, getPriceForCycle, formatCurrency, BRANCH_OPTIONS, MemberSchema, type MemberFormValues, EMPTY_MEMBER_FORM } from '@/app/erp/members/members_utils/MembersSharedConstants';

export default function MemberModal() {
 const { 
 showAddModal, setShowAddModal, editId, editData, 
 plans, saving, saveMember 
 } = useMembersContext();

 const useFormReturn = useForm({
   resolver: zodResolver(MemberSchema),
   defaultValues: editData || EMPTY_MEMBER_FORM
 });

 const { 
   register, 
   handleSubmit, 
   watch, 
   reset,
   setValue,
   formState: { errors } 
 } = useFormReturn;

 // Reset form whenever editData changes (e.g., when opening modal for edit)
 useEffect(() => {
   if (showAddModal && editData) {
     reset(editData);
   }
 }, [showAddModal, editData, reset]);

  const watchPlanId = watch('planId') as number;
  const watchBillingCycle = watch('billingCycle') as string;

 if (!showAddModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--members-bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-[var(--members-bg-card)] px-6 py-4 border-b border-[var(--members-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--members-text-primary)]">{editId ? 'Edit Member' : 'Add New Member'}</h3>
 <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-[var(--members-hover-bg)] text-[var(--members-text-secondary)]">
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit(saveMember as any)} className="p-6 space-y-4">
 {[
 { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma' },
 { label: 'Email', key: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
 { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
 { label: 'Address', key: 'address', type: 'text', placeholder: 'Andheri, Mumbai' },
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-[var(--members-text-secondary)] mb-1">{f.label}</label>
 <input 
 type={f.type} 
 placeholder={f.placeholder}
 {...register(f.key as keyof MemberFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[var(--members-bg-input)] text-[var(--members-text-primary)] ${
   errors[f.key as keyof MemberFormValues] ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--members-border)] focus:ring-[var(--warning)]'
 }`}
 />
 {errors[f.key as keyof MemberFormValues] && (
   <p className="text-[var(--danger)] text-xs mt-1">{errors[f.key as keyof MemberFormValues]?.message}</p>
 )}
 </div>
 ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--members-text-secondary)] mb-1">Gender</label>
 <select 
 {...register('gender')}
 className="w-full border border-[var(--members-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--members-bg-input)] text-[var(--members-text-primary)]"
 >
 <option value="MALE">Male</option>
 <option value="FEMALE">Female</option>
 <option value="OTHER">Other</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--members-text-secondary)] mb-1">Plan</label>
 <Controller
   name="planId"
   control={useFormReturn.control}
   render={({ field }) => (
     <SearchableDropdown
       options={plans.map(p => ({ value: p.id, label: p.name }))}
       value={field.value}
       onChange={field.onChange}
       placeholder="Select plan..."
     />
   )}
 />
 </div>
 </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--members-text-secondary)] mb-1">Billing Cycle</label>
 <select 
 {...register('billingCycle')}
 className="w-full border border-[var(--members-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--members-bg-input)] text-[var(--members-text-primary)]"
 >
 {Object.entries(MEMBERS_CYCLE_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
 </select>
 </div>
 {watchBillingCycle === 'CUSTOM' && (
 <div>
 <label className="block text-sm font-medium text-[var(--members-text-secondary)] mb-1">Custom Days</label>
 <input 
 type="number"
 {...register('customDays')}
 placeholder="e.g. 15"
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[var(--members-bg-input)] text-[var(--members-text-primary)] ${
   errors.customDays ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--members-border)] focus:ring-[var(--warning)]'
 }`}
 />
 {errors.customDays && (
   <p className="text-[var(--danger)] text-xs mt-1">{errors.customDays?.message}</p>
 )}
 </div>
 )}
 </div>
 {watchPlanId && (
            <div className="bg-[var(--warning-bg)] rounded-xl p-3 text-sm border border-[var(--warning)]/30">
              <span className="font-semibold text-[var(--warning)]">Price:</span> 
              <span className="text-[var(--warning)] ml-1">
 {formatCurrency(getPriceForCycle(plans.find(p => p.id === Number(watchPlanId)), watchBillingCycle))}
 </span>
 </div>
 )}
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowAddModal(false)} 
 className="flex-1 py-2.5 border border-[var(--members-border)] rounded-xl text-sm font-medium text-[var(--members-text-primary)] hover:bg-[var(--members-hover-bg)]"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--members-highlight)' }}
 >
 {saving ? (
 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <><Save size={15} /> {editId ? 'Update' : 'Add Member'}</>
 )}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
