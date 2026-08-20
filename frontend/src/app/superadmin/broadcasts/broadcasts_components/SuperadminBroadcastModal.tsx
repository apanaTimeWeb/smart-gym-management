// RESPONSIBILITY: Renders the Create/Edit Broadcast modal form. Receives form state via props from useBroadcastsPage. No API calls.
'use client';

import React from 'react';
import { X } from 'lucide-react';
import { UseFormReturn, Controller } from 'react-hook-form';
import { BroadcastFormData } from '@/app/superadmin/broadcasts/broadcasts_types/broadcasts_types';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

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
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{isEditMode ? 'Edit Broadcast' : 'New Broadcast'}</h2>
          <button onClick={onClose} className="text-secondary hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Broadcast Title <span className="text-destructive">*</span></label>
            <input 
              {...register('title')}
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors"
              placeholder="e.g. Scheduled Maintenance"
            />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Message Content <span className="text-destructive">*</span></label>
            <textarea 
              {...register('content')}
              rows={4}
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors resize-none"
              placeholder="Write your announcement here..."
            />
            {errors.content && <span className="text-xs text-destructive">{errors.content.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">Audience <span className="text-destructive">*</span></label>
              <Controller
                name="audience"
                control={form.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={[
                      { label: 'All Tenants', value: 'ALL_TENANTS' },
                      { label: 'Pro Plan Only', value: 'PRO_ONLY' },
                      { label: 'Suspended Only', value: 'SUSPENDED_ONLY' }
                    ]}
                  />
                )}
              />
              {errors.audience && <span className="text-xs text-destructive">{errors.audience.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">Status <span className="text-destructive">*</span></label>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={[
                      { label: 'Draft', value: 'DRAFT' },
                      { label: 'Scheduled', value: 'SCHEDULED' },
                      { label: 'Send Now', value: 'SENT' }
                    ]}
                  />
                )}
              />
              {errors.status && <span className="text-xs text-destructive">{errors.status.message}</span>}
            </div>
          </div>

          {status === 'SCHEDULED' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">Scheduled Date & Time <span className="text-destructive">*</span></label>
              <input 
                type="datetime-local" 
                {...register('scheduledDate')}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors"
              />
              {errors.scheduledDate && <span className="text-xs text-destructive">{errors.scheduledDate.message}</span>}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 bg-transparent border border-border hover:bg-border text-foreground font-medium rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-sm"
            >
              Save Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
