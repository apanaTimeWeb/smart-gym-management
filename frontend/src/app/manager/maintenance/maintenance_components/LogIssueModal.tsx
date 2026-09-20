import { useState } from 'react';
import { X, Wrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CreateMaintenanceTicketPayload, CreateMaintenanceTicketSchema } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';

interface Props {
  onClose: () => void;
  onSubmit: (data: CreateMaintenanceTicketPayload) => Promise<boolean>;
}

import { MAINTENANCE_PRIORITIES } from '@/app/manager/maintenance/maintenance_constants/ManagerMaintenanceConstants';

export function LogIssueModal({ onClose, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateMaintenanceTicketPayload>({
    resolver: zodResolver(CreateMaintenanceTicketSchema),
    defaultValues: { priority: 'MEDIUM' }
  });

  const handleFormSubmit = async (data: CreateMaintenanceTicketPayload) => {
    setIsSubmitting(true);
    const success = await onSubmit(data);
    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-on-primary"><Wrench size={20} /></div>
            <h2 className="text-lg font-bold text-primary">Log Maintenance Issue</h2>
          </div>
          <button onClick={onClose} className="p-2 text-secondary hover:text-primary rounded-full hover:bg-input transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Issue Title</label>
            <input {...register('title')} placeholder="e.g. Treadmill 4 wire broken" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Equipment / Area</label>
            <input {...register('equipment')} placeholder="e.g. Cardio Section" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            {errors.equipment && <p className="text-danger text-xs mt-1">{errors.equipment.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Priority</label>
              <select {...register('priority')} className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                {MAINTENANCE_PRIORITIES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Estimated Cost</label>
              <input type="number" {...register('estimatedCost', { valueAsNumber: true })} placeholder="Optional" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border font-semibold text-secondary hover:bg-input transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-lg bg-primary font-semibold text-on-primary hover:opacity-90 disabled:opacity-50 transition-opacity">
              {isSubmitting ? 'Logging...' : 'Log Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
