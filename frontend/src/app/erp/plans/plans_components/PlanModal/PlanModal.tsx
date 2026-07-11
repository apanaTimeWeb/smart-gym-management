"use client";

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
      <div className="bg-[var(--plans-bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--plans-bg-card)] px-6 py-4 border-b border-[var(--plans-border)] flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--plans-text-primary)]">
            {editId ? 'Edit Plan' : 'Create New Plan'}
          </h3>
          <button 
            type="button"
            onClick={() => setShowModal(false)} 
            className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--plans-text-secondary)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(savePlan as any)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--plans-text-secondary)] mb-1">Plan Name</label>
              <input 
                type="text" 
                placeholder="e.g. Gold Plan" 
                {...register('name')}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--plans-border)] focus:ring-[var(--warning)]'
                } bg-[var(--plans-bg-input)] text-[var(--plans-text-primary)]`} 
              />
              {errors.name && <p className="text-[var(--danger)] text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--plans-text-secondary)] mb-1">Tier</label>
              <select 
                {...register('tier')}
                className="w-full border border-[var(--plans-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--plans-bg-input)] text-[var(--plans-text-primary)]"
              >
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: '1 Month Price (₹)', key: 'price1Month' }, 
              { label: '3 Months Price (₹)', key: 'price3Month' }, 
              { label: '6 Months Price (₹)', key: 'price6Month' }, 
              { label: '12 Months Price (₹)', key: 'price12Month' }
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-[var(--plans-text-secondary)] mb-1">{f.label}</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  {...register(f.key as keyof PlanFormValues)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors[f.key as keyof PlanFormValues] ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--plans-border)] focus:ring-[var(--warning)]'
                  } bg-[var(--plans-bg-input)] text-[var(--plans-text-primary)]`} 
                />
                {errors[f.key as keyof PlanFormValues] && <p className="text-[var(--danger)] text-xs mt-1">{errors[f.key as keyof PlanFormValues]?.message}</p>}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--plans-text-secondary)] mb-1">Features (one per line)</label>
            <textarea 
              rows={5} 
              placeholder="Gym Access (6am - 10pm)&#10;Locker Access&#10;Fitness Assessment" 
              {...register('features')}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none ${
                errors.features ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--plans-border)] focus:ring-[var(--warning)]'
              } bg-[var(--plans-bg-input)] text-[var(--plans-text-primary)]`} 
            />
            {errors.features && <p className="text-[var(--danger)] text-xs mt-1">{errors.features.message}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="flex-1 py-2.5 border border-[var(--plans-border)] rounded-xl text-sm font-medium text-[var(--plans-text-primary)] hover:bg-[var(--primary-subtle)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
              style={{ background: 'var(--plans-highlight)' }}
            >
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editId ? 'Update' : 'Create Plan'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
