// RESPONSIBILITY: Form modal for creating or editing a staff member profile in the HR module.
'use client';

import { useEffect } from 'react';
import { useHrContext } from '@/app/manager/hr/hr_context/HrContext';
import { STAFF_MODAL_FIELDS, EMPTY_STAFF, GENDER_OPTIONS, BRANCH_OPTIONS, StaffSchema, type StaffFormValues, STAFF_ROLE_OPTIONS } from '@/app/manager/hr/hr_utils/HrSharedConstants';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

export default function StaffModal() {
 const { showModal, setShowModal, editId, editData, saveStaff, saving } = useHrContext();

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
  <div className="rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-2 border-warning">
  <div className="sticky top-0 px-8 py-5 border-b border-border bg-card flex items-center justify-between z-10">
  <h3 className="text-xl font-bold text-foreground">{editId ? 'Edit Staff' : 'Add Staff Member'}</h3>
  <button 
  type="button" 
  onClick={() => setShowModal(false)} 
  className="p-2 rounded-full hover:bg-primary/10 transition-colors text-secondary hover:text-primary"
  >
  <X size={20} />
  </button>
  </div>
  <form onSubmit={handleSubmit(saveStaff)} className="p-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {STAFF_MODAL_FIELDS.map(f => (
  <div key={f.key} className={f.key === 'name' ? 'sm:col-span-2' : ''}>
  <label className="block text-sm font-medium mb-1.5 text-secondary">{f.label}</label>
  <input 
  type={f.type} 
  placeholder={f.placeholder} 
  min={f.type === 'number' ? '0' : undefined}
  maxLength={f.type === 'tel' ? 10 : undefined}
  onKeyDown={
    f.type === 'number' 
      ? (e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); } 
      : f.type === 'tel' 
        ? (e) => { if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault(); } 
        : undefined
  }
  {...register(f.key as keyof StaffFormValues, f.type === 'number' ? { valueAsNumber: true } : {})}
  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 transition-all duration-200 ${
    errors[f.key as keyof StaffFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
  } bg-input text-foreground`}
  />
  {errors[f.key as keyof StaffFormValues] && (
    <p className="text-danger text-xs mt-1.5">{errors[f.key as keyof StaffFormValues]?.message as string}</p>
  )}
  </div>
  ))}
  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">Role</label>
  <Controller
    name="role"
    control={control}
    render={({ field }) => (
      <SearchableDropdown
        value={field.value || ''}
        onChange={field.onChange}
        options={STAFF_ROLE_OPTIONS}
        placeholder="Select Role..."
      />
    )}
  />
  {errors.role && <p className="text-danger text-xs mt-1.5">{errors.role.message as string}</p>}
  </div>
  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">Gender</label>
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
  <label className="block text-sm font-medium mb-1.5 text-secondary">Join Date</label>
  <input 
  type="date" 
  {...register('joinDate')}
  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground transition-all duration-200"
  />
  </div>
  </div>
  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
  <button 
  type="button" 
  onClick={() => setShowModal(false)} 
  className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
  >
  Cancel
  </button>
  <button 
  type="submit" 
  disabled={saving} 
  className="px-8 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 bg-primary" 
  >
  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={16} />{editId ? 'Update' : 'Add Staff'}</>}
  </button>
  </div>
  </form>
  </div>
 </div>
 );
}
