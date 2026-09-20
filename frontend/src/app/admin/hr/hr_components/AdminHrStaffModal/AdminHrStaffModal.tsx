"use client";
// RESPONSIBILITY: Form modal for creating or editing a staff member profile in the HR module.

import { useEffect } from 'react';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { STAFF_MODAL_FIELDS, EMPTY_STAFF, GENDER_OPTIONS, StaffSchema, type StaffFormValues, STAFF_ROLE_OPTIONS } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import { useAdminHrBranchReference } from '@/app/admin/hr/hr_context/useAdminHrBranchReference';
import type { AdminHrBranchReference } from '@/app/admin/hr/hr_types/AdminHrBranchReferenceTypes';
import { X, Save } from 'lucide-react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

export default function AdminHrStaffModal() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useHrContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const { data: branches = [] } = useAdminHrBranchReference();

  const { 
    register, 
    handleSubmit, 
    reset,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<StaffFormValues>({
    resolver: zodResolver(StaffSchema) as unknown as Resolver<StaffFormValues>,
    defaultValues: (editData as StaffFormValues) || {}
  });

 const formValues = useWatch({ control });
 const selectedRole = formValues.role ?? (editData as StaffFormValues)?.role;
 const isManager = selectedRole === 'Manager';
 const assignedBranches = formValues.assignedBranches || (editData as StaffFormValues)?.assignedBranches || [];

 useEffect(() => {
   if (showModal && editData) {
     reset({ ...EMPTY_STAFF, ...(editData || {}) } as StaffFormValues);
   }
 }, [showModal, editData, reset]);

 if (!showModal) return null;

  const getBranchLabel = (id: string) => {
    const branch = (branches as AdminHrBranchReference[]).find(b => b.id === id);
    return branch ? branch.name : id;
  };

  return (
 <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay">
  <div className="rounded-2xl shadow-dialog w-full max-w-2xl max-h-screen overflow-y-auto bg-card border-2 border-warning">
  <div className="sticky top-0 px-8 py-5 border-b border-border bg-card flex items-center justify-between z-10">
  <h3 className="text-xl font-bold text-primary">{editId ? 'Edit Staff' : 'Add Staff Member'}</h3>
  <button 
  type="button" 
  onClick={() => setShowModal(false)} 
  className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-colors text-secondary hover:text-primary motion-safe:duration-base"
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
  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 motion-safe:transition-all motion-safe:duration-base ${
    errors[f.key as keyof StaffFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
  } bg-input text-primary`}
  />
  {errors[f.key as keyof StaffFormValues] && (
    <p className="text-danger text-xs mt-1.5">{errors[f.key as keyof StaffFormValues]?.message as string}</p>
  )}
  </div>
  ))}
  
  {isManager ? (
    <div className="sm:col-span-2 space-y-4 p-5 border border-border rounded-xl bg-input">
      <div>
        <label className="block text-sm font-medium mb-2 text-primary">Assigned Branches</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(branches as AdminHrBranchReference[]).map(b => (
            <label key={b.id} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer motion-safe:transition-colors ${assignedBranches.includes(b.id) ? 'border-primary bg-surface-highlight text-primary' : 'border-border hover:bg-input text-secondary'}`}>
              <input 
                type="checkbox" 
                value={b.id}
                checked={assignedBranches.includes(b.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue('assignedBranches', [...assignedBranches, b.id]);
                  } else {
                    setValue('assignedBranches', assignedBranches.filter(x => x !== b.id));
                    if ((formValues.primaryBranchId ?? (editData as StaffFormValues)?.primaryBranchId) === b.id) {
                      setValue('primaryBranchId', '');
                    }
                  }
                }}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
              />
              <span className="text-sm font-medium">{b.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-secondary">Primary Branch</label>
        <Controller
          name="primaryBranchId"
          control={control}
          render={({ field }) => (
            <SearchableDropdown
              value={field.value || ''}
              onChange={(val) => {
                field.onChange(val);
                setValue('branch', String(val)); // Fallback for backward compatibility
              }}
              options={assignedBranches.map(id => ({ label: getBranchLabel(id), value: id }))}
              placeholder="Select Primary Branch..."
            />
          )}
        />
        {errors.primaryBranchId && <p className="text-danger text-xs mt-1.5">{errors.primaryBranchId.message as string}</p>}
      </div>
    </div>
  ) : (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-secondary">Branch</label>
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <SearchableDropdown
            value={field.value || ''}
            onChange={field.onChange}
            options={(branches as AdminHrBranchReference[]).map(b => ({ label: b.name, value: b.id }))}
            placeholder="Select Branch..."
          />
        )}
      />
      {errors.branch && <p className="text-danger text-xs mt-1.5">{errors.branch.message as string}</p>}
    </div>
  )}
  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">Role</label>
  <Controller
    name="role"
    control={control}
    render={({ field }) => (
      <SearchableDropdown
        value={field.value || ''}
        onChange={field.onChange}
        options={STAFF_ROLE_OPTIONS.filter(opt => opt.value === 'Manager')}
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
  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base"
  />
  </div>

  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">Temporary Password <span className="font-normal text-xs">(Optional for edit)</span></label>
  <div className="relative">
    <input 
    type={showPassword ? "text" : "password"}
    placeholder="Min 8 characters"
    {...register('temporaryPassword')}
    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base"
      aria-label="Toggle password visibility"
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
  {errors.temporaryPassword && <p className="text-danger text-xs mt-1.5">{errors.temporaryPassword.message as string}</p>}
  </div>

  <div className="sm:col-span-2 flex items-center justify-between p-4 border border-border rounded-xl bg-input">
    <div>
      <label className="block text-sm font-medium text-primary">Login Access</label>
      <p className="text-xs text-secondary mt-0.5">Allow this staff member to log in to the portal.</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" {...register('isActive')} className="sr-only peer" />
      <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-border after:content-none after:absolute after:top-0 after:left-0 after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 motion-safe:after:transition-all peer-checked:bg-success-bg"></div>
    </label>
  </div>

  </div>
  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
  <button 
  type="button" 
  onClick={() => setShowModal(false)} 
  className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-surface-highlight hover:text-primary motion-safe:transition-colors motion-safe:duration-base"
  >
  Cancel
  </button>
  <button 
  type="submit" 
  disabled={saving} 
  className="px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all hover:shadow-dialog motion-safe:active:scale-95 bg-primary motion-safe:duration-base" 
  >
  {saving ? <div className="w-4 h-4 border-2 border-border border-t-white rounded-full motion-safe:animate-spin motion-safe:duration-base" /> : <><Save size={16} />{editId ? 'Update' : 'Add Staff'}</>}
  </button>
  </div>
  </form>
  </div>
 </div>
 );
}