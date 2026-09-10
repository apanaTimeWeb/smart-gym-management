'use client';
// RESPONSIBILITY: Modal for updating the action status and notes on a churn alert.
// Uses React Hook Form + Zod (churnActionSchema). Emits confirmed payload to parent via onConfirm — owns no mutation or fetch logic.

import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CHURN_ACTION_STATUS_STYLES } from '@/app/superadmin/churn-alerts/churn_utils/churn_constants';
import type { ChurnAlert, ChurnActionStatus, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import { churnActionSchema, type ChurnActionFormValues } from '@/app/superadmin/churn-alerts/churn_utils/SuperadminChurnActionModal.schema';

const ACTION_OPTIONS: ChurnActionStatus[] = ['PENDING', 'CONTACTED', 'RESOLVED', 'CHURNED'];

interface SuperadminChurnActionModalProps {
  alert: ChurnAlert;
  onConfirm: (payload: ChurnActionPayload) => void;
  onClose: () => void;
}

export default function SuperadminChurnActionModal({ alert, onConfirm, onClose }: SuperadminChurnActionModalProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ChurnActionFormValues>({
    resolver: zodResolver(churnActionSchema),
    defaultValues: {
      status: alert.actionStatus,
      notes: alert.notes,
    },
  });

  function onSubmit(data: ChurnActionFormValues) {
    onConfirm({ alertId: alert.id, status: data.status, notes: data.notes });
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-overlay border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-superadmin-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Update Action</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-foreground">{alert.gymName}</p>
          <p className="text-xs text-secondary">{alert.adminEmail}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Action Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {ACTION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => field.onChange(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        field.value === opt
                          ? CHURN_ACTION_STATUS_STYLES[opt] + ' ring-2 ring-offset-1 ring-primary'
                          : 'bg-input text-secondary hover:text-foreground border border-border'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.status && (
              <p className="mt-1 text-xs text-danger" role="alert">{errors.status.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Notes
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  placeholder="Add context about this tenant's situation..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground resize-none focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                />
              )}
            />
            {errors.notes && (
              <p className="mt-1 text-xs text-danger" role="alert">{errors.notes.message}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-input text-secondary hover:text-foreground text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Save Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
