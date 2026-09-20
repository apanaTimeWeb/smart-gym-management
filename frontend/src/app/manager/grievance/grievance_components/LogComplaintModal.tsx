import { useState } from 'react';
import { X, Frown, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CreateGrievanceTicketPayload, CreateGrievanceTicketSchema } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';

interface Props {
  onClose: () => void;
  onSubmit: (data: CreateGrievanceTicketPayload) => Promise<boolean>;
}

import { GRIEVANCE_CATEGORIES } from '@/app/manager/grievance/grievance_constants/ManagerGrievanceConstants';

export function LogComplaintModal({ onClose, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateGrievanceTicketPayload>({
    resolver: zodResolver(CreateGrievanceTicketSchema),
    defaultValues: { category: 'OTHER' }
  });

  const handleFormSubmit = async (data: CreateGrievanceTicketPayload) => {
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
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><MessageSquare size={20} /></div>
            <h2 className="text-lg font-bold text-primary">Log Member Complaint</h2>
          </div>
          <button onClick={onClose} className="p-2 text-secondary hover:text-primary rounded-full hover:bg-input transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Member Name</label>
            <input {...register('memberName')} placeholder="e.g. Rahul Sharma" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            {errors.memberName && <p className="text-danger text-xs mt-1">{errors.memberName.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Category</label>
            <select {...register('category')} className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
              {GRIEVANCE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Issue Description</label>
            <textarea {...register('issue')} placeholder="What happened?" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none h-24 resize-none" />
            {errors.issue && <p className="text-danger text-xs mt-1">{errors.issue.message}</p>}
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border font-semibold text-secondary hover:bg-input transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-lg bg-primary font-semibold text-on-primary hover:opacity-90 disabled:opacity-50 transition-opacity">
              {isSubmitting ? 'Logging...' : 'Log Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
