import React from 'react';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BroadcastFormData } from '../../superadmin_utils/SuperadminZodSchemas';

interface SuperadminBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<BroadcastFormData>;
  onSubmit: (data: BroadcastFormData) => void;
  isEditMode?: boolean;
}

export const SuperadminBroadcastModal: React.FC<SuperadminBroadcastModalProps> = ({
  isOpen,
  onClose,
  form,
  onSubmit,
  isEditMode = false,
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit, watch, formState: { errors } } = form;
  const status = watch('status');

  return (
    <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--text-primary)]">{isEditMode ? 'Edit Broadcast' : 'New Broadcast'}</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Broadcast Title <span className="text-[var(--danger)]">*</span></label>
            <input 
              {...register('title')}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              placeholder="e.g. Scheduled Maintenance"
            />
            {errors.title && <span className="text-[12px] text-[var(--danger)]">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Message Content <span className="text-[var(--danger)]">*</span></label>
            <textarea 
              {...register('content')}
              rows={4}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors resize-none"
              placeholder="Write your announcement here..."
            />
            {errors.content && <span className="text-[12px] text-[var(--danger)]">{errors.content.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Audience <span className="text-[var(--danger)]">*</span></label>
              <select 
                {...register('audience')}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors appearance-none"
              >
                <option value="ALL_TENANTS">All Tenants</option>
                <option value="PRO_ONLY">Pro Plan Only</option>
                <option value="SUSPENDED_ONLY">Suspended Only</option>
              </select>
              {errors.audience && <span className="text-[12px] text-[var(--danger)]">{errors.audience.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Status <span className="text-[var(--danger)]">*</span></label>
              <select 
                {...register('status')}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors appearance-none"
              >
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="SENT">Send Now</option>
              </select>
              {errors.status && <span className="text-[12px] text-[var(--danger)]">{errors.status.message}</span>}
            </div>
          </div>

          {status === 'SCHEDULED' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Scheduled Date & Time <span className="text-[var(--danger)]">*</span></label>
              <input 
                type="datetime-local" 
                {...register('scheduledDate')}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              />
              {errors.scheduledDate && <span className="text-[12px] text-[var(--danger)]">{errors.scheduledDate.message}</span>}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-[var(--border)]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 bg-transparent border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-primary)] font-medium rounded-lg transition-colors text-[14px]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
            >
              Save Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
