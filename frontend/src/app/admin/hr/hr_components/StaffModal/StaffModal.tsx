// RESPONSIBILITY: Form modal for creating or editing a staff member profile in the HR module.
'use client';

import { useEffect } from 'react';
import { useHrContext } from '@/app/admin/hr/hr_context/HrContext';
import { STAFF_MODAL_FIELDS, EMPTY_STAFF, GENDER_OPTIONS, BRANCH_OPTIONS, StaffSchema, type StaffFormValues } from '@/app/admin/hr/hr_utils/HrSharedConstants';
import { X, Save, Eye, EyeOff } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

 export default function StaffModal() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useHrContext();
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    control,
    formState: { errors }
  } = useForm<StaffFormValues>({
    resolver: zodResolver(StaffSchema) as any,
    defaultValues: (editData as StaffFormValues) || {}
  });

 useEffect(() => {
   if (showModal && editData) {
     reset({ ...EMPTY_STAFF, ...(editData || {}) } as StaffFormValues);
   }
 }, [showModal, editData, reset]);

 if (!showModal) return null;

 return (
 <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60">
 <div className="rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border">
 <div className="sticky top-0 px-6 py-4 border-b border-border bg-card flex items-center justify-between z-10">
 <h3 className="text-lg font-bold text-foreground">{editId ? 'Edit Staff' : 'Add Staff Member'}</h3>
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="p-1.5 rounded-full hover:bg-primary/5 transition-colors text-secondary"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit(saveStaff)} className="p-6 space-y-4">
 {STAFF_MODAL_FIELDS.map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium mb-1 text-secondary">{f.label}</label>
 <input 
 type={f.type} 
 placeholder={f.placeholder} 
 {...register(f.key as keyof StaffFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 ${
   errors[f.key as keyof StaffFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
 } bg-input text-foreground`}
 />
 {errors[f.key as keyof StaffFormValues] && (
   <p className="text-danger text-xs mt-1">{errors[f.key as keyof StaffFormValues]?.message as string}</p>
 )}
 </div>
 ))}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium mb-1 text-secondary">Gender</label>
 <Controller
   name="gender"
   control={control}
   render={({ field }) => (
     <SearchableDropdown
       value={field.value || ''}
       onChange={field.onChange}
       options={GENDER_OPTIONS}
     />
   )}
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1 text-secondary">Branch</label>
 <Controller
   name="branch"
   control={control}
   render={({ field }) => (
     <SearchableDropdown
       value={field.value || ''}
       onChange={field.onChange}
       options={BRANCH_OPTIONS.map(b => ({ label: b, value: b }))}
     />
   )}
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1 text-secondary">Join Date</label>
 <input 
 type="date" 
 {...register('joinDate')}
 className="w-full px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
   <div>
     <label className="block text-sm font-medium mb-1 text-secondary">
       Password {!editId && <span className="text-danger">*</span>}
     </label>
     <div className="relative">
       <input 
         type={showPassword ? 'text' : 'password'} 
         placeholder="Enter password" 
         {...register('password')}
         className={`w-full border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus-visible:ring-2 ${
           errors.password ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
         } bg-input text-foreground`}
       />
       <button
         type="button"
         onClick={() => setShowPassword(!showPassword)}
         className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
       >
         {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
       </button>
     </div>
     {errors.password && (
       <p className="text-danger text-xs mt-1">{errors.password.message as string}</p>
     )}
   </div>
   <div>
     <label className="block text-sm font-medium mb-1 text-secondary">
       Confirm Password {!editId && <span className="text-danger">*</span>}
     </label>
     <input 
       type={showPassword ? 'text' : 'password'} 
       placeholder="Confirm password" 
       {...register('confirmPassword')}
       className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 ${
         errors.confirmPassword ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
       } bg-input text-foreground`}
     />
     {errors.confirmPassword && (
       <p className="text-danger text-xs mt-1">{errors.confirmPassword.message as string}</p>
     )}
   </div>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary/5 transition-colors flex-1"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity bg-primary" 
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editId ? 'Update' : 'Add Staff'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
