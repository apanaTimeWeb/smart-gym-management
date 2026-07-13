// RESPONSIBILITY: Provides the implementation for PlanModal.tsx functionality within its module.
"use client";

import { useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { usePlansContext } from '@/app/erp/plans/plans_context/PlansContext';
import { TIERS, PlanSchema, type PlanFormValues, EMPTY_PLAN_FORM } from '@/app/erp/plans/plans_utils/PlansSharedConstants';

export default function PlanModal() {
  const { 
    showModal, setShowModal, 
    editId, form, 
    saving, savePlan 
  } = usePlansContext();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<PlanFormValues>({
    resolver: zodResolver(PlanSchema),
    defaultValues: form || EMPTY_PLAN_FORM
  });

  useEffect(() => {
    if (showModal) {
      reset(form);
    }
  }, [showModal, form, reset]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">
            {editId ? 'Edit Plan' : 'Create New Plan'}
          </h3>
          <button 
            type="button"
            onClick={() => setShowModal(false)} 
            className="p-2 rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(savePlan as any)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Plan Name</label>
              <input 
                type="text" 
                placeholder="e.g. Gold Plan" 
                {...register('name')}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
                } bg-input text-foreground`} 
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Tier</label>
              <Controller
                name="tier"
                control={control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={TIERS.map(t => ({ label: t, value: t }))}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: '1 Month Price (₹)', key: 'price1Month' }, 
              { label: '3 Months Price (₹)', key: 'price3Month' }, 
              { label: '6 Months Price (₹)', key: 'price6Month' }, 
              { label: '12 Months Price (₹)', key: 'price12Month' },
              { label: 'Custom Price / Day (₹)', key: 'priceCustom' }
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  {...register(f.key as keyof PlanFormValues)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors[f.key as keyof PlanFormValues] ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
                  } bg-input text-foreground`} 
                />
                {errors[f.key as keyof PlanFormValues] && <p className="text-destructive text-xs mt-1">{errors[f.key as keyof PlanFormValues]?.message}</p>}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Features (one per line)</label>
            <textarea 
              rows={5} 
              placeholder="Gym Access (6am - 10pm)&#10;Locker Access&#10;Fitness Assessment" 
              {...register('features')}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none ${
                errors.features ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
              } bg-input text-foreground`} 
            />
            {errors.features && <p className="text-destructive text-xs mt-1">{errors.features.message}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-primary-subtle transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save size={15} />{editId ? 'Update' : 'Create Plan'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
