'use client';

import React, { useEffect } from 'react';
import { usePlansContext } from '../plans_context/PlansContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';

const planSchema = z.object({
  name: z.string().min(1, 'Plan Name is required'),
  priceMonthly: z.number().min(0, 'Must be a positive number'),
  priceAnnual: z.number().min(0, 'Must be a positive number'),
  maxMembers: z.number().min(1, 'Must be at least 1'),
  maxStaff: z.number().min(1, 'Must be at least 1'),
  features: z.array(z.object({
    value: z.string().min(1, 'Feature cannot be empty')
  })).min(1, 'At least one feature is required'),
});

type PlanFormValues = z.infer<typeof planSchema>;

export default function PlanEditModal() {
  const { isEditModalOpen, closeEditModal, handleUpdatePlan, selectedPlan } = usePlansContext();

  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      priceMonthly: 0,
      priceAnnual: 0,
      maxMembers: 100,
      maxStaff: 5,
      features: [{ value: 'Core Gym Management' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features'
  });

  useEffect(() => {
    if (selectedPlan && isEditModalOpen) {
      reset({
        name: selectedPlan.name,
        priceMonthly: selectedPlan.priceMonthly,
        priceAnnual: selectedPlan.priceAnnual,
        maxMembers: selectedPlan.maxMembers,
        maxStaff: selectedPlan.maxStaff,
        features: selectedPlan.features?.length > 0 
          ? selectedPlan.features.map(f => ({ value: f }))
          : [{ value: 'Core Gym Management' }]
      });
    }
  }, [selectedPlan, isEditModalOpen, reset]);

  if (!isEditModalOpen || !selectedPlan) return null;

  const onSubmit = async (data: PlanFormValues) => {
    const payload = {
      ...data,
      features: data.features.map(f => f.value),
    };
    await handleUpdatePlan(selectedPlan.id, payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
        
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Edit Subscription Plan</h2>
          <button onClick={closeEditModal} className="p-2 hover:bg-[var(--bg-input)] rounded-full transition-colors text-[var(--text-secondary)]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">Plan Name</label>
            <input 
              {...register('name')} 
              placeholder="e.g. Pro Tier"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
            />
            {errors.name && <p className="text-[var(--danger)] text-sm">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Monthly Price ($)</label>
              <input 
                type="number"
                step="0.01"
                {...register('priceMonthly', { valueAsNumber: true })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
              />
              {errors.priceMonthly && <p className="text-[var(--danger)] text-sm">{errors.priceMonthly.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Annual Price ($)</label>
              <input 
                type="number"
                step="0.01"
                {...register('priceAnnual', { valueAsNumber: true })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
              />
              {errors.priceAnnual && <p className="text-[var(--danger)] text-sm">{errors.priceAnnual.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Max Members</label>
              <input 
                type="number"
                {...register('maxMembers', { valueAsNumber: true })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
              />
              {errors.maxMembers && <p className="text-[var(--danger)] text-sm">{errors.maxMembers.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Max Staff</label>
              <input 
                type="number"
                {...register('maxStaff', { valueAsNumber: true })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
              />
              {errors.maxStaff && <p className="text-[var(--danger)] text-sm">{errors.maxStaff.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Features List</label>
              <button 
                type="button" 
                onClick={() => append({ value: '' })}
                className="flex items-center gap-1 text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  {...register(`features.${index}.value`)}
                  placeholder="e.g. Advanced Analytics"
                  className="flex-1 bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
                />
                {fields.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            {errors.features && <p className="text-[var(--danger)] text-sm">{errors.features.message}</p>}
          </div>
        </form>

        <div className="p-6 border-t border-[var(--border)] bg-[var(--bg-sidebar)] flex justify-end gap-3">
          <button 
            type="button" 
            onClick={closeEditModal}
            className="px-6 py-2.5 rounded-xl font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-input)] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}
