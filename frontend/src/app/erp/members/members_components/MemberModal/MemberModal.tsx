// RESPONSIBILITY: Renders a modal for creating or editing a member.
'use client';

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { useMembersContext } from '@/app/erp/members/members_context/MembersContext';
import { useMembersStore } from '@/app/erp/members/members_store/useMembersStore';
import { MEMBERS_CYCLE_LABELS, getPriceForCycle, formatCurrency, MemberSchema, type MemberFormValues, EMPTY_MEMBER_FORM, type PlanWithCustom, GENDER_OPTIONS } from '@/app/erp/members/members_utils/MembersSharedConstants';

export default function MemberModal() {
  const {
    showAddModal, setShowAddModal, editId, editData,
    saveMember
  } = useMembersContext();

  const plans = useMembersStore(s => s.plans);
  const saving = useMembersStore(s => s.saving);

  const useFormReturn = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: editData || EMPTY_MEMBER_FORM
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useFormReturn;

  // Refetch editData into form whenever modal opens for edit
  useEffect(() => {
    if (showAddModal && editData) {
      reset(editData);
    }
  }, [showAddModal, editData, reset]);

  const watchPlanId = watch('planId') as string;
  const watchBillingCycle = watch('billingCycle') as string;
  const watchCustomDays = watch('customDays') as number;

  const onSubmit = (data: MemberFormValues) => saveMember(data);

  if (!showAddModal) return null;

  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString()) as PlanWithCustom | undefined;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{editId ? 'Edit Member' : 'Add New Member'}</h3>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 rounded-lg hover:bg-primary-subtle text-secondary transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
            { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
            { label: 'Address', key: 'address', type: 'text', placeholder: 'Andheri, Mumbai' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                {...register(f.key as keyof MemberFormValues)}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-colors ${
                  errors[f.key as keyof MemberFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`}
              />
              {errors[f.key as keyof MemberFormValues] && (
                <p className="text-danger text-xs mt-1">{errors[f.key as keyof MemberFormValues]?.message}</p>
              )}
            </div>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Gender</label>
              <Controller
                name="gender"
                control={useFormReturn.control}
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
              <label className="block text-sm font-medium text-secondary mb-1">Plan</label>
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
              <label className="block text-sm font-medium text-secondary mb-1">Billing Cycle</label>
              <Controller
                name="billingCycle"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(MEMBERS_CYCLE_LABELS).map(([val, label]) => ({ label, value: val }))}
                  />
                )}
              />
            </div>
            {watchBillingCycle === 'CUSTOM' && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Custom Days</label>
                <input
                  type="number"
                  {...register('customDays')}
                  placeholder="e.g. 15"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-colors ${
                    errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors.customDays && (
                  <p className="text-danger text-xs mt-1">{errors.customDays?.message}</p>
                )}
              </div>
            )}
          </div>

          {watchPlanId && (
            <div className="bg-warning-bg rounded-xl p-3 text-sm border border-warning/30 flex justify-between items-center">
              <div>
                <span className="font-semibold text-warning">Calculated Price:</span>
                <span className="text-warning ml-1 font-bold">
                  {formatCurrency(getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0))}
                </span>
              </div>
              {watchBillingCycle === 'CUSTOM' && (
                <div className="text-warning text-xs opacity-80">
                  (Per Day: {formatCurrency(selectedPlan?.priceCustom || 0)} × {watchCustomDays || 0} days)
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-white flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover transition-all duration-200 active:scale-95"
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
