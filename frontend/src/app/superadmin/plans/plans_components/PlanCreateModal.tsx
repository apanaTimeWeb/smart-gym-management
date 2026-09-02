// RESPONSIBILITY: Renders the modal form for creating a new subscription plan. Reads/writes via usePlansStore.
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { usePlansStore } from '@/app/superadmin/plans/plans_store/usePlansStore';

const planSchema = z.object({
  name: z.string().min(1, 'Plan Name is required'),
  priceMonthly: z.coerce.number().min(0),
  priceAnnual: z.coerce.number().min(0),
  maxMembers: z.coerce.number().min(1),
  maxStaff: z.coerce.number().min(1),
  features: z.array(z.object({ value: z.string().min(1, 'Feature cannot be empty') })).min(1),
});

type PlanFormValues = z.infer<typeof planSchema>;

export default function PlanCreateModal() {
  const isOpen = usePlansStore(state => state.isCreateModalOpen);
  const closeCreateModal = usePlansStore(state => state.closeCreateModal);
  const handleCreatePlan = usePlansStore(state => state.handleCreatePlan);
  const actionLoadingId = usePlansStore(state => state.actionLoadingId);
  const isSubmitting = actionLoadingId === 'create';

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema) as any,
    defaultValues: {
      name: '', priceMonthly: 0, priceAnnual: 0, maxMembers: 100, maxStaff: 5,
      features: [{ value: 'Core Gym Management' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'features' });

  if (!isOpen) return null;

  const handleClose = () => { reset(); closeCreateModal(); };

  const onSubmit = async (data: PlanFormValues) => {
    await handleCreatePlan({ ...data, features: data.features.map(f => f.value) });
    reset();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-screen overflow-hidden flex flex-col shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Create New Subscription Plan</h2>
          <button onClick={handleClose} className="p-2 hover:bg-input rounded-full transition-colors text-secondary" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">Plan Name <span className="text-danger">*</span></label>
            <input {...register('name')} placeholder="e.g. Pro Tier" className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors" />
            {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['priceMonthly', 'priceAnnual'] as const).map(field => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-secondary">{field === 'priceMonthly' ? 'Monthly Price ($)' : 'Annual Price ($)'} <span className="text-danger">*</span></label>
                <input type="number" min="0" step="0.01" {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors" />
                {errors[field] && <p className="text-danger text-xs">{errors[field]?.message}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['maxMembers', 'maxStaff'] as const).map(field => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-secondary">{field === 'maxMembers' ? 'Max Members' : 'Max Staff'} <span className="text-danger">*</span></label>
                <input type="number" min="0" {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors" />
                {errors[field] && <p className="text-danger text-xs">{errors[field]?.message}</p>}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-secondary">Features List <span className="text-danger">*</span></label>
              <button type="button" onClick={() => append({ value: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover font-medium">
                <Plus size={16} /> Add Feature
              </button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input {...register(`features.${index}.value`)} placeholder="e.g. Advanced Analytics" className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-foreground focus:border-primary outline-none transition-colors" />
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="p-2.5 text-secondary hover:text-danger hover:bg-danger/10 rounded-xl transition-colors" aria-label="Remove feature">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </form>

        <div className="p-6 border-t border-border bg-sidebar flex justify-end gap-3">
          <button type="button" onClick={handleClose} className="px-6 py-2.5 rounded-xl font-medium text-secondary hover:bg-input transition-colors">Cancel</button>
          <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2 active:scale-95">
            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : 'Create Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}
